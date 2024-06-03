import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/backoffice-product/product';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./styles.css']
})
export class ShoppingCarComponent {
@Input() produto: Product[] = [];
public products: Product[] = [];
public productQuanity: number = 1;
favoriteSeason: string;
seasons: string[] = ['15,00','30,00','50,00'];

  constructor(private router: Router){}
  ngOnInit(){
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.products = cart;
    this.getValueProducts();
  }

  public getValueProducts(): number {

    return this.products.reduce((total, produto) => total + parseFloat(produto.preco.toString()) * this.productQuanity, 0);
  }

  public somaVlTotal(): number {

    let number = 0;
    if(this.favoriteSeason === '15,00'){
      number = 15
      return this.getValueProducts() + number
    } else if (this.favoriteSeason === '30,00'){
      number = 30
      return this.getValueProducts() + number
    } else if (this.favoriteSeason === '50,00'){
      number = 50
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
      console.log(this.productQuanity);
    } else if (this.productQuanity > 1 && val === 'min') {
      this.productQuanity-=1
    }
  }

public addToCheckout(): void{
  const clienteLogado = sessionStorage.getItem('clienteLogado')

  if(clienteLogado){
    this.router.navigate(['/inicio'])
  }else {
    this.router.navigate(['login-user'])
  }
}
}
