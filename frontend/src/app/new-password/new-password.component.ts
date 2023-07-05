import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { environment } from 'src/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
  providers: [HttpClient],
})
export class NewPasswordComponent {
  // Response message displayed in the template
  responseMessage: string = '';
  // Meant to contain the password entered in the form
  password: string = '';
  // Meant to contain the user from UserService
  user: any;

  constructor(
    private http: HttpClient, 
    private userService: UserService,
    private router: Router,
  ) {}

  // Function triggered when the form is submitted
  onSubmit(form: NgForm) {
    // Get the user from UserService
    this.userService.getUser.subscribe(usr => (this.user = usr));

    // If the user is not logged in, return
    if(!this.user)
    {
      return;
    }

    // Get the password change URL for local environment
    const passwordChangeUrl = environment.passwordChangeUrl;
    // Get the password change URL for prod environment
    const passwordChangeProdUrl = environment.passwordChangeProdUrl;

    // Send a POST request to the server to change the user's password using the prod environment URL
    this.http.post(passwordChangeProdUrl, {
      // Get the username from UserService
      username: this.user.username,
      // Get the password from the form
      password: this.password,
    }).subscribe((response: any) => {
      // Set the response message
      this.responseMessage = response.message;
      
      // Set the response message
      if (this.responseMessage == "Password updated successfully") {
        // Navigate to the homepage
        this.router.navigate(['/']);

        // Set the user in the UserService
        this.userService.setUser(this.user);
      }
    });
  }
}