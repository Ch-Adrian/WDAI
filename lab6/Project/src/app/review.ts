export class Review {

	nick: string;
	name: string;
	description: string;
	date: string;

	constructor(ni: string, na: string, des: string){
		this.nick = ni;
		this.name = na;
		this.description = des;
		this.date = '';
	}

	setDate(d: Date){
		this.date = d.getUTCDate()+'.'+d.getUTCMonth()+1+'.'+d.getUTCFullYear()+"r.";
	}

}
