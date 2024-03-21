import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import {LoginModel} from "../backoffice";
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  constructor(private loginService: LoginService){

  }
  public createForm: FormGroup;

  ngOnInit(){
    this.createForm = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    })
  }

  public submit(): void {
    // const senha = this.createForm.get('senha')?.value;
    // const cryptSenha = CryptoJS.SHA256(senha).toString();

    const request: LoginModel = {
      email: this.createForm.get('usuario')?.value,
      senha: this.createForm.get('senha')?.value,
    }
    this.loginService.logar(request).subscribe((r) => {
      console.log(r)
    })
  }

}
