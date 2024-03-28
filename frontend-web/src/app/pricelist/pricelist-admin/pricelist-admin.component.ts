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
  selectedValue: any
  selectedValueForEvent: any

  constructor(private service: PricelistStoreService) {
    this.getAllPricelists()
  }

  getAllPricelists() {
    this.service.getPricelists()
      .subscribe(pricelist => {
          this.pricelists = pricelist
          console.log("all pricelists: " + this.pricelists)
        },
        error => console.log('error getting pricelist')
      )
  }

  getPricelistForEvent(id: number) {
    this.service.getPricelistForEvent(id)
      .subscribe(pricelist => {
          this.pricelists = pricelist
          console.log("pricelist: " + this.pricelists)
        },
        error => console.log('error getting pricelist')
      )
  }

  onDropdownSelectionChange(value: any) {
    this.selectedValue = value
    console.log("klsjflksjflksdfj ", this.selectedValue)
    if (this.selectedValue == 'all') {
      this.getAllPricelists()
    } else {
      this.getPricelistForEvent(this.selectedValue)
    }
  }

  onDropdownSelectionChangeForCreate(value: any) {
    this.selectedValueForEvent = value
  }

  items = [
    {label: 'alkoholisch', checked: false, price: 0},
    {label: 'alkohol frei', checked: false, price: 0},
    {label: 'essen', checked: false, price: 0},
    {label: 'kuchen', checked: false, price: 0},
    {label: 'sonstiges', checked: false, price: 0}
  ]

  createPricelist() {
    const selectedItems = this.items.filter(item => item.checked);
    const pricelist = selectedItems.map(item => ({
      label: item.label,
      price: item.price
    }));
    this.service.createPricelist(this.selectedValueForEvent, pricelist)
      .subscribe(
        response => console.log('Successful!', response),
        error => console.log('Error!', error)
      )
    this.closeModal()
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
