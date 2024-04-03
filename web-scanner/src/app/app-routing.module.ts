import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./security/login/login.component";
import {QrScannerComponent} from "./scanner/qr-scanner/qr-scanner.component";
import {PricelistComponent} from "./pricelist/pricelist/pricelist.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'scanner',
    component: QrScannerComponent
  },
  {
    path: 'pricelist',
    component: PricelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
