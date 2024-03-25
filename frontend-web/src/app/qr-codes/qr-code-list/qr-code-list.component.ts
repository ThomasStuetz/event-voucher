import {Component, EventEmitter, Output} from '@angular/core';
import {Qrcode} from "../../shared/qrcode";
import {QrCodeStoreService} from "../../shared/qr-code-store.service";
import {NavigationEnd, Router} from "@angular/router";
import {SecurityService} from "../../shared/security.service";

@Component({
  selector: 'mvf-qr-code-list',
  templateUrl: './qr-code-list.component.html',
  styleUrl: './qr-code-list.component.css'
})
export class QrCodeListComponent {

  qrcodes: Qrcode[] = []
  @Output() selectQrCode = new EventEmitter<Qrcode>()
  selectedValue: any;

  constructor(private service: QrCodeStoreService, private router: Router, private securityService: SecurityService) {


    this.getAllVouchers()


  }

  getAllVouchers() {

    this.router.events.subscribe(event => {
      this.service.fetchInitialQrCodes();
    });

    this.service.getAll().subscribe(qrcodes => {
      this.qrcodes = qrcodes
    })
  }

  getVouchersFromEvent(id: number) {
    this.service.getVouchersFromEvent(id)
  }

  onDropdownSelectionChange(value: any) {
    this.selectedValue = value;
    if (this.selectedValue == "all") {
      this.getAllVouchers()
    } else {
      this.getVouchersFromEvent(this.selectedValue)
    }
  }
}
