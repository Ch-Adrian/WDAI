import { forwardRef, Inject, Pipe, PipeTransform } from '@angular/core';
import { Dish } from './dish';
import { RestaurantService } from './restaurant.service';

@Pipe({
  name: 'searchPipe',
  pure: false
})
export class SearchPipePipe implements PipeTransform {

  constructor(@Inject(forwardRef(() => RestaurantService)) private serv:RestaurantService) {

  }

  transform(dishes: Array<Dish>,
     kitchen: string[],//np. chińska
     price: [number, number],
      rate: number[],
       category: string[], // np. zupa
       type: string[] // np. wegańskie
       ): Array<Dish> {

       let arrDishes = new Array<Dish>();
        let full = 0;
        let added: Array<boolean> = [false,false,false,false,false];
        if(kitchen.length != 0) full++;
        if(price[0] != -1 && price[1] != -1) full++;
        if(rate.length != 0) full++;
        if(category.length != 0) full++;
        if(type.length != 0) full++;

        for(let d of dishes){
          kitchen.forEach(k => {if(d.getKitchenType() == k) {added[0] =  true;}});

          if(price[0] <= d.getPrice('USD')){
            if(price[1] >= d.getPrice('USD')){
              added[1] = true;
            }
          }
          
          rate.forEach(r => { if(d.rate == r){added[2]=true;}});
          category.forEach(c => { if(c == d.getCategory()){ added[3] = true;}})
          type.forEach( t => { if(t == d.getDishType()) { added[4] = true; }})

          let cnt = 0;
          for(let i = 0; i<5; i++){
            if(added[i]){cnt++;}
            added[i]=false;
          }
          if(cnt == full) arrDishes.push(d);
        }
      
    this.serv.filteredDishes = arrDishes;
    this.serv.setPageArray();
    return arrDishes;
  }

  

}
