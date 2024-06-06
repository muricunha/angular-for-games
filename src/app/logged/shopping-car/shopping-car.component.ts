import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/backoffice-product/product';
import {ClientService} from "../../client-area/client.service";

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./styles.css']
})
export class ShoppingCarComponent {
@Input() produto: Product[] = [];
public products: Product[] = [];
public productQuanity: number = 1;
public cliente: any;
public selectedEndereco: any;
favoriteSeason: string;
seasons: string[] = ['15,00','30,00','50,00'];

  constructor(private router: Router, private snack: MatSnackBar, private clientService: ClientService,){}
  ngOnInit(){
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.verifySession();
    this.products = cart;
    this.getValueProducts();
    this.clientService.obterUsuarioPorId(this.cliente.id).subscribe((request) =>{
      this.cliente = request;
      debugger;
    });
  }

  public validateSession(): void {
    const clienteLogado = sessionStorage.getItem('clienteLogado');
    if (clienteLogado) {
      this.cliente = JSON.parse(clienteLogado);
    }
  }

  public verifySession(): boolean {
    const clienteLogado = sessionStorage.getItem('clienteLogado');
    if(clienteLogado){
      this.validateSession();
      return true;
    } else {
      return false;
    }
  }

  onSelectionChange(endereco: any): void {
    sessionStorage.setItem('endEntrega', JSON.stringify(endereco));
    this.openSnackBar()
  }

  public openSnackBar(): void {
    this.snack.open('você selecionou um endereço!', 'Fechar', {
      duration: 1000
    })
  }

  public getValueProducts(): number {
    sessionStorage.setItem('quantidade', this.productQuanity.toString());
    const vlTotal = this.products.reduce((total, produto) => total + parseFloat(produto.preco.toString()) * this.productQuanity, 0);
    sessionStorage.setItem('subTotal', vlTotal.toString());
    return vlTotal
  }

  public somaVlTotal(): number {
    let number = 0;
    if(this.favoriteSeason === '15,00'){
      number = 15
      sessionStorage.setItem('frete', number.toString())
      const total = this.getValueProducts() + number;
      sessionStorage.setItem('totalValue', total.toString());
      return this.getValueProducts() + number
    } else if (this.favoriteSeason === '30,00'){
      number = 30
      sessionStorage.setItem('frete', number.toString())
      const total = this.getValueProducts() + number;
      sessionStorage.setItem('totalValue', total.toString());
      return this.getValueProducts() + number
    } else if (this.favoriteSeason === '50,00'){
      number = 50
      sessionStorage.setItem('frete', number.toString())
      const total = this.getValueProducts() + number;
      sessionStorage.setItem('totalValue', total.toString());
      return this.getValueProducts() + number
    }

    return number
  }

  public removeItem(productId: any): void {
    let local: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const storage = local.findIndex((product: Product) => product.id === productId);

    if(storage > -1){
      local.splice(storage, 1);

      localStorage.setItem("cart", JSON.stringify(local));

      this.products = [...local];
    }
  }

  updateQuantity(val: string): void {
    if(this.productQuanity <20 && val === 'plus'){
      this.productQuanity+=1;
    } else if (this.productQuanity > 1 && val === 'min') {
      this.productQuanity-=1
    }
  }

public addToCheckout(): void{
  const clienteLogado = sessionStorage.getItem('clienteLogado')

  if(clienteLogado){
    this.router.navigate(['/credit-card'])
  }else {
    this.router.navigate(['login-user'])
  }
}
}
