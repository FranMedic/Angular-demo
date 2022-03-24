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

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private urlEndPoint: string = "http://localhost:8080/api/clientes";

  private httpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });
  constructor(private http: HttpClient, private router: Router) {}

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + "/regiones");
  }
  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + "/page/" + page).pipe(
      tap((response: any) => {
        console.log("auuda");
        (response.content as Cliente[]).forEach((cliente) => {
          console.log(cliente.name);
        });
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
      }),
      tap((response) => {
        console.log("tap 2");
        (response.content as Cliente[]).forEach((cliente) => {
          console.log(cliente.name);
        });
      })
    );
  }
  //HANDLEERROR USANDO EL ANY SIN RECIBIR EL OBSERVABLE DE CLIENTES
  create(cliente: Cliente): Observable<any> {
    return this.http
      .post<Cliente>(this.urlEndPoint, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(() => e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(() => e);
        })
      );
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(["/clientes"]);
        console.error(e.error.mensaje);
        Swal.fire("Error al editar", e.error.mensaje, "error");
        return throwError(() => e);
      })
    );
  }

  //HANDLE ERROR CONVIRTIENDO EL  ATRIBUTO CLIENTE DEL JSON EN UN OBSERVABLE DE CLIENTE
  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
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
        headers: this.httpHeaders,
      })
      .pipe(
        map((json: any) => json.cliente as Cliente), //se hace aqui con un map y usamos el any en el json para hacerlo mas flexible y poder transformarlo en un obsrvable
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire("Error al ", e.error.mensaje, "error");
          return throwError(() => e);
        })
      );
  }

  uploadPhoto(file: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("id", id);

    const req = new HttpRequest(
      "POST",
      `${this.urlEndPoint}/upload/`,
      formData,
      {
        reportProgress: true,
      }
    );
    return this.http.request(req); /*
    .pipe(
      map((response: any) => response.cliente as Cliente),
      catchError((e) => {
        console.error(e.error.mensaje);
        Swal.fire("Error al ", e.error.mensaje, "error");
        return throwError(() => e);
      })
    );*/
  }
}
