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
  
  getOffset(event) {
      if (event.constructor === TouchEvent){
        return {
          x: event.touches[0].clientX - event.touches[0].target.offsetLeft,
          y: event.touches[0].clientY - event.touches[0].target.offsetTop,
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
      self.canvas.width  = window.innerWidth;
      self.canvas.height = window.innerHeight;
      self.context.lineWidth = 2;
     
      // var touchDowns  = Observable.fromEvent(self.canvas, 'touchstart');//touchstart mousedown
      // var touchUps    = Observable.fromEvent(document, 'touchend');//touchend mouseup
      // var touchMoves  = Observable.fromEvent(self.canvas, 'touchmove');//touchmove mousemove
      
      // var mouseDowns  = Observable.fromEvent(self.canvas, 'mousedown');//touchstart mousedown
      // var mouseUps    = Observable.fromEvent(document, 'mouseup');//touchend mouseup
      // var mouseMoves  = Observable.fromEvent(self.canvas, 'mousemove');//touchmove mousemove
      
      var mergeDown = Observable.merge(Observable.fromEvent(self.canvas, 'touchstart'), 
                                       Observable.fromEvent(self.canvas, 'mousedown'));
                                       
      var mergeUps = Observable.merge(Observable.fromEvent(self.canvas, 'touchend'), 
                                       Observable.fromEvent(self.canvas, 'mouseup'));
      
      var mergeMoves = Observable.merge(Observable.fromEvent(self.canvas, 'touchmove'), 
                                       Observable.fromEvent(self.canvas, 'mousemove'));
      
      //var mouseDrags = mouseDowns.map(downEvent => {
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
              self.currentLine.ref().child('points').push({x: move.x, y: move.y});
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



}

