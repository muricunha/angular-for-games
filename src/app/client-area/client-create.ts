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
  endereco: string,
  cep: string,
  numero: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string
}

<<<<<<< HEAD
export interface CartaoForm {
  nome: string,
  validade: string,
  numero: string,
  seguranca: string
=======
export interface LoginCliente {
  email: string,
  senha: string
}

export interface ViewSession {
  id:number;
  nome: string
>>>>>>> f4db85e7cd9b2c0137846be2cd2adf93266f8091
}
