import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit {

  title: string = "Salon samochodowy";
  model: string = "";
  mark: string = "";
  color: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  getSignalModel(m: string){
    this.model = m;
  }

  getSignalMark(m: string){
    this.mark = m;
  }

  getSignalColor(c: string){
    this.color = c;
  }

}
