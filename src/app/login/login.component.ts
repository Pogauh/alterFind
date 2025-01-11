import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {LoginRequest} from "../models/login-request";
import {FormControl, FormGroup} from "@angular/forms";
import {from} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  /*email: string = '';
  password: string = '';
  errorMessage: string | null = null;*/

  userForm : FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  request: LoginRequest = new LoginRequest;


  public login() {
    const formValue = this.userForm.value;

    if(formValue.email == ''|| formValue.password ==''){
      alert("l'identifiant ou le mot de passe est incorrect.");
      return;
    }
    this.request.email = formValue.email;
    this.request.password = formValue.password;

    this.authService.login(this.request).subscribe({
      next:(res) => {

        if (res.token) {
          localStorage.setItem('auth-token', res.token);
        } else {
          console.error("Token is undefined");
        }

        if (res.id) {
          localStorage.setItem('userId', res.id)
        } else {
          console.error("Token is undefined");
        }

        alert("Connexion réussie !");
        this.router.navigate(['/profile']);

        console.log("reveived Response "+res.token);
      }, error: (err) => {
        console.log("error Received Response:"+err);
      }
    })
  }
}
