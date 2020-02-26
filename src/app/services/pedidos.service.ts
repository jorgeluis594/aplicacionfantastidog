import { Injectable } from '@angular/core';
import { PedidoModel, PedidoModelId, Pago } from '../models/pedido.modelo';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private basedatos = 'Pedidos';



  private itemsCollection: AngularFirestoreCollection<PedidoModel>;
  constructor(private firestore: AngularFirestore,
              private _router: Router ) {

                // por mejorar
                 // this.itemsCollection = this.firestore.collection(this.basedatos);
   }

  listPedidos() {

    this.itemsCollection = this.firestore.collection(this.basedatos, ref => ref.where('estado', '==' , 0)
                                                                               .orderBy('fechaentrega', 'asc')
                                                                               .limit(16));

    return  this.itemsCollection.snapshotChanges().pipe(
     map( datos => datos.map( a => {
       const data = a.payload.doc.data() as PedidoModel;
       const id = a.payload.doc.id;
       let borde = '';
       if( data.fechaentrega.toDate() <= new Date() ) {
            borde = 'rojo';
       }
       return { id, borde, ...data };
     } ) )
   );
  }

  detallesPedidos(id: string) {
   return  this.firestore.collection(this.basedatos).doc(id).get()
   .pipe(
     map( a => {
       if (a) {
        const data = a.data() as PedidoModel;
        const id = a.id;
        return {id, ...data};
      }

     })
   ).toPromise();
  }

  crearPedido( pedido: PedidoModel ) {
    this.itemsCollection.add(pedido).then( () => {
      Swal.fire({
      icon: 'success',
      title: `Se ingreso pedido de ${pedido.nombremascota}`,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 1500
      }).then( () => {

      this._router.navigate(['./list']);
      } );
    });

  }

  actualizarPedido( id: string, pedido: any ) {

    this.firestore.collection(this.basedatos).doc(id).update(pedido).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Se actualizo pedido',
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 1500
      });
    });
  }

  async agregarPago(id: string, pago: Pago) {
    let pedido: PedidoModelId;
    let total = 0;
    await this.detallesPedidos(id).then((data: PedidoModelId) => pedido = data );
    if (pedido.pagos) {

      pedido.pagos.map(data => {total = total + data.monto; });
      if ( total + pago.monto > pedido.costo ) {
        Swal.fire('Monto supera el costo');
      } else {
        const pagos = pedido.pagos;
        pagos.push(pago);
        this.firestore.collection(this.basedatos).doc(id).update({pagos}).then(() => {
          Swal.fire('Pago registrado');
        });
      }
    } else {
      if (pago.monto > pedido.costo) {
        Swal.fire('Monto supera el costo');
      } else {
        this.firestore.collection(this.basedatos).doc(id).update({pagos: [pago]}).then(() => {
          Swal.fire('Pago registrado');
        });
      }
    }
  }

}
