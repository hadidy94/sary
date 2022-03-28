import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../models/Filter';

@Injectable({
  providedIn: 'root'
})
export class FilterConfigService {

  constructor(private http: HttpClient) { }

  getFilterConfig() {
    return this.http.get<Filter[]>(`/filters`);
  }
}
