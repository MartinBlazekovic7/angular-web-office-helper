import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User/user.model";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLogged: User;
  authenticated: Boolean;
  authChangeSubscription : Subscription;

  selected: String = 'Tools';

  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.userLogged = this.auth.getUser();
    this.authenticated=this.auth.isAuthenticated();
    this.authChangeSubscription=this.auth.authChange
      .subscribe(res => {
        this.authenticated=this.auth.isAuthenticated();
      });

  }

  logout(){
    this.auth.logout();
  }

}
