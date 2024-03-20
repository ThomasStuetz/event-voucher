import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Data} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QrDevaluationService {

  constructor(private http: HttpClient) { }


  debitVoucher(latestQrCode: string, amount: number) {
    this.http.get(`${latestQrCode}?amount=${amount}`)
      .subscribe(
        (data) => {
          console.log("get succ", data)
        },
        (error) => {
          console.log("error at get", error)
        }
      )
  }

  amount: number | undefined
  getAmount(url: string) {
    this.http.get(url).subscribe(
      (data) =>  {
        console.log("amount: ", data)
        this.amount = <number>data;
      },
      (error) => {
        console.log("error ", error)
      }
    )
    return this.amount
  }
}
