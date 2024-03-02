import { Component, Input } from '@angular/core';
import { Backoffice } from '../backoffice';
import { ForgamesService } from 'src/app/forgames.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ChangeUsersComponent } from './change-users/change-users.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  displayedColumns: string[] = ['nome', 'email', 'status', 'alterar' , 'button'];
  public returnListUsers!: Backoffice;
  public isChecked: boolean = false;
  public dataSourceList = new MatTableDataSource();
  constructor(
    private service: ForgamesService,
    public dialog: MatDialog
    ) { }

  ngOnInit(){
    this.findUsers();
  }

  public findUsers() {
    this.service.list().subscribe((listaUsers) => {[
      this.dataSourceList.data = listaUsers
    ]})
  }

  public openDialog():void {
    this.dialog.open(ChangeUsersComponent, {
      width: '1000px',
      data: {
        email: this.returnListUsers.email
      }
    });
  }


}
