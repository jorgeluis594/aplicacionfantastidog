import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PedidoModel, PedidoModelId } from 'src/app/models/pedido.modelo';

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.less']
})
export class ListPedidosComponent implements OnInit {

 listpedidos: PedidoModelId[] = [];

  constructor(public _pedidos: PedidosService ) {
    this._pedidos.listPedidos()
                    .subscribe( (pedidos: PedidoModelId[]) => {
                      this.listpedidos = pedidos;
                    } );
   }


  ngOnInit(): void {
  }

}