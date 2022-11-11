import { Review } from "./review";

export interface IAmDish{
	
	id?: string;
	name: string;
	kitchenType: string;
	dishtype: string;
	category: string;
	ingredients: string;
	amount: number;
	price: number;
	description: string;
	link: string[];
	clientAmount:number;
	rate: number;
	reviews: Review[];
}

export class Dish implements IAmDish{

	id?: string;
	name: string;
	kitchenType: string;
	dishtype: string;
	category: string;
	ingredients: string;
	amount: number;
	price: number;
	description: string;
	link: string[] = [];
	clientAmount:number;
	rate: number;

	reviews: Review[] = [];

	constructor(n: string, k: string, d: string, c: string,
		i: string, a: number, p: number, des: string, l: string[]){
		this.name = n;
		this.kitchenType = k;
		this.dishtype = d;
		this.category = c;
		this.ingredients = i;
		this.amount = a;
		this.price = p;
		this.description = des;
		this.link = this.link.concat(l);

		this.clientAmount = 0;
		this.rate = 0;
	}

	setThis(d: IAmDish){
		this.name = d.name;
		this.kitchenType = d.kitchenType;
		this.dishtype = d.dishtype;
		this.category = d.category;
		this.ingredients = d.ingredients;
		this.amount = d.amount;
		this.price = d.price;
		this.description = d.description;
		this.link = d.link ;
	}

	getName(){
		return this.name;
	}

	getKitchenType(){
		return this.kitchenType;
	}

	getDishType(){
		return this.dishtype;
	}

	getCategory(){
		return this.category;
	}

	getIngredients(){
		return this.ingredients;
	}

	getAmount(){
		return this.amount;
	}

	getClientAmount(){
		return this.clientAmount;
	}

	getPrice(curr: string){

		if(curr == 'EUR'){
			return this.price/1.13;
		}
		else if(curr == 'GBP'){
			return this.price/1.36;
		} 
		else{
			return this.price;
		}
	}

	getDescription(){
		return this.description;
	}

	getLink(nr: number){
		if(this.link.length > nr){
			return this.link[nr];
		} else if(this.link.length > 0){
			return this.link[0];
		}
		else{
			return '';
		}
	}

	setRate(r: number){
		this.rate = r;
	}

	copy(): Dish{
		let d = new Dish(
			this.name,
		this.kitchenType,
		this.dishtype,
		this.category,
		this.ingredients,
		this.amount,
		this.price,
		this.description,
		this.link);
		d.clientAmount = this.clientAmount;
		d.rate = this.rate;
		
		return d;
	}

	addReview(r: Review){
		this.reviews.push(r);
	}

}
