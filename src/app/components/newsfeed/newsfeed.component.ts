import { Component, OnInit } from '@angular/core';

import {
  Http,
  Response,
  Jsonp,
  URLSearchParams
} from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  private author: string;
  private source: string;
  private title: string;
  private description: string;
  private sortBy: string;

  private NEWS_API_KEY: string;
  private API_URL: string;

  private newsArray: any;

  constructor(private http: Http) {

    this.NEWS_API_KEY = '2eaff1b640e6496a97d4791860fffa6b';
    this.source = 'bbc-news';
    this.sortBy = 'top';
    this.API_URL = `https://newsapi.org/v1/articles?source=${this.source}&sortBy=${this.sortBy}&apiKey=${this.NEWS_API_KEY}`;

    console.log(this.API_URL);
    this.getNewsFeed();
   }

  ngOnInit() {
     /* setInterval(() => {
       this.getNewsFeed();
     }, 10000);*/
  }

  getNewsFeed(): void {
    this.http.get(this.API_URL).map(result => result.json()).subscribe(data => {
      // console.log(data);
        this.newsArray = data.articles;
        console.log(this.newsArray);

        let i = 0;
        this.title = this.newsArray[i].title;
        this.description = this.newsArray[i].description;
        this.author = this.newsArray[i].author;
        i++;
        setInterval(() => {
          // this.reloadData();
          if (i === this.newsArray.length) {
            i = 0;
          }
          this.title = this.newsArray[i].title;
          this.description = this.newsArray[i].description;
          this.author = this.newsArray[i].author;

          i++;

        }, 15000);
    });

/*
    for (let i = 0; i < 5; i++ ) {
      this.title = this.newsArray[i].title;
      this.description = this.newsArray[i].description;
      this.author = this.newsArray[i].author;
    }
*/
  }

  reloadData(): void {
    for (let i = 0; i < this.newsArray.length; i++ ) {
      this.title = this.newsArray[i].title;
      this.description = this.newsArray[i].description;
      this.author = this.newsArray[i].author;
    }
  }

}
