import { Component, Input, Output, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgamesService } from 'src/app/forgames.service';
import { Backoffice } from '../../backoffice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-users',
  templateUrl: './change-users.component.html',
  styleUrls: ['./change-users.component.scss']
})
export class ChangeUsersComponent {

  backoffice: Backoffice = {
    id: 0,
    nome: '',
    email: '',
    status: ''
  }

  public isChecked: boolean = false;
  constructor(
    private service: ForgamesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

    }

  public backofficeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl({value: '' , disabled: true}, [Validators.required]),
    codPerson: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  })


}
