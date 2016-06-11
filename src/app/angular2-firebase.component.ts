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
  lines: FirebaseListObservable<any>;
  prevPoint;
  currentLine;
  afDatabase;
  selectedColor = "FFFFFF";
  
  canvas;
  context:CanvasRenderingContext2D;
  @ViewChild("myBoard") myBoard;


  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
    this.lines = af.database.list('/lines');

     this.lines._ref
        .on('child_added', (child, prevKey) => {
          console.log("child_added: " +  child.val());
          this.drawCanvasLine(child);
        });
    this.lines._ref
        .on('child_changed', (child, prevKey) => {
          console.log("Child_changed: " +  child.val());
          this.drawCanvasLine(child);
        });
    this.lines._ref
        .on('child_removed', (child, prevKey) => {
          console.log("child_removed: " +  child.val());
          this.clearCanvas();
        });
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
      if (event.constructor === TouchEvent){
        return {
          x: event.touches[0].target.offsetLeft - event.touches[0].clientX,
          y: event.touches[0].target.offsetTop - event.touches[0].clientY,
      };
      } else {
        return {
          x: event.offsetX === undefined ? event.layerX : event.offsetX,
          y: event.offsetY === undefined ? event.layerY : event.offsetY
      };
      }
      
  }
  deleteLines() {
    this.lines.remove();
  }
        
  ngOnInit() {
    // debugger;
    // var ctx = this.myBoard.getContext('2d');
  }
  
  ngAfterViewInit() {
    
      var self = this;
    
      console.log(this.myBoard);
      self.canvas = this.myBoard.nativeElement;
      self.context = self.canvas.getContext("2d");
      
      self.context.lineWidth = 3;
     
      var mouseDowns  = Observable.fromEvent(self.canvas, 'touchstart');//touchstart mousedown
      var mouseUps    = Observable.fromEvent(document, 'touchend');//touchend mouseup
      var mouseMoves  = Observable.fromEvent(self.canvas, 'touchmove');//touchmove mousemove
      
      var mouseDrags = mouseDowns.map(downEvent => {
                // _this.prevPoint = "";
                console.log("mouseDowns");
                self.currentLine = self.lines.push({ colour: self.selectedColor});
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
                    self.currentLine.ref().child('points').push({x: move.x, y: move.y});
                });
        });
  }
  
  drawCanvasLine(line) {
      line.val()
      var colour = line.val().colour;
      var points = line.val().points;
      var point;
      for (var pointKey in points) {
        point = points[pointKey];
        if (!this.prevPoint)
            {
                this.prevPoint = {x: point.x, y: point.y}
            }
            else
            {
                this.context.beginPath();
                this.context.strokeStyle = colour;//color
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



}

