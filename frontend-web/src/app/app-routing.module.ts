import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QrCodeListComponent} from "./qr-codes/qr-code-list/qr-code-list.component";
import {QrCodeCreateComponent} from "./qr-codes/qr-code-create/qr-code-create.component";
import {QrCodeDashboardComponent} from "./qr-codes/qr-code-dashboard/qr-code-dashboard.component";
import {QrCodeCreatePdfComponent} from "./qr-codes/qr-code-create-pdf/qr-code-create-pdf.component";
import {LoginComponent} from "./security/login/login.component";
import {RegisterComponent} from "./security/register/register.component";
import {EventCreateComponent} from "./event/event-create/event-create.component";
import {PricelistStoreService} from "./shared/pricelist-store.service";
import {PricelistAdminComponent} from "./pricelist/pricelist-admin/pricelist-admin.component";


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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: QrCodeDashboardComponent
  },
  {
    path: 'create-event',
    component: EventCreateComponent
  },
  {
    path: 'admin-pricelist',
    component: PricelistAdminComponent
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
