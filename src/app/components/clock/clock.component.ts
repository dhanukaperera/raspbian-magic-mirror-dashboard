import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  // --Creating variables 
  private date:Date;        // Use to hold the system current date.
  private hh:any;           // Get the hour from the current date.
  private mm:any;           // Get the mintues from the current date.
  private ss:any;           // Get the seconds from the current date.
  private period:String     // Time is AM or PM


  //--


  constructor() { 
   
   
  }

  ngOnInit() {
    this.startTime();
    
  }

  startTime():void{
    // Method calls every 1s. Get the current time values and format it.
    setInterval(()=>{
      this.date = new Date();
      this.hh = this.formatTime(this.date.getHours()) ;
      this.mm = this.formatTime(this.date.getMinutes()) ;
      this.ss = this.formatTime(this.date.getSeconds()) ;
      
      this.setTimeFormat(24);

    },1000) // <-- 1000  miliseconds = 1 second
  }
  
  // -- Add a zeor(0) to infront of a number if it's less than 10. This is used to format the date.
  formatTime(i):any{
     (i < 10) ? i= "0"+i : i=i; 
     return i;
  }

  //-- Change the time format 12hrs/24hrs
  setTimeFormat(f):void{
    // Show AM if the hours less than 12. Show PM if the hours grater than 12.
    (this.hh < 12) ? this.period = "AM" : this.period = "PM";
    // Subtract 12 for 12 hours time formate, else hide period from 24 hours format.
    (f== 12) ? this.hh = parseInt(this.hh) - 12 : this.period = null;
    
  }

}
