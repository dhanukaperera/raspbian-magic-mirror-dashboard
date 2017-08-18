import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {

  constructor(af: AngularFireDatabase) {
   // this.getListings = af.list('/db');
   }

  listings: FirebaseListObservable<any[]>;
  
  getListings(){
   
  }

}
