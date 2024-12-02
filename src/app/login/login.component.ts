import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']); // Redirection après connexion
      },
      (error) => {
        this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
      }
    );
  }
}
