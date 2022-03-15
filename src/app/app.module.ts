import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { RouterModule, Routes } from "@angular/router";
import { DirectivaComponent } from "./directiva/directiva.component";

const routes: Routes = [
  { path: "", redirectTo: "/clientes", pathMatch: "full" }, //home
  { path: "clientes", component: ClientesComponent }, //path que queremos
  { path: "directivas", component: DirectivaComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
