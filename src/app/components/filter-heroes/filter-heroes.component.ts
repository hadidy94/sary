import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/Heroes';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-filter-heroes',
  templateUrl: './filter-heroes.component.html',
  styleUrls: ['./filter-heroes.component.scss']
})
export class FilterHeroesComponent implements OnInit {
  Heroes:Hero[] = [];
  routeParams: any = {};

  constructor(private route: ActivatedRoute,
    private heroesService: HeroesService
  ) { }


  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params: any) => {
        this.routeParams = params;
        this.getData();
      });
  }

  getData(): void {
    this.heroesService.getAllHeroes().pipe(first()).subscribe((heroes: any) => {
      const result = heroes.filter((item : any) => {
        for (var key in this.routeParams) {
          if (item[key] === undefined || item[key] != this.routeParams[key])
            return false;
        }
        return true;
      });
       this.Heroes =  result ;
    })
  }

}
