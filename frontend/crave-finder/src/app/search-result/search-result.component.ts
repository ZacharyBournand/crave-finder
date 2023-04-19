import { TypeofExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HomePageComponent } from '../home-page/home-page.component';
import { Restaurant, restaurants } from '../restaurants';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit{

  restaurantList : Array<any> = [];
  search: any;
  criteria: any;
  

  constructor(private appService:AppService) {   // TIMTOWTDI! The searching is very rudimentary. There's probably a better open-source solution to be found at a later date. 
    this.appService.getCriteria.subscribe(crit => this.criteria = crit.toLowerCase());
    this.appService.getSearch.subscribe(srch => this.search = srch.toLowerCase());
    console.log(this.criteria); 
    console.log(this.search);

    if (this.criteria === 'dish') // will have to include tags too in future + remove case sensitivity
    {
      for (let index = 0; index<restaurants.length; index++) //I could not figure out how to get a forEach loop working with the current structure of restaurants.ts
      {
        for(let j = 0; j<restaurants[index].categories.length; j++)
        {
          for(let w = 0; w<restaurants[index].categories[j].dishes.length; w++)
          {
            if (restaurants[index].categories[j].dishes[w].name.toLowerCase() === this.search)
            {
              if (!(this.restaurantList.includes(restaurants[index]))) //So repeated tags/dish names don't add duplicates to results list
              {
                this.restaurantList.push(restaurants[index]);
              }
            }
          }
        }
      }
    }

    if (this.criteria === 'name')
    {
      for (let index = 0; index<restaurants.length; index++) //Same as above
      {
        if (restaurants[index].name.toLowerCase().includes(this.search))
        {
          this.restaurantList.push(restaurants[index]);
        }
      }
    }
    this.restaurantList = this.restaurantList.sort((a, b) => ((a.rating1 + a.rating2 + a.rating3)/3 > (b.rating1 + b.rating2 + b.rating3)/3 ? -1 : 1));
}

  ngOnInit(): void { } 
  
}
