import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import {LoginForm} from "../backoffice";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  usuario: string;
  senha: string;
  senhaEncriptada: string;
  loginForm: LoginForm;


  public submit(): void {
    debugger;
    this.capturarDadosFormulario();
    this.encriptarSenha();
    this.criarDadosRequisicao();
  }

  private capturarDadosFormulario() {
    this.usuario = this.createForm.get('usuario')?.value ?? '';
    this.senha = this.createForm.get('senha')?.value ?? '';
  }

  private encriptarSenha() {
    this.senhaEncriptada = CryptoJS.SHA256(this.senha).toString();
  }

  private criarDadosRequisicao() {
    this.loginForm = {
      usuario: this.usuario,
      senha: this.senhaEncriptada
    }
  }

  public createForm = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  })
}
