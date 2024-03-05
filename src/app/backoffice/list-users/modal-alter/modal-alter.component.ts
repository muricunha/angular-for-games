import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalOptions } from 'src/app/models/alert-confirm.model';

@Component({
  selector: 'app-modal-alter',
  templateUrl: './modal-alter.component.html',
  styleUrls: ['./modal-alter.component.scss']
})
export class ModalAlterComponent {
  public textModal = this.data.dialogMessage

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: ModalOptions,
    private readonly dialogRef: MatDialogRef<ModalAlterComponent>) {
    dialogRef.disableClose = true;
  }
}
