import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SecurityService} from "./security.service";
import {Pricelist} from "./pricelist";

@Injectable({
  providedIn: 'root'
})
export class PricelistService {

  private url = 'http://localhost:8080/api/pricelist'

  constructor(private http: HttpClient) {
  }

  getPricelistFromEvent(id:number) {
    return this.http.get<Pricelist[]>(`${this.url}?eventId=${id}`)
  }
}
