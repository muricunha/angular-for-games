import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from 'src/app/backoffice-product/product';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent {
  @Input() product: Product;

constructor(private router: Router){}

// public openDetailProduct(product: Product): void {
//   this.router.navigate(['/produto', product])
// }

  gravaParametrosStorage() {
  let dadosProduto = JSON.stringify(this.product);
  localStorage.setItem('dadosProduto', dadosProduto);
  }
}
