export class Article {
  abstract: String;
  byline: String;
  short_url: String;
  title: String;
  multimedia: Multimedia[];
}

class Multimedia {
  url: String;
}
