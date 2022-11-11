import { Injectable } from '@angular/core';
import { ModelColor } from './model-color';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  readonly marks:Array<string>;
  readonly models:Array<Array<ModelColor>>=[];
  
  constructor() {
    this.marks = ['Audi','BMW','Citroen','Ford','Honda'];

    for(let i = 0; i<5; i++){
      this.models.push([]);
    }

    this.models[0].push(
      new ModelColor(
        "A1",
       ['white', 'blue', 'red','yellow']
       )
      );
    this.models[0].push(
      new ModelColor(
        "A3",
        ['blue', 'red', 'black']
        )
      );
    this.models[0].push(
          new ModelColor(
            "Q2",
            ['white']
          )
        );
    this.models[0].push(
          new ModelColor(
          "e-tron",
          ['blue']
          )
        );
    
    this.models[1].push(
      new ModelColor(
        "3",
        ['blue', 'silver', 'gray']
      )
    )
    this.models[1].push(
      new ModelColor(
        "X4",
        ['blue', 'white', 'black', 'red']
      )
    )
    this.models[1].push(
      new ModelColor(
        "X6",
        ['brown', 'white', 'red']
      )
    )

    this.models[2].push(
      new ModelColor(
        "Berlingo",
        ['white', 'blue','green']
      )
    )
    this.models[2].push(
      new ModelColor(
        "C3",
        ['red', 'black', 'silver']
      )
    )
    this.models[2].push(
      new ModelColor(
        "C4",
        ['orange', 'black', 'gray']
      )
    )
    this.models[2].push(
      new ModelColor(
        "Spacetourer",
        ['white']
      )
    )

    this.models[3].push(
      new ModelColor(
        "Fiesta",
        ['white', 'green', 'red', 'black']
      )
    )
    this.models[3].push(
      new ModelColor(
        "Mustang",
        ['orange']
      )
    )
    this.models[3].push(
      new ModelColor(
        "Mondeo",
        ['white', 'gray', 'blue']
      )
    )

    this.models[4].push(
      new ModelColor(
        "Civic",
        ['red', 'yellow', 'blue','gray']
      )
    )
    this.models[4].push(
      new ModelColor(
        "Jazz",
        ['white', 'blue', 'red']
      )
    )

   }

}
