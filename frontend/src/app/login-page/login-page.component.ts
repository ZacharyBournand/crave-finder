import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent{
  responseMessage: string = '';

  user = {
    username: '',
    password: ''
  };

  constructor(
    private http:HttpClient, 
    private userService:UserService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    // Get the search URL based on the environment
    const loginAuthUrl = environment.restaurantSearchUrl;

    // Send a POST request to the server with user credentials
    this.http.post(loginAuthUrl, this.user).subscribe((response: any) => {
      this.responseMessage = response.message;

      if (this.responseMessage == "Logged in") {
        // Set the logged-in user in the UserService
        this.userService.setUser(this.user);

        // Navigate to the homepage
        this.router.navigate(['/']);
      }
    });
  }
}
