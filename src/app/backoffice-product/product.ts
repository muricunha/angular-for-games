export interface Product {
  id?: number,
  codigoProduto: number,
  nome: string,
  avaliacao: number,
  descricao: string,
  preco: number,
  qtdEstoque: number,
  caminhoImagem: string,
}

export interface ProductForm {
  nome: string
}

export interface Imagem {
  imagem: File | string
}
