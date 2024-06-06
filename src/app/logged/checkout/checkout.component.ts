import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/backoffice-product/product';
import { ListOrder } from 'src/app/backoffice/backoffice';
import { ForgamesService } from 'src/app/backoffice/forgames.service';

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
  constructor(private serviceCliente: ForgamesService, public snackBar: MatSnackBar){
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

  public openSnackBar(): void {
    this.snackBar.open('pedido feito com sucesso!', 'Fechar', {
      duration: 4000
    })
  }

  public savingOrder(): void{
    const request: ListOrder = {
      id: 1,
      data: new Date().getDate().toString(),
      valor: this.valorTotal,
      status: 'Em andamento'
    }

    console.log(request);

    this.serviceCliente.saveOrder(request).subscribe((value) => {
      console.log(value);
      this.openSnackBar()
    })

  }

  public vlTotal(): number {
    return this.subTotal + parseFloat(this.frete);
  }

}
