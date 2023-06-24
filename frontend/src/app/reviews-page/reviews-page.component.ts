import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Rating } from '../restaurants'

/*interface Rating {
  rating: number;
  restaurant: string;
  food: string;
  user_id: string;
}*/

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.css']
})
export class ReviewsPageComponent {
  ratings: Rating[] = [];
  username: string = '';

  constructor(private http: HttpClient) { }

  getUserRatings() {
    console.log(this.username);
    const params = new HttpParams().set('username', this.username);
    this.http.get<Rating[]>('http://localhost:8080/get-user-ratings?user_id=', {params}).subscribe(
      data => {
        this.ratings = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
