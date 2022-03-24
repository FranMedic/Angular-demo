import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  modal: boolean = false;
  _notificateUpload = new EventEmitter<any>();
  constructor() {}

  get notificateUploadGetter(): EventEmitter<any> {
    return this._notificateUpload;
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}
