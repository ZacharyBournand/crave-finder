import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{

  loginStatus : any;
  statusIndicator : any;
  user : any;
  loginRoute = 'login'; 
  constructor(private http:HttpClient, private UserService:UserService) {
    this.UserService.getUser.subscribe(u => this.user = u);
    console.log(this.user);
  }

  getStatus()
  {
    this.UserService.getUser.subscribe(u => this.user = u);
    if (this.user === undefined)
    {
      this.statusIndicator = 'Login' 
    }
    else
    {
      this.statusIndicator = 'Logout'
    }
    console.log(this.user)
  }

  logger()
  {
    if (this.statusIndicator === 'Login')
    {

    }
    if (this.statusIndicator === 'Logout')
    {
      this.logout();
    }
  }

  logout()
  {
  this.http.post('http://localhost:8080/logout', this.user).subscribe((response: any) => {
    console.log(response)
    this.UserService.setUser(undefined);
  });

  }

  ngOnInit() : void  {}
}
