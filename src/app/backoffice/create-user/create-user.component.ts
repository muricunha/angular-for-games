import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgamesService } from '../forgames.service';
import { ModalCreate } from '../backoffice-create';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  constructor(public service: ForgamesService,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateUserComponent>) {}

  public sendCreate(): void {
      const senha = this.createForm.get('password')?.value ?? '';

      const hashedSenha = btoa(senha);

      const request: ModalCreate = {
        nome: this.createForm.get('nome')?.value ?? '',
        email: this.createForm.get('email')?.value ?? '',
        grupo: this.createForm.get('grupo')?.value ?? '',
        cpf: this.createForm.get('codPerson')?.value ?? '',
        senha: hashedSenha,
      }

      console.log(hashedSenha);

      this.service.cadastro(request).subscribe(()=> {
        this.dialogRef.close();
        this.openSnackBar();
      })
}

public openSnackBar(): void {
this.snackBar.open('cadastro feito com sucesso!', 'Fechar')
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
