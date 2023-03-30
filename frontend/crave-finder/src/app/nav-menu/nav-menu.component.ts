/*import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

}*/


import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
//import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent /*implements AfterViewInit*/ {
  responseMessage: string = '';

  isLoggedIn: boolean;

  user = {
    username: '',
    password: ''
  };

  @ViewChild('refLogoutLink', { static: false, read: ElementRef }) logoutLink!: ElementRef;

  constructor(private http: HttpClient, private router: Router/*, private renderer: Renderer2, private el: ElementRef*/) 
  {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  ngAfterViewInit() {
    const logoutLink = document.querySelector('a.logout') as HTMLElement;

    if (logoutLink) {
      console.log("logoutLink:", logoutLink);
      logoutLink.addEventListener('click', (event: Event) => {
        event.preventDefault();
        this.logout();
      });
    }
  }

  /*getStatus(): boolean {
    return this.authService.isLoggedIn();
  }*/

  openMenu(): void
  {
    console.log('Menu opened');
  }

  logout(): void {
    // Log the user out
    //this.isAuthenticated = false;
    this.http.post('http://localhost:8080/logout', {}).subscribe((response: any) => {
      console.log(response);
      this.responseMessage = response.message;
      this.isLoggedIn = false;
      localStorage.setItem('isLoggedIn', 'false');
      window.location.reload();
    });
  }
}