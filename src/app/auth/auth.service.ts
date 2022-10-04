import { Injectable } from '@angular/core';
import {User} from "../model/User/user.model";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../services/User/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : User;
  users : User[] = null;
  errorEmitter : Subject<string> = new Subject<string>();
  authChange : Subject<boolean> = new Subject<boolean>();
  userSubject : BehaviorSubject<User[]>=null;
  subscriptionUser : Subscription = null;

  constructor(private http : HttpClient, private router : Router, private userService: UserService) { }

  login(credentials : {username : string, password: string}){

    this.userSubject=this.userService.getUsers();
    this.subscriptionUser=this.userSubject
      .subscribe(res => {
        this.users=res;
      });


    new Observable(observer => {
      setTimeout(()=>{
        let u = this.users.find(u => u.username==credentials.username && u.password==credentials.password);
        observer.next(u);
      },1000);
    }).subscribe( (user : User)=>{


      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.authChange.next(true);
        this.router.navigate(['/tools']).then(() => {
          window.location.reload();
        });
      } else {
        this.errorEmitter.next('Wrong credentials!');
        alert("Wrong credentials!");

      }

    });
  }

  logout(){
    this.user=null;
    localStorage.removeItem('user');
    this.authChange.next(false);
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  getUser(){
    if (!this.user) this.user=JSON.parse(localStorage.getItem('user'));
    return {...this.user};
  }

  isAuthenticated(){
    return this.user!=null;
  }

}
