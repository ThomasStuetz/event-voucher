import {Component} from '@angular/core';
import {PricelistStoreService} from "../../shared/pricelist-store.service";
import {Qrcode} from "../../shared/qrcode";
import {Pricelist} from "../../shared/pricelist";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
}
