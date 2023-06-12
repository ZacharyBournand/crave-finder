import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupMessageComponent } from '../popup-message/popup-message.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  location = '';
  searchTerm = '';
  restaurants: any[] = [];
  tableVisible = false;
  user: any;

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

    // Make an HTTP GET request to the searchRestaurantsHandler endpoint
    this.http.get('http://localhost:8080/restaurants/search', { params }).subscribe({
      next: (data: any) => {
        // Store the restaurants data in a class variable
        this.restaurants = data;
        this.tableVisible = true;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  isLoggedIn(restaurant: any): boolean {
    this.userService.getUser.subscribe(usr => (this.user = usr));

    console.log("HELLO-01")

    console.log("User: ", this.user)

    if(!this.user)
    {
      console.error('You are not logged in!');

      this.dialog.open(PopupMessageComponent, {
        data: { message: 'You are not logged in' }
      });

      return false;
    } else {
      this.router.navigateByUrl('/restaurant/' + restaurant.name);
      return true;
    }
  }
}