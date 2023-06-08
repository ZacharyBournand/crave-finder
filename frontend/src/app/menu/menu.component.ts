import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restaurants, Restaurant, Category, Dish } from '../restaurants';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UserService } from '../user.service'
import { error } from 'cypress/types/jquery';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  dishRating : number = 0;
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
  
  constructor(
    private dialog: MatDialog, 
    private route: ActivatedRoute, 
    private http: HttpClient, 
    public userService: UserService, 
    private router: Router,
  ) { }
  

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.height = '200px';

    const mergedConfig = {... dialogConfig, data: [this.menu, this.restaurantName, this.dishRating]}

    const dialogRef = this.dialog.open(RateMenuComponent, mergedConfig);

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result) {
        this.dishRating = result;
      }
    });
  }

  responseMessage: string = '';

  dish = {
    category: '',
    dishname: '',
    price: '',
    description: '',
  };

  checkIfCreated()
  {
    const name = this.route.snapshot.paramMap.get('name');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams()
    .set('name', this.restaurantName);
    this.http.post('http://localhost:8080/add-restaurant', {}, {headers, params} ).subscribe(
      res => {
        console.log('Restaurant created');
      },

      err => {
        console.error('Error creating restaurant', err);
      })
  }

  filterDishesByCategory(category: number) {
    return this.categorySizes[category].slice(this.dishIndex[category], this.dishIndex[category] + 4);
  }

  reloadPage() {
    location.reload();
  }

  /*dishAdd() {
    const name = this.route.snapshot.paramMap.get('name');
    if (this.dish.category != '' || this.dish.dishname != '' || this.dish.price != '' || this.dish.description != '')
    {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      console.log(this.restaurantName);
      console.log(this.dish.category);
      const params = new HttpParams()
      .set('name', this.restaurantName)
      .set('category', this.dish.category)
      .set('dishname', this.dish.dishname)
      .set('price', this.dish.price)
      .set('description', this.dish.description);
      this.http.post('http://localhost:8080/add-dish', {}, {headers, params}).subscribe(
        (res: any) => {
          /*console.log('Dish added');
          const categoryIndex = this.categories.findIndex(cat => cat === res.category);
          
          if (categoryIndex !== -1) {
            this.categorySizes[categoryIndex].push(res);
          }*/

          // Reset the form or clear the input fields
          /*this.dish = {
              category: '',
              dishname: '',
              price: '',
              description: '',
          };*/

          /*console.log('Dish added', res);
          const categoryIndex = this.categories.findIndex(cat => cat === res.category);
    
          if (categoryIndex !== -1) {
            this.categorySizes[categoryIndex].push(res); // Assuming categorySizes is an array of arrays, each holding dishes of a specific category
          }
    
          // Reset the form or clear the input fields
          this.dish = {
            category: '',
            dishname: '',
            price: '',
            description: '',
          };
        },

        err => {
          console.error('Error storing dish', err);
        }
      )
    };
  }*/

  dishAdd() {
    if (
      this.dish.category !== '' ||
      this.dish.dishname !== '' ||
      this.dish.price !== '' ||
      this.dish.description !== ''
    ) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
      const params = new HttpParams()
        .set('name', this.restaurantName)
        .set('category', this.dish.category)
        .set('dishname', this.dish.dishname)
        .set('price', this.dish.price)
        .set('description', this.dish.description);
  
      this.http
        .post('http://localhost:8080/add-dish', {}, { headers, params })
        .subscribe(
          (res: any) => {
            console.log('Dish added', res);
            const categoryIndex = this.categories.findIndex(cat => cat === res.category);
  
            if (categoryIndex !== -1) {
              this.categorySizes[categoryIndex].push(res); // Assuming categorySizes is an array of arrays, each holding dishes of a specific category
            }
  
            // Reset the form or clear the input fields
            this.dish = {
              category: '',
              dishname: '',
              price: '',
              description: '',
            };

            // Reload the page
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/restaurant/']);
            });
          },
          (err) => {
            console.error('Error storing dish', err);
          }
        );
    }
  }    

  dishRemove() {
    const name = this.route.snapshot.paramMap.get('name');
    if (this.dish.dishname != '')
    {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams()
      .set('name', this.restaurantName)
      .set('dishname', this.dish.dishname)
      this.http.post('http://localhost:8080/remove-dish', {}, {headers, params}).subscribe(
        res => {
        console.log('Dish removed');
      },
      err => {
        console.error('Error removing dish', err);
      })
    }
  }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.restaurantName = name;
    }

    const params = new HttpParams().set('name', this.restaurantName);
    this.http.get('http://localhost:8080/get-restaurant-info', { params }).subscribe({
    next: (data: any) => {
      // Store the restaurants data in a class variable
      this.menu = data;

      if (this.menu === null) {
        console.log('Restaurant name added to the database');
      } else {
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
      }
    },
    error: (error: any) => {
      console.error(error);
    }
  })
}
}
