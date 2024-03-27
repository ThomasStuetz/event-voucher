import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pricelist} from "./pricelist";
import {Observable, Subject} from "rxjs";
import {Qrcode} from "./qrcode";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

@Injectable({
  providedIn: 'root'
})
export class PricelistStoreService {

  private url = 'http://localhost:8080/api/pricelist'


  constructor(private http: HttpClient) { }


  getPricelistForEvent(eventId: number) {
     return this.http.get<Pricelist[]>(`${this.url}?eventId=${eventId}`)
  }
}
