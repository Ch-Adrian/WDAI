import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../dish';
import { RestaurantService } from '../restaurant.service';
import { SupplyService } from '../supply.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  restaurantService: RestaurantService;
  supply: SupplyService;

  kitchen: Array<string> = [];
  price: [number, number] = [-1,-1];
  rate: Array<number> = [];
  category:Array<string> = [];
  type:Array<string> = [];

  form: FormGroup = new FormGroup({});

  constructor(private r: RestaurantService, private formBuilder: FormBuilder) {
    this.restaurantService = r;
    this.supply = this.restaurantService.supply;
    this.restaurantService.filteredDishes = this.supply.getDishes();
    this.restaurantService.checkMinAndMax();
    // this.setPage(1);

    this.form = this.formBuilder.group({
      maxElem: ['4', Validators.min(1)]
    })

   }

  ngOnInit(): void {
  }

  startedFilter(b: boolean){
    this.kitchen = [];
    this.price=[-1,-1];
    this.rate=[];
    this.category = [];
    this.type = [];
  }

  getKitchenOutput(s: string){
    this.kitchen.push(s);
    this.isFilter(true);
  }

  getPriceOutput(s: [number, number]){
    this.price = s;
    this.isFilter(true);
  }

  getRateOutput(s: number){
    this.rate.push(s);
    this.isFilter(true);
  }

  getCategoryOutput(s: string){
    this.category.push(s);
    this.isFilter(true);
  }

  getTypeOutput(s: string){
    this.type.push(s);
    this.isFilter(true);
  }

  isFilter(b: boolean){
    this.setPage(1);
  }

  getDishes(){
    let counter: number = this.supply.getDishes().length;
    // console.log(counter);
    this.restaurantService.page = Math.ceil(counter/this.restaurantService.max_elem);
    this.restaurantService.pages = Array(this.restaurantService.page).fill(1).map((x,i)=> i+1);
    return this.supply.getDishes();
  }

  getFirstPage(){
    let n = 1;
    this.restaurantService.start = (n-1)*this.restaurantService.max_elem;
    this.restaurantService.stop = (n)*this.restaurantService.max_elem;
    this.restaurantService.currentPage = n;
    this.getDishes();
  }

  getPreviousPage(){
    let n = Math.max(1, this.restaurantService.currentPage - 1);
    this.restaurantService.start = (n-1)*this.restaurantService.max_elem;
    this.restaurantService.stop = (n)*this.restaurantService.max_elem;
    this.restaurantService.currentPage = n;
    this.getDishes();
  }

  setPage(n: number){
    this.restaurantService.start = (n-1)*this.restaurantService.max_elem;
    this.restaurantService.stop = (n)*this.restaurantService.max_elem;
    this.restaurantService.currentPage = n;
    this.getDishes();
  }

  getNextPage(){
    let n = Math.min(this.restaurantService.page, this.restaurantService.currentPage + 1);
    this.restaurantService.start = (n-1)*this.restaurantService.max_elem;
    this.restaurantService.stop = (n)*this.restaurantService.max_elem;
    this.restaurantService.currentPage = n;
    this.getDishes();
  }

  getLastPage(){
    let n = this.restaurantService.page;
    this.restaurantService.start = (n-1)*this.restaurantService.max_elem;
    this.restaurantService.stop = (n)*this.restaurantService.max_elem;
    this.restaurantService.currentPage = n;
    this.getDishes();
  }

  getMaxElem(){
    let nr = this.form.value['maxElem'];
    if(nr >=1){
      this.restaurantService.max_elem = nr;
      this.setPage(1);
    } 
  }

}
