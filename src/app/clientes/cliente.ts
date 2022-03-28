import { Factura } from "../facturas/models/factura";
import { Region } from "./region";

export class Cliente {
  id: number;
  name: string;
  surname: string;
  photo: string;
  createAt: string;
  region: Region;
  facturas: Array<Factura> = [];
}
