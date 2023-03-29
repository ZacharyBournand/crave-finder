// name of file will likely change, broad for now
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'http://localhost:8080/search';

  private criteria = new BehaviorSubject('');
  getCriteria = this.criteria.asObservable();

  private search = new BehaviorSubject('');
  getSearch = this.search.asObservable();

  constructor(private http: HttpClient) { }

  setCriteria(criteria: string) {
    this.criteria.next(criteria);
  }

  setSearch(search: string) {
    this.search.next(search);
  }

  getRestaurants(location: string, term: string): Observable<any> {
    const apiUrl = `http://localhost:8080/restaurants/search?location=${location}&term=${term}`;
    return this.http.get<any>(apiUrl);
  }
}
