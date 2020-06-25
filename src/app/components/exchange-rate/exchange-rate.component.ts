import { Component, OnInit } from '@angular/core';
import { SearchESService } from 'src/app/core/services/search-es.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  dataSource$: Observable<Object[]>;
  columnsToDisplay: Object[];
  currency_count: number = 0;
  esQuery = {
    "size": 0,
    "sort": [
      {
        "timestamp": {
          "order": "desc"
        }
      }
    ]
  };
  esQueryCurrencies = {
    "size": 0,
    "aggs": {
      "cnt_currency": {
        "cardinality": {
          "field": "cur_unit.keyword"
        }
      }
    }
  };
  constructor(private searchESService: SearchESService) { }

  ngOnInit(): void {
    this.searchESService.search('exchangerate', this.esQueryCurrencies).subscribe(dat => {
      console.log('currency count: ', dat);
      this.esQuery.size = dat.aggregations.cnt_currency.value;
      this.dataSource$ = this.searchESService.search('exchangerate', this.esQuery).pipe(map(dat => {
        const srcData = dat.hits.hits.map(it => it._source);
        this.columnsToDisplay = Object.keys(srcData[0]);
        console.log('response data', srcData, this.columnsToDisplay);
        return srcData;
      }));
    });
  }

}
