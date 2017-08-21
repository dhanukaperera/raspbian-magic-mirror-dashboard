import { Component, OnInit } from '@angular/core';

import DarkSkyApi from 'dark-sky-api';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  private apiKey:string;
  /* private latitude:string;
  private longitude:string; */

  private temperature:string;
  private ctiy:String;
  private weather:String

  private weatherData:any;

  constructor() { 
    this.apiKey = "ec5efcbb0edafcbf140a73289ea588ff";
  /*   this.longitude="6.9497";
    this.latitude = "80.7891"; */
    this.ctiy = "Kollupitiya";
  
    DarkSkyApi.apiKey = this.apiKey;

    this.getWeatherData();

  }

  ngOnInit() {
   
  }

  
  getWeatherData():void{
 /*    const position = {
      latitude: this.latitude, 
      longitude: this.latitude
    }; */

    DarkSkyApi.loadCurrent().then(result => {
      console.log(result)
      this.weatherData = result;

      this.temperature = this.weatherData.temperature;
      this.weather = this.weatherData.summary;
    });

  }
}
