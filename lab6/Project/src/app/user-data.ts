import { Review } from "./review";

export class UserData {
    dishes: DishUserData[] = [];
}

export class DishUserData{
    dishId?: string;
    rate: number = 0;
    quantity: number = 0;
    review: string[] = [];
}

export interface IAmUserData{
    dishId?: string;
    rate: number;
    quantity: number;
    review: string[];
}

export interface IHaveUserData{
    dishes: DishUserData[];
}