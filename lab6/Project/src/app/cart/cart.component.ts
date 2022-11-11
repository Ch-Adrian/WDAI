import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../dish';
import { RestaurantService } from '../restaurant.service';
import { DishUserData } from '../user-data';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  restaurantService: RestaurantService;
  products: Array<Dish>;
  dataProducts: Array<DishUserData>;

  constructor(private r: RestaurantService) {
    this.restaurantService = r;
    this.restaurantService.addProducts();
    this.products = this.restaurantService.cartProducts;
    this.dataProducts = this.restaurantService.cartDataProducts;
  }

  ngOnInit(): void {
    this.restaurantService.addProducts();
    this.products = this.restaurantService.cartProducts;
    this.dataProducts = this.restaurantService.cartDataProducts;
    // console.log(this.restaurantService.cartProducts.length);
  }

}
