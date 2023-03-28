import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

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
