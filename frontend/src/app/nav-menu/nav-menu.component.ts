import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  responseMessage: string = '';

  @ViewChild('refLogoutLink', { static: false, read: ElementRef }) logoutLink!: ElementRef;

  constructor(
    private http: HttpClient, 
    public userService: UserService,
    private router: Router,
  ) {}

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
      this.userService.setUser(null);
      this.userService.isLoggedIn = false;

      // Reload the page
      //location.reload();

      // Clear any user-related data or perform any necessary cleanup
      //this.userService.clearUserData();

      // Redirect to the login page
      //this.router.navigate(['/login']);
    });
  }
}