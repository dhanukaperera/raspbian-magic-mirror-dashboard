import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';

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

  private complimentsData: any;

  private interval: number;

  constructor(private http: Http,db: AngularFireDatabase) {
    this.source = 'bbc-news';
    this.sortBy = 'top';
    this.NEWS_API_KEY = '2eaff1b640e6496a97d4791860fffa6b';
    //this.interval = 3000;

    this.complimentsData =db.object('/db/newsfeed/',{
      preserveSnapshot: true
    });

    this.complimentsData.subscribe(snapshot => {
     
     this.sortBy = snapshot.val().sortBy;
     this.source = snapshot.val().source;
     this.interval = snapshot.val().interval;
    
    }); 
   }

  ngOnInit() {
    
    setTimeout(() => {
      this.getNewsFeed();
      this.run();
    },5000);
  }

  run():void{
      setInterval(() => {
      this.getNewsFeed();
    },this.interval);
  }

  getNewsFeed(): void {
  
    this.API_URL = `https://newsapi.org/v1/articles?source=${this.source}&sortBy=${this.sortBy}&apiKey=${this.NEWS_API_KEY}`;
    console.log("URl -->"+this.API_URL);

    this.http.get(this.API_URL).map(result => result.json()).subscribe(data => {
      
       console.log(data);
        this.newsArray = data.articles;
      //  console.log(this.newsArray);

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
  }

  reloadData(): void {
    for (let i = 0; i < this.newsArray.length; i++ ) {
      this.title = this.newsArray[i].title;
      this.description = this.newsArray[i].description;
      this.author = this.newsArray[i].author;
    }
  }

}
