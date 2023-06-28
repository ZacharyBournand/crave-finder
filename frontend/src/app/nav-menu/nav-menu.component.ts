import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  responseMessage: string = '';

  // Reference to the logout hyperlink in the template
  @ViewChild('refLogoutLink', { static: false, read: ElementRef }) logoutLink!: ElementRef;

  constructor(
    private http: HttpClient, 
    public userService: UserService,
  ) {}

  // After the view has been initialized
  ngAfterViewInit() {
    // Find the logout hyperlink in the DOM
    const logoutLink = document.querySelector('a.logout') as HTMLElement;

    // Add a click event listener to the logout hyperlink
    if (logoutLink) {
      logoutLink.addEventListener('click', (event: Event) => {
        event.preventDefault();
        this.logout();
      });
    }
  }

  // Method to handle user logout
  logout(): void {
    // Send a POST request to the server to log the user out
    this.http.post('http://localhost:8080/logout', {}).subscribe((response: any) => {
      // Store the response message
      this.responseMessage = response.message;
      // Clear the user information in the UserService
      this.userService.setUser(null);
      // Set isLoggedIn to false
      this.userService.isLoggedIn = false;
    });
  }
}