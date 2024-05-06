import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from "crypto-js";
import {CadastroClienteForm} from "../../client-area/client-create";
import {ForgamesService} from "../../backoffice/forgames.service";
import {MatSnackBar} from "@angular/material/snack-bar";

import {CreateUserComponent} from "../../backoffice/create-user/create-user.component";
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  isValid: boolean = false;
  isInvalid: boolean = false;
  isCpfValid: boolean = false;
  public createForm: FormGroup;

  constructor(public service: ForgamesService,
              public snackBar: MatSnackBar,
            private router: Router) {
  }

  ngOnInit(){
    this.createForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      nascimento: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      endereco: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      complemento: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
    })
  }

  public testaCPF(cpf: string): boolean {
    var soma
    var resto
    soma = 0
    var i
    if (cpf === "00000000000") return false

    for (i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11

    if ((resto === 10) || (resto === 11)) resto = 0
    if (resto !== parseInt(cpf.substring(9, 10))) return false

    soma = 0
    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11

    if ((resto === 10) || (resto === 11)) resto = 0
    if (resto !== parseInt(cpf.substring(10, 11))) return false
    return true
  }

  public sendCreate(): void {
    const senha = this.createForm.get('password')?.value;

    // let encriptSenha = CryptoJS.SHA256(senha).toString();

    if (this.isCpfValid) {
      const request: CadastroClienteForm = {
        nome: this.createForm.get('nome')?.value,
        email: this.createForm.get('email')?.value,
        cpf: this.createForm.get('cpf')?.value,
        genero: this.createForm.get('genero')?.value,
        senha: this.createForm.get('senha')?.value,
        endereco: [{
          endereco: this.createForm.get('endereco')?.value,
          cep: this.createForm.get('cep')?.value,
          numero: this.createForm.get('numero')?.value,
          complemento: this.createForm.get('complemento')?.value,
          bairro: this.createForm.get('bairro')?.value,
          cidade: this.createForm.get('cidade')?.value,
          uf: this.createForm.get('uf')?.value,
        }]
      }
      this.service.cadastrarCliente(request).subscribe((r) => {
        console.log(request)
        this.openSnackBar();
        this.router.navigate(['/login-user'])
      })
    }
  }
  public openSnackBar(): void {
    this.snackBar.open('cadastro feito com sucesso!', 'Fechar', {
      duration: 4000
    })
  }


  public checkIsCpfValid() {
    const cpf = this.createForm.get('cpf')?.value ?? '';

    if (cpf === '') {
      this.isValid = false;
      this.isInvalid = false;
      return;
    }

    this.isCpfValid = this.testaCPF(cpf);

    if (this.isCpfValid) {
      this.isValid = true;
      this.isInvalid = false;
    } else {
      this.isValid = false;
      this.isInvalid = true;
    }
  }
}
