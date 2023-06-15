import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject<any>(null);
  getUser = this.user.asObservable();
  isLoggedIn = false;

  constructor() { }

  setUser(newUser: any) {
    this.user.next(newUser);
    this.isLoggedIn = true;
  }

  getUsername(): string {
    return this.user.value?.username || '';
  }
}