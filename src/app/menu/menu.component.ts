import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restaurants, Restaurant } from '../restaurants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{
  restaurant !: Restaurant;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    const name = this.route.snapshot.paramMap.get('name');
    let restaurant_check = restaurants.find(r => r.name === name);
    if (restaurant_check)
    {
      this.restaurant = restaurant_check as Restaurant;
    }
  }
}
