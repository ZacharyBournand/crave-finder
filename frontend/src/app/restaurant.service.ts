import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from './restaurant';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    private baseUrl = 'http://localhost:8080/restaurants/search?location=${this.location}&term=${this.term}';

    constructor(private http: HttpClient) { }

    getRestaurants(): Observable<Restaurant[]>{
        return this.http.get<Restaurant[]>(this.baseUrl);
    }
}
