import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QrCodeCreateComponent} from "./qr-code-create/qr-code-create.component";
import {QrCodeListComponent} from "./qr-code-list/qr-code-list.component";


const routes: Routes = [ ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
