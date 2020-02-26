import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { PedidoModelId } from '../../models/pedido.modelo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detallespedido',
  templateUrl: './detallespedido.component.html',
  styleUrls: ['./detallespedido.component.less']
})
export class DetallespedidoComponent implements OnInit {


  pedido: PedidoModelId;
  constructor(private _pedidos: PedidosService, private route: ActivatedRoute) {
    let id: string;
    this.route.params.subscribe( params => id = params.id );
    this._pedidos.detallesPedidos(id)
                           .then((data: PedidoModelId) => this.pedido = data);
  }

  ngOnInit(): void {
  }

}
