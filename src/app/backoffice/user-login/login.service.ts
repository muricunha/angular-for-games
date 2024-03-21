import { HttpClient, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoginModel, LoginView} from '../backoffice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API = 'http://localhost:8081';
  constructor(public http: HttpClient) { }

  public logar(request: LoginModel): Observable<HttpResponse<LoginView>> {
    const url = `${this.API}/colaborador/login`;
    return this.http.post<LoginView>(url, request, {observe: 'response', responseType: 'json'})
  }

}
