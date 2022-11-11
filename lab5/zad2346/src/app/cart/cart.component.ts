import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../dish';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  restaurantService: RestaurantService;
  products: Array<Dish>;

  constructor(private r: RestaurantService) {
    this.restaurantService = r;
    this.restaurantService.addProducts();
    this.products = this.restaurantService.cartProducts;
  }

  ngOnInit(): void {
  }

}
