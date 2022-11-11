import { Component, OnInit } from '@angular/core';
import { Dish } from '../dish';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  restaurantService: RestaurantService;
  dishes: Array<Dish>;

  constructor(r: RestaurantService) { 
    this.restaurantService = r;
    this.dishes = this.restaurantService.supply.getDishes();
  }

  ngOnInit(): void {
  }

}
