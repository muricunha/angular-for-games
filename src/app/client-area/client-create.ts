export interface CadastroClienteForm {
  nome: string,
  email: string,
  cpf: string,
  genero: string,
  senha: string,
  endereco: Array<EnderecoForm>
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

export interface LoginCliente {
  email: string,
  senha: string
}

export interface ViewSession {
  id:number;
  nome: string
}
