import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {QrCodeListComponent} from "./qr-code-list/qr-code-list.component";
import {QrCodeListItemComponent} from "./qr-code-list-item/qr-code-list-item.component";
import { QrCodeCreatePdfComponent } from './qr-code-create-pdf/qr-code-create-pdf.component';
import {FormsModule} from "@angular/forms";
import { BarChartComponent } from './bar-chart/bar-chart.component';
import {NgChartsModule} from "ng2-charts";



@NgModule({
  declarations: [
    QrCodeListComponent,
    QrCodeListItemComponent,
    QrCodeCreatePdfComponent,
    BarChartComponent
  ],
  exports: [
    QrCodeListComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    NgChartsModule
  ]
})
export class QrCodesModule { }
