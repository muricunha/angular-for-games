import { Component } from '@angular/core';
import { Product } from 'src/app/backoffice-product/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./styles.css']
})
export class CheckoutComponent {
  public quantidade: any
  public frete: any;
  public subTotal: any;
  public valorTotal: any;
  public formaPagamento: any;
  public endereco: any;
  public products: Product[] = [];
  constructor(){
  }


  ngOnInit(){
    this.quantidade = sessionStorage.getItem('quantidade');
    this.frete = sessionStorage.getItem('frete');
    this.valorTotal = sessionStorage.getItem('totalValue');
    this.subTotal = sessionStorage.getItem('subTotal');
    this.formaPagamento = sessionStorage.getItem('Card');
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.products = cart;
    this.getEndereco();
  }

  public getEndereco(): void{
    const clienteLogado = sessionStorage.getItem('endEntrega');
    if (clienteLogado) {
      this.endereco = JSON.parse(clienteLogado);
    }
  }

  public vlTotal(): number {
    return this.subTotal + parseFloat(this.frete);
  }

}
