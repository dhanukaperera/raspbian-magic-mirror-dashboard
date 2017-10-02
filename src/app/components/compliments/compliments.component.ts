import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseObjectObservable
} from 'angularfire2/database';

@Component({
  selector: 'app-compliments',
  templateUrl: './compliments.component.html',
  styleUrls: ['./compliments.component.css']
})
export class ComplimentsComponent implements OnInit {

  private displayName: string;
  private displayMessage: string;
  private greeting: string;
  private complimentsData: any;

  constructor(db: AngularFireDatabase) {
    this.complimentsData = db.object('/db/compliments/', {
      preserveSnapshot: true
    });
    this.complimentsData.subscribe(snapshot => {
     // console.log(snapshot.val());
      this.displayName = snapshot.val().yourname;
      this.displayMessage = snapshot.val().message;
    });
   }

  ngOnInit() {
    this.changeGreeting(); 
  }

  changeGreeting():void{
    let time = Date().toString();
    let hour = Number.parseInt(time.split(' ')[4].split(':')[0]);
    //console.log(hour);
    if(hour >= 6 && hour < 12){
        this.greeting = 'Good moring';
    }else {
      this.greeting = 'Good evening'
    }

  }
}
