import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  display: number = 0;
  lastOperator: string = "";
  lastNumbaer: number= 0;

  constructor() { }

  ngOnInit(): void {
  
  }

  getSignalNumber(n: number){
    this.display = n;
  }

}
