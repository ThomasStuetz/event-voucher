import {Component} from '@angular/core';
import {QrCodeStoreService} from "../../shared/qr-code-store.service";


@Component({
  selector: 'mvf-qr-code-dashboard',
  templateUrl: './qr-code-dashboard.component.html',
  styleUrl: './qr-code-dashboard.component.css'
})
export class QrCodeDashboardComponent {

  count: number = 0

  constructor(private service: QrCodeStoreService) {
  }

  getCount(): number {
    return this.service.count;
  }

}
