import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ratings, Restaurant } from '../userrating';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.css']
})
export class UserRatingComponent {
  restaurant !: Restaurant;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    const name = this.route.snapshot.paramMap.get('name');
    let restaurant_check = ratings.find(r => r.name === name);
    if (restaurant_check)
    {
      this.restaurant = restaurant_check as Restaurant;
    }
  }
}
