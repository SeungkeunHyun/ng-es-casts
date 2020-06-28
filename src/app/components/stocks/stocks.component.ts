import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchESService } from 'src/app/core/services/search-es.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  latestPrices: MatTableDataSource<Object[]>;
  indexName = 'stock.prices';
  columnsToDiplay: string[];
  esQuery = {
    "size": 0,
    "query": {
      "exists": {
        "field": "timestamp"
      }
    },
    "aggs": {
      "group": {
        "terms": {
          "field": "code.keyword",
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

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private searchESService: SearchESService) { }
  
  ngOnInit(): void {
    this.searchESService.search(this.indexName, this.esQuery).pipe(map((res:any)=> {
      return res.aggregations.group.buckets.map(it => it.group_docs.hits.hits[0]._source);
  })).subscribe(dat => {
      const firstComes = ['name', 'code'];
      this.latestPrices = new MatTableDataSource(dat);
      this.latestPrices.sort = this.sort;
      this.columnsToDiplay = firstComes.concat(Object.keys(dat[0]).filter(nm => !firstComes.includes(nm)));      
      console.log("stock prices: ", this.latestPrices);
    });
  }

}
