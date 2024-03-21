import { Component, OnInit  } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-choose-screen',
  templateUrl: './choose-screen.component.html',
  styleUrls: ['./choose-screen.component.scss']
})
export class ChooseScreenComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    let dados = sessionStorage.getItem("usuarioLogado");

    if (dados === null) {
      this.router.navigate(['/login'])
    }
  }

}
