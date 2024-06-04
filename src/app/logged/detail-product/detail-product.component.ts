import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/backoffice-product/product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent {
@Input() product: Product[] = [];

public products: Product[] = []
  constructor(private router: ActivatedRoute){}
  public nome: string = '';
  public avaliacao: string = '';
  public descricao: string = '';
  public preco: string = '';
  public id: number;
  public caminhoImagem: string;
  ngOnInit(){
    localStorage.getItem("cart")
    this.router.params.subscribe(params => {
      this.nome = params['nome']
      this.avaliacao = params['avaliacao']
      this.descricao = params['descricao']
      this.preco = params['preco']
      this.id = params['id']
      this.caminhoImagem = params['caminhoImagem']
    })
  }

  public addToCart() {
    const produto = {
      nome: this.nome,
      avaliacao: this.avaliacao,
      descricao: this.descricao,
      preco: this.preco,
      id: this.id,
      caminhoImagem: this.caminhoImagem
    }
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const teste = cart.push(produto);

    console.log(teste);

    localStorage.setItem("cart", JSON.stringify(cart));

  }


}
