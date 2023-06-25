import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rating } from '../restaurants'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { restaurants, Restaurant, Category, Dish } from '../restaurants';

@Component({
  selector: 'app-dish-ratings',
  templateUrl: './dish-ratings.component.html',
  styleUrls: ['./dish-ratings.component.css']
})
export class DishRatingsComponent implements OnInit {
  ratings: Rating[] = [];
  dishId: string = '';
  
  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const dishId = params['id'];
      console.log("dish ID:", dishId)

      const url = `http://localhost:8080/dish-ratings?dishId=${dishId}`;

      this.http.get<Rating[]>(url).subscribe(
        data => {
          this.ratings = data;
          console.log("Ratings: ", this.ratings)
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  goBack() {
    this.location.back();
  }
}
