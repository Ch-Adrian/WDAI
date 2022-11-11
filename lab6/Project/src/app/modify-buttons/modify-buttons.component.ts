import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';
import { Dish } from '../dish';

@Component({
  selector: 'app-modify-buttons',
  templateUrl: './modify-buttons.component.html',
  styleUrls: ['./modify-buttons.component.css']
})
export class ModifyButtonsComponent implements OnInit {

  @Input() dishView: Dish = new Dish('','','','','',0,0,'',['']);
  @Output() deleted: EventEmitter<Dish> = new EventEmitter<Dish>();
  clientAmount: number = 0;
  constructor(private authService: AuthService) {
   }

  ngOnInit(): void {
    this.updateClientAmount(this.dishView);
  }
  
  increaseClientAmount(d: Dish){
    let added: boolean = false;
    this.authService.users.forEach( u => {
      if(u.id == this.authService.userLoggedId){
        if(u.userdata != undefined){
        u.userdata.forEach( data =>{
          if(data.dishId == d.id){
            data.quantity++;
            this.authService.updateFireUser(u, {userdata: u.userdata});
            added = true;
          }
        })
        if(added == false){
          u.userdata.push({dishId: d.id, rate: 0, quantity: 1, review: []})
          this.authService.updateFireUser(u,{userdata: u.userdata});
        }
      }
      }
    });
    this.updateClientAmount(d);
    //d.clientAmount++;
  }

  reduceClientAmount(d: Dish){

    this.authService.users.forEach( u => {
      if(u.id == this.authService.userLoggedId){
        if(u.userdata != undefined){
        u.userdata.forEach( data =>{
          if(data.dishId == d.id){
            data.quantity--;
            this.authService.updateFireUser(u, {userdata: u.userdata});
          }
        })
      }
      }
    });
    this.updateClientAmount(d);
    // d.clientAmount--;
  }

  onDeleteDish(d: Dish){
    this.deleted.emit(d);
  }

  updateClientAmount(d: Dish){
    let q = 0;
    this.authService.users.forEach( u => {
      if(u.id == this.authService.userLoggedId){
        if(u.userdata != undefined){
        u.userdata.forEach( data =>{
          if(data.dishId == d.id){
            q =  data.quantity;
          }
        });
      }

      }
    });

    this.clientAmount = q;
  }

}
