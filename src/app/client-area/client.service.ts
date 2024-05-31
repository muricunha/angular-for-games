import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroClienteForm, EnderecoForm, LoginCliente, ViewSession } from './client-create';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public changeData: any;
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

  public salvarEndereco(request: EnderecoForm): Observable<EnderecoForm> {
    const url = `${this.API}/usuario/salvar`;
    return this.http.post<EnderecoForm>(url, request)
  }

  public listarEndereco(id: number): Observable<EnderecoForm> {
    const url = `${this.API}/endereco/listar/${id}`;
    return this.http.get<EnderecoForm>(url);
  }

  public setDados(changeData: any){
    this.changeData = changeData;
  }
  public getDados(){
    return this.changeData;
  }
}
