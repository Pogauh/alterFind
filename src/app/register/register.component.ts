import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { SignupRequest } from '../models/signup-request';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService, private storage: LocalStorageService,  private router: Router) { }

  request: SignupRequest = new SignupRequest();
  msg: string | undefined;

  signupForm: FormGroup = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public onSubmit() {
    this.storage.remove('auth-key');

    const formValue = this.signupForm.value;

    this.request.nom = formValue.nom;
    this.request.prenom = formValue.prenom;
    this.request.email = formValue.email;
    this.request.password = formValue.password;

    if (this.signupForm.valid) {
      this.authService.register(this.request).subscribe({
        next: (res) => {
          console.log(res.response);
          this.msg = res.response;

          // Vérifier si l'ID utilisateur est renvoyé dans la réponse
          if (res.userId) {
            // Enregistrer l'ID de l'utilisateur dans le localStorage
            this.storage.set('userId', res.userId.toString()); // Sauvegarder l'ID dans le localStorage
            console.log('User ID saved in localStorage:', res.userId);

            // Optionnellement, vous pouvez rediriger l'utilisateur vers une autre page après l'inscription
             this.router.navigate(['/profile']);
          }

        },
        error: (err) => {
          console.log("Error Received:", err);
        }
      });
    } else {
      console.log("On submit failed.");
    }
  }
}
