import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { ActivatedRoute, Router } from "@angular/router";
import { flatMap, map, mergeMap, Observable, startWith } from "rxjs";
import { ClienteService } from "src/app/clientes/cliente.service";
import Swal from "sweetalert2";
import { Factura } from "../models/factura";
import { ItemFactura } from "../models/item-factura";
import { Producto } from "../models/producto";
import { FacturasService } from "../services/facturas.service";

@Component({
  selector: "app-create-factura",
  templateUrl: "./create-factura.component.html",
  styleUrls: ["./create-factura.component.css"],
})
export class CreateFacturaComponent implements OnInit {
  titulo: string = "Nueva Factura";
  factura: Factura = new Factura();

  autoCompleteControl = new FormControl();

  productosFiltrados: Observable<Producto[]>;

  constructor(
    private facturasService: FacturasService,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let clienteId = +params.get("clienteId");
      this.clienteService
        .getClienteById(clienteId)
        .subscribe((cliente) => (this.factura.cliente = cliente));
    });

    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      map((value) => (typeof value === "string" ? value : value.nombre)),
      mergeMap((value) => (value ? this._filter(value) : []))
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturasService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }
    this.autoCompleteControl.setValue("");
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter(
      (item: ItemFactura) => id !== item.producto.id
    );
  }
  createFactura(facturaForm): void {
    if (facturaForm.form.valid && this.factura.items.length > 0) {
      this.facturasService
        .createFacturaService(this.factura)
        .subscribe((factura) => {
          Swal.fire(
            this.titulo,
            `Factura ${factura.description} creada con exito!`,
            "success"
          );
          this.router.navigate(["/facturas", factura.id]);
        });
    }
  }
}
