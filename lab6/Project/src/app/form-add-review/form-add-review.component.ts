import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../auth.service';
import { Dish } from '../dish';
import { RestaurantService } from '../restaurant.service';
import { Review } from '../review';

@Component({
  selector: 'app-form-add-review',
  templateUrl: './form-add-review.component.html',
  styleUrls: ['./form-add-review.component.css']
})
export class FormAddReviewComponent implements OnInit {

  clicked: boolean = false;
  restaurantService: RestaurantService;
  form: FormGroup = new FormGroup({});
  isError: boolean = false;
  dishReview: Dish;
  errorTable: string[] =[];
  authService;

  constructor(private a: AuthService, private r: RestaurantService, private formBuilder: FormBuilder) {
    this.restaurantService = r; 
    this.dishReview = r.detailDish;
    this.errorTable = [];
    this.authService = a;
    this.form = this.formBuilder.group({
      nick: ['', [Validators.required]],
      reviewName: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: ['', []]
    });
  }

  ngOnInit(): void {
  }

  
  onClickAdd(){
    this.clicked = true;
  }

  onSubmit(){
    if(!this.authService.isLogged) return;
    
    if(this.r.isReview(this.dishReview)){
      this.errorTable.push("You can have just one review");
      this.isError = true;
      return;
    }

    if(this.form.get('nick')?.invalid){
      this.errorTable.push("Field nick is required");
      this.isError = true;
      return;
    }  
    if(this.form.get('reviewName')?.invalid){
      this.errorTable.push("Field name is required");
      this.isError = true;
      return;
    }
    if(this.form.get('description')?.invalid)
    {
      this.errorTable.push("Field description must have at least 50 chars up to 500 chars")
      this.isError = true;
      return;
    }

    if(this.form != undefined){
      let rev = new Review(
        this.form.value.nick,
        this.form.value.reviewName,
        this.form.value.description
      );
      rev.date = this.form.value.date;
      this.dishReview.addReview(rev);
      let isAdded: boolean = false;
      this.authService.users.forEach(u =>{
        if(u.id == this.authService.userLoggedId){
          u.userdata.forEach( data =>{
            if(data.dishId == this.dishReview.id){
              data.review.push(this.form.value.nick);
              data.review.push(this.form.value.reviewName);
              data.review.push(this.form.value.description);
              data.review.push(rev.date);
              isAdded = true;
            }
          });
          if(isAdded == false){
            u.userdata.push({dishId: this.dishReview.id, rate: 0, quantity: 0, review:[this.form.value.nick,this.form.value.reviewName,this.form.value.description,this.form.value.date]})
          }
          this.authService.updateFireUser(u,{userdata: u.userdata});
        }
      });

      // this.authService.isReview = true;
      // let auth = getAuth();
      // this.authService.users.forEach( u =>{
      //   if(u.id == auth.currentUser?.uid){
      //     this.authService.updateFireUser(u, {isReview: true});
      //   }
      // })
      this.form.reset();
      this.errorTable = [];
    }
    
    this.onExit();
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

  getLastError(): string{
    return this.errorTable[this.errorTable.length-1];
  }

}
