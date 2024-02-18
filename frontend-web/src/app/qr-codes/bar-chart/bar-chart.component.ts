import {Component, OnInit} from '@angular/core';
import {QrCodeStoreService} from "../../shared/qr-code-store.service";
import {Qrcode} from "../../shared/qrcode";
import {ChartOptions} from "chart.js";

@Component({
  selector: 'mvf-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit {

  qrcodes: Qrcode[] = []
  chartData: number[] = []
  count = 0

  public barChartData = [
    {data: this.chartData, label: 'Canceled Vouchers', backgroundColor: 'rgb(27,144,229)'}
  ]
  public barChartLabels = ['00-15', '15-30', '30-45', '45-60']
  public barChartOptions: ChartOptions = {
    responsive: true,
  }
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(private service: QrCodeStoreService) {

  }

  ngOnInit(): void {

    this.service.getAll().subscribe(qrcodes => {

      this.barChartOptions = {
        scales: {
          y: {
            max: qrcodes.length
          }
        }
      }

      let minutes: string[] = qrcodes
        .filter(value => value.cancelDateTime)
        .map(value => {
          const cancelDateTime = new Date(value.cancelDateTime!);
          return cancelDateTime.toLocaleTimeString([], { /*hour: '2-digit',*/ minute: '2-digit'});
        });

      let countFor1Quarter = 0
      let countFor2Quarter = 0
      let countFor3Quarter = 0
      let countFor4Quarter = 0

      for (let i = 0; i < minutes.length; i++) {
        let minute: number = parseInt(minutes[i]);
        if (!isNaN(minute)) {
          switch (true) {
            case minute > 0 && minute < 15:
              countFor1Quarter++
              this.chartData[0] = countFor1Quarter;
              break
            case minute > 15 && minute < 30:
              countFor2Quarter++
              this.chartData[1] = countFor2Quarter;
              break
            case minute > 30 && minute < 45:
              countFor3Quarter++
              this.chartData[2] = countFor3Quarter;
              break
            case minute > 45 && minute < 60:
              countFor4Quarter++
              this.chartData[3] = countFor4Quarter;
              break
          }
        }
      }
    })
  }
}

