import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ForgamesService } from 'src/app/backoffice/forgames.service';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import {ListOrder, ListOrderForm} from "../backoffice";

interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
})


export class ListOrdersComponent {
  public listOrders : FormGroup


  public dataSourceList = new MatTableDataSource<ListOrder>();
  displayedColumns: string[] = [
    'numeroPedido',
    'valor',
    'dataPedido',
    'status'
  ];

  status: Status [] = [
    {value: 'AGUARDANDO_APROVACAO', viewValue:'Aguardando aprovação'},
    {value: 'EM_ANDAMENTO', viewValue:'Em andamento'},
    {value: 'CONCLUIDO', viewValue:'Concluído'}
  ]

  constructor(
    private serviceListOrders: ForgamesService,
    private authenticationService: AuthenticationService
  ) {}
  user$ = this.authenticationService.getUser();

  ngOnInit() {
    this.listOrders = new FormGroup({
      nome: new FormControl(''),
    });
    this.findOrders();
  }

  public findOrders() {
    const nomeCliente = this.listOrders.value.nome;
    const listOrdersForm = {
      nome: nomeCliente,
    } as ListOrderForm;

    this.serviceListOrders.listOrders(listOrdersForm).subscribe(
      (listOrders) => {
        this.dataSourceList.data = listOrders;
      },
      (error) => {
        this.dataSourceList.data = [];
      }
    );
  }
}
