import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject(undefined);
  getUser = this.user.asObservable();

  constructor() { }

  setUser(newUser: any) {
    this.user.next(newUser);
  }

}
