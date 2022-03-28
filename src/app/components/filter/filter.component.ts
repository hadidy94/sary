import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Filter } from 'src/app/models/Filter';
import { FilterConfigService } from '../../services/filter-config.service';
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from '@angular/router';
import { faSortAmountDownAlt, faSearch } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterConfig: Filter[] = [];
  // panelOpenState = true;
  form = new FormGroup({});
  faSortAmountDownAlt = faSortAmountDownAlt;

  constructor(
    private filterConfigService: FilterConfigService,
    private router: Router,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.filterConfigService.getFilterConfig().pipe(first()).subscribe((el) => {
      this.filterConfig = el;
      this.filterConfig.forEach(el => {
        this.form.addControl(el.title.toLocaleLowerCase(), new FormControl(''));
      })
      if (localStorage.getItem('filter_data')) {
        this.form.patchValue(JSON.parse(localStorage.getItem('filter_data') || '{}'));
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      let value = this.form.value;
      localStorage.setItem('filter_data', JSON.stringify(this.form.value));
      let params = value
      this.addQueryString(params);
    }
  }

  addQueryString(params: any) {
    this.router.navigate(
      ['/heroes'],
      { queryParams: params }
    );
  }


}
