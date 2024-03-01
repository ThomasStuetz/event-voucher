import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'mvf-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-web';

  constructor(private router: Router) {}

  showSidebar(): boolean {
    // Get the current route
    const currentRoute = this.router.url;

    // Hide sidebar on login and register routes
    return !['/login', '/register'].includes(currentRoute);
  }
}
