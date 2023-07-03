import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})

export class UserRegistrationComponent {
  // Variable to store the response message from the server
  responseMessage: string = '';

  // Object to store the user's username and password
  user = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm) {
    // Get the user registration URL for local environment
    const registerAuthUrl = environment.registerAuthUrl;
    // Get the user registration URL for prod environment
    const registerAuthProdUrl = environment.registerAuthProdUrl;

    // Send a POST request to the server to register the user using the prod environment URL
    this.http.post(registerAuthProdUrl, this.user).subscribe((response: any) => {
      this.responseMessage = response.message;

      // If the account was successfully created, navigate to the homepage
      if (this.responseMessage == "Account successfully created") {
        this.router.navigate(['/']);
      }
    });
  }
}
