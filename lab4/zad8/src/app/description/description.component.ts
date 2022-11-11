import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../dish';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  @Input() dishView: Dish = new Dish('','','','','',0,0,'','');
  @Input() curr: string = "USD";

  constructor() { }

  ngOnInit(): void {
  }

  getEmittedRate(r: number){
    this.dishView.setRate(r);
  }

}
