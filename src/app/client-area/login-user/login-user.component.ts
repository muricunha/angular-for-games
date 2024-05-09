import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCliente } from '../client-create';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  constructor(
    private router: Router,
    private snack: MatSnackBar,
    private clientService: ClientService){}
  public createFormuler: FormGroup;

  ngOnInit() {
    this.createFormuler = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    })
  }

  public loginUser(): void{
    console.log('entrou')
    const request: LoginCliente = {
      email: this.createFormuler.get('usuario')?.value,
      senha: this.createFormuler.get('senha')?.value,
    }

    this.clientService.logar(request).subscribe((response)=>{
      console.log(response.status)
      if (response.status === 200) {
      const session =  sessionStorage.setItem("clienteLogado", JSON.stringify({
          id: response.body?.id,
          usuario: response.body?.nome
        }));

        this.router.navigate(['/inicio']);
      }
    },
    error => {
      this.snack.open('Email ou senha inválidos', 'Fechar', {
        duration: 4000
      })
    }
  )
  }
}
