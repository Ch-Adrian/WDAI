import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
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

}
