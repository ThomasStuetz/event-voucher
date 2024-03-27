import { Component } from '@angular/core'
import {EventStoreService} from "../../shared/event-store.service"

declare var bootstrap: any

@Component({
  selector: 'mvf-event-create',
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent {

  name: string = ""

  constructor(private eventSvc: EventStoreService) {
  }


  createEvent(name:string) {
    this.eventSvc.createEvent(name)
    this.showToast()
  }

  showToast(): void {
    const liveToast = document.getElementById('liveToast');
    var toast = new bootstrap.Toast(liveToast);
    toast.show();
  }
}
