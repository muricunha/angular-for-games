import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ForgamesService} from '../forgames.service';
import {ModalCreate} from '../backoffice-create';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';
import {MatDialogRef} from '@angular/material/dialog';

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
  isValid: boolean = false;
  isInvalid: boolean = false;
  isCpfValid: boolean = false;
  public createForm: FormGroup;
  grupo: Grupo[] = [
    {value: 'ADMIN', viewValue: 'administrador'},
    {value: 'ESTOQ', viewValue: 'estoquista'},
  ];

  constructor(public service: ForgamesService,
              public snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<CreateUserComponent>) {
  }

  ngOnInit() {
    this.createForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [Validators.required]),
      grupo: new FormControl('', [Validators.required]),
      codPerson: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  public sendCreate(): void {

    const senha = this.createForm.get('password')?.value;

    let encriptSenha = CryptoJS.SHA256(senha).toString();

    if (this.isCpfValid) {
      const request: ModalCreate = {
        nome: this.createForm.get('nome')?.value,
        email: this.createForm.get('email')?.value,
        grupo: this.createForm.get('grupo')?.value,
        cpf: this.createForm.get('codPerson')?.value,
        senha: encriptSenha,
      }
      this.service.cadastro(request).subscribe((r) => {
        console.log(request)
        this.dialogRef.close();
        this.openSnackBar();
      })
    }
  }

  public openSnackBar(): void {
    this.snackBar.open('cadastro feito com sucesso!', 'Fechar', {
      duration: 4000
    })
  }

  public testaCPF(cpf: string): boolean {
    var soma
    var resto
    soma = 0
    var i
    if (cpf === "00000000000") return false

    for (i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11

    if ((resto === 10) || (resto === 11)) resto = 0
    if (resto !== parseInt(cpf.substring(9, 10))) return false

    soma = 0
    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11

    if ((resto === 10) || (resto === 11)) resto = 0
    if (resto !== parseInt(cpf.substring(10, 11))) return false
    return true
  }

  public checkIsCpfValid() {
    const cpf = this.createForm.get('codPerson')?.value ?? '';

    if (cpf === '') {
      this.isValid = false;
      this.isInvalid = false;
      return;
    }

    this.isCpfValid = this.testaCPF(cpf);

    if (this.isCpfValid) {
      this.isValid = true;
      this.isInvalid = false;
    } else {
      this.isValid = false;
      this.isInvalid = true;
    }
  }

}
