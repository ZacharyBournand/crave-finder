import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restaurants, Restaurant } from '../restaurants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{
  dishIndex: number[] = [];
  restaurant !: Restaurant;
  restaurantName : string = "";
  menu: any[] = [];
  categories: string[] = [];
  categorySizes : number[] = [];
  counter : number = 0;

  lessDishes(i: number){
    this.dishIndex[i] -= 1;
  }

  moreDishes(i: number){
    this.dishIndex[i] += 1;
  }

  countUp(){
    this.counter++;
  }

  resetCount(){
    this.counter = 0;
  }
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private UserService:UserService) { }

  responseMessage: string = '';

  dish = {
    category: '',
    name: '',
    price: '',
    description: '',
  };

  dishAdd() {
    const name = this.route.snapshot.paramMap.get('name');
    if (this.dish.category != '' || this.dish.name != '' || this.dish.price != '' || this.dish.description != '')
    {

    }
  }

  dishRemove() {
    const name = this.route.snapshot.paramMap.get('name');
    if (this.dish.category != '' || this.dish.name != '' || this.dish.price != '' || this.dish.description != '')
    {
      
    }
  }

  ngOnInit(): void {

    const name = this.route.snapshot.paramMap.get('name');
    if (name)
      this.restaurantName = name;

    const params = new HttpParams()
      .set('name', this.restaurantName);
    this.http.get('http://localhost:8080/get-restaurant-info', { params }).subscribe({
    next: (data: any) => {
      // Store the restaurants data in a class variable
      this.menu = data;
      for (let i = 0; i < this.menu.length; i++)
      {
        this.categories.push(this.menu[i].Category);
      }
      this.categories = [... new Set(this.categories)];

      this.categorySizes = new Array(this.categories.length).fill(0);
      this.dishIndex = new Array(this.categories.length).fill(0);

      for (let i = 0; i < this.categories.length; i++)
      {
        for (let j = 0; j < this.menu.length; j++)
        {
          if (this.menu[j].Category == this.categories[i])
            this.categorySizes[i]++;
        }
        console.log(this.categorySizes)
      }
      this.dishIndex = new Array(this.categories.length).fill(0);
      console.log(this.menu)
    },
    error: (error: any) => {
      console.error(error);
    }
  })

  }
}
