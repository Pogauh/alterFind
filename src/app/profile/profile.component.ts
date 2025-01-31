import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService} from "../services/user.service";
import { Router } from '@angular/router';
import {User} from "../register/user";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  annonces:any;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}



  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUser(userId).subscribe(
        (data) => {
          this.user = data;
          console.log(data);

          this.getAnnonces(userId);
        },
        (error) => {
          this.errorMessage = "Erreur lors de la récupération des données utilisateur.";
        }
      );
    } else {
      this.router.navigate(['/login']);
    }

  }


  getAnnonces(userId: any): void {
    this.userService.getAnnonces(userId).subscribe(
      (annonces) => {
        this.annonces = annonces;
        console.log("Annonces:", annonces);
      },
      (error) => {
        console.error("Erreur lors de la récupération des annonces :", error);
      }
    );
  }
}
