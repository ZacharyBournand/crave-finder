import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restaurants, Restaurant } from '../restaurants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { RateMenuComponent } from '../rate-menu/rate-menu.component';
import { NgForm } from '@angular/forms';

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
  categorySizes : any[][] = [[]];
  counter : number = 0;
  newDish: any;

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
  
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private http: HttpClient, public userService: UserService) { }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.height = '200px';

    const mergedConfig = {... dialogConfig, data: [this.menu, this.restaurantName]}

    this.dialog.open(RateMenuComponent, mergedConfig);
  }

  responseMessage: string = '';

  dish = {
    category: '',
    dishname: '',
    price: '',
    description: '',
  };

  dishAdd() {
    const name = this.route.snapshot.paramMap.get('name');
    if (this.dish.category != '' || this.dish.dishname != '' || this.dish.price != '' || this.dish.description != '')
    {
      console.log(this.restaurantName);
      console.log(this.dish.category);
      const params = new HttpParams()
      .set('name', this.restaurantName)
      .set('category', this.dish.category)
      .set('dishname', this.dish.dishname)
      .set('price', this.dish.price)
      .set('description', this.dish.description);
      this.http.post('http://localhost:8080/add-dish', params ).subscribe(() => {
        })
    };
  }

  dishRemove() {
    const name = this.route.snapshot.paramMap.get('name');
    if (this.dish.dishname != '')
    {
      const params = new HttpParams()
      .set('name', this.restaurantName)
      .set('category', this.dish.category)
      .set('dishname', this.dish.dishname)
      .set('price', this.dish.price)
      .set('description', this.dish.description);
      this.http.post('http://localhost:8080/remove-dish', {params}).subscribe(() => {
        
        })
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
      
      this.dishIndex = new Array(this.categories.length).fill(0);
      for (let i = 0; i < this.categories.length; i++) {
        this.categorySizes[i] = [];
      }
      console.log(this.categorySizes);

      for (let i = 0; i < this.categories.length; i++)
      {
        for (let j = 0; j < this.menu.length; j++)
        {
          if (this.menu[j].Category == this.categories[i])
          {
            console.log(this.menu[j]);
            this.categorySizes[i].push(this.menu[j]);
          }
        }
      }
      console.log(this.categorySizes)
      this.dishIndex = new Array(this.categories.length).fill(0);
    },
    error: (error: any) => {
      console.error(error);
    }
  })

  }
}
