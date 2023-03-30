import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ratings, Restaurant } from '../userrating';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.css']
})
export class UserRatingComponent {
  restaurant !: Restaurant;
  username: any
  password: any

  
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  responseMessage: string = '';


  ngOnInit(): void {

    const name = this.route.snapshot.paramMap.get('name');
    let restaurant_check = ratings.find(r => r.name === name);
    if (restaurant_check)
    {
      this.restaurant = restaurant_check as Restaurant;
    }
  }

  getClick() {
    this.username = localStorage.getItem('userinfo');
    this.password = localStorage.getItem('userinfo2');
    
    this.http.post('http://localhost:8080/rating', [this.username, this.password]).subscribe((response: any) => {
      console.log(response),
      this.responseMessage = response.message
    });
  }
}
