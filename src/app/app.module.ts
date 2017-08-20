import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpModule } from '@angular/http';



import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock/clock.component';
import { DateComponent } from './components/date/date.component';
import { EventsComponent } from './components/events/events.component';
import { TodoComponent } from './components/todo/todo.component';
import { WeatherComponent } from './components/weather/weather.component';
import { ComplimentsComponent } from './components/compliments/compliments.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    DateComponent,
    EventsComponent,
    TodoComponent,
    WeatherComponent,
    ComplimentsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
