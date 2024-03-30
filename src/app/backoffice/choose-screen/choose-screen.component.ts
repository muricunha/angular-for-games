import { Component, OnInit  } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';


@Component({
  selector: 'app-choose-screen',
  templateUrl: './choose-screen.component.html',
  styleUrls: ['./choose-screen.component.scss']
})
export class ChooseScreenComponent implements OnInit {
  user$ = this.authenticationService.getUser();

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    let dados = sessionStorage.getItem("usuarioLogado");

    if (dados === null) {
      this.router.navigate(['/login'])
    }
  }


    public sair(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login')
  }
}
