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

  gravaParametrosStorage() {
  let dadosProduto = JSON.stringify(this.product);
  localStorage.setItem('dadosProduto', dadosProduto);
  }
}
