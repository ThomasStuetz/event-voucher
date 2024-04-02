import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
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

  @ViewChild('createQrCode') modalElement: ElementRef | undefined
  @ViewChild('removeQrCode') modalElementRemove: ElementRef | undefined
  @Output() selectQrCode = new EventEmitter<Qrcode>()
  qrcodes: Qrcode[] = []
  selectedValue: any
  selectedValueForEvent: any
  selectedValueForRemove: any
  value: number = 0
  count: number = 0
  countRemove: string = ""

  constructor(private service: QrCodeStoreService, private router: Router, private securityService: SecurityService) {

    this.router.events.subscribe(event => {
      this.service.fetchInitialQrCodes();
    });

    this.getAllVouchers()


  }

  getAllVouchers() {
    this.service.getAll()
      .subscribe(qrcodes => {
          this.qrcodes = qrcodes
        },
        error => console.log('error getting pricelist'))
  }

  getVouchersFromEvent(id: number) {
    this.service.getVouchersFromEvent(id)
  }

  onDropdownSelectionChange(value: any) {
    this.onDropdownSelectionChange = value
    if (this.selectedValue == 'all') {
      this.getAllVouchers()
    } else {
      this.getVouchersFromEvent(this.selectedValue)
    }
  }

  onDropdownSelectionChangeForCreate(value: any) {
    this.selectedValueForEvent = value
  }

  createQrCodeFunc(value: number, count: number, eventId: number) {
    this.service.addVoucher(value, count, eventId)
      .subscribe(
        response => console.log('Successful!', response),
        error => console.log('Error!', error)
      )
    this.closeModal()
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
  }


  removeQrCodeFunc() {
    this.service.removeQrCode(this.selectedValueForRemove)
      .subscribe(
        response => this.countRemove = response.toString(), //console.log('Successful!', response),
        error => console.log('Error!', error)
      )
    this.closeModalRemove()
  }

  onDropdownSelectionChangeForRemove(value: any) {
    this.selectedValueForRemove = value
  }

  openModalRemove() {
    if (this.modalElementRemove) {
      this.modalElementRemove.nativeElement.classList.add('show');
      this.modalElementRemove.nativeElement.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  closeModalRemove() {
    if (this.modalElementRemove) {
      this.modalElementRemove.nativeElement.classList.remove('show');
      this.modalElementRemove.nativeElement.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }

}
