import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CadastroClienteForm, EnderecoForm, LoginCliente, ViewSession } from './client-create';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public changeData: any;
  private clienteSubject = new BehaviorSubject<CadastroClienteForm | null>(null);
  cliente$ = this.clienteSubject.asObservable();
  private readonly API = 'http://localhost:8081';
  private readonly APICep = 'https://viacep.com.br/ws'
  constructor(public http: HttpClient) { }

  public logar(request: LoginCliente): Observable<HttpResponse<ViewSession>> {
    const url = `${this.API}/usuario/login`;
    return this.http.post<ViewSession>(url, request, {observe: 'response', responseType: 'json'})
  }

  edit(user: CadastroClienteForm): Observable<CadastroClienteForm> {
    const url = `${this.API}/usuario/alterar`;
    return this.http.put<CadastroClienteForm>(url, user);
  }

  public getByViaCep(cep: string): Observable<any>{
    return this.http.get(`${this.APICep}/${cep}/json`)
  }

  public salvarEndereco(request: CadastroClienteForm): Observable<CadastroClienteForm> {
    const url = `${this.API}/usuario/salvar`;
    return this.http.post<CadastroClienteForm>(url, request)
  }

  public listarEndereco(): Observable<EnderecoForm> {
    const url = `${this.API}/endereco/listar`;
    return this.http.get<EnderecoForm>(url);
  }

  public setDados(changeData: any){
    this.changeData = changeData;
  }
  public getDados(){
    return this.changeData;
  }

  setCliente(cliente: CadastroClienteForm): void {
    this.clienteSubject.next(cliente);
  }

  getCliente(): CadastroClienteForm | null {
    console.log('ola');

    return this.clienteSubject.getValue();
  }

  addEndereco(endereco: EnderecoForm) {
    const cliente = this.getCliente();
    if (cliente) {
      cliente.endereco = cliente.endereco || [];
      cliente.endereco = [...cliente.endereco, endereco]; // Clonando a lista existente e adicionando o novo endereço

      this.clienteSubject.next(cliente);
    }
  }

}
