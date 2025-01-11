import { Component } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AlterFindFront';

  constructor(private authService: AuthService, private router: Router) {}


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
