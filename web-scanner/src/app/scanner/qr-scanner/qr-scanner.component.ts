import {Component, TemplateRef, ViewChild} from '@angular/core';
import {config} from "rxjs";
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeConfig,
  ScannerQRCodeResult, ScannerQRCodeSelectedFiles
} from "ngx-scanner-qrcode";
import {HttpClient} from "@angular/common/http";
import {QrDevaluationService} from "../../shared/qr-devaluation.service";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'mq-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css'
})
export class QrScannerComponent {

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
        height: 0.6 * window.innerHeight
      },
    }
  };

  public latestQRCode: string = "";
  public message: string = ""

  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(public service: QrDevaluationService,private dialog: MatDialog) {
  }


  public onEvent(e: ScannerQRCodeResult[], action?: any) {
    console.log("hjsdlfkjsdofklj")
    this.action.pause()
    this.latestQRCode = e[0].value;
    console.log(this.latestQRCode)
  }


  public restart() {
    this.action.play();
  }

  openModal() {
    this.dialog.open(this.modalTemplate, {
      width: '100vw'
    })
  }

  public validateBon(amount: number) {

    console.log("LKSDJFVLSKDFJSDLKF", amount)
    this.service.debitVoucher(this.latestQRCode, amount)
    this.action.play();

  }

  getAmount() {
    console.log()
    let temp = this.latestQRCode.lastIndexOf("/")
    let urlPrefix = this.latestQRCode.substring(0, temp + 1)
    let urlSurffix = this.latestQRCode.substring(temp + 1)
    let insertedCode = "getAmount/"
    let url = urlPrefix + insertedCode + urlSurffix

    this.service.getAmount(url)
    this.action.play();
  }
}
