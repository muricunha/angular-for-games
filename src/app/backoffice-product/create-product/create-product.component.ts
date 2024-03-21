import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Avaliation {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  public createForm: FormGroup;
  star: Avaliation[] = [
    {value: '0,5', viewValue: '0,5'},
    {value: '1', viewValue: '1'},
    {value: '1,5', viewValue: '1,5'},
    {value: '2', viewValue: '2'},
    {value: '2,5', viewValue: '2,5'},
    {value: '3', viewValue: '3'},
    {value: '3,5', viewValue: '3,5'},
    {value: '4', viewValue: '4'},
    {value: '4,5', viewValue: '4,5'},
    {value: '5', viewValue: '5'},
  ];

  constructor(public productService: ProductService,
    private dialogRef: MatDialogRef<CreateProductComponent>,
    private snackBar: MatSnackBar){

  }

  ngOnInit(){
     this.createForm = new FormGroup({
      codProduto: new FormControl('', [Validators.required]),
      produto: new FormControl('', [Validators.required]),
      avaliacao: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      preco: new FormControl('0,00', [Validators.required]),
      estoque: new FormControl('', [Validators.required]),
    })
  }

  public createProduto(): void {
      const request: Product = {
        codigoProduto: this.createForm.get('codProduto')?.value,
        nome: this.createForm.get('produto')?.value,
        avaliacao: this.createForm.get('avaliacao')?.value,
        descricao: this.createForm.get('description')?.value,
        preco: this.createForm.get('preco')?.value,
        qtdEstoque: this.createForm.get('estoque')?.value,
      }
      this.productService.criarProduto(request).subscribe((r)=> {
        console.log(request);
        this.dialogRef.close();
        this.openSnackBar();
      })
  }

  public openSnackBar(): void {
    this.snackBar.open('cadastro feito com sucesso!', 'Fechar')
  }
}
