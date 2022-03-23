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
import { MatSliderModule } from "@angular/material/slider";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldControl } from "@angular/material/form-field";
const routes: Routes = [
  { path: "", redirectTo: "/clientes", pathMatch: "full" }, //home
  { path: "clientes", component: ClientesComponent }, //path que queremos
  { path: "clientes/page/:page", component: ClientesComponent },
  { path: "clientes/crear", component: FormComponent },
  { path: "clientes/crear/:id", component: FormComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    PaginateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSliderModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
