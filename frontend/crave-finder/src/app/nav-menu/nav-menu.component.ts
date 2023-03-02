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

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent /*implements AfterViewInit*/ {
  responseMessage: string = '';

  user = {
    username: '',
    password: ''
  };

  @ViewChild('refLogoutLink', { static: false, read: ElementRef }) logoutLink!: ElementRef;

  constructor(private http: HttpClient/*, private renderer: Renderer2, private el: ElementRef*/) {}

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

  logout(): void {
    // Log the user out
    //this.isAuthenticated = false;
    this.http.post('http://localhost:8080/logout', {}).subscribe((response: any) => {
      console.log(response);
      this.responseMessage = response.message;
    });
  }
}