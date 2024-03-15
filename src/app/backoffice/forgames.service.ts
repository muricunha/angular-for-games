import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Backoffice } from './backoffice';
import { Observable, map } from 'rxjs';
import { ModalAnswer, ModalOptions } from '../models/alert-confirm.model';
import { ModalAlterComponent } from './list-users/modal-alter/modal-alter.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreate } from './backoffice-create';
@Injectable({
  providedIn: 'root',
})
export class ForgamesService {
  private readonly API = 'http://localhost:8081';
  constructor(private http: HttpClient, private readonly dialog: MatDialog) {}

  // para tela de editar
  list(): Observable<Backoffice[]> {
    return this.http.get<Backoffice[]>(`${this.API}/colaborador/listar`);
  }

  edit(user: Backoffice): Observable<Backoffice> {
    const url = `${this.API}/colaborador/alterar`;
    return this.http.put<Backoffice>(url, user);
  }

  buscarPorId(id: number): Observable<Backoffice> {
    const url = `${this.API}/${id}`;
    return this.http.get<Backoffice>(url);
  }

  public openConfirmModal(option: ModalOptions): Observable<ModalAnswer> {
    const dialogRef = this.dialog.open(ModalAlterComponent, {
      minWidth: '370px',
      minHeight: '250px',
      data: option,
    });
    return dialogRef.afterClosed().pipe(
      map((result: string) => ({
        answer: result,
      }))
    );
  }

  // para tela de cadastrar
  public cadastro(request: ModalCreate): Observable<ModalCreate> {
    const url = `${this.API}/colaborador/salvar`;
    return this.http.post<ModalCreate>(url, request)
  }
}
