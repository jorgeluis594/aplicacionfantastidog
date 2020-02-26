import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PedidoModelId } from 'src/app/models/pedido.modelo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrls: ['./list-pedidos.component.less']
})
export class ListPedidosComponent implements OnInit {

 listpedidos: any[] = [];
 borde: string[] = [];
 fechaHoy = new Date();
  constructor(public _pedidos: PedidosService ) {


    this._pedidos.listPedidos()
                    .subscribe( (pedidos: any[]) => {
                      this.listpedidos = pedidos;
                    } );
   }

   entregarPedido(id: string) {
     this._pedidos.actualizarPedido(id, { estado : 1} );
   }

   async ingresarPago(id: string, nombre: string) {
    const { value: formValues } = await Swal.fire({
      title: `Pago de ${nombre}`,
      html:
      `
      <select id="swal-select1" class="swal2-select" style="display:block;">
      <option value="bcp">Bcp / Yape</option>
      <option value="Bbva">Bbva</option>
      <option value="Interbank">Interbank</option>
      <option value="Efectivo">Efectivo</option>
      </select>
      <input id="swal-input1" class="swal2-input" placeholder="Monto" type="number">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-select1') as HTMLInputElement).value,
          (document.getElementById('swal-input1') as HTMLInputElement).value
        ];
      }
    });

    if (!formValues[0] || !formValues[1]) {
      Swal.fire('Falta ingresar datos');
    }
    const pago = {
      monto: parseInt(formValues[1], 10) ,
      metodo: formValues[0]
    };
    this._pedidos.agregarPago( id , pago );
   }

  ngOnInit(): void {
  }

}