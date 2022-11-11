import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Dish } from '../dish';
import { RestaurantService } from '../restaurant.service';
import { SupplyService } from '../supply.service';

@Component({
  selector: 'app-form-add-dish',
  templateUrl: './form-add-dish.component.html',
  styleUrls: ['./form-add-dish.component.css']
})
export class FormAddDishComponent implements OnInit {

  clicked: boolean = false;
  form: FormGroup = new FormGroup({});
  supply: SupplyService;
  restaurantService: RestaurantService;
  kitchens: Array<string>;
  isError: boolean = false;

  kitchen: Array<string> = [];
  price: [number, number] = [-1,-1];
  rate: Array<number> = [];
  category:Array<string> = [];
  type:Array<string> = [];

  form2: FormGroup = new FormGroup({});


  constructor(private r: RestaurantService, private formBuilder: FormBuilder) {
    this.restaurantService = r;
    this.supply = this.restaurantService.supply;
    this.kitchens = this.supply.getKitchens();

    this.form = this.formBuilder.group({
      dishName: ['', [Validators.required]],
      kitchenType: ['Kitchen type', [Validators.required]],
      dishType: ['Dish type', [Validators.required]],
      dishCategory: ['Category', [Validators.required]],
      ingredientsList: ['', [Validators.required]],
      maxAmount: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      dishPrice: ['', [Validators.required, Validators.pattern("[0-9]+")]],
      description: ['', [Validators.required]],
      url: ['', [Validators.required]]
    });

    this.restaurantService.filteredDishes = this.supply.getDishes();
    this.restaurantService.checkMinAndMax();
    // this.setPage(1);

    this.form2 = this.formBuilder.group({
      maxElem: ['4', Validators.min(1)]
    })

   }
 
   startedFilter(b: boolean){
     this.kitchen = [];
     this.price=[-1,-1];
     this.rate=[];
     this.category = [];
     this.type = [];
   }
 
   getKitchenOutput(s: string){
     this.kitchen.push(s);
     this.isFilter(true);
   }
 
   getPriceOutput(s: [number, number]){
     this.price = s;
     this.isFilter(true);
   }
 
   getRateOutput(s: number){
     this.rate.push(s);
     this.isFilter(true);
   }
 
   getCategoryOutput(s: string){
     this.category.push(s);
     this.isFilter(true);
   }
 
   getTypeOutput(s: string){
     this.type.push(s);
     this.isFilter(true);
   }
 
   isFilter(b: boolean){
     this.setPage(1);
   }
 
   getDishes(){
     let counter: number = this.supply.getDishes().length;
     // console.log(counter);
     this.restaurantService.page = Math.ceil(counter/this.restaurantService.max_elem);
     this.restaurantService.pages = Array(this.restaurantService.page).fill(1).map((x,i)=> i+1);
     return this.supply.getDishes();
   }
 
   getFirstPage(){
     let n = 1;
     this.restaurantService.start = (n-1)*this.restaurantService.max_elem;
     this.restaurantService.stop = (n)*this.restaurantService.max_elem;
     this.restaurantService.currentPage = n;
     this.getDishes();
   }
 
   getPreviousPage(){
     let n = Math.max(1, this.restaurantService.currentPage - 1);
     this.restaurantService.start = (n-1)*this.restaurantService.max_elem;
     this.restaurantService.stop = (n)*this.restaurantService.max_elem;
     this.restaurantService.currentPage = n;
     this.getDishes();
   }
 
   setPage(n: number){
     this.restaurantService.start = (n-1)*this.restaurantService.max_elem;
     this.restaurantService.stop = (n)*this.restaurantService.max_elem;
     this.restaurantService.currentPage = n;
     this.getDishes();
   }
 
   getNextPage(){
     let n = Math.min(this.restaurantService.page, this.restaurantService.currentPage + 1);
     this.restaurantService.start = (n-1)*this.restaurantService.max_elem;
     this.restaurantService.stop = (n)*this.restaurantService.max_elem;
     this.restaurantService.currentPage = n;
     this.getDishes();
   }
 
   getLastPage(){
     let n = this.restaurantService.page;
     this.restaurantService.start = (n-1)*this.restaurantService.max_elem;
     this.restaurantService.stop = (n)*this.restaurantService.max_elem;
     this.restaurantService.currentPage = n;
     this.getDishes();
   }
 
   getMaxElem(){
     let nr = this.form2.value['maxElem'];
     if(nr >=1){
       this.restaurantService.max_elem = nr;
       this.setPage(1);
     } 
   }

  ngOnInit(): void {
  }

  onClickAdd(){
    this.clicked = true;
  }

  onSubmit(){
    if(this.form.get('dishName')?.invalid || 
    this.form.get('ingredientsList')?.invalid || 
    this.form.get('maxAmount')?.invalid ||
    this.form.get('dishPrice')?.invalid || 
    this.form.get('description')?.invalid || 
    this.form.get('url')?.invalid ||
    this.form.get('kitchenType')?.value == 'Kitchen type' ||
    this.form.get('dishType')?.value == 'Dish type' ||
    this.form.get('dishCategory')?.value == 'Category'){
      this.form.get('maxAmount')?.value 
      this.isError = true;
      return;
    }

    if(this.form != undefined){
     this.supply.addDish(
        this.form.value.dishName,
        this.form.value.kitchenType,
        this.form.value.dishType,
        this.form.value.dishCategory,
        this.form.value.ingredientsList,
        this.form.value.maxAmount,
        this.form.value.dishPrice,
        this.form.value.description,
        [this.form.value.url]
      );
      this.form.reset();
     }
    this.onExit();
    this.restaurantService.onAddDish(true);
  }

  onExit(){
    this.clicked = false;
    this.isError = false;
  }

  discard(){
    if(this.form != undefined){
      this.form.reset();
    }
    this.onExit();
  }

  
  onDeleteDish(d: Dish){
    this.restaurantService.onDeleteDish(d);
  }

}
