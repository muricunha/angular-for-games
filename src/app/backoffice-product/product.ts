export interface Product {
  id?: number,
  codigoProduto: number,
  nome: string,
  avaliacao: number,
  descricao: string,
  preco: number,
  qtdEstoque: number,
  caminhoImagem: Array<CaminhoImagem>
}

export interface ProductForm {
  nome: string
}

export interface Imagem {
  imagem: File | string
}

export interface CaminhoImagem {
  caminho: string
}
