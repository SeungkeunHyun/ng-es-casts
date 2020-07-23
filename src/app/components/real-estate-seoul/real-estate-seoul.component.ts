import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SearchESService } from 'src/app/core/services/search-es.service';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { SpinnerService } from 'src/app/core/services/spinner-service.service';

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
  bldgTypes: string[];
  sgg: string = '';
  yr: number;
  bldgType: string;
  bldgSizeRange = [55,99];
  bldgSize: number = 0;
  minSize: number;
  maxSize: number;
  step: number;
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
      "cnt_bldgType": {
        "terms": {
          "field": "BLDG_MUSE_NM.keyword",
          "size": 1000
        }
      },
      "deal_yrs": {
        "date_histogram": {
          "field": "DEAL_YMD",
          "calendar_interval": "year"
        }
      },
      "min_size": {
        "min": {
          "field": "BLDG_AREA"
        }
      },
      "max_size": {
        "max": {
          "field": "BLDG_AREA"
        }
      }
    }
  };
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private searchESService: SearchESService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.initSeoulDataSource();
  }

  initSeoulDataSource() {
    this.spinnerService.showSpinner.next(true);
    if (this.seoulESQuery.query === null) {
      this.seoulESQuery.query = { "match_all": {} };
    }
    this.searchESService.search('seoul.realestate.trade', this.seoulESQuery).pipe(map(res => {
      console.log(res);
      if (this.sggs == null) {
        this.sggs = res.aggregations.cnt_sgg.buckets.map(it => it.key).sort();
        this.seoulColumns = Object.keys(res.hits.hits[0]._source);
        this.dealYears = res.aggregations.deal_yrs.buckets.map(it => parseInt(it.key_as_string.substring(0, 4))).sort((a, b) => b - a);
        this.bldgTypes = res.aggregations.cnt_bldgType.buckets.map(it => it.key).sort();
        this.minSize = 50;
        this.maxSize = 250;
        this.step = (this.maxSize - this.minSize) * 0.01;
        console.log(this.seoulColumns, this.sggs, this.dealYears, this.step);
      }
      return res.hits.hits.map(it => it._source);
    })).subscribe(dat => {
      dat = dat.map(it => {
        it.OBJ_AMT = it.OBJ_AMT.toLocaleString();
        return it;
      });
      this.seoulDataSource = new MatTableDataSource(dat);
      this.seoulDataSource.sort = this.sort;
      this.spinnerService.showSpinner.next(false);      
    });
  }

  filterSGG(sgg) {
    delete this.seoulESQuery.query;
    this.seoulESQuery.query = { term: { 'SGG_NM.keyword': sgg } };
    this.initSeoulDataSource();
  }

  filterBySize() {
    console.log('range change', this.bldgSize);
  }

  filterDeals() {
    console.log(this.sgg, this.yr, this.bldgSize);
    let mustFilters = [];
    if (this.yr != null) {
      const yrQuery = {
        "range": {
          "DEAL_YMD": {
            "gte": `${this.yr}||/y`,
            "lte": `${this.yr}||/y`,
            "format": "yyyy"
          }
        }
      };
      mustFilters.push(yrQuery);
    }
    if (this.sgg != null && this.sgg.length > 0) {
      const sggQuery = {
        "term": {
          "SGG_NM.keyword": this.sgg
        }
      };
      mustFilters.push(sggQuery);
    }
    if (this.bldgType != null && this.bldgType.length > 0) {
      const bldgQuery = {
        "term": {
          "BLDG_MUSE_NM.keyword": this.bldgType
        }
      };
      mustFilters.push(bldgQuery);
    }
    if(this.bldgSize > 10) {
      mustFilters.push({
        "range": {
          "BLDG_AREA": {
            "gte": this.bldgSize - 10,
            "lte": this.bldgSize + 10
          }
        }
      });
    }
    if (mustFilters.length > 0) {
      this.seoulESQuery.query = { "bool": { "must": mustFilters } }
    } else {
      this.seoulESQuery.query = { "match_all": {} };
    }
    //this.seoulESQuery.query = {term: {'SGG_NM.keyword': sgg}};
    console.log(this.seoulESQuery);
    this.initSeoulDataSource();
  }

  applyFilterSeoul(evt: KeyboardEvent) {
    if(evt.key != 'Enter') {
      console.log(evt, evt.key);
      return;
    } 
    const filterValue = (event.target as HTMLInputElement).value;
    this.seoulDataSource.filter = filterValue.trim().toLowerCase();
  }
}
