import { Component } from '@angular/core';
import {User} from "../../shared/user";
import {SecurityService} from "../../shared/security.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {Router} from "@angular/router";

@Component({
  selector: 'mvf-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  login: string = ""
  email: string = ""
  password: string = ""

  constructor(private service: SecurityService, private router: Router) {
  }

  registerUser(login:string, password:string,email:string) {
    const user: User = {
      login: this.login,
      password: this.password,
      email: this.email
    }
    this.service.registerUser(user)
  }
}
