import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})

export class UserRegistrationComponent {
  responseMessage: string = '';

  user = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm) {
    this.http.post('http://localhost:8080/registerauth', this.user).subscribe((response: any) => {
      console.log(response),
      this.responseMessage = response.message

      if (this.responseMessage == "Account successfully created") {
        // Navigate to the homepage
        this.router.navigate(['/']);
      }
    });
  }
}
