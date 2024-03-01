import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private registerUserUrl = "http://localhost:8080/users/register"
  private loginUserUrl = "http://localhost:8080/users/login"
  token: Object = ""

  constructor(private http: HttpClient) {
  }

  registerUser(user: User) {
    console.log(user)
    const headers = new HttpHeaders().set('Accept', 'application/json')
    return this.http.post(`${this.registerUserUrl}`, user, {headers: headers})
      .subscribe(
        response => console.log('register successful!', response),
        error => console.log('Error while register!', error)
      )
  }

  loginUser(login:string,password:string) {
    // const tokenob = this.http.get(`${this.loginUserUrl}?login=${login}&password=${password}`)
    // console.log("slkdjfsklfj: " + tokenob)
    //
    //
    // const token = JSON.stringify(tokenob);
    // console.log("lksdjflkskdjflskd: " + token)

    return this.http.get(`${this.loginUserUrl}?login=${login}&password=${password}`)
  }


  getUserIdFromToken() {
    const base64Url = this.token.toString().split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload.sub // The 'sub' claim in JWT often stands for subject, represented by a UUID. You can adjust as needed
  }

}
