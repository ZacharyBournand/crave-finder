import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restaurants, Restaurant, Category, Dish } from '../restaurants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {UserService} from '../user.service'
import { error } from 'cypress/types/jquery';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{
  restaurant !: Restaurant;
  
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

    const name = this.route.snapshot.paramMap.get('name');
    let restaurant_check = restaurants.find(r => r.name === name);
    if (restaurant_check)
    {
      this.restaurant = restaurant_check as Restaurant;
    }
  }

  rateDish(dish: Dish, user_id: string) {
    const url = 'http://localhost:8080/storeRatingAuth';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('restaurant', this.restaurant.name)
      .set('dish', dish.name)
      .set('rating', dish.rating.toString())
      .set('user_id', user_id)

    this.http.post(url, {}, {headers, params}).subscribe(
      res => {
        console.log('Dish rating stored');
      },

      err => {
        console.error('Error storing dish rating', err);
      }

    );
    
}
}

