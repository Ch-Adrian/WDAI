import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  value: number = 0;
  isDisabledParent: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ala(){
    this.value += 1;
  }

  btnClick(e: number){
      this.value += e;
      if(this.value == 10){
        this.isDisabledParent = true;
      }
  }

  btnReset(e: number){
    this.value = e;
    this.isDisabledParent = false;
  }
}
