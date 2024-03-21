import { HttpClient, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../backoffice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API = 'http://localhost:8081';
  constructor(public http: HttpClient) { }

  public logar(request: LoginModel): Observable<HttpResponse<LoginModel>> {
    const url = `${this.API}/colaborador/login`;
    return this.http.post<LoginModel>(url, request, {observe: 'response', responseType: 'json'})
  }

}
