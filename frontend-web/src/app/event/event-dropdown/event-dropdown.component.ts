import { Component } from '@angular/core';
import {EventStoreService} from "../../shared/event-store.service";

@Component({
  selector: 'mvf-event-dropdown',
  templateUrl: './event-dropdown.component.html',
  styleUrl: './event-dropdown.component.css'
})
export class EventDropdownComponent {

  items: any = []
  allEvents: any;

  constructor(private eventSvc:  EventStoreService) {
    this.getEventsFromUser()
  }

  getEventsFromUser() {
    this.eventSvc.getEventsForUser()
    this.eventSvc.getEventsForUser()
      .subscribe(
      (events: any[]) => {
        console.log(events); // Print received events to console
        // Assign events to your array
        this.items = events; // Assuming eventsArray is your array variable
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }



}
