import {Component} from '@angular/core';
import {SecurityService} from "../../shared/security.service";

@Component({
  selector: 'mvf-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: string = ""
  password: string = ""

  constructor(private service: SecurityService) {
  }

  loginUser(login: string, password: string) {
    this.service.loginUser(login, password).subscribe(
      response => console.log('login successful!', response),
      error => console.log('Error while login!', error)
    )

  }

}
