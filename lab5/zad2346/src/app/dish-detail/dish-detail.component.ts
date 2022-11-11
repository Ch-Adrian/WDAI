import { Component, OnInit } from '@angular/core';
import { Dish } from '../dish';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {

  restaurantService: RestaurantService;
  dishView: Dish;

  constructor(private r: RestaurantService) {
    this.restaurantService = r;
    this.dishView = this.restaurantService.detailDish;
   }

  ngOnInit(): void {
  }

  getEmittedRate(r: number){
    this.dishView.setRate(r);
  }

}
