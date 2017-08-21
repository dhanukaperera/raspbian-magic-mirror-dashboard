import { Component, OnInit } from '@angular/core';
//import { Http,Response,Jsonp, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import DarkSkyApi from 'dark-sky-api';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  
  //private apiUrl:string;
  private apiKey:string;
  private latitude:string;
  private longitude:string;

  private url:string;
  private forecastData:any;

  constructor() { 
    this.apiKey = "ec5efcbb0edafcbf140a73289ea588ff";
    this.latitude="6.9010";
    this.longitude = "79.8549";

    const position = {
      latitude: this.latitude, 
      longitude: this.latitude
    };

    DarkSkyApi.apiKey = this.apiKey;
    DarkSkyApi.loadCurrent(position)
    .then(result => console.log(result));
  }

  ngOnInit() {
  }

}
