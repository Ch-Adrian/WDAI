import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from './dish';
import { FormAddDishComponent } from './form-add-dish/form-add-dish.component';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(dishes: Array<Dish>,
     kitchen: string[],//np. chińska
     price: [number, number],
      rate: number[],
       category: string[], // np. zupa
       type: string[] // np. wegańskie
       ): Array<Dish> {

       let arrDishes = [];
        let added: boolean = false;
        for(let d of dishes){
          
          for(let k of kitchen){
            if(d.getKitchenType() == k){
              arrDishes.push(d);
              added = true;
              break;
            }
          }
          if(added){
            added = false;
            continue;
          }

          let minP = price[0];
          let maxP = price[1];
        
          if(minP <= d.getPrice('USD')){
            if(maxP >= d.getPrice('USD')){
              arrDishes.push(d);
              continue;
            }
          }

          for(let r of rate){
            if(d.rate == r){
              arrDishes.push(d);
              added = true;
              break;
            }
          }

          if(added){
            added = false;
            continue;
          }

          for(let c of category){
            if(c == d.getCategory()){
              arrDishes.push(d);
              added = true;
              break;
            }
          }

          if(added){
            added = false;
            continue;
          }

          for(let t of type){
            if(t == d.getDishType()){
              arrDishes.push(d);
              added = true;
              break;
            }
          }

          added = false;
        }

    return arrDishes;
  }

}
