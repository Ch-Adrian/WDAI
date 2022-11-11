import { Component, OnInit, Type } from '@angular/core';
import { Str, SupplyService } from '../supply.service';
import { Dish } from '../dish';
import { Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { getAuth, signOut } from 'firebase/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-restauracja',
  templateUrl: './restauracja.component.html',
  styleUrls: ['./restauracja.component.css']
})
export class RestauracjaComponent implements OnInit {

  router: Router;
  restaurantService: RestaurantService;
  authService;

  constructor(private authServ: AuthService, private r: Router, private rest: RestaurantService) {
    this.authService = authServ;
    this.router = r;
    this.restaurantService = rest;
   }

  ngOnInit(): void {
  }

  clickCart(){
    // this.authService.updateUsers();
    // this.rest.supply.updateDishesAgain();
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

  clickAdminView(){
    this.router.navigate(['adminView']);
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

  signInBtn(){
    this.authService.isError = false;
    if(this.authService.isLogged){
      this.authService.signOut();
      this.router.navigate(['home']);
    }
    else{
      this.router.navigate(['signIn']);
    }
  }

  signUpBtn(){
    this.authService.isError = false;
    this.router.navigate(['signUp']);
  }

}
