import {Component, OnInit} from '@angular/core';

import {Http, Response, Jsonp, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

import DarkSkyApi from 'dark-sky-api';

@Component({selector: 'app-weather', templateUrl: './weather.component.html', styleUrls: ['./weather.component.css']})

export class WeatherComponent implements OnInit {
  private apiKey : string;

  private temperature_C : any;
  private temperature_F : any;

  private display_C : boolean
  private display_F : boolean

  private ctiy : String;
  private weather : String;
  private icon : string;

  private weatherData : any;

  private GET_CITY_API : string;
  private latitude : any;
  private longitude : any;
  private LOCATION_API_KEY : string;

  private type : string;

  private wi_day_sunny : boolean;
  private clear_night : boolean;
  private partly_cloudy_day : boolean;
  private partly_cloudy_night : boolean;
  private cloudy : boolean;
  private rain : boolean;
  private sleet : boolean;
  private snow : boolean;
  private wind : boolean;
  private fog : boolean;

  private dataString : any;

  private display : boolean;

  constructor(private http : Http, private db : AngularFireDatabase) {
    this.display_C = true;
    this.display_F = false;

    this.dataString = db.object('/db/weather/', {preserveSnapshot: true});

    this
      .dataString
      .subscribe(snapshot => {
        console.log(snapshot.key)
        // console.log(snapshot);

        this.type = snapshot
          .val()
          .type;
        this.display = snapshot
          .val()
          .display;

        console.log('temp type : ' + this.type);
       
       if(this.type === 'F') {
          this.display_C = true;
          this.display_F = false;
       } else if (this.type === 'C') {
          this.display_C = false;
          this.display_F = true;
       }
       this.convertToC();
       this.updateDB();
       
      });

    this.wi_day_sunny = false;
    this.clear_night = false;
    this.partly_cloudy_day = false;
    this.partly_cloudy_night = false;
    this.cloudy = true;
    this.rain = false;
    this.sleet = false;
    this.snow = false;
    this.wind = false;
    this.fog = false;

    this.apiKey = 'ec5efcbb0edafcbf140a73289ea588ff';
    this.temperature_C = '89';
    this.weather = 'Cloudy';
    this.ctiy = 'Kollupitiya';
    this.type = 'C';

    this.LOCATION_API_KEY = 'AIzaSyCXRPUXgm8x5N0BjKcas1zCyL6nzAb9YFY';

    DarkSkyApi.apiKey = this.apiKey;

    this.getWeatherData();
    this.convertToC();
    
    
  }

  ngOnInit() {
   setTimeout(()=>{
    this.updateDB();
   },5000);
  }

 convertToC() : void{
    this.temperature_F = (this.temperature_C - 32) * 5/9;
    this.temperature_F = parseFloat(this.temperature_F).toFixed(0);
 }

  updateDB():void{
    console.log('I just got updated! mmm');
      this.db.object('/db/weather/').update({
        ctiy:this.ctiy,
        temperature:this.temperature_C,
        weather:this.weather
      });
  }

  changeType() : void {
    if(this.type === 'F') {
      console.log('I am chaged to f');
    } else {
      console.log('i am just c');
    }
  }

  getWeatherData() : void {
    DarkSkyApi
      .loadCurrent()
      .then(result => {
        // console.log(result);
        this.weatherData = result;

        this.temperature_C = parseFloat(this.weatherData.temperature).toFixed(0);
        this.weather = this.weatherData.summary;
        this.icon = this.weatherData.icon;

        this.getCurrentCity();
        this.setIcon(this.icon);

      });

  }

  setIcon(icon) : void {
    if(icon === 'clear-day') {
      this.wi_day_sunny = true;
      this.clear_night = false;
      this.partly_cloudy_day = false;
      this.partly_cloudy_night = false;
      this.cloudy = false;
      this.rain = false;
      this.sleet = false;
      this.snow = false;
      this.wind = false;
      this.fog = false;
    } else if (icon === 'clear-night') {
      this.wi_day_sunny = false;
      this.clear_night = true;
      this.partly_cloudy_day = false;
      this.partly_cloudy_night = false;
      this.cloudy = false;
      this.rain = false;
      this.sleet = false;
      this.snow = false;
      this.wind = false;
      this.fog = false;
    } else if (icon === 'partly-cloudy-day') {
      this.wi_day_sunny = false;
      this.clear_night = false;
      this.partly_cloudy_day = true;
      this.partly_cloudy_night = false;
      this.cloudy = false;
      this.rain = false;
      this.sleet = false;
      this.snow = false;
      this.wind = false;
      this.fog = false;
    } else if (icon === 'partly-cloudy-night') {
      this.wi_day_sunny = false;
      this.clear_night = false;
      this.partly_cloudy_day = false;
      this.partly_cloudy_night = true;
      this.cloudy = false;
      this.rain = false;
      this.sleet = false;
      this.snow = false;
      this.wind = false;
      this.fog = false;
    } else if (icon === 'cloudy') {
      this.wi_day_sunny = false;
      this.clear_night = false;
      this.partly_cloudy_day = false;
      this.partly_cloudy_night = false;
      this.cloudy = true;
      this.rain = false;
      this.sleet = false;
      this.snow = false;
      this.wind = false;
      this.fog = false;
    } else if (icon === 'rain') {
      this.wi_day_sunny = false;
      this.clear_night = false;
      this.partly_cloudy_day = false;
      this.partly_cloudy_night = false;
      this.cloudy = false;
      this.rain = true;
      this.sleet = false;
      this.snow = false;
      this.wind = false;
      this.fog = false;
    } else if (icon === 'sleet') {
      this.wi_day_sunny = false;
      this.clear_night = false;
      this.partly_cloudy_day = false;
      this.partly_cloudy_night = false;
      this.cloudy = false;
      this.rain = false;
      this.sleet = true;
      this.snow = false;
      this.wind = false;
      this.fog = false;
    } else if (icon === 'snow') {
      this.wi_day_sunny = false;
      this.clear_night = false;
      this.partly_cloudy_day = false;
      this.partly_cloudy_night = false;
      this.cloudy = false;
      this.rain = false;
      this.sleet = false;
      this.snow = true;
      this.wind = false;
      this.fog = false;
    } else if (icon === 'wind') {
      this.wi_day_sunny = false;
      this.clear_night = false;
      this.partly_cloudy_day = false;
      this.partly_cloudy_night = false;
      this.cloudy = false;
      this.rain = false;
      this.sleet = false;
      this.snow = false;
      this.wind = true;
      this.fog = false;
    } else if (icon === 'fog') {
      this.wi_day_sunny = false;
      this.clear_night = false;
      this.partly_cloudy_day = false;
      this.partly_cloudy_night = false;
      this.cloudy = false;
      this.rain = false;
      this.sleet = false;
      this.snow = false;
      this.wind = false;
      this.fog = true;
    } else {
      this.wi_day_sunny = false;
      this.clear_night = false;
      this.partly_cloudy_day = false;
      this.partly_cloudy_night = false;
      this.cloudy = false;
      this.rain = false;
      this.sleet = false;
      this.snow = false;
      this.wind = false;
      this.fog = false;
    }
  }

  getCurrentCity() : void {
    let position;
    DarkSkyApi
      .loadPosition()
      .then(pos => {
        position = pos;
        //console.log(position);
        this.latitude = position.latitude;
        this.longitude = position.longitude;
        this.GET_CITY_API = `https://maps.googleapis.com/maps/api/geocode/json?latlng=
                            ${this.latitude},${this.longitude}&key=${this.LOCATION_API_KEY}`;

        this
          .http
          .get(this.GET_CITY_API)
          .map(result => result.json())
          .subscribe(data => {
            this.ctiy = (data.results[0].address_components[1].long_name);
            //console.log(this.ctiy);
          });

      });
  }

  /*clear-day	-	wi-day-sunny
  clear-night	- wi-night-clear
  partly-cloudy-day	- wi-day-cloudy
  partly-cloudy-night	- wi-night-alt-cloudy
  cloudy	- wi-cloudy
  rain	-	wi-showers
  sleet	-	wi-sleet
  snow	-	wi-snow
  wind	-	wi-strong-wind
  fog		-		wi-fog
  */

}
