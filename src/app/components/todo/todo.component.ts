import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  items: FirebaseListObservable<any>;
  constructor(db: AngularFireDatabase) { 
    this.items = db.list('/db/todo');
  }

  ngOnInit() {
  }

}
