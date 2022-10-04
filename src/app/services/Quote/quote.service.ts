import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewsResponse} from "../../model/News/news-response.model";
import {Quote} from "../../model/Quote/quote.model";

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  API_URL = 'https://type.fit/api/quotes'

  constructor(private http: HttpClient) { }

  getQuote(): Observable<Quote[]>{
    return this.http.get<Quote[]>(this.API_URL)
  }
}
