import {Article} from "./article.model";

export class NewsResponse {
  copyright: String;
  last_updated: Date;
  num_results: Number;
  results: Article[];
  section: String;
  status: String;
}
