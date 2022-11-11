import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, reauthenticateWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { ignoreElements } from 'rxjs';
import { AuthService } from '../auth.service';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  restaurantService;
  authService;

  constructor(private rest: RestaurantService,
    private authServ: AuthService,
    private router: Router, 
    private fromBuilder: FormBuilder) {

      this.restaurantService = rest;
      this.authService = authServ;
      this.form = fromBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        pass: ['', [Validators.required]]
      });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.authService.isLogged == true) return;
    if(this.form.get('name')?.invalid){ return;}
    if(this.form.get('email')?.invalid){
      return;
    }  
    if(this.form.get('pass')?.invalid){
      return;
    }

    if(this.form != undefined){
      this.authService.signIn(this.form.value.name, this.form.value.email, this.form.value.pass);
      // if(!this.authService.isError){
      //   this.router.navigate(['home']);
      // }
      this.form.reset();
    }
  }

  btnSignUp(){
    this.router.navigate(['signUp']);
  }

}