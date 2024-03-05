import { Component, Input, ViewChild } from '@angular/core';
import { Backoffice } from '../backoffice';
import { ForgamesService } from 'src/app/forgames.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChangeUsersComponent } from './change-users/change-users.component';
import { ModalOptions } from 'src/app/models/alert-confirm.model';
import { BackofficeService } from '../backoffice.service';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent {
 @Input() backoffice: Backoffice = {
    id: 1,
    nome: 'eewew',
    email: 'wewew',
    status: 'wewewe'
 }
  displayedColumns: string[] = ['nome', 'email', 'status', 'alterar', 'button'];
  public nameChange: string = 'Ativo';
  public isChecked: boolean = true;
  public toggleState: boolean = false;
  public dataSourceList = new MatTableDataSource();
  constructor(
    private service: ForgamesService,
    private modalService: BackofficeService,
    public dialog: MatDialog,
    public slide: MatSlideToggle,
    public route: Router
  ) {}

  ngOnInit() {
    this.findUsers();
  }

  public findUsers() {
    this.service.list().subscribe((listaUsers) => {
      this.dataSourceList.data = listaUsers;
    });
  }

  public openDialog(): void {
    this.dialog.open(ChangeUsersComponent, {
      width: '1000px',
    });
  }

  public onSlideToggleChange(event: MatSlideToggleChange): void {
    this.toggleState = event.checked;
    console.log(event.checked)
    const confirmOption: ModalOptions = {
      dialogMessage: {
        message: 'Deseja Alterar o status do Usuário?',
      },
    };

    this.modalService.openConfirmModal(confirmOption).subscribe((confirm) => {
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


}
