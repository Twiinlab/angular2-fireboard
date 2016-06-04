import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'angular2-firebase-app',
  templateUrl: 'angular2-firebase.component.html',
  styleUrls: ['angular2-firebase.component.css']
})
export class Angular2FirebaseAppComponent {
  title = 'angular2-firebase works!';
  items: FirebaseListObservable<any>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
  }
  add(newName: string) {
    this.items.push({ text: newName });
  }
  update(key: string, newSize: string) {
    this.items.update(key, { size: newSize });
  }
  deleteItem(key: string) {    
    this.items.remove(key); 
  }
  deleteEverything() {
    this.items.remove();
  }
}

