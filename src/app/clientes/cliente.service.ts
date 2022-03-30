import { Injectable } from "@angular/core";
import { Cliente } from "./cliente";

import { Observable, tap, throwError } from "rxjs";
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Region } from "./region";
import { AuthService } from "../usuarios/auth.service";
import { URL_BACKEND } from "../config/config";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private urlEndPoint: string = URL_BACKEND + "/api/clientes";

  private httpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private addAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append("Authorization", "Bearer " + token);
    }
    return this.httpHeaders;
  }

  private isNotAuthorized(e): boolean {
    if (e.status === 401 || e.status === 403) {
      this.router.navigate(["/login"]);
      return true;
    }
    return false;
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + "/regiones", {
      headers: this.addAuthorizationHeader(),
    });
  }
  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + "/page/" + page).pipe(
      tap((response: any) => {
        (response.content as Cliente[]).forEach((cliente) => {});
      }),
      map((response: any) => {
        (response.content as Cliente[]).map((cliente) => {
          cliente.name = cliente.name.toUpperCase();
          let datePipe = new DatePipe("en-US");
          cliente.createAt = datePipe.transform(
            cliente.createAt,
            "EEEE dd, MMM, yyyy"
          );
          // 4 EEEE son los dias de la semana escritos,
          //3 E es abreviado 4 es completo, 3 M es el mes completo esto se puede abreviar con fulldate
          /*formatDate("fullDate"cliente.createAt,"dd-MM-yyyy","en-US");*/

          return cliente;
        });

        return response;
      })
    );
  }
  //HANDLEERROR USANDO EL ANY SIN RECIBIR EL OBSERVABLE DE CLIENTES
  create(cliente: Cliente): Observable<any> {
    return this.http
      .post<Cliente>(this.urlEndPoint, cliente, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(() => e);
          }
          console.error(e.error.mensaje);
          return throwError(() => e);
        })
      );
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http
      .get<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          if (e.status != 401 && e.error.mensaje) {
            this.router.navigate(["/clientes"]);
            console.error(e.error.mensaje);
          }
          return throwError(() => e);
        })
      );
  }

  //HANDLE ERROR CONVIRTIENDO EL  ATRIBUTO CLIENTE DEL JSON EN UN OBSERVABLE DE CLIENTE
  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(
        map((json: any) => json.cliente as Cliente), //se hace aqui con un map y usamos el any en el json para hacerlo mas flexible y poder transformarlo en un obsrvable
        catchError((e) => {
          if (e.status === 400) {
            return throwError(() => e);
          }
          console.error(e.error.mensaje);
          Swal.fire("Error al ", e.error.mensaje, "error");
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete(`${this.urlEndPoint}/${id}`, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(
        map((json: any) => json.cliente as Cliente), //se hace aqui con un map y usamos el any en el json para hacerlo mas flexible y poder transformarlo en un obsrvable
        catchError((e) => {
          if (this.isNotAuthorized(e)) {
            return throwError(() => e);
          }
          console.error(e.error.mensaje);
          Swal.fire("Error al ", e.error.mensaje, "error");
          return throwError(() => e);
        })
      );
  }

  uploadPhoto(file: File, id): Observable<HttpEvent<{}>> {
    console.log(file);
    let formData = new FormData();

    formData.append("file", file);
    formData.append("id", id);

    let httpHeadersImage = new HttpHeaders();
    let token = this.authService.token;

    if (token != null) {
      httpHeadersImage = httpHeadersImage.append(
        "Authorization",
        "Bearer " + token
      );
    }

    const req = new HttpRequest(
      "POST",
      `${this.urlEndPoint}/upload/`,
      formData,
      {
        reportProgress: true,
        headers: httpHeadersImage,
      }
    );
    return this.http.request(req);
  }
}
