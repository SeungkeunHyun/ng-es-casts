import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SearchESService } from 'src/app/core/services/search-es.service';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-real-estate-seoul',
  templateUrl: './real-estate-seoul.component.html',
  styleUrls: ['./real-estate-seoul.component.css']
})
export class RealEstateSeoulComponent implements OnInit {
  @Output() isLoading = new EventEmitter<boolean>();
  seoulDataSource: MatTableDataSource<Object>;
  seoulColumns: string[];
  sggs: string[];
  dealYears: string[];
  seoulESQuery = {
    "size": 1000,
    "query": null,
    "sort": {
      "DEAL_YMD": {
        "order": "desc"
      }
    },
    "aggs": {
      "cnt_sgg": {
        "terms": {
          "field": "SGG_NM.keyword",
          "size": 1000
        }
      },
      "deal_yrs": {
        "date_histogram": {
          "field": "DEAL_YMD",
          "calendar_interval": "year"
        }
      }
    }
  };
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private searchESService: SearchESService) { }

  ngOnInit(): void {
    this.initSeoulDataSource();
  }

  initSeoulDataSource() {
    if(this.seoulESQuery.query === null) {
      this.seoulESQuery.query = {"match_all": {}};
    }
    this.searchESService.search('seoul.realestate.trade', this.seoulESQuery).pipe(map(res => {
      console.log(res);
      if(this.sggs == null) {
        this.sggs = res.aggregations.cnt_sgg.buckets.map(it => it.key).sort();
        this.seoulColumns = Object.keys(res.hits.hits[0]._source);
        this.dealYears = res.aggregations.deal_yrs.buckets.map(it => it.key_as_string.substring(0,4)).sort((a,b) => b - a);
        console.log(this.seoulColumns, this.sggs, this.dealYears);
      }      
      return res.hits.hits.map(it => it._source);
    })).subscribe(dat => {
      dat = dat.map(it => {
        it.OBJ_AMT = it.OBJ_AMT.toLocaleString();
        return it;
      });
      this.isLoading.emit(false);
      this.seoulDataSource = new MatTableDataSource(dat);
      this.seoulDataSource.sort = this.sort;
    });
  }

  filterSGG(sgg) {
    delete this.seoulESQuery.query;
    this.seoulESQuery.query = {term: {'SGG_NM.keyword': sgg}};
    this.initSeoulDataSource();
  }

  filterYear(yr) {
    //delete this.seoulESQuery.query;
    //this.seoulESQuery.query = {term: {'SGG_NM.keyword': sgg}};
    //this.initSeoulDataSource();
  }

  applyFilterSeoul(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.seoulDataSource.filter = filterValue.trim().toLowerCase();
  }
}