import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Article} from "../../model/News/article.model";
import {NewsResponse} from "../../model/News/news-response.model";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  API_KEY = 'VKBKvhpRQhB6ISYrjAsb1Iqz6aRPfbBq'
  API_URL = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${this.API_KEY}`

  constructor(private http: HttpClient) { }

  getArticles(): Observable<NewsResponse>{
    return this.http.get<NewsResponse>(this.API_URL)
  }

}
