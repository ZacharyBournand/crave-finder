import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Rating } from '../restaurants'

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.css']
})
export class ReviewsPageComponent {
  ratings: Rating[] = [];
  username: string = '';
  noRatings: boolean = false;
  userNotFound: boolean = false;
  displayUsername: string = '';

  constructor(private http: HttpClient) { }

  getUserRatings() {
    console.log(this.username);
    // Set displayUsername when the button is clicked
    this.displayUsername = this.username;
    const params = new HttpParams().set('username', this.username);
    this.http.get<Rating[]>('http://localhost:8080/get-user-ratings?user_id=', {params}).subscribe(
      data => {
        this.ratings = data;
        // Check if ratings array is empty
        this.noRatings = this.ratings.length === 0;        
        // Reset userNotFound
        this.userNotFound = false;
      },
      error => {
        if (error.status === 404) {
          // Set userNotFound to true
          this.userNotFound = true;
          // Clear the ratings array
          this.ratings = [];
        } else {
          console.log(error);
        }
      }
    );
    
    // Reset noRatings immediately when calling the API
    this.noRatings = false;
  }

  /*onUsernameChange() {
    // Reset noRatings when the username changes
    this.noRatings = false;
  }*/
}
