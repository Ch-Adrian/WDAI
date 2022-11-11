import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-rate-star',
  templateUrl: './rate-star.component.html',
  styleUrls: ['./rate-star.component.css']
})
export class RateStarComponent implements OnInit {

  @Input() rate: number = 0;
  @Input() isOn: boolean = true;
  @Output() rateEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(r: number){
    if(this.isOn){
      this.rate = r;
      this.rateEmitter.emit(r);
    }
  }

}
