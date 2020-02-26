export interface Pago {
  monto: number;
  metodo: string;
}
export interface PedidoModel {
    nombredueno: string;
    nombremascota: string;
    pack: string;
    tematica: string;
    sabor: string;
    gorrito: string;
    diseno: string;
    costo: number;
    estado: number;
    fechapedido: any;
    fechaentrega: any;
    observaciones: string;
    pagos?: Pago[];
    }

export interface PedidoModelId extends PedidoModel {
    id: string;
}
