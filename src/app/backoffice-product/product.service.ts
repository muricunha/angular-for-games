import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Product, ProductForm} from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = 'http://localhost:8081';
  constructor(private http: HttpClient) { }

  editProduto(user: Product): Observable<Product> {
    const url = `${this.API}/produto/alterar`;
    return this.http.post<Product>(url, user);
  }

  listProduct(productForm: ProductForm): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.API}/produto/listar`, productForm);
  }

  public criarProduto(request: Product): Observable<Product> {
    const url = `${this.API}/produto/salvar`;
    return this.http.post<Product>(url, request)
  }

  public upload(file: FileList): Observable<HttpEvent<any>> {
    const url = new HttpRequest ('POST', `${this.API}/produto/salvar`, file, {
      responseType: 'json'
    });
    return this.http.request(url)
  }

}
