export class ModelColor {

    private model: string;
    private colors: Array<string>;

    constructor(m:string, c: Array<string>){
        this.model = m;
        this.colors = c;
    }

    getModel(){
        return this.model;
    }

    getColors(){
        return this.colors;
    }

}
