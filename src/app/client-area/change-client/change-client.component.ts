import { Component, Inject, Input, Optional } from '@angular/core';
import { ClientService } from '../client.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CadastroClienteForm, EnderecoForm } from '../client-create';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-client',
  templateUrl: './change-client.component.html',
  styleUrls: ['./change-client.component.scss']
})
export class ChangeClientComponent {
  public mostrarDiv1: boolean = true;
  public mostrarDiv2: boolean = false;
  public mostrarDivEnd: boolean = false;
  public formClient: FormGroup;
  public formAddress: FormGroup;
  public editFormAddress: FormGroup;
  public id: number;
  public email: string;
  public cpf: string;
  public nomeUsuario: string;
  public dataNascimento: string;
  public genero: string;
  public senha: string;
  public cliente: any;
  constructor(
    private clientService: ClientService,
    private readonly formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
  ){
    this.formClient = new FormGroup({
      nome: new FormControl(this.nomeUsuario),
      nascimento: new FormControl(this.dataNascimento),
      genero: new FormControl(this.genero),
      senha: new FormControl(this.senha),
      email: new FormControl(this.email),
      cpf: new FormControl(this.cpf)
    })
  }

  ngOnInit(){
    this.validateSession()
    this.teste()
  }

  public mostrarProximaDiv(): void {
    this.mostrarDiv1 = false;
  }

  public mostrarDivAnterior(): void {
    this.mostrarDiv1 = true;
  }

  // public checkCep(event: any){
  //   const cep = event.target.value.trim()
  //   console.log(cep)
  //   if(cep.length === 8){
  //     this.getAddressCep(cep)
  //   } else {
  //     console.warn('CEP DEVE CONTER 8 DIGITOS')
  //   }
  // }

  // public getAddressCep(cep: string): void{
  //   this.clientService.getByViaCep(cep).subscribe((dados) => {
  //     console.log(dados);
  //     this.bairrovia = dados.bairro;
  //     this.cidadevia = dados.localidade;
  //     this.complementovia = dados.complemento;
  //     this.ufvia = dados.uf;
  //     this.logradourovia = dados.logradouro;

  //   })
  //   this.teste();
  // }

  public teste(): void {
    this.formAddress = new FormGroup({
      logradouro: new FormControl(),
      cep: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(),
      cidade: new FormControl(''),
      uf: new FormControl(''),
    })
  }

  public validateSession(): void {
    const clienteLogado = sessionStorage.getItem('clienteLogado');
    if (clienteLogado) {
      this.cliente = JSON.parse(clienteLogado);
      const cliente = JSON.parse(clienteLogado);
      this.formClient.patchValue({
        nome: cliente.usuario,
        nascimento: cliente.nascimento,
        genero: cliente.genero,
        senha: cliente.senha,
        email: cliente.email,
        cpf: cliente.cpf
      });
    }
  }

  public saveAddress(): void{
  this.mostrarDivEnd = true;
  this.mostrarDiv1 = true;
    const requestAddress: EnderecoForm = {
      logradouro: this.formAddress.get('logradouro')?.value,
      cep: this.formAddress.get('cep')?.value,
      numero: this.formAddress.get('numero')?.value,
      complemento: this.formAddress.get('complemento')?.value,
      bairro: this.formAddress.get('bairro')?.value,
      cidade: this.formAddress.get('cidade')?.value,
      uf: this.formAddress.get('uf')?.value,
    }
    console.log(requestAddress);

    this.clientService.salvarEndereco(requestAddress).subscribe(() =>{
      this.openAddressBar();
    })
  }

  public editUsers(): void {
    const endereco:EnderecoForm = {
      logradouro: this.editFormAddress.get('logradouro')?.value,
      cep: this.editFormAddress.get('cep')?.value,
      numero: this.editFormAddress.get('numero')?.value,
      complemento: this.editFormAddress.get('complemento')?.value,
      bairro: this.editFormAddress.get('bairro')?.value,
      cidade: this.editFormAddress.get('cidade')?.value,
      uf: this.editFormAddress.get('uf')?.value
    }
    const request: CadastroClienteForm = {
      id: this.id,
      nome: this.formClient.get('nome')?.value,
      nascimento: this.formClient.get('nascimento')?.value,
      genero: this.formClient.get('genero')?.value,
      senha: this.formClient.get('senha')?.value,
      cpf: this.formClient.get('cpf')?.value,
      email: this.formClient.get('email')?.value,
      endereco: [endereco]
    }
    this.clientService.edit(request).subscribe(() => {
      this.openSnackBar();
      })
  }

  public openSnackBar(): void {
    this.snackBar.open('alteração feita com sucesso!', 'Fechar', {
      duration: 3000
    })
    }

  public openAddressBar(): void {
    this.snackBar.open('cadastro feito com sucesso!', 'Fechar', {
      duration: 3000
    })
  }

}
