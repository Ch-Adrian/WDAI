import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplyService } from '../supply.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() supply: SupplyService = new SupplyService();

  clicked: boolean = false;
  // form: FormGroup;

  filtry: string[] = [];
  kitchen: string[] = [];
  price: number[] = [];
  rate: number[] = [];
  category: string[] = [];
  type: string[] = [];

  @Output() kitchenOutput: EventEmitter<string[]> = new EventEmitter<string[]>();

  kitchenForm: FormGroup;

  constructor(builder: FormBuilder) {

    this.kitchenForm = builder.group({
      kitchen: ['kitchen']
    })

   }

  ngOnInit(): void {
  }

  onClickFilter(){
    this.kitchen = [];
    this.price = [];
    this.rate = [];
    this.category = [];
    this.type = []; 

    for(let d of this.supply.getDishes()){
      if(this.kitchen.indexOf(d.getKitchenType()) == -1){
        this.kitchen.push(d.getKitchenType());
      }
    }
    for(let d of this.supply.getDishes()){
      if(this.price.indexOf(d.getPrice('USD')) == -1){
        this.price.push(d.getPrice('USD'));
      }
    }
    for(let d of this.supply.getDishes()){
      if(this.rate.indexOf(d.rate) == -1){
        this.rate.push(d.rate);
      }
    }
    for(let d of this.supply.getDishes()){
      if(this.category.indexOf(d.getCategory()) == -1){
        this.category.push(d.getCategory());
      }
    }
    for(let d of this.supply.getDishes()){
      if(this.type.indexOf(d.getDishType()) == -1){
        this.type.push(d.getDishType());
      }
    }

    this.clicked = true;
  }

  onSubmit(){
    this.clicked = false;
  }

  kitchenSubmit(){

  }

}
