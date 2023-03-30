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
  isLoggedIn: boolean;

  user = {
    username: '',
    password: ''
  };

  constructor(private http:HttpClient, private UserService:UserService, private router: Router) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // TODO: Pass this functionality to the backend so it's more secure.
  }

  onSubmit(form: NgForm) {
    this.http.post('http://localhost:8080/loginauth', this.user).subscribe((response: any) => {
      this.responseMessage = response.message;
      if (response.message == 'Logged in')
      {
        console.log('Login success!');
        this.UserService.setUser(this.user);
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userinfo', this.user.username);
        console.log(this.isLoggedIn);
        this.router.navigate(['/']);
        // TODO: Make sure top bar is updated when ever a login is successful!
      }
      else
      {
        console.log('Login failed!');
        console.log(this.isLoggedIn);
      }
    });
  }
}
