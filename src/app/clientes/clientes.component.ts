import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs";
import Swal from "sweetalert2";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .pipe(
        tap((clientes) => {
          // el tap nos permite realizar un filtro a los datos y cambiarlos como queramos
          //(clientes) => (this.clientes = clientes) podriamos dejar solo esta linea y en el suscribe nada
          console.log("Tap 3");
          clientes.forEach((cliente) => {
            console.log(cliente.name);
          });
        })
      )
      .subscribe((clientes) => (this.clientes = clientes));
    //function(clientes) {
    //this.clientes=clientes
    //}
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${cliente.name} ${cliente.surname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe((response) => {
          this.clientes = this.clientes.filter((cli) => cli !== cliente);

          Swal.fire("Deleted!", "The puppet has been deleted.", "success");
        });
      }
    });
  }
}
