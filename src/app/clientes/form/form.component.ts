import { Component, OnInit } from "@angular/core";
import { Cliente } from "../cliente";
import { ClienteService } from "../cliente.service";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public formtitle: string = "Crear Puppet";

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params["id"];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe((cliente) => {
      this.router.navigate(["/clientes"]);
      swal.fire(
        "New Puppet",
        `Puppet ${cliente.name} succesfully created`,
        "success"
      );
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe((cliente) => {
      this.router.navigate(["/clientes"]);
      swal.fire(
        "Puppet actualizada",
        `Cliente ${cliente.name} actualizado con éxito!`,
        "success"
      );
    });
  }
}
