import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, Subject, throwError} from "rxjs";
import {Qrcode} from "./qrcode";
import {SecurityService} from "./security.service";

@Injectable({
  providedIn: 'root'
})
export class QrCodeStoreService {

  private apiUrl = "http://localhost:8080/api"

  private ws: WebSocket | undefined
  private qrCodeSubject: Subject<Qrcode[]> = new Subject<Qrcode[]>()

  count: number = 0

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.connectToWebSocket()
    // this.fetchInitialQrCodes()
  }

  addVoucher(value: number, count: number, eventId: number): Observable<any> {
    console.log("payload from token: " + this.securityService.getUserIdFromToken())
    const headers = new HttpHeaders().set('Accept', 'text/plain');
    return this.http.post(`${this.apiUrl}/qrcodes?value=${value}&no=${count}&event=${eventId}`, {}, {
      headers,
      responseType: 'text'
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  fetchInitialQrCodes() {
    this.http.get<Qrcode[]>(`${this.apiUrl}/qrcodes?mail=${this.securityService.getUserIdFromToken()}`).subscribe({
      next: (qrcodes) => {
        this.qrCodeSubject.next(qrcodes); // Update the Subject with the initial QR codes
        this.count = qrcodes.length
        // console.log("count in inital fetch" + this.count)
        // console.log('Initial QR codes fetched:', qrcodes)
      },
      error: (error) => console.error('Error fetching initial QR codes:', error),
    });
  }

  getVouchersFromEvent(eventId:number) {
    this.http.get<Qrcode[]>(`${this.apiUrl}/qrcodes/forEvent?event=${eventId}`).subscribe({
      next: (qrcodes) => {
        this.qrCodeSubject.next(qrcodes); // Update the Subject with the initial QR codes
        this.count = qrcodes.length
        // console.log("count in inital fetch" + this.count)
        // console.log('Initial QR codes fetched:', qrcodes)
      },
      error: (error) => console.error('Error fetching initial QR codes:', error),
    });
  }
  private handleError(error: HttpErrorResponse) {
    console.error('Error processing action', error);
    return throwError(error);
  }

  //Websocket logic

  private connectToWebSocket() {
    this.ws = new WebSocket('ws://localhost:8080/websocket/qrcodes')

    this.ws.onopen = (event) => {
      console.log('WebSocket connection opened')
    }

    this.ws.onmessage = (event) => {
      try {
        const qrcodes: Qrcode[] = JSON.parse(event.data)
        this.qrCodeSubject.next(qrcodes)
        this.count = qrcodes.length
        // console.log('Received data:', qrcodes)
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    this.ws.onclose = (event) => {
      console.log('WebSocket connection closed')
    }
  }

  getAll(): Observable<Qrcode[]> {
    if (this.ws == null) {
      console.log("too early")
    }
    return this.qrCodeSubject.asObservable()
  }

  removeQrCode(eventId: number) {
    return this.http.get(`${this.apiUrl}/qrcodes/delete?eventId=${eventId}`)
  }
}
