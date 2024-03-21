import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
interface Avaliation {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-change-product',
  templateUrl: './change-product.component.html',
  styleUrls: ['./change-product.component.scss']
})
export class ChangeProductComponent {
  star: Avaliation[] = [
    {value: '0.5', viewValue: '0.5'},
    {value: '1', viewValue: '1'},
    {value: '1.5', viewValue: '1.5'},
    {value: '2', viewValue: '2'},
    {value: '2.5', viewValue: '2.5'},
    {value: '3', viewValue: '3'},
    {value: '3.5', viewValue: '3.5'},
    {value: '4', viewValue: '4'},
    {value: '4.5', viewValue: '4.5'},
    {value: '5', viewValue: '5'},
  ];
  public isChecked: boolean = false;
  public productForm: FormGroup = this.initialForm;
  constructor(
    private readonly formBuilder: FormBuilder,
    private serviceProduct: ProductService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ChangeProductComponent>,
    public snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product,
    ) {}

    public changeProduct(){
      const request: Product = {
        id: this.data.id,
        codigoProduto: this.productForm.get('codProduto')?.value,
        nome: this.productForm.get('produto')?.value,
        avaliacao: this.productForm.get('avaliacao')?.value,
        descricao: this.productForm.get('description')?.value,
        preco: this.productForm.get('preco')?.value,
        qtdEstoque: this.productForm.get('estoque')?.value,
      }
      debugger;
      this.serviceProduct.editProduto(request).subscribe((r)=> {
        console.log(request);
        this.dialogRef.close();
        this.openSnackBar();
      })
    }

    public openSnackBar(): void {
      this.snackBar.open('edição feita com sucesso!', 'Fechar')
    }


    private get initialForm(): FormGroup {
      return this.productForm = this.formBuilder.group({
      codProduto: new FormControl(this.data.codigoProduto, [Validators.required]),
      produto: new FormControl(this.data.nome, [Validators.required]),
      avaliacao: new FormControl(this.data.avaliacao, [Validators.required]),
      description: new FormControl(this.data.descricao, [Validators.required]),
      preco: new FormControl(this.data.preco, [Validators.required]),
      estoque: new FormControl(this.data.qtdEstoque, [Validators.required]),
      })
    }
}
