import {Component, EventEmitter, Output} from '@angular/core';
import {Qrcode} from "../../shared/qrcode";
import {QrCodeStoreService} from "../../shared/qr-code-store.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'mvf-qr-code-list',
  templateUrl: './qr-code-list.component.html',
  styleUrl: './qr-code-list.component.css'
})
export class QrCodeListComponent {

  qrcodes: Qrcode[] = []
  @Output() selectQrCode = new EventEmitter<Qrcode>()

  constructor(private service: QrCodeStoreService, private router: Router) {

    this.router.events.subscribe(event => {
      // console.log(event);
      service.fetchInitialQrCodes();
    });


    this.service.getAll().subscribe(qrcodes => {
      // console.log(this.qrcodes = qrcodes)
      this.qrcodes = qrcodes
    })


  }
}
