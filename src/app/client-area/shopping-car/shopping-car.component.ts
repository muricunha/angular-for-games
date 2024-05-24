import { Component, Input } from '@angular/core';
import { Product } from 'src/app/backoffice-product/product';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.scss']
})
export class ShoppingCarComponent {
@Input() produto: Product;
public mostrarDiv = false;

favoriteSeason: string;
seasons: string[] = ['Entrega Econômica ------- R$ 15,00',
                    'Entrega Expressa ------- R$ 30,00',
                    'Entrega Agendada ------- R$ 50,00'];

public abrirDiv(): void {
  this.mostrarDiv = true;
}
}
