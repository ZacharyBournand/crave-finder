import { Component } from '@angular/core';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  responseMessage: string = '';
  buttonVisible = false;

  user = {
    username: '',
    password: '',
  };
  //user: any

  constructor(/*private http: HttpClient, private UserService: UserService*/) {}

  /*onSubmit(form: NgForm) {
    this.http.post('http://localhost:8080/passwordauth', {
      username: this.user.username,
      password: this.user.password,
    }).subscribe((response: any) => {
      console.log(response),
      this.responseMessage = response.message
      this.UserService.setUser(this.user);
    });
  }*/
}
