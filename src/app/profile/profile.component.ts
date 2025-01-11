import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUser(userId).subscribe(
        (data) => {
          this.user = data;
          console.log(data);
        },
        (error) => {
          this.errorMessage = "Erreur lors de la récupération des données utilisateur.";
        }
      );
    } else {
      this.router.navigate(['/login']);
    }

  }
}
