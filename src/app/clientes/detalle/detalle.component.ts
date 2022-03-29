import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Factura } from "src/app/facturas/models/factura";
import { FacturasService } from "src/app/facturas/services/facturas.service";
import Swal from "sweetalert2";
import { Cliente } from "../cliente";
import { ClienteService } from "../cliente.service";

@Component({
  selector: "detalle-cliente",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"],
})
export class DetalleComponent implements OnInit {
  cliente: Cliente;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturasService: FacturasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id: number = +params.get("id");
      if (id) {
        this.clienteService.getClienteById(id).subscribe((cliente) => {
          this.cliente = cliente;
        });
      }
    });
  }

  delete(factura: Factura): void {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${factura.description}`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturasService.delete(factura.id).subscribe((response) => {
          this.cliente.facturas = this.cliente.facturas.filter(
            (fact) => fact !== factura
          );

          Swal.fire(
            "Deleted!",
            `The bill ${factura.description}has been deleted.`,
            "success"
          );
        });
      }
    });
  }
}
