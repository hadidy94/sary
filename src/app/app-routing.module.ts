import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterHeroesComponent } from './components/filter-heroes/filter-heroes.component';
import { HeroesComponent } from './components/heroes/heroes.component';

const routes: Routes = [
  {
    path: '', component: HeroesComponent
  },
  {
    path: 'heroes', component: FilterHeroesComponent
  },
  {
    path: '**', component: HeroesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
