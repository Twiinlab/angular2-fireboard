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

import {UserComponent} from './users.component';

@Component({
  moduleId: module.id,
  selector: 'angular2-firebase-app',
  templateUrl: 'angular2-firebase.component.html',
  styleUrls: ['angular2-firebase.component.css'],
   directives: [UserComponent, MdToolbar, MdButton, MD_LIST_DIRECTIVES, MdCard, MdInput, MdSidenav, MdSidenavLayout],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class Angular2FirebaseAppComponent {
  title = 'angular2-firebase works!';
  users: FirebaseListObservable<any>;
  lines: FirebaseListObservable<any>;
  window;
  prevPoint;
  currentLine;
  afDatabase;
  selectedColor = "#000000";
  userCount = 0;
  
  canvas;
  context:CanvasRenderingContext2D;
  @ViewChild("myBoard") myBoard;

  myUser;
  lastUid;
  
  constructor(public af: AngularFire , @Inject(Window) window: Window) {
    this.af = af;
    this.window = window;
    this.users = af.database.list('/users');
    this.lines = af.database.list('/lines');

    this.users._ref
       .on("value", snapshot => {
          console.log("value: " +  snapshot.numChildren());
          this.userCount = snapshot.numChildren();
       });
       
    this.lines._ref.on('child_added', (child, prevKey) => {
          this.drawCanvasLine(child);
        });
    this.lines._ref.on('child_changed', (child, prevKey) => {
          this.drawCanvasLine(child);
        });
    this.lines._ref.on('child_removed', (child, prevKey) => {
          this.clearCanvas();
        });
  }
  
  onSelectColor() {
      var colorpicker = document.getElementById('colorPicker');
      colorpicker.click();
  }
                    
  getOffset(event) {
      if (event.constructor === TouchEvent){
        return {
          x: event.touches[0].clientX - event.touches[0].target.offsetLeft - 24,
          y: event.touches[0].clientY - event.touches[0].target.offsetTop - 64,
      };
      } else {
        return {
          x: event.offsetX === undefined ? event.layerX : event.offsetX,
          y: event.offsetY === undefined ? event.layerY : event.offsetY
      };
      }
      
  }
  onCleanLines() {
    this.lines.remove();
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
    this.window.onbeforeunload = function () {
        return "Do you really want to close?";
    };
    
    var colorPicker = <HTMLInputElement>document.getElementById("colorPicker");
    var colorButton = document.getElementById("colorButton");
    
   colorPicker.addEventListener("input", function(event) {
            colorButton.style.backgroundColor =  colorPicker.value;
    }, false);
  }
  
  ngAfterViewInit() {
    
      var self = this;
      self.canvas = this.myBoard.nativeElement;
      self.context = self.canvas.getContext("2d");
      self.canvas.width  = document.getElementById('board-box').offsetWidth;
      self.canvas.height = window.innerHeight - 200;
      
      self.context.lineWidth = 2;

      var mergeDown = Observable.merge(Observable.fromEvent(self.canvas, 'touchstart'), 
                                       Observable.fromEvent(self.canvas, 'mousedown'));
                                       
      var mergeUps = Observable.merge(Observable.fromEvent(self.canvas, 'touchend'), 
                                       Observable.fromEvent(self.canvas, 'mouseup'));
      
      var mergeMoves = Observable.merge(Observable.fromEvent(self.canvas, 'touchmove'), 
                                       Observable.fromEvent(self.canvas, 'mousemove'));
      
      var mergeDrags = mergeDown.map(downEvent => {
          self.currentLine = self.lines.push({ colour: self.selectedColor});
          return mergeMoves.takeUntil(mergeUps).map(drag => {
              return this.getOffset(drag);
          });
      });       
      mergeDrags.subscribe(drags=>{
        this.prevPoint = "";
        drags.subscribe(function (move) {
              console.log('move', {x: move.x, y: move.y});
              self.currentLine.child('points').push({x: move.x, y: move.y});
          });
      });
  }
  
  drawCanvasLine(line) {
      var colour = line.val().colour;
      var points = line.val().points;
      var point;
      for (var pointKey in points) {
        point = points[pointKey];
        if (!this.prevPoint) {
            this.prevPoint = {x: point.x, y: point.y}
        } else {
            this.context.beginPath();
            this.context.strokeStyle = colour;
            this.context.moveTo(this.prevPoint.x, this.prevPoint.y);
            this.context.lineTo(point.x, point.y);
            this.context.stroke(); 
            this.prevPoint = {x: point.x, y: point.y}  
        }
      }
      this.prevPoint = null;
  }
  
  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

