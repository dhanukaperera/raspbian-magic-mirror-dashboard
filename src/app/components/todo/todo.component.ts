import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http,Response,Jsonp, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {

//url="http://localhost:5000/drugs/getAll";
  url="https://jsonplaceholder.typicode.com/posts";
  //url="http://192.168.8.101:4562/sendtask";
  data:any;

  taskList:any;

  items: FirebaseListObservable<any>;
  constructor(db: AngularFireDatabase,private http:Http) { 
    this.items = db.list('/db/todo');


    //this.http.get(this.url).map(r=>r.json()).subscribe(d=>console.log(d));

    // Code 
    //this.http.get(this.url).map(r=>r.json()).subscribe(d=>console.log(d.data[0]));
  }

  ngOnInit() {
    setInterval(()=>{
      this.getTaskData();
    },10000)
    
  }

  getTaskData():void{
    this.http.get(this.url).map(result=>result.json()).subscribe(data=>{
        this.taskList = data;
        console.log(data);
    })
  }
 

}
