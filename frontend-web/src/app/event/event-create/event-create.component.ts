import { Component } from '@angular/core';
import {EventStoreService} from "../../shared/event-store.service";
import {Observable} from "rxjs";

@Component({
  selector: 'mvf-event-create',
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent {

  name: string = ""
  mail: string = ""

  constructor(private eventSvc: EventStoreService, ) {
  }


  createEvent(name:string) {
    this.eventSvc.createEvent(name)
  }
}
