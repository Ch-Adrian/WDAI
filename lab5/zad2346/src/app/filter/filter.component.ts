import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
import { SupplyService } from '../supply.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  supply: SupplyService;
  restaurantService: RestaurantService;
  clicked: boolean = false;

  filtry: string[] = [];
  kitchen: string[] = [];
  price: number[] = [];
  rate: number[] = [];
  category: string[] = [];
  type: string[] = [];

  @Output() startFilter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() filter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() kitchenOutput: EventEmitter<string> = new EventEmitter<string>();
  @Output() priceOutput: EventEmitter<[number,number]> = new EventEmitter<[number,number]>();
  @Output() rateOutput: EventEmitter<number> = new EventEmitter<number>();
  @Output() categoryOutput: EventEmitter<string> = new EventEmitter<string>();
  @Output() typeOutput: EventEmitter<string> = new EventEmitter<string>();

  list_filtered: Array<string> = [];
  selectedPrice: string ="";
  kitchenForm: FormGroup;
  priceForm: FormGroup;
  rateForm: FormGroup;
  categoryForm: FormGroup;
  typeForm: FormGroup;

  constructor(private r: RestaurantService, builder: FormBuilder) {
    this.restaurantService = r;
    this.supply = r.supply;
    this.kitchenForm = builder.group({
      kitchen: ['kitchen', Validators.required]
    })

    this.priceForm = builder.group({
      price1: ['min', Validators.required],
      price2: ['max', Validators.required]
    })
    this.rateForm = builder.group({
      rate: ['rate', Validators.required]
    })
    this.categoryForm = builder.group({
      category: ['category', Validators.required]
    })
    this.typeForm = builder.group({
      type: ['type', Validators.required]
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
    // console.log(this.supply.getDishes().length)
    for(let d of this.supply.getDishes()){
      if(this.kitchen.indexOf(d.getKitchenType()) == -1){
        this.kitchen.push(d.getKitchenType());
        // console.log("dziala")
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
    this.list_filtered = [];
    this.selectedPrice = "";
    this.startFilter.emit(false);
    this.clicked = true;
  }

  onSubmit(){
    this.clicked = false;
    this.filter.emit(true);
  }

  kitchenSubmit(){
    if(this.kitchenForm.value["kitchen"] == 'kitchen'){
      return;
    }
    // console.log(this.kitchenForm.value["kitchen"]);
    this.list_filtered.push(this.kitchenForm.value["kitchen"]);
    this.kitchenOutput.emit(this.kitchenForm.value["kitchen"]);
    // this.kitchenForm.reset();
  }

  priceSubmit(){
    let price1 = this.priceForm.value["price1"];
    let price2 = this.priceForm.value["price2"];

    if(price1 == 'min' ||
      price2 == 'max' ||
      parseInt(price1) > parseInt(price2)){
        return;
      }

    this.selectedPrice = price1+" : "+price2;
    // this.list_filtered.push(price1+" : "+price2);
    this.priceOutput.emit([parseInt(price1), parseInt(price2)]);
    // this.priceForm.reset();
  }

  rateSubmit(){
    if(this.rateForm.value["rate"] == 'rate'){
      return;
    }

    this.list_filtered.push(this.rateForm.value["rate"]);
    this.rateOutput.emit(parseInt(this.rateForm.value["rate"]));
    // this.rateForm.reset();
  }

  categorySubmit(){
    if(this.categoryForm.value["category"] == 'category'){ return; }
    this.list_filtered.push(this.categoryForm.value["category"]);
    this.categoryOutput.emit(this.categoryForm.value["category"]);
    // this.categoryForm.reset();
  }

  typeSubmit(){
    if(this.typeForm.value["type"] == 'type') { return; }
    this.list_filtered.push(this.typeForm.value["type"]);
    this.typeOutput.emit(this.typeForm.value["type"]);
    // this.typeForm.reset();
  }

}
