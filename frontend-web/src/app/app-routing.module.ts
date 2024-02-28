import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QrCodeListComponent} from "./qr-codes/qr-code-list/qr-code-list.component";
import {QrCodeCreateComponent} from "./qr-codes/qr-code-create/qr-code-create.component";
import {QrCodeDashboardComponent} from "./qr-codes/qr-code-dashboard/qr-code-dashboard.component";
import {QrCodeCreatePdfComponent} from "./qr-codes/qr-code-create-pdf/qr-code-create-pdf.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: QrCodeDashboardComponent
  },
  {
    path: 'list',
    component: QrCodeListComponent
  },
  {
    path: 'create',
    component: QrCodeCreateComponent
  },
  {
    path: 'create-pdf',
    component: QrCodeCreatePdfComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
