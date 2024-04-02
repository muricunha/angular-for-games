export interface Product {
  id?: number,
  codigoProduto: number,
  nome: string,
  avaliacao: number,
  descricao: string,
  preco: number,
  qtdEstoque: number,
  foto?: any
}

export interface ProductForm {
  nome: string
}
