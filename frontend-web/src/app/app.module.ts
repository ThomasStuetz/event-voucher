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
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { EventCreateComponent } from './event/event-create/event-create.component';
import { EventDropdownComponent } from './event/event-dropdown/event-dropdown.component';
import {QrCodeListComponent} from "./qr-codes/qr-code-list/qr-code-list.component";
import {QrCodeCreatePdfComponent} from "./qr-codes/qr-code-create-pdf/qr-code-create-pdf.component";
import { PricelistAdminComponent } from './pricelist/pricelist-admin/pricelist-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    QrCodeCreateComponent,
    QrCodeCreatePdfComponent,
    QrCodeListComponent,
    QrCodeDashboardComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    EventCreateComponent,
    EventDropdownComponent,
    PricelistAdminComponent
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
  exports: [
    EventDropdownComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
