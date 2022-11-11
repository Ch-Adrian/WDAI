export class Dish {

	name: string;
	kitchenType: string;
	dishtype: string;
	category: string;
	ingredients: string;
	amount: number;
	price: number;
	description: string;
	link: string;
	clientAmount:number;
	rate: number;

	constructor(n: string, k: string, d: string, c: string,
		i: string, a: number, p: number, des: string, l: string){
		this.name = n;
		this.kitchenType = k;
		this.dishtype = d;
		this.category = c;
		this.ingredients = i;
		this.amount = a;
		this.price = p;
		this.description = des;
		this.link = l;

		this.clientAmount = 0;
		this.rate = 0;
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
		}else{
			return this.price;
		}
	}

	getDescription(){
		return this.description;
	}

	getLink(){return this.link;}

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

}
