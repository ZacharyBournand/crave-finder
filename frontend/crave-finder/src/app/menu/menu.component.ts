import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restaurants, Restaurant } from '../restaurants';
import { HttpClient, HttpParams } from '@angular/common/http';

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
}
