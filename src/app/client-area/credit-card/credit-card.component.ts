import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CadastroClienteForm, CartaoForm} from "../client-create";
import {ForgamesService} from "../../backoffice/forgames.service";
import {MatSnackBar} from "@angular/material/snack-bar";

interface Avaliation {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./styles.css']
})
export class CreditCardComponent {
    public createForm: FormGroup;
    parcelas:   Avaliation[] = [
      {value: '1x sem juros', viewValue: '1x sem juros'},
      {value: '2x sem juros', viewValue: '2x sem juros'},
      {value: '3x sem juros', viewValue: '3x sem juros'},
    ];
    public mostrarDiv = false;
    public totalValue: any;
    public formaPagamento: string;
  constructor(public service: ForgamesService, public snackBar: MatSnackBar) {
    this.totalValue = sessionStorage.getItem('totalValue')
  }
  ngOnInit(){
    this.createForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      validade: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      seguranca: new FormControl('', [Validators.required]),
      parcelas: new FormControl('', [Validators.required])
    })
  }

  public sendCreate(): void {
      const request: CartaoForm = {
        nome: this.createForm.get('nome')?.value,
        validade: this.createForm.get('validade')?.value,
        numero: this.createForm.get('numero')?.value,
        seguranca: this.createForm.get('seguranca')?.value,
        parcelas: this.createForm.get('parcelas')?.value
      }
      this.service.cadastrarCartao(request).subscribe((r) => {
        this.openSnackBar();
      })
  }
  public onChangeEvent(event: any){
    console.log(event.value);
    if(event.value === '1'){
      this.mostrarDiv = false
      this.formaPagamento = 'Boleto Bancário';
      sessionStorage.setItem('Card', this.formaPagamento)
    } else{
      this.mostrarDiv = true
      this.formaPagamento = 'Cartão de Crédito';
      sessionStorage.setItem('Card', this.formaPagamento)
    }
  }
  public openSnackBar(): void {
    this.snackBar.open('cadastro feito com sucesso!', 'Fechar', {
      duration: 4000
    })
  }
}
