import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private loginUrl = "http://localhost:8080/api/events"
  token: Object = ""

  constructor(private http: HttpClient) { }

  login(name: string, key: string) {
    return this.http.get(`${this.loginUrl}/login?name=${name}&key=${key}`)
  }

  getEventIdFromToken() {
    const base64Url = this.token.toString().split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    // console.log(payload)
    return payload.eventId
  }
}
