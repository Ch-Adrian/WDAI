import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { browserLocalPersistence, browserSessionPersistence, inMemoryPersistence } from 'firebase/auth';
import { ignoreElements } from 'rxjs';
import { AuthService } from '../auth.service';
import { RestaurantService } from '../restaurant.service';
import { IAmUser, User } from '../user';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  form;
  formInner;
  persistences = ['local', 'session', 'none'];
  roles = ['admin', 'manager', 'client'];
  authService;
  clicked: boolean = false;
  lastClicked: string = '';

  constructor(private f: FormBuilder, private a: AuthService, private restaurantService: RestaurantService) {
    this.authService = a;
    this.form = f.group({
      persis: ['Persistence type', [Validators.required]]
    });
    this.formInner = f.group({
      roleAdmin: [false],
      roleManager: [false],
      roleClient: [false]
    })

   }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.get('persis')?.invalid || this.form.value.persis == 'Persistence type'){
      return;
    }
    if(this.form != undefined){
      this.a.setPersistenceInApp(this.form.value.persis);
      this.a.updateFirePersis(this.form.value.persis, '1');

    }
  }

  showPersis(){
    if(this.authService.persis == inMemoryPersistence){
      return 'none';
    } else if(this.authService.persis == browserSessionPersistence){
      return 'session';
    } else return 'local';
  }

  btnEditRole(u: User){
    this.clicked = true;
    this.lastClicked = u.email;
  }
  back(){
    this.formInner.reset();
    this.clicked = false;
  }

  onSubmit2(u: User){
    if(this.formInner != undefined){
      let isAdmin : boolean = this.formInner.value.roleAdmin;
      let isManager: boolean = this.formInner.value.roleManager;
      let isClient: boolean = this.formInner.value.roleClient;
      let arrR: string[] = [];
      if(isAdmin) arrR.push('admin');
      if(isManager) arrR.push('manager');
      if(isClient) arrR.push('client');
      this.authService.updateFireUser(u, {role: arrR});
      this.authService.updateFireUser(u, {isAdmin: isAdmin});
      this.authService.updateFireUser(u, {isManager: isManager});
      this.authService.updateFireUser(u, {isClient: isClient});
      this.authService.users.forEach(user =>{
        if(u.id == user.id){
          user.isAdmin = isAdmin;
          user.isManager = isManager;
          user.isClient = isClient;
          user.role = arrR;
        }
      })
    }
    this.back();
  }

  clickedUser(u: User){
    if(u.email == this.lastClicked){ return true;}
    return false;
  }

  banUser(u: User){
    // console.log(u.isBanned);
    if(u.isBanned == false){
      this.authService.users.forEach( user =>{
        if(user.id == u.id){
          user.isBanned = true;
          user.userdata.forEach(data => {
            
            // if(data.rate != 0){
            //   this.restaurantService.supply.dishes.forEach( d =>{
            //     if(d.id == data.dishId){
            //       for(let i = 0; i<d.rate.length; i++){
            //         if(d.rate[i] == data.rate){
            //           d.rate.splice(i, 1);
            //           break;
            //         }
            //       }
            //     }
            //   });
              data.rate = 0;
            // if(data.review != []){
            //   this.restaurantService.supply.dishes.forEach( d =>{
            //     if(d.id == data.dishId){
            //       for(let i = 0; i<d.reviews.length; i++){
            //         for(let j = 0; j<data.review.length; j++){
            //           if(d.reviews[i] == data.review[j]){
            //             d.rate.splice(i, 1);
            //             break;
            //           }
            //         }
            //       }
            //     }
            //   });
              data.review = [];
            
          })
        }
      })
      this.authService.updateBanUser(u, true);
      this.authService.updateFireUser(u, {userdata: u.userdata});
    }
    else{
      this.authService.users.forEach( user =>{
        if(user.id == u.id){
          user.isBanned = false;
        }
      })
      this.authService.updateBanUser(u, false);
    }
  }

  getStrBan(u: User){
        if(u.isBanned){
          return 'Odbanuj';
        }else{
          return "Zbanuj";
        }
  }

}
