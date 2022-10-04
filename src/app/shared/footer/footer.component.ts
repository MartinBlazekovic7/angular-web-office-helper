import { Component, OnInit } from '@angular/core';
import {QuoteService} from "../../services/Quote/quote.service";
import {Quote} from "../../model/Quote/quote.model";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  quote: Quote;
  quotes: Quote[];

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.quoteService.getQuote()
      .subscribe((response) => {
        if(response == null) return null;
        else {
          this.quotes = response;
          this.quote = response[Math.floor(Math.random() * (this.quotes.length - 1 + 1) + 1)];
        }
      })
  }

}
