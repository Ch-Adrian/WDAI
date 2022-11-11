import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  marka: string = "";
  cars: CarsService;
  model: string="";
  colorek: string="";

  @Output() outputMark: EventEmitter<string> = new EventEmitter<string>();
  @Output() outputModel: EventEmitter<string> = new EventEmitter<string>();
  @Output() outputColor: EventEmitter<string> = new EventEmitter<string>();

  constructor(public c: CarsService) { 
    this.cars = c;
  }

  ngOnInit(): void {
  }

  markaLength(){
    if(this.marka.length > 0){
      return true;
    }
    else return false;
  }

  modelLength(){
    if(this.model.length > 0){
      return true;
    }
    else return false;
  }

  getModel(marka: string){
    let i = 0;
    let index_model = 0;
    for(let m of this.cars.marks){
      if(m == marka){
        index_model = i;
      }
      i+=1;
    }
    return this.cars.models[index_model];
  }

  getColors(){
    let t = this.getModel(this.marka);
    for(let m of t){
      if(m.getModel() == this.model){
        return m.getColors();
      }
    }
    return [];
  }

  onClick(c:string){
    this.outputMark.emit(this.marka);
    this.outputModel.emit(this.model);
    this.outputColor.emit(c);
  }

  onClickMarka(m: string){
    this.marka = m;
  }

  onClickModel(m: string){
    this.model = m;
  }

  onClickColor(e: MouseEvent, c: string){
    this.colorek = c;
    this.onClick(c);
  }

  resetModel(){
    this.model = "";
    this.resetColor();
  }

  resetMark(){
    this.marka = "";
    this.resetModel();
  }

  resetColor(){
    this.colorek = "";
  }

}
