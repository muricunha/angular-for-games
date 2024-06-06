export interface Backoffice {
  id: number,
  nome: string,
  email: string,
  cpf?: number,
  status: string,
  senha: string
}

export interface LoginModel {
  email: string,
  senha: string
}

export interface LoginView {
  id: number;
  grupo: string;
}

export interface StatusPedido {
  statusPedido: string
}

export interface ListOrder {
  id: number;
  data: string;
  valor: number;
  status: string;
}

export interface ListOrderForm{
  nome: string;
}
