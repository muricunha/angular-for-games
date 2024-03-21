import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
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

  listProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/produto/listar`);
  }

  public criarProduto(request: Product): Observable<Product> {
    const url = `${this.API}/produto/salvar`;
    return this.http.post<Product>(url, request)
  }
}
