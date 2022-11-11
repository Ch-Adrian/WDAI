import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../supply.service';
import { Dish } from '../dish';

@Component({
  selector: 'app-restauracja',
  templateUrl: './restauracja.component.html',
  styleUrls: ['./restauracja.component.css']
})
export class RestauracjaComponent implements OnInit {

  supply: SupplyService;
  curr: string = "USD";
  maxPrice: number = 0;
  minPrice: number = 10000000000;

  cartProducts: Array<Dish> = [];
  cartTotal: number = 0;
  cartShow: boolean = false;

  constructor(private s: SupplyService) {
    s.menuUpdate();
    this.supply = s;

    this.checkMinAndMax();
   }

  ngOnInit(): void {
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

  addProducts(){
    if(this.cartShow == false){
      this.cartShow = true;
      this.cartProducts = [];
      for(let p of this.supply.getDishes()){
        if(p.getClientAmount()>0){
          this.cartProducts.push(p);
          this.cartTotal += p.getPrice(this.curr) * p.getClientAmount();
        }
      }
    }
    else{
      this.cartShow = false;
      this.cartTotal = 0;
    }
  }

}
