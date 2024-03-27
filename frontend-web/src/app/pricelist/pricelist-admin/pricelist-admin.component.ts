import {Component, ElementRef, ViewChild} from '@angular/core';
import {PricelistStoreService} from "../../shared/pricelist-store.service";
import {Pricelist} from "../../shared/pricelist";

@Component({
  selector: 'mvf-pricelist-admin',
  templateUrl: './pricelist-admin.component.html',
  styleUrl: './pricelist-admin.component.css'
})
export class PricelistAdminComponent {

  pricelists: Pricelist[] = []
  selectedValue: any;

  constructor(private service: PricelistStoreService) {

  }

  getPricelistForEvent(id: number) {
    this.service.getPricelistForEvent(id).subscribe(pricelist => {
      this.pricelists = pricelist
      console.log(this.pricelists)
    },
      error => console.log('error getting pricelist')
    )
  }

  onDropdownSelectionChange(value: any) {
    this.selectedValue = value;
    this.getPricelistForEvent(this.selectedValue)
  }

  helloWorld() {
    console.log("hello world")
  }

  @ViewChild('exampleModal') modalElement: ElementRef | undefined;

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

  protected readonly close = close;
}
