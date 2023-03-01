import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{

  username : any;
  password : any;


  constructor(private httpClient: HttpClient) {}

  sendID() {
    const body = {
      username: this.username,
      password: this.password
    };
    console.log(this.username);
    console.log(this.password)
    this.httpClient.post('http://localhost:8080/registerauth', body, {responseType: 'text'}).subscribe(response => {console.log(response)});
  }
}
