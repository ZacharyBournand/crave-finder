import { Component, Inject} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, NgForm } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatDialogModule, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
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
  constructor(private http: HttpClient, public userService: UserService, public dialogRef: MatDialogRef<RateMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = new FormGroup({})
    console.log(data);
    console.log("Kaeya Balls");
  }


  close(): void {
    this.dialogRef.close();
    }

  submit(): void {
    const params = new HttpParams()
      .set('name', this.selectedDish)
      .set('restuarantName', this.restaurantName)
      .set('rating', this.rating);
      this.http.post('http://localhost:8080/rating-submit', {params}).subscribe(() => {});
      this.dialogRef.close();
  }

    selectedDish: string = "";
    restaurantName: string = this.data[1];
    rating: number = 0;

}
