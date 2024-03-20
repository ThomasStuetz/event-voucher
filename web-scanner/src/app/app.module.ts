import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QrScannerComponent } from './scanner/qr-scanner/qr-scanner.component';
import {NgxScannerQrcodeModule, LOAD_WASM} from 'ngx-scanner-qrcode';
import {HttpClientModule} from "@angular/common/http";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    QrScannerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxScannerQrcodeModule,
        MatButton
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
