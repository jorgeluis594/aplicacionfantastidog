import { Injectable } from '@angular/core';
import { PedidoModel } from '../models/pedido.modelo';
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
                 //this.itemsCollection = this.firestore.collection(this.basedatos);
   }

  listPedidos() {
  
    this.itemsCollection = this.firestore.collection(this.basedatos, ref => ref.where("estado","==",0)
                                                                               .orderBy("fechaentrega","asc")
                                                                               .limit(16));

   return  this.itemsCollection.snapshotChanges().pipe(
     map( datos => datos.map( a => {
       const data = a.payload.doc.data() as PedidoModel;
       const id = a.payload.doc.id;
       return { id, ...data };
     } ) )
   );
  }

  crearPedido ( pedido: PedidoModel ){
    this.itemsCollection.add(pedido).then( ()=>{
      Swal.fire({
      icon: 'success',
      title: `Se ingreso pedido de ${pedido.nombremascota}`,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 1500
      }).finally( () =>{
        
      this._router.navigate(['./list']);
      } );
    });
    
    
  }
}
