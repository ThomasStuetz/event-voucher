import {Component, TemplateRef, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import {
  LOAD_WASM,
  NgxScannerQrcodeComponent,
  ScannerQRCodeConfig,
  ScannerQRCodeResult
} from "ngx-scanner-qrcode";
import {QrDevaluationService} from "../../shared/qr-devaluation.service";
import {SecurityService} from "../../shared/security.service";
import {Pricelist} from "../../shared/pricelist";
import {PricelistService} from "../../shared/pricelist.service";
import {PricelistComponent} from "../../pricelist/pricelist/pricelist.component";

LOAD_WASM().subscribe();

@Component({
  selector: 'mq-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css'
})
export class QrScannerComponent implements AfterViewInit {

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
        height: 0.6 * window.innerHeight
      }
    }
  }

  @ViewChild('scanner') modalElement: ElementRef | undefined
  public latestQRCode: string = "";
  public message: string = ""
  pricelists: Pricelist[] = []
  warning: string = ''


  @ViewChild('action') action!: NgxScannerQrcodeComponent

  constructor(public service: QrDevaluationService, private securityService: SecurityService, private pricelist: PricelistService) {
  }

  ngAfterViewInit() {
    this.startScanner()
    this.getPricelist()
    console.log(this.pricelist.getPricelistFromEvent(this.securityService.getEventIdFromToken()))
  }

  getPricelist() {
    this.pricelist.getPricelistFromEvent(this.securityService.getEventIdFromToken())
      .subscribe(pricelist => {
          this.pricelists = pricelist
          console.log("pricelist: " + this.pricelists)
        },
        error => console.log('error getting pricelist')
      )
  }

  startScanner() {
    this.action.start()
  }



  public onEvent(e: ScannerQRCodeResult[], action?: any) {
    this.latestQRCode = e[0].value;
    // @ts-ignore
    document.querySelector('.origin-overlay span').style.display = 'none';
    this.getAmount()
    this.action.pause()
    console.log(this.latestQRCode)
  }


  public restart() {
    this.action.play();
  }

  public validateBon(price: number) {
    this.warning = ''
    console.log("LKSDJFVLSKDFJSDLKF", price);
    console.log(this.service.amount)
    // @ts-ignore
    if (this.service.amount >= price) {
      this.service.debitVoucher(this.latestQRCode, price);
      this.closeModal();
      this.action.play()
    } else {
      console.log("not enough credit")
      this.warning = 'not enough credits'
    }
    this.getAmount()

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

  openModal() {
    if (this.modalElement) {
      this.modalElement.nativeElement.classList.add('show');
      this.modalElement.nativeElement.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  closeModal() {
    if (this.modalElement) {
      this.modalElement.nativeElement.classList.remove('show');
      this.modalElement.nativeElement.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
    this.startScanner()
  }


}
