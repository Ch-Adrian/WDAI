import { Injectable } from '@angular/core';
import { Dish } from './dish';
import { SupplyService } from './supply.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  public supply: SupplyService;
  cartProducts: Array<Dish> = [];
  private cartTotal: number = 0;
  curr: string = "USD";
  maxPrice = 0;
  minPrice = 10000000000;
  detailDish: Dish;
  public filteredDishes: Array<Dish> = new Array<Dish>();

  //pagination
  start: number = 0;
  page: number = 2;
  pages: number[] = [];
  currentPage: number = 1;
  max_elem: number = 4;
  stop: number = this.max_elem;

  constructor(private s: SupplyService) { 
    this.supply = s;
    this.detailDish = this.supply.getDishes()[0];
  }

  setPageArray(){
    let counter: number = this.filteredDishes.length;//this.supply.getDishes().length;
    // console.log(counter);
    this.page = Math.ceil(counter/this.max_elem);
    this.pages = Array(this.page).fill(1).map((x,i)=> i+1);
    // console.log(this.page);
  }

  getCartTotal(curr: string){

		if(curr == 'EUR'){
			return this.cartTotal/1.13;
		}
		else if(curr == 'GBP'){
			return this.cartTotal/1.36;
		} 
		else{
			return this.cartTotal;
		}
	}

  
  addProducts(){

    this.cartProducts = [];
    for(let p of this.supply.getDishes()){
      if(p.getClientAmount()>0){
        this.cartProducts.push(p);
        this.cartTotal += p.getPrice(this.curr) * p.getClientAmount();
      }
    }
  }

  checkMinAndMax(){
    this.maxPrice = 0;
    this.minPrice = 10000000000;
  
    for(let d of this.supply.getDishes()){
      
      if(d.getPrice('USD') > this.maxPrice){
        this.maxPrice = d.getPrice('USD');
      }
      if(d.getPrice('USD') < this.minPrice){
        this.minPrice = d.getPrice('USD');
      }
    }

  }

  onDeleteDish(d: Dish){
    this.supply.removeDish(d);
    this.checkMinAndMax();
  }

  onAddDish(e: boolean){
    if(e){
      this.checkMinAndMax();
    }
  }

  setDetailDish(d: Dish){
    this.detailDish = d;
  }

}
