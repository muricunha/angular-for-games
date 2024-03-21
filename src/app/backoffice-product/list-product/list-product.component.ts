import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ModalOptions } from 'src/app/models/alert-confirm.model';
import { ForgamesService } from 'src/app/backoffice/forgames.service';
import { ChangeProductComponent } from '../change-product/change-product.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent {
  public listProduct: FormGroup
  public nameChange: string = 'Ativo';
  public isChecked: boolean = true;
  public toggleState: boolean = false;
  public dataSourceList = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['codigoProduto', 'nome', 'avaliacao', 'descricao', 'preco', 'qtdEstoque', 'alterar', 'status', 'button'];
  constructor(private dialog: MatDialog,
              private service: ForgamesService,
              private serviceProduct: ProductService,){
  }

  ngOnInit(){
    this.listProduct = new FormGroup({
      nome: new FormControl('')
    })
  }

  public findProduct() {
    const emailSearch = this.listProduct.value.nome;
    this.serviceProduct.listProduct().subscribe((listProduct) => {
      const filterUsers = listProduct.filter(user => user.nome === emailSearch)
      this.dataSourceList.data = filterUsers;
    });
  }

  public openDialogCreate(): void{
    this.dialog.open(CreateProductComponent, {
      width: '1000px'
    })
  }

  public openDialog(value: Product): void {
    this.dialog.open(ChangeProductComponent,{
      width: '1000px',
      data: value
    });
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
}
