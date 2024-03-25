import {Component, EventEmitter, Output} from '@angular/core';
import {EventStoreService} from "../../shared/event-store.service";

@Component({
  selector: 'mvf-event-dropdown',
  templateUrl: './event-dropdown.component.html',
  styleUrl: './event-dropdown.component.css'
})
export class EventDropdownComponent {

  items: any = []
  allEvents: any;
  selectedItem: any;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private eventSvc: EventStoreService) {
    this.getEventsFromUser()
  }

  getEventsFromUser() {
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

  onSelect() {
    console.log("hello this my name: " + this.items[0].name)
    console.log(this.items[0].id)
    if (this.selectedItem == undefined) {
      return this.selectionChange.emit("all")
    }
    return this.selectionChange.emit(this.selectedItem)
  }


}
