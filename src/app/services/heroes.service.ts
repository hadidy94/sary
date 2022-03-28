import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/Heroes';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getAllHeroes() {
    return this.http.get<Hero[]>(`/heroes`);
  }
}
