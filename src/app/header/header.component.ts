import { Component } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../usuarios/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  title: string = " Angular The First";

  constructor(public authService: AuthService, private router: Router) {}
  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire("Logout", `Goodbye ${username}, Logout succesful`, "success");
    this.router.navigate(["/login"]);
  }
}
