import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SecurityService} from "./security.service";

@Injectable({
  providedIn: 'root'
})
export class EventStoreService {

  private url = 'http://localhost:8080/api/events'


  constructor(private http: HttpClient, private securityService: SecurityService) {
  }


  getEventsForUser(): Observable<any> {
    return this.http.get(`${this.url}?mail=${this.securityService.getUserIdFromToken()}`)
  }

  getVouhcersForEvents() {

  }

  createEvent(name: string) {
    console.log('crete evetn usedr: ' + this.securityService.getUserIdFromToken())

    this.http.post(`${this.url}?name=${name}&mail=${this.securityService.getUserIdFromToken()}`, {})
      .subscribe(
        response => console.log('created', response),
        error => console.log('error at creating', error)
      )
  }

}
