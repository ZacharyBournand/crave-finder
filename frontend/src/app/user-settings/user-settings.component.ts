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
  // Response message displayed in the template
  responseMessage: string = '';
  // Visibility state of the new password button
  showNewPasswordButton = false;

  // User object containing username and password
  user = {
    username: '',
    password: '',
  };

  constructor(private http: HttpClient, private UserService: UserService) {}

  // Function triggered when the form is submitted
  onSubmit(form: NgForm) {
    // Send a POST request to the server to authenticate the username and password entered
    this.http.post('http://localhost:8080/passwordauth', {
      username: this.user.username,
      password: this.user.password,
    }).subscribe((response: any) => {
      // Set the response message
      this.responseMessage = response.message
      // Set the user in the UserService
      this.UserService.setUser(this.user);

      // Display the new password button if the account credentials were confirmed
      if (this.responseMessage == "Account credentials confirmed!<br>Click on the button below to change your password.") {
        this.showNewPasswordButton = true;
      }
    });
  }
}