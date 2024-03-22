import { Component } from '@angular/core';
import { Backoffice } from '../backoffice';
import { ForgamesService } from 'src/app/backoffice/forgames.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChangeUsersComponent } from './change-users/change-users.component';
import { ModalOptions } from 'src/app/models/alert-confirm.model';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ChooseScreenComponent } from '../choose-screen/choose-screen.component';
import { CreateUserComponent } from '../create-user/create-user.component';

export interface ColaboradorForm {
  nome: string
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent {

  displayedColumns: string[] = ['nome', 'email', 'status', 'alterar', 'button'];
  public nameChange: string = 'Ativo';
  public isChecked: boolean = true;
  public toggleState: boolean = false;
  public dataSourceList = new MatTableDataSource<Backoffice>();
  constructor(
    private service: ForgamesService,
    public dialog: MatDialog,
    public slide: MatSlideToggle,
    public route: Router,
  ) {}

  ngOnInit() {
  }

  public findUsers() {
    const colaborador = {
      nome: this.listForm.value.nome
    } as ColaboradorForm;

    this.service.list(colaborador).subscribe((listaUsers) => {
      this.dataSourceList.data = listaUsers;
    }, error => {
      this.dataSourceList.data = [];
    });

  }

  public openDialog(value: Backoffice): void {
    this.dialog.open(ChangeUsersComponent,{
      width: '1000px',
      data: value
    });
  }

  public openDialogCreate(): void{
    this.dialog.open(CreateUserComponent, {
      width: '1000px'
    })
  }

  public onSlideToggleChange(event: MatSlideToggleChange): void {
    this.toggleState = event.checked;
    const confirmOption: ModalOptions = {
      dialogMessage: {
        message: 'Deseja Alterar o status do Usuário?',
      },
    };

    this.service.openConfirmModal(confirmOption).subscribe((confirm) => {
      if (confirm.answer === 'yes') {
        this.isChecked = this.toggleState;
        if(this.nameChange === 'Ativo'){
          this.nameChange = 'Inativo';
        } else {
          this.nameChange = 'Ativo'
        }
      } else if (confirm.answer === 'no') {
        event.source.checked = !this.toggleState;
      }
    });
  }

  public listForm = new FormGroup({
    nome: new FormControl('')
  })

}
