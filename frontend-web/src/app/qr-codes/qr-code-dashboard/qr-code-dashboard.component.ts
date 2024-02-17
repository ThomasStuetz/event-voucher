import {Component, OnInit} from '@angular/core';
import {QrCodeStoreService} from "../../shared/qr-code-store.service";
import {ChartOptions} from "chart.js";
import {Qrcode} from "../../shared/qrcode";

@Component({
  selector: 'mvf-qr-code-dashboard',
  templateUrl: './qr-code-dashboard.component.html',
  styleUrl: './qr-code-dashboard.component.css'
})
export class QrCodeDashboardComponent implements OnInit {

  count: number
  qrcodes: Qrcode[] = []

  constructor(private service: QrCodeStoreService) {
    this.count = this.service.count

  }

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    elements: {
      arc: {
        backgroundColor: ['#EE4B2B', '#4CBB17']
      }
    }
  }
  public pieChartLabels = ['in use', 'free']
  public pieChartLabelsValid = ['not valid', 'valid']
  public pieChartDatasets: any[] = [];
  public pieChartDatasetsValid: any[] = [];
  public pieChartLegend = true
  public pieChartPlugins = []

  ngOnInit(): void {
    this.service.getAll().subscribe(qrcodes => {
      const dataValue = qrcodes.length
      const remainingValue = 100 - qrcodes.length
      this.pieChartDatasets = [{
        data: [dataValue, remainingValue]
      }]

      this.qrcodes = qrcodes
      let valid = 0
      let notValid = 0
      for (let i = 0; i < qrcodes.length; i++) {
        if (!qrcodes[i].valid) {
          notValid++
        } else {
          valid++
        }
      }
      this.pieChartDatasetsValid = [{
        data: [notValid, valid]
      }]
    })
  }
}
