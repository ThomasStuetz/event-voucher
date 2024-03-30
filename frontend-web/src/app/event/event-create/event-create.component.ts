import {Component, ElementRef, ViewChild} from '@angular/core'
import {EventStoreService} from "../../shared/event-store.service"
import {Event} from "../../shared/event";

declare var bootstrap: any

@Component({
  selector: 'mvf-event-create',
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent {

  @ViewChild('createEvent') modalElement: ElementRef | undefined;
  @ViewChild('removePricelist') removeModalElement: ElementRef | undefined;
  name: string = ""
  events: Event[] = []
  selectedValue: any

  constructor(private eventSvc: EventStoreService) {
    this.getAllEvents()
  }

  onDropdownSelectionChange(value: any) {
    this.selectedValue = value
  }

  getAllEvents() {
    this.eventSvc.getEventsForUser()
      .subscribe(event => {
          this.events = event
          console.log("all events: " + this.events)
        },
        error => console.log('error getting events')
      )
  }


  createEventFunc(name:string) {
    this.eventSvc.createEvent(name)
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

  removeEventFunc() {
    this.eventSvc.removeEvent(this.selectedValue)
      .subscribe(
      response => console.log('Successful!', response),
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
