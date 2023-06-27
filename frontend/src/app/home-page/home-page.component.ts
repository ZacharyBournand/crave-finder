import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { UserService } from '../user.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private appService:AppService, public userService: UserService) {}

  search : any;
  criteria : any;

  // Function to handle restaurant search button click
  getSearch() {
    this.appService.setSearch(this.search);
  }
}
