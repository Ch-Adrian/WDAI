import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zad1';

  router: Router;

  constructor(private r: Router){
    this.router = r;
  }

  onClick(direction: string){
    this.router.navigate([direction]);
    console.log(this.router.getCurrentNavigation());
  }



}
