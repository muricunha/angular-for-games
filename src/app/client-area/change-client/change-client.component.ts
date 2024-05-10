import { Component, Inject, Input, Optional } from '@angular/core';
import { ClientService } from '../client.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CadastroClienteForm, EnderecoForm } from '../client-create';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-client',
  templateUrl: './change-client.component.html',
  styleUrls: ['./change-client.component.scss']
})
export class ChangeClientComponent {
  public mostrarDiv1: boolean = true;
  public formClient: FormGroup;
  public formAddress: FormGroup;
  public id: number;
  public nomeUsuario: string;
  public dataNascimento: string;
  public genero: string;
  public senha: string;
  public logradouro: string
  public cep: string;
  public numero: string
  public complemento: string;
  public bairro: string;
  public cidade: string;
  public uf: string;
  constructor(
    private clientService: ClientService,
    private readonly formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
  ){
  }

  ngOnInit(){
    this.validateSession()
    this.formClient = new FormGroup({
      nome: new FormControl(this.nomeUsuario),
      nascimento: new FormControl(this.dataNascimento),
      genero: new FormControl(this.genero),
      senha: new FormControl(this.senha),
    })

    this.formAddress = new FormGroup({
      logradouro: new FormControl(''),
      cep: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      cidade: new FormControl(''),
      uf: new FormControl(''),
    })

  }

  public mostrarProximaDiv(): void {
    this.mostrarDiv1 = false;
  }

  public mostrarDivAnterior(): void {
    this.mostrarDiv1 = true;
  }

  public validateSession(): void {
    const clienteLogado = sessionStorage.getItem('clienteLogado')
    if(clienteLogado){
      const cliente = JSON.parse(clienteLogado);
      this.id = cliente.id
      this.nomeUsuario = cliente.usuario,
      this.dataNascimento = cliente.nascimento,
      this.genero = cliente.genero,
      this.senha = cliente.senha,
      cliente.endereco.forEach((endereco: any)=> {
        this.logradouro = endereco.logradouro,
        this.cep = endereco.cep,
        this.numero = endereco.numero,
        this.complemento = endereco.complemento,
        this.bairro = endereco.bairro,
        this.cidade = endereco.cidade,
        this.uf = endereco.uf
      })
      console.log(cliente)
    }

    console.log('teste',this.senha)
  }

  public saveAddress(): void{
    const requestAddress: EnderecoForm = {
      logradouro: this.formAddress.get('logradouro')?.value,
      cep: this.formAddress.get('cep')?.value,
      numero: this.formAddress.get('numero')?.value,
      complemento: this.formAddress.get('complemento')?.value,
      bairro: this.formAddress.get('bairro')?.value,
      cidade: this.formAddress.get('cidade')?.value,
      uf: this.formAddress.get('uf')?.value,
    }
    this.clientService.salvarEndereco(requestAddress).subscribe(() =>{
      this.openAddressBar();
    })
  }

  public editUsers(): void {
    const request: CadastroClienteForm = {
      id: this.id,
      nome: this.formClient.get('nome')?.value,
      nascimento: this.formClient.get('nascimento')?.value,
      genero: this.formClient.get('genero')?.value,
      senha: this.formClient.get('senha')?.value,
    }
    this.clientService.edit(request).subscribe(() => {
      this.openSnackBar();
      })
  }

  public openSnackBar(): void {
    this.snackBar.open('alteração feita com sucesso!', 'Fechar')
    }

  public openAddressBar(): void {
    this.snackBar.open('cadastro feito com sucesso!', 'Fechar')
  }

}
