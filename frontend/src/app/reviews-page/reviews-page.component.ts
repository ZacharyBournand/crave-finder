import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Rating } from '../restaurants';
import { environment } from '../../environment';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.css']
})
export class ReviewsPageComponent {
  // Array to store the user's ratings
  ratings: Rating[] = [];
  // User input for the username
  username: string = '';
  // Boolean to indicate if there are no ratings
  noRatings: boolean = false;
  // Boolean to indicate if the user is not found
  userNotFound: boolean = false;
  // Username searched for to display in the header
  displayUsername: string = '';

  constructor(private http: HttpClient) { }

  getUserRatings() {
    // Set displayUsername when the button is clicked
    this.displayUsername = this.username;

    const params = new HttpParams().set('username', this.username);
    
    // Get the restaurant search URL for local environment
    const userRatingsUrl = environment.userRatingsUrl;
    // Get the restaurant search URL for prod environment
    const userRatingsProdUrl = environment.userRatingsProdUrl;

    this.http.get<Rating[]>(`${userRatingsProdUrl}?user_id=`, {params}).subscribe(
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
}
