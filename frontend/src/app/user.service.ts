import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new BehaviorSubject<any>(null);
  getUser = this.user.asObservable();
  isLoggedIn = false;

  constructor() {
    // Check if the user is already logged in based on the presence of a user in localStorage
    const user = localStorage.getItem('user');
    if (user) {
      this.user.next(JSON.parse(user));
      this.isLoggedIn = true;
    }
  }

  setUser(newUser: any) {
    this.user.next(newUser);
    this.isLoggedIn = true;
    // Store the user in localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  getUsername(): string {
    return this.user.value?.username || '';
  }

  logout() {
    this.user.next(null);
    this.isLoggedIn = false;
    // Remove the user from localStorage on logout
    localStorage.removeItem('user');
  }
}