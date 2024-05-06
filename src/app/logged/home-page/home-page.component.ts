import { Component } from '@angular/core';
import { Product } from 'src/app/backoffice-product/product';
import { ProductService } from 'src/app/backoffice-product/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
 public products: Product[] = [];

 constructor(private httpProduct: ProductService){}

 ngOnInit(){
  this.searchProducts();
 }

 public searchProducts(): void{
  this.httpProduct.listProducts().subscribe((data) => {
    this.products = data;
  },
  (error) => {
    console.error('ERRO AO BUSCAR PRODUTOS', error)
  }
  );
 }
}
