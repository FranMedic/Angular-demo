import { Producto } from "./producto";

export class ItemFactura {
  productor: Producto;
  cantidad: number = 1;
  importe: number;
}
