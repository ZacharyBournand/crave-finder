import { Component, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, NgForm } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialogModule, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { Form } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-rate-menu',
  templateUrl: './rate-menu.component.html',
  styleUrls: ['./rate-menu.component.css']
})
export class RateMenuComponent {
  form: FormGroup;
  user: any;

  constructor(
    private http: HttpClient, 
    public userService: UserService,
    private router: Router,
    public dialogRef: MatDialogRef<RateMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({})
    console.log(data);
    console.log("Kaeya Balls");
  }

  reloadPage() {
    location.reload();
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    console.log("HELLO-0")

    this.userService.getUser.subscribe(usr => (this.user = usr));

    console.log("HELLO-01")

    console.log("User: ", this.user)

    if(!this.user)
    {
      console.error('You are not logged in!');
      return;
    }

    console.log("HELLO-1")
    
    const url = 'http://localhost:8080/storeRatingAuth';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    console.log("HELLO-2")

    const params = new HttpParams()
      .set('restaurant', this.restaurantName)
      .set('dish', this.selectedDish)
      .set('rating', this.rating.toString())
      .set('username', this.user.username)

    console.log("HELLO-3")

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

  selectedDish: string = "";
  restaurantName: string = this.data[1];
  rating: number = 0;
  // Hold the dish information
  dish: any = {};
}
