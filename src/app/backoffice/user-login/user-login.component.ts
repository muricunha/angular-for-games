import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../backoffice';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {


    public submit(): void {

    }


  public createForm = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  })
}
