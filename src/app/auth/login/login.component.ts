import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../../model/User/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage : string = null;
  signinForm : FormGroup;
  authChangeSubscription : Subscription;

  currentUser: User;

  constructor(private http: HttpClient, private auth : AuthService, private router: Router) { }

  ngOnInit() {

    this.currentUser = this.auth.getUser();
    if(this.currentUser != null) this.router.navigate((['/tools']))

    this.authChangeSubscription=this.auth.authChange
      .subscribe(res => {
        if(this.auth.isAuthenticated()) this.router.navigate(['/tools'])
      });


    this.signinForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required])
    });

    this.auth.errorEmitter
      .subscribe((error : string) => {
        this.errorMessage = error;
      });
  }


  onLogin(){
    this.auth.login(this.signinForm.value);

  }

  navigate(){
    this.router.navigate(['/register']);
  }

}
