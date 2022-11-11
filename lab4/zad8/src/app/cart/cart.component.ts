import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../dish';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() products: Array<Dish> = [];
  @Input() curr: string = "USD";
  @Input() total: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
