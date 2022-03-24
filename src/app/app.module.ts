import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { ClienteService } from "./clientes/cliente.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { FormComponent } from "./clientes/form/form.component";
import { FormsModule } from "@angular/forms";
import { PaginateComponent } from "./paginate/paginate.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { DetalleComponent } from "./clientes/detalle/detalle.component";
import { UploadFormComponent } from "./clientes/upload-form/upload-form.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const routes: Routes = [
  { path: "", redirectTo: "/clientes", pathMatch: "full" }, //home
  { path: "clientes", component: ClientesComponent }, //path que queremos
  { path: "clientes/page/:page", component: ClientesComponent },
  { path: "clientes/crear", component: FormComponent },
  { path: "clientes/crear/:id", component: FormComponent },
  { path: "clientes/detalle/:id", component: DetalleComponent },
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
