import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClienteService } from "src/app/clientes/cliente.service";
import { Factura } from "../models/factura";

@Component({
  selector: "app-create-factura",
  templateUrl: "./create-factura.component.html",
  styleUrls: ["./create-factura.component.css"],
})
export class CreateFacturaComponent implements OnInit {
  titulo: string = "Nueva Factura";
  factura: Factura = new Factura();

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let clienteId = +params.get("clienteId");
      this.clienteService
        .getClienteById(clienteId)
        .subscribe((cliente) => (this.factura.cliente = cliente));
    });
  }
}
