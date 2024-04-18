export interface CadastroClienteForm {
  nome: string,
  email: string,
  grupo: string,
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
