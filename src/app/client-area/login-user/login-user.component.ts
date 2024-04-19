import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCliente } from '../client-create';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  constructor(
    private router: Router,
    private snack: MatSnackBar){}
  public createForm: FormGroup;

  ngOnInit() {
    this.createForm = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    })
  }

  public loginUser(): void{
    console.log('entrou')

    const request: LoginCliente = {
      email: this.createForm.get('usuario')?.value,
      senha: this.createForm.get('senha')?.value,
    }

/*     this.clientService.logar(request).subscribe((response)=>{
      console.log(response.status)
      if (response.status === 201) {
      const session =  sessionStorage.setItem("clienteLogado", JSON.stringify({
          id: response.body?.id,
          usuario: response.body?.nome
        }));
        console.log(session);

        this.router.navigate(['/inicio']);
      }
    },
    error => {
      this.snack.open('Email ou senha inválidos', 'Fechar', {
        duration: 3000
      })
    }
  ) */
  }
}
