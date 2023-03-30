import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})

export class UserSettingsComponent {
  responseMessage: string = '';
  buttonVisible = false;

  user = {
    username: '',
    password: '',
  };

  constructor(private http: HttpClient, private UserService: UserService) {}

  onSubmit(form: NgForm) {
    this.http.post('http://localhost:8080/passwordauth', {
      username: this.user.username,
      password: this.user.password,
    }).subscribe((response: any) => {
      console.log(response),
      this.responseMessage = response.message
      this.UserService.setUser(this.user);

      if (this.responseMessage = "Account credentials confirmed! Please click on the button below to change your password.") {
        this.buttonVisible = true;
      }
    });
  }
}