import { Component, Class, OnInit, AfterViewInit } from '@angular/core';
import {ViewChild} from "@angular/core";
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
// import { Observable } from 'rxjs/Observable';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'angular2-firebase-app',
  templateUrl: 'angular2-firebase.component.html',
  styleUrls: ['angular2-firebase.component.css']
})

export class Angular2FirebaseAppComponent {
  title = 'angular2-firebase works!';
  items: FirebaseListObservable<any>;
  
  prevPoint;
  
  context:CanvasRenderingContext2D;
  @ViewChild("myBoard") myBoard;
  
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
  
  getOffset(event) {
      return {
          x: event.offsetX === undefined ? event.layerX : event.offsetX,
          y: event.offsetY === undefined ? event.layerY : event.offsetY
      };
  }
        
  ngOnInit() {
    // debugger;
    // var ctx = this.myBoard.getContext('2d');
  }
  
  ngAfterViewInit() {
      console.log(this.myBoard);
      let canvas = this.myBoard.nativeElement;
      let context = canvas.getContext("2d");
      
      context.lineWidth = 3;
     
      var mouseDowns  = Observable.fromEvent(canvas, 'mousedown');
      var mouseUps    = Observable.fromEvent(document, 'mouseup');
      var mouseMoves  = Observable.fromEvent(canvas, 'mousemove');
      
      var mouseDrags = mouseDowns.map(downEvent => {
                // _this.prevPoint = "";
                console.log("mouseDowns");
                // _this.fire('down');
                return mouseMoves.takeUntil(mouseUps).map(drag => {
                    //console.log("mouseMoves");
                    return this.getOffset(drag);
                });
            });       
            
      mouseUps.subscribe(mouseup=>{
        console.log("mouseUp");
      });
      mouseDrags.subscribe(drags=>{
          this.prevPoint = "";
          console.log("mouseDowns");
          // _this.fire('down');
          drags.subscribe(function (move) {
                    console.log('move', {x: move.x, y: move.y});
                    if (!this.prevPoint)
                    {
                        this.prevPoint = {x: move.x, y: move.y}
                    }
                    else
                    {
                        context.beginPath();
                        context.strokeStyle = "#FF0000";//color
                        context.moveTo(this.prevPoint.x, this.prevPoint.y);
                        context.lineTo(move.x, move.y);
                        context.stroke(); 
                        this.prevPoint = {x: move.x, y: move.y}
                        
                    }
                    
                    //dragref.ref().child('points').push({x: move.x, y: move.y});
                });
      });
}
}

