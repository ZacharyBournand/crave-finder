// name of file will likely change, broad for now
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private criteria = new BehaviorSubject('');
  getCriteria = this.criteria.asObservable();

  private search = new BehaviorSubject('');
  getSearch = this.search.asObservable();

  constructor() { }

  setCriteria(criteria: string) {
    this.criteria.next(criteria);
  }

  setSearch(search: string) {
    this.search.next(search);
  }

}
