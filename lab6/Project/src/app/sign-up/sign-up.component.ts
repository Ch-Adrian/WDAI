import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  authService;

  constructor(private authServ: AuthService, private r: Router, private fromBuilder: FormBuilder) {
    this.authService = authServ;
      this.form = fromBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        pass: ['', [Validators.required]],
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
      this.authService.signUp(this.form.value.name, this.form.value.email, this.form.value.pass);
      // if(!this.authService.isError){
      //   this.r.navigate(['home']);
      // }
      this.form.reset();
    }
  }

}
