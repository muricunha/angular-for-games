export interface CadastroClienteForm {
  id?: number,
  nome: string,
  email?: string,
  nascimento: string,
  cpf?: string,
  genero: string,
  senha: string,
  endereco?: Array<EnderecoForm>
}

export interface EnderecoForm {
  enderecoId: string,
  logradouro: string,
  cep: string,
  numero: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string
}
export interface CartaoForm {
  nome: string,
  validade: string,
  numero: string,
  seguranca: string,
  parcelas: string
}
export interface LoginCliente {
  email: string,
  senha: string
}
export interface ViewSession {
  id:number,
  nome: string,
  genero: string,
  nascimento: string,
  senha: string,
  cpf: string,
  email:string,
  endereco: Array<EnderecoForm>

}
