import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import {LoginModel} from "../backoffice";
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  constructor(private loginService: LoginService,
              private router: Router,
              private snack: MatSnackBar) {

  }

  public createForm: FormGroup;

  ngOnInit() {
    this.createForm = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    })
  }

  public submit(): void {
    const senha = this.createForm.get('senha')?.value;
    const cryptSenha = CryptoJS.SHA256(senha).toString();

    const request: LoginModel = {
      email: this.createForm.get('usuario')?.value,
      senha: cryptSenha,
    }
    this.loginService.logar(request).subscribe((response) => {
        if (response.status === 200) {
          sessionStorage.setItem("usuarioLogado", JSON.stringify({
            id: response.body?.id,
            grupo: response.body?.grupo
          }));
          this.router.navigate(['/escolhertela']);
        }
      },
      error => {
        this.snack.open('Email ou senha inválidos', 'Fechar', {
          duration: 4000
        })
      }
    );
  }
}
