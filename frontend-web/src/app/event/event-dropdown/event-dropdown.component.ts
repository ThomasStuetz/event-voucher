import { Component } from '@angular/core';
import {EventStoreService} from "../../shared/event-store.service";

@Component({
  selector: 'mvf-event-dropdown',
  templateUrl: './event-dropdown.component.html',
  styleUrl: './event-dropdown.component.css'
})
export class EventDropdownComponent {


  constructor(private eventSvc:  EventStoreService) {

  }

}
