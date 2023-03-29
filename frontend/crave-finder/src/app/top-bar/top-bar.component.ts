import { Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent 
{
  isLoggedIn: boolean;

  constructor() 
  {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }
}
