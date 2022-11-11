import { NONE_TYPE, sharedStylesheetJitUrl } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  @Output() emitNumber: EventEmitter<number> = 
            new EventEmitter<number>();
  secondNumber: number = 0;
  firstNumber: number = 0;
  clickedOperator: string = "";


  constructor() { }

  ngOnInit(): void {

  }

  getSignalNr(n: number){
    if(this.firstNumber%1 != 0){
      this.firstNumber = 0;
    }
    // this.clickedNumber = n;
    this.firstNumber *= 10;
    this.firstNumber += n;
    this.emitStoredNumber(this.firstNumber);
  }

  getSignalOperator(s: string){

    if(s == 'C'){
      this.firstNumber = 0;
      this.emitStoredNumber(this.firstNumber);
      return;
    }

    if(s == "AC"){
      this.firstNumber = 0;
      this.secondNumber = 0;
      this.clickedOperator = "";
      this.emitStoredNumber(this.firstNumber);
      return;
    }

    if(s == '=' && this.clickedOperator != ""){
        this.firstNumber = this.evaluateNumber(this.firstNumber, this.secondNumber, this.clickedOperator);
        this.clickedOperator = "";
        this.secondNumber = 0;
        // this.secondNumber = this.firstNumber;
        // this.firstNumber = 0;
        this.emitStoredNumber(this.firstNumber);
        return;
    }

    if(this.clickedOperator != ""){
      this.firstNumber = this.evaluateNumber(this.firstNumber, this.secondNumber, this.clickedOperator);
      this.clickedOperator = s;
      this.secondNumber = this.firstNumber;
      this.firstNumber = 0;
      this.emitStoredNumber(this.secondNumber);
    }else if(s != '=') {
        this.clickedOperator = s;
        this.secondNumber = this.firstNumber;
        this.firstNumber = 0;
    }

  }

  evaluateNumber(num1: number, num2: number, op: string): number{
    switch(op){
      case '-':
        num1 = num2 - num1;
        break;
      case '+':
        num1 = num2 + num1;
        break;
      case '*':
        num1 = num2 * num1;
        break;
      case '/':
        num1 = num2 / num1;
        break;
      default:
        return num2;
    }
    return num1;
  }

  emitStoredNumber(n: number){
    this.emitNumber.emit(n);
  }

}
