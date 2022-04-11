import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes:Hero[] = [];
  dataSource : Hero[] ;
  rowExpanded = new Set<number>();
  heroName = '';
  
  constructor(private heroService: HeroService, private messageService: MessageService) { 
    this.dataSource  = this.heroes.slice();

}

toggleRow(id: number) {
  if (this.rowExpanded.has(id)) {
    this.rowExpanded.delete(id);
  } else {
    this.rowExpanded.add(id);
  }
}
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes
      this.dataSource = heroes
    });
  }

  add(name: string): void {
    name = name.trim();
    if(!name){return;}
    this.heroService.addHero({ name } as Hero).subscribe(hero => this.heroes.push(hero));
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
