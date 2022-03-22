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
  public errors: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get("id");
      if (id) {
        this.clienteService
          .getClienteById(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(["/clientes"]);
        swal.fire(
          "New Puppet",
          `Puppet ${cliente.name} succesfully created`,
          "success"
        );
      },
      (err) => {
        this.errors = err.error.errors as string[];
        console.error(err.error.errors);
        console.error("Tiene un error " + err.status);
      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe((cliente) => {
      this.router.navigate(["/clientes"]);
      swal.fire(
        "Puppet actualizada",
        `Cliente, ${cliente.name} actualizado con éxito!`,
        "success"
        //se puede usar  ${json.mensaje} para traer el mensaje creado en el back
      );
    });
  }
}
