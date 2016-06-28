import { Component, Class, OnInit, AfterViewInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import {ViewChild} from "@angular/core";
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable, Subject } from 'rxjs/Rx';

import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdCard} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdSidenav, MdSidenavLayout} from '@angular2-material/sidenav';

@Component({
  selector: 'user-app',
  templateUrl: 'app/users.component.html',
  styleUrls: ['app/angular2-firebase.component.css'],
   directives: [MdToolbar, MdButton, MD_LIST_DIRECTIVES, MdCard, MdInput, MdSidenav, MdSidenavLayout],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent {
  users: FirebaseListObservable<any>;
  window;
  prevPoint;
  currentLine;
  afDatabase;
  userCount = 0;


  myUser;
  lastUid;
  
  constructor(public af: AngularFire, @Inject(Window) window: Window) {
    this.af = af;
    this.users = af.database.list('/users');
    this.window = window;
    
    this.users._ref
       .on("value", snapshot => {
          console.log("value: " +  snapshot.numChildren());
          this.userCount = snapshot.numChildren();
       });
     
  }  
  
  onCleanUser() {
      this.users.remove();
  }
        
  ngOnInit() {
    var self = this;
    
    this.window.onunload = function(e) {
        self.af.auth.logout();
        self.users.remove(self.myUser);
        return e.returnValue;
    };
  }
  
  onLogin(){
    var self = this;
    this.af.auth.login();
    this.af.auth.subscribe(auth => {
        if (auth){
            if (self.lastUid != auth.auth.uid){
                console.log(auth);
                self.myUser = self.users.push({ userName: auth.auth.displayName, photo: auth.auth.photoURL });
            } 
            self.lastUid = auth.auth.uid;       
        }
    });  
  }
  onLogout(){
      this.users.remove(this.myUser);
      this.af.auth.logout();
      this.lastUid = null;
  }
}

