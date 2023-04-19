import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  responseMessage: string = '';

  user = {
    username: '',
    password: ''
  };

  @ViewChild('refLogoutLink', { static: false, read: ElementRef }) logoutLink!: ElementRef;

  constructor(private http: HttpClient, public userService: UserService) {}

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
    this.http.post('http://localhost:8080/logout', {}).subscribe((response: any) => {
      console.log(response);
      this.responseMessage = response.message;
      this.userService.isLoggedIn = false;
    });
  }
}
