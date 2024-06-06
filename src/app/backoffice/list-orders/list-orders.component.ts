import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ForgamesService} from 'src/app/backoffice/forgames.service';
import {AuthenticationService} from 'src/app/auth/authentication.service';
import {ListOrder, ListOrderForm, StatusPedido} from "../backoffice";

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
  public listOrders: FormGroup
  public formStatus: FormGroup

  constructor(
    private serviceListOrders: ForgamesService,
    private authenticationService: AuthenticationService
  ) {
  }

  user$ = this.authenticationService.getUser();

  // MatTableDataSource é uma classe usada para trazer os elementos do back para o html em forma de tabela

  public dataSourceList = new MatTableDataSource<ListOrder>();

  // Displayed Columns declaração dos dos containers (matColumnDef), ambos tem que estar iguais, caso contrário a tela quebra

  displayedColumns: string[] = [
    'numeroPedido',
    'valor',
    'dataPedido',
    'status',
    'envio'
  ];

  // O array do componente mat-select no html

  status: Status [] = [
    {value: 'AGUARDANDO_APROVACAO', viewValue: 'Aguardando aprovação'},
    {value: 'EM_ANDAMENTO', viewValue: 'Em andamento'},
    {value: 'CONCLUIDO', viewValue: 'Concluído'}
  ]

  // Uma boa prática do angular, recurso que possibilita condicionamento de regras ou valores no html, e gerencia o estado inicial de algum atributo

  ngOnInit() {
    this.listOrders = new FormGroup({
      nome: new FormControl(''),
    });

    this.formStatus = new FormGroup ({
      status: new FormControl(this.formStatus.get('status')?.value)
    })
  }

  //Método responsável por criar e enviar a requisição, e recebe uma lista de pedidos

  public findOrders() {
    const nomeCliente = this.listOrders.get('nome')?.value;
    const listOrdersForm = {
      nome: nomeCliente
    }
//Subscribe seria literalmente uma "inscrição" com o controller e qualquer resposta é avisada

    this.serviceListOrders.listOrders(listOrdersForm).subscribe(
      (listOrders) => {
        console.log(listOrders);
        this.dataSourceList.data = listOrders
      },
      (error) => {
        this.dataSourceList.data = [];
      }
    );
  }

  public addOrderList(): void {
    const formStatus: StatusPedido = {
      statusPedido: this.formStatus.get('status')?.value
    }

    console.log(formStatus);

    this.serviceListOrders.getNewOrderList(formStatus).subscribe((value) => {

    })
  }
}
