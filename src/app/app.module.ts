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

const routes: Routes = [
  { path: "", redirectTo: "/clientes", pathMatch: "full" }, //home
  { path: "clientes", component: ClientesComponent }, //path que queremos
  { path: "clientes/crear", component: FormComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
