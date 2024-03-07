import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgamesService } from '../forgames.service';
import { ModalCreate } from '../backoffice-create';
interface Grupo {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  grupo: Grupo[] = [
    {value: 'Administrador', viewValue: 'administrador'},
    {value: 'estoquista', viewValue: 'estoquista'},
  ];



  constructor(public service: ForgamesService) {}

  public sendCreate(): void {
    if(this.createForm.get('password')?.value === this.createForm.get('confirmPassword')?.value){
      const request: ModalCreate = {
        nome: this.createForm.get('nome')?.value ?? '',
        email: this.createForm.get('email')?.value ?? '',
        grupo: this.createForm.get('grupo')?.value ?? '',
        cpf: this.createForm.get('codPerson')?.value ?? '',
        senha: this.createForm.get('password')?.value ?? '',
      }

      this.service.cadastro(request).subscribe((r)=> {
        console.log(r);
      })
    }
}

  public createForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', [Validators.required]),
    grupo: new FormControl('', [Validators.required]),
    codPerson: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  })
}
