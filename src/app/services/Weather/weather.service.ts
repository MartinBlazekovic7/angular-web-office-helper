import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Location} from "../../model/Weather/location.model";
import {Forecast} from "../../model/Weather/forecast.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  API_KEY = '?apikey=TBIGz9WhbxY32cOsYvdVl9NqiP8GKM8J'

  LOCATION_URL = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=TBIGz9WhbxY32cOsYvdVl9NqiP8GKM8J&q='

  FORECAST_URL = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'


  constructor(private http: HttpClient) {}

  getLocation(name): Observable<Location[]>{
    return this.http.get<Location[]>(this.LOCATION_URL+name);
  }

  getForecast(locationKey): Observable<Forecast>{
    return this.http.get<Forecast>(this.FORECAST_URL+locationKey+this.API_KEY);
  }


}
