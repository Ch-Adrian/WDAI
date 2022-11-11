import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit {

  @Output() nr: EventEmitter<number> = new EventEmitter<number>();
  @Output() operator: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(n: number){
    this.nr.emit(n);
  }
  onClickOp(s: string){
    this.operator.emit(s);
}

}
