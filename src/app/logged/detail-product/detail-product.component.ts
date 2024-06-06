import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CaminhoImagem, Product} from 'src/app/backoffice-product/product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent {
  @Input() product: Product;

  public fotoPrincipal: string;
  public fotos: Array<string>;

  constructor(private router: ActivatedRoute) {
  }


  ngOnInit() {
    localStorage.getItem("cart")
    var dadosBrutos = localStorage.getItem("dadosProduto");
    this.product = JSON.parse(dadosBrutos || '');
    this.fotoPrincipal = this.product.caminhoImagem[0].caminho;
    this.fotos = [];
    this.product.caminhoImagem.forEach((imagem: CaminhoImagem) => {
      this.fotos.push(imagem.caminho);
    });
  }

  public alterarFotoPrincipal(indice: number): void {
    this.fotoPrincipal = this.product.caminhoImagem[indice].caminho;
  }

  public addToCart() {
    const produto = {
      nome: this.product.nome,
      avaliacao: this.product.avaliacao,
      descricao: this.product.descricao,
      preco: this.product.preco,
      id: this.product.id,
      caminhoImagem: this.product.caminhoImagem
    }
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const teste = cart.push(produto);
    localStorage.setItem("cart", JSON.stringify(cart));

  }


}
