import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { fakeBackendProvider } from './helpers/fake-backend';
import { SearchFilterPipe } from './helpers/search-filter.pipe';
import { FilterHeroesComponent } from './components/filter-heroes/filter-heroes.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortDirective } from './directives/sort.directive';
import { HeroesTableComponent } from './components/heroes-table/heroes-table.component';
@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    HeroesComponent,
    SearchFilterPipe,
    FilterHeroesComponent,
    SortDirective,
    HeroesTableComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
