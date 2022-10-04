import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../services/News/news.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {NewsResponse} from "../../model/News/news-response.model";
import {Article} from "../../model/News/article.model";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  response: NewsResponse;
  articles: Article[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {

    this.newsService.getArticles()
      .subscribe(response => {
        this.response = response;
        this.articles = this.response.results;
      })
   }

}
