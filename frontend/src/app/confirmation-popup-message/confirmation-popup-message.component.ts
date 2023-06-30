import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-popup-message',
  templateUrl: './confirmation-popup-message.component.html',
  styleUrls: ['./confirmation-popup-message.component.css']
})
export class ConfirmationPopupMessageComponent {
  user: any;

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http:HttpClient, 
    private userService:UserService,
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmationPopupMessageComponent>
  ) {}

  deleteAccount() {
    // Get the user from UserService
    this.userService.getUser.subscribe(usr => (this.user = usr));

    console.log(this.user)

    // If the user is not logged in, return
    if(!this.user)
    {
      return;
    }

    // Set the URL to delete a user
    const url = 'http://localhost:8080/delete-account';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Set the parameters for the HTTP request
    const params = new HttpParams()
      .set('username', this.user.username)

    // Send the HTTP post request to delete the user
    this.http.post(url, {}, {headers, params}).subscribe(
      res => {
        // Clear the user information in the UserService
        this.userService.setUser(null);
        // Set isLoggedIn to false
        this.userService.isLoggedIn = false;
      
        // Navigate to the homepage
        this.router.navigate(['/']);
      },
      err => {
        console.error('Error deleting the user', err);
      }
    );

    this.dialogRef.close();
  }

  // Close the rating popup menu
  cancel() {
    this.dialogRef.close();
  }
}
