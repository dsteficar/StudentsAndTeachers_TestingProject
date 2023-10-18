import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/core/models/hero';
import { HeroService } from 'src/app/core/services/hero-service/hero.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit{

  displayedColumns: string[] = ['heroId','name','deleteAction'];
  dataSource!: MatTableDataSource<Hero>;

  selectedHero?: Hero;
  constructor(private heroService: HeroService){}
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes():void{
    this.heroService.getHeroes().subscribe(heroes=> {this.dataSource = new MatTableDataSource(heroes)});
  }

  add(name: string): void{
    name = name.trim();
    if(!name) {return;}
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.dataSource.data.push(hero);
      this.dataSource._updateChangeSubscription();
    });
  }
  delete(hero: Hero): void{
    this.dataSource.data = this.dataSource.data.filter(h=> h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
    this.dataSource._updateChangeSubscription();
  }
}
