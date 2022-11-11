import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rate-star',
  templateUrl: './rate-star.component.html',
  styleUrls: ['./rate-star.component.css']
})
export class RateStarComponent implements OnInit {

  rate: number = 0;
  @Output() rateEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(r: number){
    this.rate = r;
    this.rateEmitter.emit(r);
  }

}
