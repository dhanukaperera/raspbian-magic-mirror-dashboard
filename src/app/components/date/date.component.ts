import {
  Component,
  OnInit
} from '@angular/core';

import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})

export class DateComponent implements OnInit {

  date: any;
  display: any;
  currentDate: Date;

  day: String;
  month: String;
  dd;
  year;

  constructor(db: AngularFireDatabase) {
    this.date = db.object('/db/date/', {
      preserveSnapshot: true
    });
    this.date.subscribe(snapshot => {
      /* console.log(snapshot.key)
     console.log(snapshot.val().display) 
    */
      this.display = snapshot.val().display;
    });
  }

  ngOnInit() {
    console.log(new Date());
    this.createDate();
  }

  createDate(): void {
    setInterval(() => {
      this.currentDate = new Date();
      this.day = this.formatDay(this.currentDate.toString().split(' ')[0]);
      this.month = this.formatMonth(this.currentDate.toString().split(' ')[1]);
      this.dd = this.currentDate.toString().split(' ')[2];
      this.year = this.currentDate.toString().split(' ')[3];
    }, 1000);
  }

  formatDay(d): String {
    let formatedDay = null;
    switch (d) {
      case 'Mon':
        formatedDay = 'Monday';
        break;
      case 'Tue':
        formatedDay = 'Tuesday';
        break;
      case 'Web':
        formatedDay = 'Wednesday';
        break;
      case 'Thu':
        formatedDay = 'Thursday';
        break;
      case 'Fri':
        formatedDay = 'Friday';
        break;
      case 'Sat':
        formatedDay = 'Saturday';
        break;
      case 'Sun':
        formatedDay = 'Sunday';
        break;
    }
    return formatedDay;
  }

  formatMonth(m): String {
    let formatedMonth = null;
    switch (m) {
      case 'Jan':
        formatedMonth = 'January';
        break;
      case 'Feb':
        formatedMonth = 'Febuary';
        break;
      case 'Mar':
        formatedMonth = 'March';
        break;
      case 'Apr':
        formatedMonth = 'April';
        break;
      case 'May':
        formatedMonth = 'May';
        break;
      case 'Jun':
        formatedMonth = 'June';
        break;
      case 'Jul':
        formatedMonth = 'July';
        break;
      case 'Aug':
        formatedMonth = 'Auguest';
        break;
      case 'Sep':
        formatedMonth = 'September';
        break;
      case 'Oct':
        formatedMonth = 'October';
        break;
      case 'Nov':
        formatedMonth = 'November';
        break;
      case 'Dec':
        formatedMonth = 'December';
        break;
    }
    return formatedMonth;
  }
}
