import { Component, SimpleChanges } from '@angular/core';
import { UserService } from '../user.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit
{
  isLoggedIn: boolean;
  user: any

  constructor(private UserService:UserService) 
  {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.UserService.getUser.subscribe(usr => this.user = usr);
  }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') == 'true')
    {
      this.isLoggedIn = true;
    }
  }

}
