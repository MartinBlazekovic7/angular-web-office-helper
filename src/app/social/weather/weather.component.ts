import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/Weather/weather.service";
import {Location} from "../../model/Weather/location.model";
import {Forecast} from "../../model/Weather/forecast.model";
import {faCloud} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../model/User/user.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  locations: Location[] = [];
  searchTerm: String = '';
  forecast: Forecast = null;
  selectedLocation: Location;
  todaysDate: Date;
  searching: Boolean = false;
  faCloud = faCloud;

  currentUser: User;


  constructor(private weatherService: WeatherService, private auth: AuthService) { }

  ngOnInit() {

    this.currentUser = this.auth.getUser();
    if(this.currentUser != null){
      if(this.currentUser.location !== null){
        this.searchTerm = this.currentUser.location;
        this.getLocation();
      }
    }

    this.todaysDate = new Date();
    console.log(this.todaysDate.toDateString());
  }


  getLocation(){

    this.searching = true;

    this.weatherService.getLocation(this.searchTerm)
      .subscribe(response => {
        this.locations = response;
        console.log(this.locations);
        this.searchTerm = '';
      });
  }

  getForecast(locationKey){

    if(this.currentUser.location !== ''){
      this.currentUser.location = this.searchTerm;
    }

    this.weatherService.getForecast(locationKey)
      .subscribe(response => {
        this.forecast = response;
        this.locations = [];
        console.log(this.forecast);
      })
  }


}
