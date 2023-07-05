import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../restaurants';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RateMenuComponent } from '../rate-menu/rate-menu.component';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { environment } from '../../environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{
  // Array to store the current index of each category's displayed dishes
  dishIndex: number[] = [];
   // Variable to store restaurant information
  restaurant !: Restaurant;
  restaurantName : string = "";
  // Array to store food items
  menu: any[] = [];
  // Array to store unique dish categories
  categories: string[] = [];
  // Array to store the dishes in each category
  categorySizes : any[][] = [[]];
  counter : number = 0;
  dishRating : number = 0;
  newDish: any;
  user: any;

  lessDishes(i: number){
    this.dishIndex[i] -= 1;
  }

  moreDishes(i: number){
    this.dishIndex[i] += 1;
  }

  // Increase the counter variable
  countUp(){
    this.counter++;
  }

  // Reset the counter variable
  resetCount(){
    this.counter = 0;
  }
  
  constructor(
    private dialog: MatDialog, 
    private route: ActivatedRoute, 
    private http: HttpClient, 
    public userService: UserService, 
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }
  

  openDialog() {
    // Create a configuration object
    const dialogConfig = new MatDialogConfig();

    // Configure settings
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.height = '200px';

    // Merge additional data (menu, restaurantName, dishRating) with the dialog configuration
    const mergedConfig = {... dialogConfig, data: [this.menu, this.restaurantName, this.dishRating]}

    // Open the dialog with the merged configuration
    const dialogRef = this.dialog.open(RateMenuComponent, mergedConfig);

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result) {
        // Set the dishRating variable to the result of the dialog
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

  // Popup message that appears if the dish already exists
  openPopupMessage(message: string): void {
    this.dialog.open(PopupMessageComponent, {
      data: { message },
    });
  }

  // Filter the dishes by their category
  filterDishesByCategory(category: number) {
    return this.categorySizes[category].slice(this.dishIndex[category], this.dishIndex[category] + 4);
  }

  // Add a dish to a restaurant's menu
  dishAdd() {
    // Get the user from UserService
    this.userService.getUser.subscribe(usr => (this.user = usr));

    // If the user is not logged in, a message pops up to notify them
    if (!this.user)
    {
      console.error('You are not logged in!');

      this.dialog.open(PopupMessageComponent, {
        data: { message: 'You are not logged in.' }
      });

      return;
    // If every field contains an input, check if the 'Price' field input is a number
    // If 'Price' field input is a number, add the dish
    } else if (
      this.dish.category !== '' &&
      this.dish.dishname !== '' &&
      this.dish.price !== '' &&
      this.dish.description !== ''
    ) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      
      // Convert price to a number
      const price = parseFloat(this.dish.price);
      
      // If price input is not a number, pop up an error message
      if (isNaN(price)) {
        this.dialog.open(PopupMessageComponent, {
          data: { message: "Enter a number in the 'Price' field." }
        });

        return
      }

      const params = new HttpParams()
        .set('name', this.restaurantName)
        .set('category', this.dish.category)
        .set('dishname', this.dish.dishname)
        .set('price', this.dish.price)
        .set('description', this.dish.description);

      // Get the add dish URL for local environment
      const addDishUrl = environment.addDishUrl;
      // Get the add dish URL for prod environment
      const addDishProdUrl = environment.addDishProdUrl;
          
      // Make an HTTP POST request using the prod environment URL
      this.http.post(addDishProdUrl, {}, { headers, params }).subscribe(
        (res: any) => {      
          if (res.error === 'Dish already exists.') {
            // Display the pop-up message for dish already exists
            this.openPopupMessage(res.error);
          } else {
            console.log('Dish added', res);
            
            // Stay on the same page
            const currentURL = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigateByUrl(currentURL);
            });
          }
        },
        (err) => {
          console.error('Error storing dish', err);
        }
      );
    // If a field is empty, pop up an error message
    } else {
      this.dialog.open(PopupMessageComponent, {
        data: { message: 'Fill in every field.' }
      });
    }
  }

  // Remove a dish from a restaurant's menu
  dishRemove() {
    const name = this.route.snapshot.paramMap.get('name');
    // Get the user from UserService
    this.userService.getUser.subscribe(usr => (this.user = usr));

    // If the user is not logged in, a message pops up to notify them
    if(!this.user)
    {
      console.error('You are not logged in!');

      this.dialog.open(PopupMessageComponent, {
        data: { message: 'You are not logged in.' }
      });

      return;
    // Check if the dishname is not empty
    } else if (this.dish.dishname != '') {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      // Create parameters for the HTTP request
      const params = new HttpParams()
        .set('name', this.restaurantName)
        .set('dishname', this.dish.dishname)

      // Get the remove dish URL for local environment
      const removeDishUrl = environment.removeDishUrl;
      // Get the remove dish URL for prod environment
      const removeDishProdUrl = environment.removeDishProdUrl;
      
      // Send a POST request to remove the dish from a restaurant's menu using the prod environment URL
      this.http.post(removeDishProdUrl, {}, {headers, params}).subscribe(
        res => {
        console.log('Dish removed');

        // Stay on the same page
        const currentURL = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl(currentURL);
        });
      },
      err => {
        console.error('Error removing dish', err);
      })
    } else {
      this.dialog.open(PopupMessageComponent, {
        data: { message: "Fill in the 'Name' field." }
      });
    }
  }

  onSubmit(event: Event, action: string) {
    // Prevent the default form submission behavior
    event.preventDefault();

    if (action === 'add') {
      // Call the dishAdd() method when the "Add Dish" button is clicked
      this.dishAdd();
    } else if (action === 'remove') {
      // Call the dishRemove() method when the "Remove Dish" button is clicked
      this.dishRemove();
    }

    // Manually trigger change detection to update the view
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    // Get the user data
    this.userService.getUser.subscribe(usr => (this.user = usr));

    // Check if the user is not logged in
    if(!this.user)
    {
      console.error('You are not logged in!');
      return;
    }

    // Get the 'name' parameter from the current route snapshot and assign it to the 'name' variable
    const name = this.route.snapshot.paramMap.get('name');
    // Set the 'restaurantName' property to the value of the 'name' parameter
    if (name) {
      this.restaurantName = name;
    }

    // Create parameters for the HTTP request
    const params = new HttpParams()
      .set('name', this.restaurantName)
      .set('username', this.user.username)

    // Get the restaurant information retrieval URL for local environment
    const restaurantInfoUrl = environment.restaurantInfoUrl;
    // Get the restaurant information retrieval URL for prod environment
    const restaurantInfoProdUrl = environment.restaurantInfoProdUrl;

    // Send a GET request to retrieve restaurant information using the prod environment URL
    this.http.get(restaurantInfoProdUrl, { params }).subscribe({
    next: (data: any) => {
      // Store the restaurants data in a class variable
      this.menu = data;

      if (this.menu === null) {
        console.log('Restaurant name in the database');
      } else {
        // Extract unique dish categories from the menu data
        for (let i = 0; i < this.menu.length; i++)
        {
          this.categories.push(this.menu[i].Category);
        }
        this.categories = [... new Set(this.categories)];
        
        // Initialize the 'dishIndex' array with the length of 'categories' and set each element to 0
        this.dishIndex = new Array(this.categories.length).fill(0);

        // Initialize the 'categorySizes' array with empty arrays for each category
        for (let i = 0; i < this.categories.length; i++) {
          this.categorySizes[i] = [];
        }

        // Group food items into their respective categories
        for (let i = 0; i < this.categories.length; i++)
        {
          for (let j = 0; j < this.menu.length; j++)
          {
            if (this.menu[j].Category == this.categories[i])
            {
              this.categorySizes[i].push(this.menu[j]);
            }
          }
        }

        // Reset the 'dishIndex' array to start displaying dishes from the beginning of each category
        this.dishIndex = new Array(this.categories.length).fill(0);
      }
    },
    error: (error: any) => {
      console.error(error);
    }
  })
}
}
