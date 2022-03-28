import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Hero } from '../models/Heroes';
import { Filter } from '../models/Filter';

const heroes: Hero[] = [
  {
    id: 1,
    name: 'Ibrahim',
    phone: '+2 050344400',
    email: 'example@ex.com',
    date: '2022-03-06',
    country: 'KSA',
    company: 'sary',
  },
  {
    id: 2,
    name: 'Ahmed',
    phone: '+2 050344400',
    email: 'example@ex.com',
    date: '2022-03-06',
    country: 'KSA',
    company: 'sary',
  },
  {
    id: 2,
    name: 'Ahmed',
    phone: '+2 050344400',
    email: 'example@ex.com',
    date: 'March 6, 2010',
    country: 'USA',
    company: 'sary',
  },
  {
    id: 3,
    name: 'Ali',
    phone: '+2 050344400',
    email: 'example@ex.com',
    date: 'March 6, 2010',
    country: 'EGYPT',
    company: 'sary',
  },
  {
    id: 4,
    name: 'Mohamed',
    phone: '+2 050344400',
    email: 'example@ex.com',
    date: 'March 6, 2010',
    country: 'USA',
    company: 'sary',
  },
];

const filterConfig: Filter[] = [
  {
    title: 'Email',
    type: 'text',
  },
  {
    title: 'Phone',
    type: 'text',
  },
  {
    title: 'Name',
    type: 'text',
  },
  {
    title: 'Company',
    type: 'text',
  },
  {
    title: 'country',
    type: 'dropdown',
    api: 'http://countryapi.gear.host/v1/Country/getCountries?pLimit=25&pPage=1',
    multiple: false,
  },
  {
    title: 'Date',
    type: 'date',
  },
];
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/heroes') && method === 'GET':
          return getHeroes();
        case url.endsWith('/filters') && method === 'GET':
          return getFilters();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getHeroes() {
      return ok(heroes);
    }
    function getFilters() {
      return ok(filterConfig);
    }

    // helper functions

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }));
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
