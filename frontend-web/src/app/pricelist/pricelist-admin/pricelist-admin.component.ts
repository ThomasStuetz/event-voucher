import {Component, ElementRef, ViewChild} from '@angular/core';
import {PricelistStoreService} from "../../shared/pricelist-store.service";
import {Pricelist} from "../../shared/pricelist";

declare var bootstrap: any

@Component({
  selector: 'mvf-pricelist-admin',
  templateUrl: './pricelist-admin.component.html',
  styleUrl: './pricelist-admin.component.css'
})
export class PricelistAdminComponent {

  @ViewChild('createPricelist') modalElement: ElementRef | undefined
  @ViewChild('removePricelist') removeModalElement: ElementRef | undefined;
  pricelists: Pricelist[] = []
  selectedValue: any
  selectedValueForEvent: any
  selectedValueForRemove: any
  count: string = ""

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

  createPricelistFunc() {
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
    this.showToast()
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

  protected readonly close = close;

  //delete pricelist

  onDropdownSelectionChangeForRemove(value: any) {
    this.selectedValueForRemove = value
  }

  removePricelistFunc() {
    this.service.removePricelist(this.selectedValueForRemove)
      .subscribe(
      response => this.count = response.toString(), //console.log('Successful!', response),
      error => console.log('Error!', error)
    )
    this.closeModalRemove()
    this.showToastRemove()
  }

  openModalRemove() {
    if (this.removeModalElement) {
      this.removeModalElement.nativeElement.classList.add('show');
      this.removeModalElement.nativeElement.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }
  closeModalRemove() {
    if (this.removeModalElement) {
      this.removeModalElement.nativeElement.classList.remove('show');
      this.removeModalElement.nativeElement.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }


  showToast(): void {
    const liveToast = document.getElementById('liveToast');
    var toast = new bootstrap.Toast(liveToast);
    toast.show();
  }
  showToastRemove(): void {
    const liveToast = document.getElementById('liveToastRemove');
    var toast = new bootstrap.Toast(liveToast);
    toast.show();
  }
}
