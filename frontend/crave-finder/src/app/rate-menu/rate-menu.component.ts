import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rate-menu',
  templateUrl: './rate-menu.component.html',
  styleUrls: ['./rate-menu.component.css']
})
export class RateMenuComponent {


  constructor(private http: HttpClient, public userService: UserService) {}


}
