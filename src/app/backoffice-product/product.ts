export interface Product {
  id?: number,
  codigoProduto: number,
  nome: string,
  avaliacao: number,
  descricao: string,
  preco: number,
  qtdEstoque: number
}

export interface ProductForm {
  nome: string
}
