export interface Backoffice {
  id: number,
  nome: string,
  email: string,
  cpf?: number,
  status: string,
  senha: string
}

export interface LoginModel{
  email: string,
  senha: number
}
