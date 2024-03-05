import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Backoffice } from './backoffice/backoffice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgamesService {

  private readonly API = 'http://localhost:3000/perfil';
  constructor(private http: HttpClient) { }


  list(): Observable<Backoffice[]>{
    return this.http.get<Backoffice[]>(this.API);
  }

  edit(user: Backoffice): Observable<Backoffice>{
    const url = `${this.API}/${user.id}`
    return this.http.put<Backoffice>(url, user)
  }

  buscarPorId(id: number): Observable<Backoffice>{
    const url = `${this.API}/${id}`
    return this.http.get<Backoffice>(url)

  }
}
