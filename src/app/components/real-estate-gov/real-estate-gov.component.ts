import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SearchESService } from 'src/app/core/services/search-es.service';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-real-estate-gov',
  templateUrl: './real-estate-gov.component.html',
  styleUrls: ['./real-estate-gov.component.css']
})
export class RealEstateGovComponent implements OnInit {
  @Output() isLoading = new EventEmitter<boolean>();
  dataSource: MatTableDataSource<Object>;
  columnsToDisplay: string[];
  esQuery = {
    "size": 2000,
    "query": {
      "match_all": {}
    }
  };
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private searchESService: SearchESService) { }

  initGovDataSource() {
    this.searchESService.search('realestate.trade', this.esQuery).pipe(map(res => {
      console.log(res);
      this.columnsToDisplay = Object.keys(res.hits.hits[0]._source);
      console.log(this.columnsToDisplay);
      return res.hits.hits.map(it => it._source).map(it => {it.price = it.price.toLocaleString(); return it;});
    })).subscribe((dat:any) => {
      this.isLoading.emit(false);
      this.dataSource = new MatTableDataSource(dat);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.isLoading.emit(true);
    this.initGovDataSource();
  }

  applyFilter(evt: KeyboardEvent) {
    if(evt.key != 'Enter') {
      return;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
