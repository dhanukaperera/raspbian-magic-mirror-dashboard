import {
  Component,
  OnInit
} from '@angular/core';
import {
  Http,
  Response,
  Jsonp,
  URLSearchParams
} from '@angular/http';
import 'rxjs/add/operator/map';
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

  private GET_CITY_API: string;
  private latitude: any;
  private longitude: any;
  private LOCATION_API_KEY: string;

  constructor(private http: Http) {
    this.apiKey = 'ec5efcbb0edafcbf140a73289ea588ff';
    /*   this.longitude="6.9497";
      this.latitude = "80.7891"; */
    this.ctiy = 'Kollupitiya';

    this.LOCATION_API_KEY = 'AIzaSyCXRPUXgm8x5N0BjKcas1zCyL6nzAb9YFY';
    //this.GET_CITY_API = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=${this.LOCATION_API_KEY}`;

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

      this.temperature = parseFloat(this.weatherData.temperature).toFixed(0);
      this.weather = this.weatherData.summary;

      this.getCurrentCity();



    });

  }
  className = 'wi wi-day-cloudy';
  abc = true;

  
  getCurrentCity(): void {
    let position;
    DarkSkyApi.loadPosition()
      .then(pos => {
        position = pos;
        console.log(position);
        this.latitude = position.latitude;
        this.longitude = position.longitude;
        this.GET_CITY_API = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=${this.LOCATION_API_KEY}`;

        this.http.get(this.GET_CITY_API).map(result => result.json()).subscribe(data => {
          this.ctiy = (data.results[0].address_components[1].long_name);
          console.log(this.ctiy);

        });

      });
  }



}
