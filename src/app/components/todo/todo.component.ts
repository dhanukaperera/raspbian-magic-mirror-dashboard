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

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  url = 'http://192.168.8.102:4562/sendtask';
  data: any;
  taskList: any;

  constructor(private http: Http) {
    // this.getTaskData();
  }

  ngOnInit() {
    /* setInterval(()=>{
       this.getTaskData();
     },1000)*/
  }

  getTaskData(): void {
    this.http.get(this.url).map(result => result.json()).subscribe(data => {
      this.taskList = (data.data);
      console.log(this.taskList);
    });
  }
}
