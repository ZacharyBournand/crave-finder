import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { environment } from '../../environment';

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
  // Meant to contain the password entered in the form
  password: string = '';
  // Meant to contain the user from UserService
  user: any;

  constructor(private http: HttpClient, private userService: UserService) {}

  // Function triggered when the form is submitted
  onSubmit(form: NgForm) {
    // Get the user from UserService
    this.userService.getUser.subscribe(usr => (this.user = usr));

    // If the user is not logged in, return
    if(!this.user)
    {
      return;
    }

    // Get authentication URL for local environment
    const passwordAuthUrl = environment.passwordAuthUrl;
    // Get authentication URL for prod environment
    const passwordAuthProdUrl = environment.passwordAuthProdUrl;

    // Send a POST request to the server to authenticate the username and password entered using the prod environment URL
    this.http.post(passwordAuthProdUrl, {
      // Get the username from UserService
      username: this.user.username,
      // Get the password from the form
      password: this.password,
    }).subscribe((response: any) => {
      // Set the response message
      this.responseMessage = response.message;

      // Display the new password button if the account credentials were confirmed
      if (this.responseMessage == "Account credentials confirmed!<br>Click on the button below to change your password.") {
        this.showNewPasswordButton = true;
      }
    });
  }
}