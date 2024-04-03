import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'mq-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web-scanner';

  constructor(private router: Router) {
  }

  showHeaderAndFooter(): boolean {
    const currentRoute = this.router.url

    return !['/login'].includes(currentRoute)
  }
}
