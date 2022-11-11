import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Output() clickEmit: EventEmitter<number> = new EventEmitter<number>();
  @Output() resetEmit: EventEmitter<number> = new EventEmitter<number>();
  @Input() isDisabledChild: boolean = false;

  constructor() { }

  ngOnInit(): void {  

  }

  clickClick(){
    this.clickEmit.emit(1);
  }

  clickReset(){
    this.resetEmit.emit(0);
  }

}