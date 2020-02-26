import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PedidosService } from 'src/app/services/pedidos.service';


@Component({
  selector: 'app-formulariopedido',
  templateUrl: './formulariopedido.component.html',
  styleUrls: ['./formulariopedido.component.less']
})
export class FormulariopedidoComponent implements OnInit {

  formulario: FormGroup;
  constructor( private _pedidoservice: PedidosService,
                ) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      'nombredueno': new FormControl('', Validators.required),
      'nombremascota': new FormControl('', Validators.required),
      'pack': new FormControl('', Validators.required),
      'tematica': new FormControl('', Validators.required),
      'sabor': new FormControl('', Validators.required),
      'gorrito': new FormControl('', Validators.required),
      'diseno': new FormControl('', Validators.required),
      'costo': new FormControl('', Validators.required),
      'observaciones': new FormControl(''),
      'fechaentrega': new FormControl('', Validators.required)
    })

    this.formulario.controls.tematica.valueChanges.subscribe( val =>{
      this.formulario.controls.gorrito.setValue(val); 
      this.formulario.controls.diseno.setValue(val);
    });
  }

  guardarCambios() {

    if (this.formulario.status === 'VALID') {
    this._pedidoservice.crearPedido({
      nombredueno: this.formulario.value.nombredueno,
      nombremascota: this.formulario.value.nombremascota,
      pack: this.formulario.value.pack,
      tematica: this.formulario.value.tematica,
      sabor: this.formulario.value.sabor,
      gorrito: this.formulario.value.gorrito,
      diseno: this.formulario.value.diseno,
      costo: this.formulario.value.costo,
      fechapedido: new Date(),
      estado: 0,
      fechaentrega: this.formulario.value.fechaentrega,
      observaciones: this.formulario.value.observaciones
    });
    }
  }

}
