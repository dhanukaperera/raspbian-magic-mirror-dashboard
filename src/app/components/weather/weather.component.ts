import { Component, OnInit } from '@angular/core';

import DarkSkyApi from 'dark-sky-api';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  // exporting at

  private apiKey: string;
  /* private latitude:string;
  private longitude:string; */

  private temperature: any;
  private ctiy: String;
  private weather: String;

  private weatherData: any;

  constructor() {
    this.apiKey = 'ec5efcbb0edafcbf140a73289ea588ff';
  /*   this.longitude="6.9497";
    this.latitude = "80.7891"; */
    this.ctiy = 'Kollupitiya';

    DarkSkyApi.apiKey = this.apiKey;

    this.getWeatherData();

  }

  ngOnInit() {

  }


  getWeatherData(): void {
 /*    const position = {
      latitude: this.latitude,
      longitude: this.latitude
    }; */

    // AIzaSyCXRPUXgm8x5N0BjKcas1zCyL6nzAb9YFY - Google API KEY
// https://maps.googleapis.com/maps/api/geocode/json?latlng=7.1216460999999995,79.87920249999999&key=AIzaSyCXRPUXgm8x5N0BjKcas1zCyL6nzAb9YFY

    DarkSkyApi.loadCurrent().then(result => {
      console.log(result);
      this.weatherData = result;

      this.temperature = parseFloat( this.weatherData.temperature).toFixed(0);
      this.weather = this.weatherData.summary;


      let position;
      DarkSkyApi.loadPosition()
        .then(pos => {
          position = pos;
          console.log(position);
        });

    });

  }
}
