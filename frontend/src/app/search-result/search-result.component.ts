import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environment';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  // Holds the location entered by the user
  location = '';
  // Holds the search term entered by the user (restaurant name or food item)
  searchTerm = '';
  // Array to store the retrieved restaurants
  restaurants: any[] = [];
  // Controls the visibility of the table that lists the retrieved restaurants and their ratings
  tableVisible = false;
  // Holds the user information
  user: any;
  // Indicates if no restaurants were found
  noRestaurantsFound = false;


  constructor(
    private http: HttpClient,
    public userService: UserService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void{}

  filterRestaurants(): void {
    // Build the search query parameters
    const params = new HttpParams()
      .set('location', this.location)
      .set('term', this.searchTerm);

    // Get the restaurant search URL for local environment
    const restaurantSearchUrl = environment.restaurantSearchUrl;
    // Get the restaurant search URL for prod environment
    const restaurantSearchProdUrl = environment.restaurantSearchProdUrl;

    // Make an HTTP GET request to the searchRestaurantsHandler endpoint using the prod environment URL
    this.http.get(restaurantSearchProdUrl, { params }).subscribe({
      next: (data: any) => {
        // Store the restaurants data in a class variable
        this.restaurants = data;
        this.tableVisible = true;
        // Check if no restaurants were found
        this.noRestaurantsFound = this.restaurants.length === 0;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  isLoggedIn(restaurant: any): boolean {
    // Get the user from UserService
    this.userService.getUser.subscribe(usr => (this.user = usr));

    // If the user is not logged in, a message pops up to notify them
    if(!this.user)
    {
      console.error('You are not logged in!');

      this.dialog.open(PopupMessageComponent, {
        data: { message: 'You are not logged in.' }
      });

      return false;
    } else {
      // Navigate to the restaurant's details page
      this.router.navigateByUrl('/restaurant/' + restaurant.name);
      return true;
    }
  }
}