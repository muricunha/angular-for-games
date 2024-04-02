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
  public message: string[] = [];
  public selectedFiles? : Array<FileList>;
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
      foto: new FormControl('')
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
      });

  }

  // public selectFiles(event: any): void {
  //   this.selectedFiles = [];

  //   if(event.target.files.length === 0){
  //     return;
  //   }

  //   for(let i = 0; i < event.target.files.length; i++){
  //     this.selectedFiles.push(event.target.files[i])
  //     console.log(this.selectedFiles)
  //   }
  // }

  // public uploadFiles(): void{

  //   if(!this.selectedFiles || this.selectedFiles.length === 0){
  //     return;
  //   }

  //   const formData = new FormData();

  //   this.selectedFiles.forEach((f: any) => {
  //     formData.append('foto', f)
  //   })

  //   this.upload(formData)
  // }

  // public upload( file: any): void {
  //   if(file){
  //     this.productService.upload(file).subscribe((event: any) => {
  //     })
  //   }
  // }

  public openSnackBar(): void {
    this.snackBar.open('cadastro feito com sucesso!', 'Fechar')
  }

}
