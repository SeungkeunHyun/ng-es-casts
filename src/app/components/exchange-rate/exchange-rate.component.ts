import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SearchESService } from 'src/app/core/services/search-es.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  dataSource: MatTableDataSource<Object[]>;
  columnsToDisplay: Object[];
  currency_count: number = 0;
  @Output() isLoading = new EventEmitter<boolean>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  esQuery = {
    "size": 0,
    "aggs": {
      "group": {
        "terms": {
          "field": "cur_unit.keyword",
          "size": 1000
        },
        "aggs": {
          "group_docs": {
            "top_hits": {
              "size": 1,
              "sort": [
                {
                  "timestamp": {
                    "order": "desc"
                  }
                }
              ]
            }
          }
        }
      }
    }
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
    this.isLoading.emit(true);
    this.searchESService.search('exchangerate', this.esQuery).pipe(map(res => {
      return res.aggregations.group.buckets.map(it => it.group_docs.hits.hits[0]._source);
    })).subscribe(dat => {
      this.isLoading.emit(false);
      this.columnsToDisplay = Object.keys(dat[0]);
      this.dataSource = new MatTableDataSource(dat);
      this.dataSource.sort = this.sort;
    });
  }

}
