import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Dish } from '../dish';
import { RestaurantService } from '../restaurant.service';
import { Review } from '../review';
import { SupplyService } from '../supply.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {

  restaurantService: RestaurantService;
  authService;
  dishView: Dish;

  clicked: boolean = false;
  // form: FormGroup = new FormGroup({});
  supply: SupplyService;
  kitchens: Array<string>;
  isError: boolean = false;

  formName;
  formKitchen;
  formType;
  formCategory;
  formIngredient;
  formAmount;
  formPrice;
  formDescription;
  formUrl;

  kitchen: Array<string> = [];
  price: [number, number] = [-1,-1];
  rate: Array<number> = [];
  category:Array<string> = [];
  type:Array<string> = [];

  constructor(private a: AuthService, private r: RestaurantService, private formBuilder: FormBuilder) {
    this.restaurantService = r;
    this.authService = a;
    this.dishView = this.restaurantService.detailDish;

    this.supply = this.restaurantService.supply;
    this.kitchens = this.supply.getKitchens();

    this.formName = this.formBuilder.group({
      dishName: ['', [Validators.required]]
    });
    this.formKitchen = this.formBuilder.group({
      kitchenType: ['Kitchen type', [Validators.required]]
    });
    this.formType = this.formBuilder.group({
      dishType: ['Dish type', [Validators.required]]
    });
    this.formCategory = this.formBuilder.group({
      dishCategory: ['Category', [Validators.required]]
    });
    this.formIngredient = this.formBuilder.group({
      ingredientsList: ['', [Validators.required]]
    });
    this.formAmount = this.formBuilder.group({
      maxAmount: ['', [Validators.required, Validators.pattern("[0-9]+")]]
    });
    this.formPrice = this.formBuilder.group({
      dishPrice: ['', [Validators.required, Validators.pattern("[0-9]+")]]
    });
    this.formDescription = this.formBuilder.group({
      description: ['', [Validators.required]]
    });
    this.formUrl = this.formBuilder.group({
      url: ['', [Validators.required]]
    });

    this.restaurantService.filteredDishes = this.supply.getDishes();
    this.restaurantService.checkMinAndMax();
  }

  ngOnInit(): void {
      this.dishView.reviews = [];
      this.authService.users.forEach( user =>{
        if(user.userdata != undefined){
        user.userdata.forEach( data =>{
          if(data.dishId == this.dishView.id){
            if(data.review.length > 0){
              let R: Review = new Review(data.review[0], data.review[1],data.review[2]);
              if(data.review.length == 4) R.setDate(new Date(data.review[3]));
              this.dishView.addReview(R);
            }
            // dish.rate.push(data.rate);
          }
        })
      }
      })

  }

  onClickAdd(){
    this.clicked = true;
  }

  // onSubmit(){
  //   if(this.form.get('dishName')?.invalid || 
  //   this.form.get('ingredientsList')?.invalid || 
  //   this.form.get('maxAmount')?.invalid ||
  //   this.form.get('dishPrice')?.invalid || 
  //   this.form.get('description')?.invalid || 
  //   this.form.get('url')?.invalid ||
  //   this.form.get('kitchenType')?.value == 'Kitchen type' ||
  //   this.form.get('dishType')?.value == 'Dish type' ||
  //   this.form.get('dishCategory')?.value == 'Category'){

  //     // this.form.get('maxAmount')?.value 
  //     this.isError = true;
  //     return;
  //   }

  //   if(this.form != undefined){
  //    this.supply.addDish(
  //       this.form.value.dishName,
  //       this.form.value.kitchenType,
  //       this.form.value.dishType,
  //       this.form.value.dishCategory,
  //       this.form.value.ingredientsList,
  //       this.form.value.maxAmount,
  //       this.form.value.dishPrice,
  //       this.form.value.description,
  //       [this.form.value.url]
  //     );
  //     this.form.reset();
  //    }
  //   this.onExit();
  //   this.restaurantService.onAddDish(true);
  // }

  onSubmitName(){
    if(this.formName.get('dishName')?.invalid ){
      return;
    }
    if(this.formName != undefined){
      this.dishView.name = this.formName.value.dishName;
      this.supply.updateFireDish(this.dishView, {name: this.formName.value.dishName});
      this.discard();
    }
  }

  onSubmitKitchen(){
    if(this.formKitchen.get('kitchenType')?.value == 'Kitchen type' ) return;
    if(this.formKitchen != undefined){
      this.dishView.kitchenType = this.formKitchen.value.kitchenType;
      this.supply.updateFireDish(this.dishView, {kitchenType: this.formKitchen.value.kitchenType});
      this.discard();
    }
  }

  onSubmitType(){
    // console.log("dziala")
    if(this.formType.get('dishType')?.value == 'Dish type')return;
    if(this.formType != undefined){
      this.dishView.dishtype = this.formType.value.dishType;
      this.supply.updateFireDish(this.dishView, {dishtype: this.formType.value.dishType});
      this.discard();
    }
  }

  onSubmitCategory(){
    if(this.formCategory.get('dishCategory')?.value == 'Category')return;
    if(this.formCategory != undefined){
      this.dishView.category = this.formCategory.value.dishCategory;
      this.supply.updateFireDish(this.dishView, {category: this.formCategory.value.dishCategory});
      this.discard();
    }
  }

  onSubmitIngredient(){
    if(this.formIngredient.get('ingredientsList')?.invalid) return;
    if(this.formIngredient != undefined){
      this.dishView.ingredients = this.formIngredient.value.ingredientsList;
      this.supply.updateFireDish(this.dishView, {ingredients: this.formIngredient.value.ingredientsList});
      this.discard();
    }
  }

  onSubmitAmount(){
    if(this.formAmount.get('maxAmount')?.invalid) return;
    if(this.formAmount != undefined){
      this.dishView.amount = this.formAmount.value.maxAmount;
      this.supply.updateFireDish(this.dishView, {amount: this.formAmount.value.maxAmount});
      this.discard();
    }
  }

  onSubmitPrice(){
    if(this.formPrice.get('dishPrice')?.invalid) return;
    if(this.formPrice != undefined){
      this.dishView.price = this.formPrice.value.dishPrice;
      this.supply.updateFireDish(this.dishView, {price: this.formPrice.value.dishPrice});
      this.discard();
    }
  }

  onSubmitDescription(){
    if(this.formDescription.get('description')?.invalid) return;
    if(this.formDescription != undefined){
      this.dishView.description = this.formDescription.value.description;
      this.supply.updateFireDish(this.dishView, {description: this.formDescription.value.description});
      this.discard();
    }
  }

  onSubmitUrl(){
    if(this.formUrl.get('url')?.invalid) return;
    if(this.formUrl != undefined){
      this.dishView.link.push(this.formUrl.value.url);
      let links: string[] = this.dishView.link;
      this.supply.updateFireDish(this.dishView, {link: links});
      this.discard();
    }
  }

  onExit(){
    this.clicked = false;
    this.isError = false;
  }

  discard(){
    if(this.formName != undefined){
      this.formName.reset();
    }
    if(this.formKitchen != undefined){
      this.formKitchen.reset();
    }
    if(this.formType != undefined){
      this.formType.reset();
    }
    if(this.formCategory != undefined){
      this.formCategory.reset();
    }
    if(this.formIngredient != undefined){
      this.formIngredient.reset();
    }
    if(this.formAmount != undefined){
      this.formAmount.reset();
    }
    if(this.formPrice != undefined){
      this.formPrice.reset();
    }
    if(this.formDescription != undefined){
      this.formDescription.reset();
    }
    if(this.formUrl != undefined){
      this.formUrl.reset();
    }
    this.onExit();
  }

  
  onDeleteDish(d: Dish){
    this.restaurantService.onDeleteDish(d);
  }

  getRateOfUser(d:Dish): number{
    let r: number = 0;
    this.authService.users.forEach( u =>{
      if(u.id == this.authService.userLoggedId){
        if(u.userdata != undefined){
        u.userdata.forEach( data =>{
          if(data.dishId == d.id){
            r = data.rate;
          }
        });
      }
      }

    });
    return r;
  }

  
  getEmittedRate(r: number){
    if(this.getRateOfUser(this.dishView) != 0){

    }

    let b: boolean= false;
    this.authService.users.forEach( u =>{
      if(u.id == this.authService.userLoggedId){
        if(u.userdata != undefined){
        u.userdata.forEach( data =>{
          if(data.dishId == this.dishView.id){
            data.rate = r;
            b = true;
          }
        });
      
        if(!b){

          u.userdata.push({dishId: this.dishView.id, rate: r, quantity: 0, review: []});
        }
        this.authService.updateFireUser(u, {userdata: u.userdata});
      }
      }

    });

  }


  canBeRated(d: Dish): boolean{
    let b: boolean = false;
    this.authService.users.forEach( u =>{
      if(u.id == this.authService.userLoggedId){
        if(u.userdata != undefined){
        u.userdata.forEach( data =>{
          if(data.dishId == d.id){
             b =  data.quantity > 0;
          }
        });
      }
      }
    })
    return b;
  }

  isReview(d: Dish): boolean{
    let b: boolean = false;
    this.authService.users.forEach( u =>{
      if(u.id == this.authService.userLoggedId){
        if(u.userdata != undefined){
        u.userdata.forEach( data =>{
          if(data.dishId == d.id){
             b =  (data.review.length != 0);
            //  console.log(data.review);
          }
        });
      }
      }
    })
    // console.log(b);
    return b;
  }

}
