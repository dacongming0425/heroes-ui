import { Injectable } from '@angular/core';
import {Hero} from "./hero";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  constructor() { }

  createDb(){
    const heroes = [
      { id: 1, name: 'Dr Nice',value:1 },
      { id: 2, name: 'Narco' ,value:2 },
      { id: 3, name: 'Bombasto' ,value:3},
      { id: 4, name: 'Celeritas' ,value:4},
      { id: 5, name: 'Magneta' ,value:5},
      { id: 6, name: 'RubberMan',value:6 },
      { id: 7, name: 'Dynama',value:7 },
      { id: 8, name: 'Dr IQ',value:8 },
      { id: 9, name: 'Magma',value:9 },
      { id: 10, name: 'Tornado',value:10 }
    ];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
