import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../restaurants'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dish-ratings',
  templateUrl: './dish-ratings.component.html',
  styleUrls: ['./dish-ratings.component.css']
})
export class DishRatingsComponent implements OnInit {
  // Array to store the ratings
  ratings: Rating[] = [];
  // Variable to store the dish ID
  dishId: string = '';
  
  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Get the dish ID from the route parameters
      const dishId = params['id'];

      // Construct the URL for fetching ratings based on the dish ID
      const url = `http://localhost:8080/dish-ratings?dishId=${dishId}`;

      this.http.get<Rating[]>(url).subscribe(
        data => {
          // Store the fetched ratings in the 'ratings' array
          this.ratings = data;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  // Go back to the previous location in the browser's history
  goBack() {
    this.location.back();
  }
}
