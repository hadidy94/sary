import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Hero } from 'src/app/models/Heroes';
import { faSortAmountDownAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-heroes-table',
  templateUrl: './heroes-table.component.html',
  styleUrls: ['./heroes-table.component.scss']
})
export class HeroesTableComponent implements OnInit {
  @Input() Heroes: Hero[] = [];
  searchTerm: string = '';
  faSortAmountDownAlt = faSortAmountDownAlt;
  faSearch = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

}
