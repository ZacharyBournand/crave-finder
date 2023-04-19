import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

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
}