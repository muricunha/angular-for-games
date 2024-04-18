import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  public createForm: FormGroup;

  ngOnInit(){
    this.createForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      nascimento: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      endereco: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      complemento: new FormControl('', [Validators.required]),
      bairro: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),

    })
  }
}
