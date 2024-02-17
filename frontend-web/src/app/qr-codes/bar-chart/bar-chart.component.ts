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
      {data: [15, 13, 10, 9], label: 'Canceled Vouchers', backgroundColor: 'rgb(27,144,229)'}
  ]
  public barChartLabels = ['14:30-14:45', '14:45-15:00']
  public barChartOptions: ChartOptions = {
    responsive: true,
  }
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor(private service: QrCodeStoreService) {

  }

  ngOnInit(): void {

    this.service.getAll().subscribe(qrcodes => {
      // console.log(qrcodes.filter(value => value.cancelDateTime))

      let temp: string[] = qrcodes
        .filter(value => value.cancelDateTime)
        .map(value => {
          const cancelDateTime = new Date(value.cancelDateTime!);
          return cancelDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });

      console.log(temp)

      // for (let i = 0; i < qrcodes.length; i++) {
      //   if (qrcodes[i].cancelDateTime != null) {
      //     this.count++
      //   }
      // }
      // // this.chartData.push(this.count)
      //
      // console.log("this chart data: " + this.chartData)
      // this.barChartOptions = {
      //   scales: {
      //     y: {
      //       max: qrcodes.length
      //     }
      //   }
      // }
    })
  }
}

