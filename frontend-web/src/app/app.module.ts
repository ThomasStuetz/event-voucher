import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {QrCodesModule} from "./qr-codes/qr-codes.module";
import {HttpClientModule} from "@angular/common/http";
import { QrCodeCreateComponent } from './qr-codes/qr-code-create/qr-code-create.component';
import {FormsModule} from "@angular/forms";
import { QrCodeDashboardComponent } from './qr-codes/qr-code-dashboard/qr-code-dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NgChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    AppComponent,
    QrCodeCreateComponent,
    QrCodeDashboardComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QrCodesModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
