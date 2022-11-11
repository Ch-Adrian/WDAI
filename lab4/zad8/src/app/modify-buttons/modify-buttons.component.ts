import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../dish';

@Component({
  selector: 'app-modify-buttons',
  templateUrl: './modify-buttons.component.html',
  styleUrls: ['./modify-buttons.component.css']
})
export class ModifyButtonsComponent implements OnInit {

  @Input() dishView: Dish = new Dish('','','','','',0,0,'','');
  @Output() deleted: EventEmitter<Dish> = new EventEmitter<Dish>();

  constructor() { }

  ngOnInit(): void {
  }

  
  increaseClientAmount(d: Dish){
    d.clientAmount++;
  }

  reduceClientAmount(d: Dish){
    d.clientAmount--;
  }

  onDeleteDish(d: Dish){
    this.deleted.emit(d);
  }

}
