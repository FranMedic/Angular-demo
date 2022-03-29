import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "./auth.service";
import { Usuario } from "./usuario";
import {
  faCircle,
  faImage,
  faLock,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  faCircle = faCircle;
  faLock = faLock;
  title: string = "Sing In!";

  usuario: Usuario;
  constructor(public authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      /* Swal.fire(
        "Login",
        `Welcome patata ${this.authService.usuario.username}!`,
        "info"
      );*/
      this.router.navigate(["/clientes"]);
    }
  }

  login(): void {
    console.log(this.usuario);

    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire("Error Login", "Username o password vacias", "error");
      return;
    }

    this.authService.login(this.usuario).subscribe(
      (response) => {
        console.log(response);
        this.authService.saveUser(response.access_token);
        this.authService.saveToken(response.access_token);
        let usuario = this.authService.usuario;

        this.router.navigate(["/clientes"]);
        Swal.fire(
          "Login",
          `Welcome ${usuario.username}, you logged in succesfully!`,
          "success"
        );
      },
      (err) => {
        if (err.status === 400) {
          Swal.fire("Error Login", "Username o password incorrectas", "error");
        }
      }
    );
  }
}
