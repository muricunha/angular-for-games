import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CadastroClienteForm, CartaoForm} from "../client-create";
import {ForgamesService} from "../../backoffice/forgames.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./styles.css']
})
export class CreditCardComponent {
    public createForm: FormGroup;

  constructor(public service: ForgamesService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(){
    this.createForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      validade: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      seguranca: new FormControl('', [Validators.required]),
    })
  }

  public sendCreate(): void {

      const request: CartaoForm = {
        nome: this.createForm.get('nome')?.value,
        validade: this.createForm.get('validade')?.value,
        numero: this.createForm.get('numero')?.value,
        seguranca: this.createForm.get('seguranca')?.value,

      }
      this.service.cadastrarCartao(request).subscribe((r) => {
        this.openSnackBar();
      })

  }
  public openSnackBar(): void {
    this.snackBar.open('cadastro feito com sucesso!', 'Fechar', {
      duration: 4000
    })
  }
}
