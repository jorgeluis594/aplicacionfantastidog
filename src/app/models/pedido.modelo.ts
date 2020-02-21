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
    fechapedido: Date;
    fechaentrega: Date;
    observaciones: string;
    pago?: any[];
    }

export interface PedidoModelId extends PedidoModel {
    id: string;
}
