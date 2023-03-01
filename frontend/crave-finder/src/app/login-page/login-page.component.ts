import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{

  username : any;
  password : any;

  getID() {
    let id = [this.username, this.password];
    console.log(this.username + " " + this.password); // For testing/demonstration purpose
    return id;
  }
}
