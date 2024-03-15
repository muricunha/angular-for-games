import { Component, Inject, Input, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ForgamesService } from 'src/app/backoffice/forgames.service';
import { Backoffice } from '../../backoffice';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { __values } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-users',
  templateUrl: './change-users.component.html',
  styleUrls: ['./change-users.component.scss']
})
export class ChangeUsersComponent {

  public isChecked: boolean = false;
  public backofficeForm: FormGroup = this.initialForm;
  constructor(
    private readonly formBuilder: FormBuilder,
    private service: ForgamesService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ChangeUsersComponent>,
    public snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Backoffice,
    ) {}

    ngOnInit(): void {
    }
    public editUsers(): void {

      const senha = this.backofficeForm.get('password')?.value;

      const request: Backoffice = {
        id: this.data.id,
        nome: this.backofficeForm.get('nome')?.value,
        email: this.backofficeForm.get('email')?.value,
        cpf: this.backofficeForm.get('codPerson')?.value,
        status: this.data.status,
        senha: this.backofficeForm.get('password')?.value,
      }
      this.service.edit(request).subscribe(() => {
        this.dialogRef.close();
        this.openSnackBar();
        })
    }

    public openSnackBar(): void {
      this.snackBar.open('alteração feita com sucesso!', 'Fechar')
      }

    private get initialForm(): FormGroup {
      return this.backofficeForm = this.formBuilder.group({
    nome: new FormControl(this.data.nome, [Validators.required]),
    email: new FormControl({value: this.data.email, disabled: true}, [Validators.required]),
    codPerson: new FormControl(this.data.cpf, [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
      })
    }

    public confirmCPF(value: string): boolean {
      return this.confirmDocument(value);
    }

    public confirmDocument(value:string): boolean {
      const isValid = this.validateDocument(this.backofficeForm.get(value)?.value);
      if(isValid === false) {

        this.backofficeForm.get(value)?.setErrors({'invalid': true})
        return true
      } else if (isValid === true){
        return this.backofficeForm.get(value)?.valid ?? false;
      }
      return isValid === true && !!this.backofficeForm.get(value)?.valid;
    }

    public validateDocument(document: string): boolean {
      if (document.length !== 11) {
        return false;
      }
        try {
          if(document.length !== 11 || !Array.from(document)
          .filter((e) => e !== document[0]).length){
            return false
          }
          let total: number;
          let rest: number;
          const strCPF = document.replace('-', '')
          .replace('.', '')
          .replace('.', '')
          total = 0;
          if(strCPF === '00000000000')return false;

          for (let i=1; i<=9; i++) total = total + parseInt(strCPF.substring(i-1, i)) * (11 - i);
          rest = (total * 10) % 11;

          if ((rest == 10) || (rest == 11))  rest = 0;
          if (rest != parseInt(strCPF.substring(9, 10)) ) return false;

          total = 0;
          for (let i = 1; i <= 10; i++) total = total + parseInt(strCPF.substring(i-1, i)) * (12 - i);
          rest = (total * 10) % 11;

          if ((rest == 10) || (rest == 11))  rest = 0;
          if (rest != parseInt(strCPF.substring(10, 11) ) ) return false;
          return true;
        } catch(e) {
          return false;
        }
      }
  }

