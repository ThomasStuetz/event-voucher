import {Component} from '@angular/core';

import {QrCodeStoreService} from "../../shared/qr-code-store.service";

declare var bootstrap: any;

@Component({
  selector: 'mvf-qr-code-create',
  templateUrl: './qr-code-create.component.html',
  styleUrl: './qr-code-create.component.css'
})
export class QrCodeCreateComponent {

  value: number = 0
  count: number = 0
  selectedValue: any;

  constructor(private service: QrCodeStoreService) {
  }


  addVoucher(value: number, count: number, eventId: number) {
    this.service.addVoucher(value, count, eventId)
      .subscribe(
        response => console.log('Successful!', response),
        error => console.log('Error!', error)
      )
    this.showToast()
  }

  showToast(): void {
    const liveToast = document.getElementById('liveToast');
    var toast = new bootstrap.Toast(liveToast);
    toast.show();
  }

  onDropdownSelectionChange(value: any) {
    this.selectedValue = value;
  }
}
