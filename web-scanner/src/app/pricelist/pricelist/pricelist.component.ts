import {AfterViewInit, Component} from '@angular/core';
import {PricelistService} from "../../shared/pricelist.service";
import {Pricelist} from "../../shared/pricelist";
import {SecurityService} from "../../shared/security.service";

@Component({
  selector: 'mq-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrl: './pricelist.component.css'
})
export class PricelistComponent implements AfterViewInit{

  pricelists: Pricelist[] = []
  title: any


  constructor(private service: PricelistService, private securityService: SecurityService) {
  }

  ngAfterViewInit() {
    setTimeout(() => this.getPricelistForEvent(), 100)

  }

  getPricelistForEvent() {
    this.service.getPricelistFromEvent(this.securityService.getEventIdFromToken())
      .subscribe(pricelist => {
          this.pricelists = pricelist
          // console.log("pricelist: " + this.pricelists)

          this.pricelists.forEach(item => {
            this.title = item.event.name
            // console.log("Event Name:", this.title)
          })

        },
        error => console.log('error getting pricelist')
      )
  }
}
