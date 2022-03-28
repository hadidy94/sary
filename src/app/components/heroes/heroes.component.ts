import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { first } from 'rxjs/operators';
import { Hero } from 'src/app/models/Heroes';




@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  Heroes:Hero[] = [];
  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.heroesService.getAllHeroes().pipe(first()).subscribe(heroes => {
       this.Heroes = heroes;
    })
  }
}
