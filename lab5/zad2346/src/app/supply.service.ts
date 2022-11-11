import { Injectable } from '@angular/core';
import { Dish, IAmDish } from './dish';
import {  deleteDoc, updateDoc, collectionData, docData, Firestore, doc, addDoc, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface IAmString{
  id?: string;
  str: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  kitchens: Array<string>;
  category: Array<string>;
  type: Array<string>;
  dishes: Array<Dish>;

  constructor(private firestore: Firestore){
    this.kitchens = this.getFireKitchens();
    this.category = this.getFireCategories();
    this.type = this.getFireTypes();
    this.dishes = this.getFireDishes();

  }

  
  getKitchens(){
    return this.kitchens;
  }

  getCategories(){
    return this.category;
  }

  getTypes(){
    return this.type;
  }

  getDishes(){
    return this.dishes;
  }

  removeDish(d: Dish){
    this.dishes.splice(this.dishes.indexOf(d), 1);
    this.removeFireDish(d);
  }

  
  addDish(
    name: string,
    kitchenType: string,
    dishtype: string,
    category: string,
    ingredients: string,
    amount: number,
    price: number,
    description: string,
    link: string[]
    ){
    let d = new Dish(
      name,
      kitchenType,
      dishtype,
      category,
      ingredients,
      amount,
      price,
      description,
      link
    );
    this.dishes.push(d);

    this.addFireDish(
      name,
      kitchenType,
      dishtype,
      category,
      ingredients,
      amount,
      price,
      description,
      link,
      d
      );
  }

  getFireDishes(){
    const dishesRef = collection(this.firestore, 'dishes');
    const dishesArr =  collectionData(dishesRef, {idField: 'id'}) as Observable<IAmDish[]>;
    let response: Array<Dish> = []; 
    dishesArr.subscribe(res => {
      for(let d of res){
        let dish = new Dish("","","","","",1,1,"",[""]);
        dish.setThis(d);
        response.push(dish);
      }
    });
    return response;
  }

  getFireDishById(id: string): Observable<IAmDish>{
    const dishDocRef = doc(this.firestore, `dishes/${id}`);
    return docData(dishDocRef, { idField: 'id'}) as Observable<IAmDish>;
  }

  addFireDish(
        name: string,
        kitchenType: string,
        dishtype: string,
        category: string,
        ingredients: string,
        amount: number,
        price: number,
        description: string,
        link: string[]
        , d: Dish){
    
        let dish = {
          name,
          kitchenType,
          dishtype,
          category,
          ingredients,
          amount,
          price,
          description,
          link
        };

        const dishesRef = collection(this.firestore, 'dishes');
        let t = addDoc(dishesRef, dish).then( data =>{
          d.id = data.id;
          this.updateFireDish(d, {id: d.id});
        });
        return t;
      }

  removeFireDish(dish: IAmDish){
    const dishDocRef = doc(this.firestore, `dishes/${dish.id}`);
    return deleteDoc(dishDocRef);
  }

  updateFireDish(dish: IAmDish, obj: any){
    const dishDocRef = doc(this.firestore, `dishes/${dish.id}`);
    return updateDoc(dishDocRef, obj);
  }
  
  getFireKitchens(){
    const kitchensRef = collection(this.firestore, 'kitchens');
    const kitchensArr =  collectionData(kitchensRef, {idField: 'id'}) as Observable<IAmString[]>;
    let response: Array<string> = []; 
    kitchensArr.subscribe(res => {
      res.forEach( d => response.push(d.str));
    });
    return response;
  }

  getFireCategories(){
    const categoriesRef = collection(this.firestore, 'categories');
    const categoriesArr =  collectionData(categoriesRef, {idField: 'id'}) as Observable<IAmString[]>;
    let response: Array<string> = []; 
    categoriesArr.subscribe(res => {
      res.forEach( d => response.push(d.str));
    });
    return response;
  }

  getFireTypes(){
    const typesRef = collection(this.firestore, 'types');
    const typesArr =  collectionData(typesRef, {idField: 'id'}) as Observable<IAmString[]>;
    let response: Array<string> = []; 
    typesArr.subscribe(res => {
      res.forEach( d => response.push(d.str));
    });
    return response;
  }

  }
