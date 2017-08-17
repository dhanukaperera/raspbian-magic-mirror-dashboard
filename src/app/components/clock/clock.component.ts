import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  private date:Date;
  private hh:any;
  private mm:any;
  private ss:any;

  constructor() { 
    this.startTime();
  }

  ngOnInit() {
    //this.startTime();
  }

  startTime():void{
    setInterval(()=>{
      this.date = new Date();
      this.hh = this.formatTime(this.date.getHours()) ;
      this.mm = this.formatTime(this.date.getMinutes()) ;
      this.ss = this.formatTime(this.date.getSeconds()) ;
    },1000)
  }
  
  formatTime(i):any{
     (i < 10) ? i= "0"+i : i=i; 
     return i;
  }

}
