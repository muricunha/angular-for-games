import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAnswer, ModalOptions } from '../models/alert-confirm.model';
import { Observable, map } from 'rxjs';
import { ModalAlterComponent } from './list-users/modal-alter/modal-alter.component';

@Injectable({
  providedIn: 'root'
})
export class BackofficeService {
  public shouldChangeEvent: boolean  = true;
  constructor(private readonly dialog: MatDialog) { }

  public openConfirmModal(option: ModalOptions): Observable<ModalAnswer>{
    const dialogRef = this.dialog.open(
      ModalAlterComponent,
      {
        minWidth: '370px',
        minHeight: '250px',
        data: option,
      }
    );
    return dialogRef
    .afterClosed()
    .pipe(
      map((result: string) =>
      ({
        answer: result,

      }))
    )
  }
}

