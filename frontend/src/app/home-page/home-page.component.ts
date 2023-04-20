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

  getSearch() {
    console.log(this.search);
    this.appService.setSearch(this.search);
  }

  ngOnInit() {}    
}
