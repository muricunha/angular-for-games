import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router){
  }
  public nomeUsuario: string;
  public sessionKey = 'clienteLogado';
  public logged = sessionStorage.getItem('clienteLogado');
  ngOnInit(){
    const clienteLogado = sessionStorage.getItem('clienteLogado')

    if(clienteLogado){
      const cliente = JSON.parse(clienteLogado);
      this.nomeUsuario = cliente.usuario;
    }
  }

  public logout(): void{
   const teste = sessionStorage.removeItem(this.sessionKey);
   console.log(teste);
   this.router.navigate(['/login-user'])
  }
}
