import { DishUserData } from "./user-data";

export class User {
    id?: string;
    isAdmin: boolean = false;
    isManager: boolean = false;
    isClient: boolean = false;
    role: string[];
    name: string = "";
    email: string = "";
    isBanned: boolean = false;
    isReview: boolean = false;
    isRate: boolean = false;
    userdata: DishUserData[] = [];
    constructor(r: string[], n: string, e:string){
        r.forEach( rl =>{
            switch(rl){
                case 'admin': this.isAdmin = true; break;
                case 'manager': this.isManager = true; break;
                case 'client' : this.isClient = true; break;
                default: break;
            }
        });
        this.role = r;
        this.name = n;
        this.email = e;
    }
}

export interface IAmUser{
    id?: string;
    isAdmin: boolean;
    isManager: boolean;
    isClient: boolean;
    role: string[];
    name:string;
    email:string;
    isBanned: boolean;
    isReview: boolean;
    isRate: boolean;
    userdata: DishUserData[];
}