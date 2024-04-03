import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QrScannerComponent } from './scanner/qr-scanner/qr-scanner.component';
import {NgxScannerQrcodeModule, LOAD_WASM} from 'ngx-scanner-qrcode';
import {HttpClientModule} from "@angular/common/http";
import {MatButton} from "@angular/material/button";
import { LoginComponent } from './security/login/login.component';
import {FormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { PricelistComponent } from './pricelist/pricelist/pricelist.component';
import { LogoutComponent } from './security/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    QrScannerComponent,
    LoginComponent,
    NavbarComponent,
    PricelistComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxScannerQrcodeModule,
    MatButton,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
