import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  searchControl = new FormControl('');

  constructor(private appService:AppService) {}

  search : any;
  criteria : any;

  getSearch() {
    console.log(this.search); // For testing/demonstration purpose
    this.appService.setSearch(this.search);
  }
  getCriteria(type: string) {
    this.criteria = type;
    this.appService.setCriteria(this.criteria);
  }

  ngOnInit() {}    
  
}
