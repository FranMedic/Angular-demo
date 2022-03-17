import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { ClienteService } from "./clientes/cliente.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
  ],
  imports: [BrowserModule],
  providers: [ClienteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
