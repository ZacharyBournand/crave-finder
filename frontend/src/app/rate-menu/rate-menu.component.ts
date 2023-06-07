import { Component, Inject} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, NgForm } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialogModule, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { Form } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'

@Component({
  selector: 'app-rate-menu',
  templateUrl: './rate-menu.component.html',
  styleUrls: ['./rate-menu.component.css']
})
export class RateMenuComponent {
  form: FormGroup;
  user: any;
  constructor(private http: HttpClient, public userService: UserService, 
    public dialogRef: MatDialogRef<RateMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = new FormGroup({})
    console.log(data);
    console.log("Kaeya Balls");
  }


  close(): void {
    this.dialogRef.close();
    }

  submit(): void {
    this.userService.getUser.subscribe(usr => this.user = usr)

    if(!this.user)
    {
      console.error('You are not logged in!');
      return;
    }
    
    const url = 'http://localhost:8080/storeRatingAuth';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('restaurant', this.restaurantName)
      .set('dish', this.selectedDish)
      .set('rating', this.rating)
      .set('username', this.user.username)

    this.http.post(url, {}, {headers, params}).subscribe(
      res => {
        console.log('Dish rating stored');
      },

      err => {
        console.error('Error storing dish rating', err);
      }

    );
        this.dialogRef.close();
  }

    selectedDish: string = "";
    restaurantName: string = this.data[1];
    rating: number = 0;

}
