import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Dish } from './dish';
import { SupplyService } from './supply.service';
import { User } from './user';
import { DishUserData, UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  public supply: SupplyService;
  cartProducts: Array<Dish> = [];
  cartDataProducts: Array<DishUserData> = [];
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

  constructor(private authService: AuthService, private s: SupplyService) { 
    this.supply = s;
    this.detailDish = this.supply.getDishes()[0];
  }

  setPageArray(){
    let counter: number = this.filteredDishes.length;//this.supply.getDishes().length;
    this.page = Math.ceil(counter/this.max_elem);
    this.pages = Array(this.page).fill(1).map((x,i)=> i+1);
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
    this.cartDataProducts = [];
    this.cartTotal = 0;
    let u: User = new User([''],'','');
    let found = false;
    this.authService.users.forEach( user =>{
      if(user.id == this.authService.userLoggedId){
        u = user;
        found = true;
      }

    })
    if(!found){ return;}
    for(let p of u.userdata){
      let d: Dish = new Dish('','','','','',1,1,'',['']);
      let isPresent = false;
      this.supply.dishes.forEach( dish =>{
        if(dish.id == p.dishId && p.quantity > 0){
          d = dish;
          isPresent = true;
        }
      })
      if(isPresent == false) continue;
      this.cartProducts.push(d);
      this.cartTotal += d.getPrice(this.curr) * p.quantity;
      this.cartDataProducts.push(p);
    }
    // for(let p of this.supply.getDishes()){
    //   if(p.getClientAmount()>0){
    //     this.cartProducts.push(p);
    //     this.cartTotal += p.getPrice(this.curr) * p.getClientAmount();
    //   }
    // }
  }

  isReview(d: Dish): boolean{
    let b: boolean = false;
    this.authService.users.forEach( u =>{
      if(u.id == this.authService.userLoggedId){
        u.userdata.forEach( data =>{
          if(data.dishId == d.id){
             b =  (data.review.length != 0);
            //  console.log(data.review);
          }
        });
      }
    })
    // console.log(b);
    return b;
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
