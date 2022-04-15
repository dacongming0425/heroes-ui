
import { Component, OnInit } from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {MessageService} from "../message.service";
import { ChangeDetectorRef } from '@angular/core';
import { DialogService, } from '@alauda/ui';
import {  TemplateRef } from '@angular/core';

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
  
  
  constructor(public changeDetectorRef:ChangeDetectorRef,private readonly dialog: DialogService,
    private heroService: HeroService, private messageService: MessageService) { 
    this.dataSource  = this.heroes.slice();
   

}
open(template: TemplateRef<any>) {
  this.dialog.open(template);
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
    this.heroService.addHero({ name } as Hero).subscribe(hero => {this.heroes.push(hero)
      this.dataSource =this.heroes.slice()});
   
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe(()=>this.dataSource =this.heroes.slice());
  }

}
