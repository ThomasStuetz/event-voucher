import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {QrCodeListComponent} from "./qr-code-list/qr-code-list.component";
import {QrCodeListItemComponent} from "./qr-code-list-item/qr-code-list-item.component";
import { QrCodeCreatePdfComponent } from './qr-code-create-pdf/qr-code-create-pdf.component';



@NgModule({
  declarations: [
    QrCodeListComponent,
    QrCodeListItemComponent,
    QrCodeCreatePdfComponent
  ],
  exports: [
    QrCodeListComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ]
})
export class QrCodesModule { }
