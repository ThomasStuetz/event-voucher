import {Component} from '@angular/core';
import {SecurityService} from "../../shared/security.service";

@Component({
  selector: 'mq-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  login: string = ""
  key: string = ""

  constructor(private service: SecurityService) {
  }

  loginUser(login: string, password: string) {
    this.service.login(login, password)
      .subscribe(
        response => {
          console.log('login successful!', response)
          const resObj = JSON.parse(JSON.stringify(response))
          this.service.token = resObj.value
        },
        error => console.log('Error while login!', error)
      )

  }

}
