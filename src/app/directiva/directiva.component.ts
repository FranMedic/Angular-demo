import { Component } from "@angular/core";

@Component({
  selector: "app-directiva",
  templateUrl: "./directiva.component.html",
  styleUrls: ["./directiva.component.css"],
})
export class DirectivaComponent {
  listaPuppets: string[] = ["Kermit", "Peggy", "Cookie Monster"];

  toogle: boolean = true;
  constructor() {}

  setToogle(): void {
    this.toogle = this.toogle ? false : true;
  }
}
