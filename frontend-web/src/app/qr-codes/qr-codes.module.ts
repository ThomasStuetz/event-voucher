import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { QrCodeCreatePdfComponent } from './qr-code-create-pdf/qr-code-create-pdf.component';
import {FormsModule} from "@angular/forms";
import { BarChartComponent } from './bar-chart/bar-chart.component';
import {NgChartsModule} from "ng2-charts";
import {AppModule} from "../app.module";



@NgModule({
  declarations: [
    BarChartComponent
  ],
  exports: [
    BarChartComponent,
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        FormsModule,
        NgChartsModule
    ]
})
export class QrCodesModule { }
