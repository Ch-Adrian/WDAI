import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from '../dish';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  restaurantService: RestaurantService;
  @Input() dishView: Dish = new Dish('','','','','',0,0,'',['']);

  constructor(private r: RestaurantService, private router: Router) {
    this.restaurantService = r;
   }

  ngOnInit(): void {
  }

  routeToDetail(){
    this.restaurantService.setDetailDish(this.dishView);
    this.router.navigate(['dishDetail']);
  }

}
