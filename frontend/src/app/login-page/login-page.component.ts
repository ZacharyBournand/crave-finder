import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private UserService:UserService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    this.http.post('http://localhost:8080/loginauth', this.user).subscribe((response: any) => {
      console.log(response),
      this.responseMessage = response.message;

      if (this.responseMessage == "Logged in") {
        this.UserService.setUser(this.user);

        // Navigate to the homepage
        this.router.navigate(['/']);
      }
    });
  }
}