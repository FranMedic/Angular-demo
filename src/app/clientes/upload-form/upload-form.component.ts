import { HttpEventType } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";
import { Cliente } from "../cliente";
import { ClienteService } from "../cliente.service";
import { ModalService } from "./modal.service";

@Component({
  selector: "app-upload-form",
  templateUrl: "./upload-form.component.html",
  styleUrls: ["./upload-form.component.css"],
})
export class UploadFormComponent implements OnInit {
  @Input() cliente: Cliente = new Cliente();
  private selectedPhoto: File;
  progress: number = 0;
  faXmark = faXmark;
  constructor(
    private clienteService: ClienteService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    /*this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get("id");
      if (id) {
        this.clienteService
          .getClienteById(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });*/
  }

  selectPhoto(event) {
    this.selectedPhoto = event.target.files[0];
    this.progress = 0;
    console.log(this.selectedPhoto);
    if (this.selectedPhoto.type.indexOf("image") < 0) {
      Swal.fire(
        "Error Upload: ",
        "El archivo debe ser del tipo imagen",
        "error"
      );
      this.selectedPhoto = null;
    }
  }

  uploadPhotoFile() {
    if (!this.selectedPhoto) {
      Swal.fire("Error Upload: ", "Debe seleccionar una foto", "error");
    } else {
      this.clienteService
        .uploadPhoto(this.selectedPhoto, this.cliente.id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;
            this.modalService.notificateUploadGetter.emit(this.cliente);
            Swal.fire(
              "Puppet actualizada",
              `Foto, ${response.mensaje} subida con éxito!`,
              "success"
            );
          }
        });
    }
  }

  closePhotoModal() {
    this.modalService.closeModal();
    this.selectedPhoto = null;
    this.progress = 0;
  }
}
