import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
    // Send a POST request to the server to register the user
    this.http.post('http://localhost:8080/registerauth', this.user).subscribe((response: any) => {
      this.responseMessage = response.message

      // If the account was successfully created, navigate to the homepage
      if (this.responseMessage == "Account successfully created") {
        this.router.navigate(['/']);
      }
    });
  }
}
