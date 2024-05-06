import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCliente, ViewSession } from './client-create';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly API = 'http://localhost:8081';
  constructor(public http: HttpClient) { }

  public logar(request: LoginCliente): Observable<HttpResponse<ViewSession>> {
    const url = `${this.API}/usuario/login`;
    return this.http.post<ViewSession>(url, request, {observe: 'response', responseType: 'json'})
  }
}
