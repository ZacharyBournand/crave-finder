import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Restaurant, ratings } from '../userrating';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.css']
})
export class ReviewsPageComponent implements OnInit{

  user: any;
  restaurantList : Array<any> = [];
  constructor(private UserService:UserService) {
    this.UserService.getUser.subscribe(usr => this.user = usr);
    for (let index = 0; index<ratings.length; index++)
    {
        this.restaurantList.push(ratings[index]);
    }
  this.restaurantList = this.restaurantList.sort((a, b) => ((a.rating1 + a.rating2 + a.rating3)/3 > (b.rating1 + b.rating2 + b.rating3)/3 ? -1 : 1));
}

ngOnInit(): void { } 


}
