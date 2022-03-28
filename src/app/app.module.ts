import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { ClienteService } from "./clientes/cliente.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { FormComponent } from "./clientes/form/form.component";
import { FormsModule } from "@angular/forms";
import { PaginateComponent } from "./paginate/paginate.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { DetalleComponent } from "./clientes/detalle/detalle.component";
import { UploadFormComponent } from "./clientes/upload-form/upload-form.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LoginComponent } from "./usuarios/login.component";
import { AuthGuard } from "./usuarios/guards/auth.guard";
import { RoleGuard } from "./usuarios/guards/role.guard";
import { TokenInterceptor } from "./usuarios/interceptors/token.interceptors";
import { AuthInterceptor } from "./usuarios/interceptors/auth.interceptors";
import { DetalleFacturaComponent } from "./facturas/detalle-factura.component";

const routes: Routes = [
  { path: "", redirectTo: "/clientes", pathMatch: "full" }, //home
  { path: "clientes", component: ClientesComponent }, //path que queremos
  { path: "clientes/page/:page", component: ClientesComponent },
  {
    path: "clientes/crear",
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "ROLE_ADMIN" },
  },
  {
    path: "clientes/crear/:id",
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "ROLE_ADMIN" },
  },
  { path: "clientes/detalle/:id", component: DetalleComponent },
  { path: "login", component: LoginComponent },
  { path: "facturas/:id", component: DetalleFacturaComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    PaginateComponent,
    DetalleComponent,
    UploadFormComponent,
    LoginComponent,
    DetalleFacturaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [
    ClienteService,
    { provide: LOCALE_ID, useValue: "es" },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
