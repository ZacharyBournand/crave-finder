import { Component, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from 'src/environment';

@Component({
  selector: 'app-rate-menu',
  templateUrl: './rate-menu.component.html',
  styleUrls: ['./rate-menu.component.css']
})
export class RateMenuComponent {
  form: FormGroup;
  user: any;
  selectedDish: string = "";
  restaurantName: string = this.data[1];
  rating: number = 0;
  // Hold the dish information
  dish: any = {};

  constructor(
    private http: HttpClient,
    public userService: UserService,
    private router: Router,
    public dialogRef: MatDialogRef<RateMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({})
  }

  // Close the rating popup menu
  close() {
    this.dialogRef.close();
  }

  // Submit a rating
  submit() {
    // Get the user from UserService
    this.userService.getUser.subscribe(usr => (this.user = usr));

    // If the user is not logged in, return
    if(!this.user)
    {
      return;
    }

    // Get the restaurant search URL for local environment
    const storeRatingUrl = environment.storeRatingUrl;
    // Get the restaurant search URL for prod environment
    const storeRatingProdUrl = environment.storeRatingProdUrl;
    
    // Set the URL to store the rating
    const url = storeRatingProdUrl;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Set the parameters for the HTTP request
    const params = new HttpParams()
      .set('restaurant', this.restaurantName)
      .set('dish', this.selectedDish)
      .set('rating', this.rating.toString())
      .set('username', this.user.username)

    // Send the HTTP post request to store the rating using the prod environment URL
    this.http.post(url, {}, {headers, params}).subscribe(
      res => {
        console.log('Dish rating stored');

        // Assign the rating value to dish.Rating after successful submission
        this.dialogRef.close(this.rating);

        // Stay on the same page
        const currentURL = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          //this.router.navigate(['/restaurant/']);
          this.router.navigateByUrl(currentURL);
        });
      },
      err => {
        console.error('Error storing dish rating', err);
      }
    );
    
    this.dialogRef.close();
  }

  ngOnInit() {
    // Assign the received dish rating value to the dish.Rating property
    this.dish.Rating = this.data[2];
  } 
}
