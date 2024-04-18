import { Component, ViewChild, OnInit } from '@angular/core';
import { Backoffice } from '../backoffice';
import { ForgamesService } from 'src/app/backoffice/forgames.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChangeUsersComponent } from './change-users/change-users.component';
import { ModalOptions } from 'src/app/models/alert-confirm.model';
import {MatSlideToggle, MatSlideToggleChange,} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateUserComponent } from '../create-user/create-user.component';

export interface ColaboradorForm {
  nome: string
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent  implements OnInit {

  displayedColumns: string[] = ['nome', 'email', 'status', 'alterar', 'button'];
  public nameChange: string = 'Ativo';
  public isChecked: boolean = true;
  public toggleState: boolean = false;
  public isActive: boolean = false;
  public dataSourceList = new MatTableDataSource<Backoffice>();
  constructor(
    private service: ForgamesService,
    public dialog: MatDialog,
    public route:     Router,
  ) {}

  @ViewChild('slideToggle') slideToggle: MatSlideToggle;

  ngOnInit() {
    this.findUsers();
  }


  public findUsers() :void {
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

    const confirmOption: ModalOptions = {
      dialogMessage: {
        message: 'Deseja Alterar o status do Usuário?',
      },
    };

    this.service.openConfirmModal(confirmOption).subscribe((confirm) => {
      if (confirm.answer === 'yes') {
        this.isActive = this.toggleState;
        if(this.isActive === true){
        this.nameChange = 'Ativo'
        } else {
          this.nameChange = 'Inativo'
        }
      } else if (confirm.answer === 'no') {
        event.source.checked = !this.toggleState;

      }
    });
  }
  public listForm = new FormGroup({
    nome: new FormControl('')
  });
}
