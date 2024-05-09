import { Component, Inject, Input, Optional } from '@angular/core';
import { ClientService } from '../client.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CadastroClienteForm } from '../client-create';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-client',
  templateUrl: './change-client.component.html',
  styleUrls: ['./change-client.component.scss']
})
export class ChangeClientComponent {
  public formClient: FormGroup = this.iniciaForm;
  @Input() dados: CadastroClienteForm;
  constructor(
    private clientService: ClientService,
    private readonly formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public client: CadastroClienteForm
  ){
  }

  ngOnInit(){
    console.log(this.dados)

  }
  public editUsers(): void {

    const request: CadastroClienteForm = {
      nome: this.formClient.get('nome')?.value,
      nascimento: this.formClient.get('nascimento')?.value,
      genero: this.formClient.get('genero')?.value,
      senha: this.formClient.get('senha')?.value,
    }
    this.clientService.edit(request).subscribe(() => {

      this.openSnackBar();
      })
  }

  public openSnackBar(): void {
    this.snackBar.open('alteração feita com sucesso!', 'Fechar')
    }

  private get iniciaForm(): FormGroup {
    return this.formClient = this.formBuilder.group({
  nome: new FormControl(''),
  nascimento: new FormControl(''),
  genero: new FormControl(''),
  senha: new FormControl(''),
    })
  }

}
