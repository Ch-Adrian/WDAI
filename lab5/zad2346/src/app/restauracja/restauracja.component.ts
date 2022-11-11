import { Component, OnInit, Type } from '@angular/core';
import { SupplyService } from '../supply.service';
import { Dish } from '../dish';
import { Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restauracja',
  templateUrl: './restauracja.component.html',
  styleUrls: ['./restauracja.component.css']
})
export class RestauracjaComponent implements OnInit {

  router: Router;
  restaurantService: RestaurantService;

  constructor(private r: Router, private rest: RestaurantService) {
    this.router = r;
    this.restaurantService = rest;
   }

  ngOnInit(): void {
  }

  clickCart(){
    this.router.navigate(['cart']);
  }

  clickHome(){
    this.router.navigate(['home']);
  }

  clickMenu(){
    this.router.navigate(['menu']);
  }

  clickAddDish(){
    this.router.navigate(['addDish']);
  }

  currBtn(){
    if(this.restaurantService.curr == 'USD'){
      this.restaurantService.curr = 'GBP';
    }else if(this.restaurantService.curr == 'GBP'){
      this.restaurantService.curr = 'EUR';
    }
    else{
      this.restaurantService.curr = 'USD';
    }
  }

}
