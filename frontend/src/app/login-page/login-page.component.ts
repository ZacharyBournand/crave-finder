import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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
    // Send a POST request to the server with user credentials
    this.http.post('http://localhost:8080/loginauth', this.user).subscribe((response: any) => {
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
