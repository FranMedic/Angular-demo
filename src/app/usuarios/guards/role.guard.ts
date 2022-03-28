import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"]);
      return false;
    }

    let role = next.data["role"] as string;
    console.log(role);
    if (this.authService.hasRole(role)) {
      return true;
    }
    Swal.fire(
      "Denied Access",
      `Hi! ${this.authService.usuario.username}, you don't access to this content!`,
      "warning"
    );
    this.router.navigate(["/clientes"]);
    return false;
  }
}
