import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject(undefined);
  getUser = this.user.asObservable();
  isLoggedIn = false

  constructor() { }

  setUser(newUser: any) {
    this.user.next(newUser);
    this.isLoggedIn = true;
  }

  getUserId(): string {
    let userId = '';
    this.getUser.subscribe(user => {
      if (user) {
        //userId = user.username;
      }
    });
    return userId;
  }
}
