import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {User} from "./user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    const user:User = new User(this.nom,this.prenom,this.email,this.password);

    this.authService.register(user).subscribe(
      () => {
        this.router.navigate(['/login']); // Redirection après inscription
      },
      (error) => {
        this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
      }
    );
  }
}
