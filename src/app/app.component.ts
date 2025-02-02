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
  isLoggedIn: boolean = false;
  userType: string | null = null;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('userId');  // Vérifie si l'utilisateur est connecté
    if (this.isLoggedIn) {
      this.userType = localStorage.getItem('userType'); // Récupère le type d'utilisateur (company, candidate)
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
