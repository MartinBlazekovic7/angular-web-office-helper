import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {UserService} from "../../services/User/user.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {User} from "../../model/User/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users : User[] = null;
  user : User = null;
  userSubject : BehaviorSubject<User[]>=null;
  subscriptionUser : Subscription = null;
  registerForm : FormGroup;

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {

    this.userSubject=this.userService.getUsers();
    this.subscriptionUser=this.userSubject
      .subscribe(res => {
        this.users=res;
      });

    this.registerForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'password' : new FormControl(null, [Validators.required]),
      'password2' : new FormControl(null, [Validators.required]),
      'fname' : new FormControl(null, [Validators.required]),
      'lname' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.required,  Validators.email])
    });
  }

  onSubmit(){

    let id = this.users.length == 0 ? 1 : this.users.length;

    if(this.registerForm.value.password == this.registerForm.value.password2){

      let tempUser: User = {
        idUser: id,
        username: this.registerForm.value.username,
        firstName: this.registerForm.value.fname,
        lastName: this.registerForm.value.lname,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        location: '',
        currentWorkplaceId: 0,
        role: 1
      }

      this.userService.addUser(tempUser);
      this.registerForm.reset();
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
      alert("Registered succesfully.");
    }
    else{

      alert("Passwords must match.");
    }
  }

}
