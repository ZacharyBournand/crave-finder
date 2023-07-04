import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupMessageComponent } from '../confirmation-popup-message/confirmation-popup-message.component';
import { environment } from '../../environment';

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
    private dialog: MatDialog
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
  logout() {
    // Get the logout URL for local environment
    const logoutUrl = environment.logoutUrl;
    // Get the logout URL for prod environment
    const logoutProdUrl = environment.logoutProdUrl;

    // Send a POST request to the server to log the user out
    this.http.post(logoutProdUrl, {}).subscribe((response: any) => {
      // Store the response message
      this.responseMessage = response.message;
      // Call the logout() method from UserService
      this.userService.logout();
    });
  }

  // Method to handle account deletion
  deleteAccount() {
    this.dialog.open(ConfirmationPopupMessageComponent, {
      data: { message: 'Confirm Account Deletion' }
    });
  }
}