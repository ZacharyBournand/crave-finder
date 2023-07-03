import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { environment } from 'src/environment';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
  providers: [HttpClient],
})
export class NewPasswordComponent {
  // Response message displayed in the template
  responseMessage: string = '';

  // User object containing username and password
  user = {
    username: '',
    password: '',
  };

  constructor(private http: HttpClient, private UserService: UserService) {}

  // Function triggered when the form is submitted
  onSubmit(form: NgForm) {
    // Get the password change URL for local environment
    const passwordChangeUrl = environment.passwordChangeUrl;
    // Get the password change URL for prod environment
    const passwordChangeProdUrl = environment.passwordChangeProdUrl;

    // Send a POST request to the server to change the user's password using the prod environment URL
    this.http.post(passwordChangeProdUrl, {
      username: this.user.username,
      password: this.user.password,
    }).subscribe((response: any) => {
      // Set the response message
      this.responseMessage = response.message
      // Set the user in the UserService
      this.UserService.setUser(this.user);
    });
  }
}