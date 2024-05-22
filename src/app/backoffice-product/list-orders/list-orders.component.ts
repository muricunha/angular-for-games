import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatDialog } from '@angular/material/dialog';
import { Product, ProductForm } from '../product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ModalOptions } from 'src/app/models/alert-confirm.model';
import { ForgamesService } from 'src/app/backoffice/forgames.service';
import { ChangeProductComponent } from '../change-product/change-product.component';
import { ProductService } from '../product.service';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
})


export class ListOrdersComponent {
  public listProduct: FormGroup
  public nameChange: string = 'Ativo';
  public isChecked: boolean = true;
  public toggleState: boolean = false;
  public isActive: boolean = false;

  public dataSourceList = new MatTableDataSource<Product>();
  displayedColumns: string[] = [
    'codigoProduto',
    'nome',
    'avaliacao',
    'preco',
    'qtdEstoque',
    'alterar',
    'status',
    'button',
  ];

  constructor(
    private dialog: MatDialog,
    private service: ForgamesService,
    private serviceProduct: ProductService,
    private authenticationService: AuthenticationService
  ) {}
  user$ = this.authenticationService.getUser();

  ngOnInit() {
    this.listProduct = new FormGroup({
      nome: new FormControl(''),
    });
    this.findProduct();
  }

  public findProduct() {
    const nomeProduto = this.listProduct.value.nome;
    const productForm = {
      nome: nomeProduto,
    } as ProductForm;

    this.serviceProduct.listProduct(productForm).subscribe(
      (listProduct) => {
        this.dataSourceList.data = listProduct;
      },
      (error) => {
        this.dataSourceList.data = [];
      }
    );
  }

  public openDialogCreate(): void {
    this.dialog.open(CreateProductComponent, {
      width: '1000px',
    });
  }

  public openDialog(value: Product): void {
    this.dialog.open(ChangeProductComponent, {
      width: '1000px',
      data: value,
    });
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
        if (this.isActive === true) {
          this.nameChange = 'Ativo';
        } else {
          this.nameChange = 'Inativo';
        }
      } else if (confirm.answer === 'no') {
        event.source.checked = !this.toggleState;
      }
    });
  }
}
