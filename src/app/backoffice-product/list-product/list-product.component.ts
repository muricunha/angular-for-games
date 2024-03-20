import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent {

  constructor(private dialog: MatDialog){

  }

  public openDialogCreate(): void{
    this.dialog.open(CreateProductComponent, {
      width: '1000px'
    })
  }

  public listProduct = new FormGroup({
    nome: new FormControl('')
  })
}
