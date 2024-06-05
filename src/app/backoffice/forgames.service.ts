import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Backoffice, ListOrder, ListOrderForm} from './backoffice';
import { Observable, map } from 'rxjs';
import { ModalAnswer, ModalOptions } from '../models/alert-confirm.model';
import { ModalAlterComponent } from './list-users/modal-alter/modal-alter.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreate } from './backoffice-create';
import {ColaboradorForm} from "./list-users/list-users.component";
import {CadastroClienteForm, CartaoForm} from "../client-area/client-create";
@Injectable({
  providedIn: 'root',
})
export class ForgamesService {
  private readonly API = 'http://localhost:8081';
  constructor(private http: HttpClient, private readonly dialog: MatDialog) {}

  // para tela de editar
  list(colaborador: ColaboradorForm): Observable<Backoffice[]> {
    return this.http.post<Backoffice[]>(`${this.API}/colaborador/listar`, colaborador);
  }

  edit(user: Backoffice): Observable<Backoffice> {
    const url = `${this.API}/colaborador/alterar`;
    return this.http.post<Backoffice>(url, user);
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

  public cadastro(request: ModalCreate): Observable<ModalCreate> {
    const url = `${this.API}/colaborador/salvar`;
    return this.http.post<ModalCreate>(url, request)
  }

  public cadastrarCliente(request: CadastroClienteForm): Observable<CadastroClienteForm> {
    const url = `${this.API}/usuario/salvar`;
    return this.http.post<CadastroClienteForm>(url, request)
  }

  public cadastrarCartao(request: CartaoForm): Observable<CartaoForm> {
    const url = `${this.API}/cartao/salvar`;
    return this.http.post<CartaoForm>(url, request)
  }

  public listOrders(listOrdersForm: ListOrderForm): Observable<ListOrder[]> {
    return this.http.post<ListOrder[]>(`${this.API}/pedido/listarPorNome`, listOrdersForm);
  }
}
