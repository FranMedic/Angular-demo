import { Component, OnInit } from "@angular/core";
import { Cliente } from "../cliente";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public formtitle: string = "Crear Puppet";

  constructor() {}

  ngOnInit(): void {}

  public create(): void {
    console.log("clicked");
    console.log(this.cliente);
  }
}
