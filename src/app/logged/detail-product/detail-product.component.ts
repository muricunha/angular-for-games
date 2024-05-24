import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/backoffice-product/product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent {
@Input() product: Product
  constructor(private router: ActivatedRoute){}
  public title: string = '';
  public avaliacao: string = '';
  public descricao: string = '';
  public preco: string = '';
  public id: number;
  ngOnInit(){
    this.router.params.subscribe(params => {
      this.title = params['nome']
      this.avaliacao = params['avaliacao']
      this.descricao = params['descricao']
      this.preco = params['preco']
      this.id = params['id']
    })
  }

  public addToCart():void {
  const local =  localStorage.setItem("cart", JSON.stringify({
      title: this.title,
      avaliacao: this.avaliacao,
      descricao: this.descricao,
      preco: this.preco,
      id: this.id
    }));

  }


}
