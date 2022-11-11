export class Review {

	nick: string;
	name: string;
	description: string;
	date: Date;

	constructor(ni: string, na: string, des: string){
		this.nick = ni;
		this.name = na;
		this.description = des;
		this.date = new Date();
	}

	setDate(d: Date){
		this.date = d;
	}

}
