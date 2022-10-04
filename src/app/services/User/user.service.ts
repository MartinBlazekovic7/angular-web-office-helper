import { Injectable } from '@angular/core';
import {User} from "../../model/User/user.model";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../../shared/data.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users : User[] = [];
  userSubject : BehaviorSubject<User[]> = new BehaviorSubject(null);


  constructor(private dataService: DataService) {
    this.init();
  }

  init(){
    this.dataService.getUsers()
      .subscribe(res => {
        this.users = res;
        this.userSubject.next([...this.users]);
      })
  }

  getUsers(){
    return this.userSubject;
  }

  addUser(user){
    this.dataService.addUser(user)
      .subscribe((res => {
        this.users.push(user);
        this.userSubject.next([...this.users]);
      }))
  }

}
