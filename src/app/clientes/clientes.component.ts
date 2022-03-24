import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs";
import Swal from "sweetalert2";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
import { faImage, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { ModalService } from "./upload-form/modal.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  paginador: any;
  clienteSelected: Cliente;
  faImage = faImage;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get("page");

      if (!page) {
        page = 0;
      }
      this.clienteService
        .getClientes(page)
        .pipe(
          tap((response: any) => {
            console.log("ClientesComponent: tap 3");
            (response.content as Cliente[]).forEach((cliente) =>
              console.log(cliente.name + "1")
            );
          })
        )
        .subscribe((response) => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });

    this.modalService.notificateUploadGetter.subscribe((cliente) => {
      this.clientes = this.clientes.map((clienteOriginal) => {
        if (cliente.id === clienteOriginal.id) {
          clienteOriginal.photo = cliente.photo;
        }
        return clienteOriginal;
      });
    });
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

  photoModal(cliente: Cliente) {
    this.clienteSelected = cliente;
    this.modalService.openModal();
  }
}
