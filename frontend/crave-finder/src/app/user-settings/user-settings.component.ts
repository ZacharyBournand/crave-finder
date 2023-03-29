import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit{
  responseMessage: string = '';

  passChange = {
    oldPassword: '',
    newPassword: ''
  };
  user: any

  constructor(private http: HttpClient, private UserService:UserService) {
    this.UserService.getUser.subscribe(usr => this.user = usr);
  }
  onSubmit(form: NgForm) {
    this.http.post('http://localhost:8080/', this.passChange).subscribe((response: any) => {
      console.log(response),
      this.responseMessage = response.message
    });
  }

  ngOnInit(): void {}

}
