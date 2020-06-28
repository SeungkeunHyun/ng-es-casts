import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchESService } from 'src/app/core/services/search-es.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css']
})
export class RealEstateComponent implements OnInit {
  esQuery = {
    "size": 2000,
    "query": {
      "match_all": {}
    }
  };
  dataSource: MatTableDataSource<Object>;
  columnsToDisplay: string[];
  constructor(private searchESService: SearchESService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    console.log('starts init realestate');
    this.searchESService.search('realestate.trade', this.esQuery).pipe(map(res => {
      console.log(res);
      this.columnsToDisplay = Object.keys(res.hits.hits[0]._source);
      console.log(this.columnsToDisplay);
      return res.hits.hits.map(it => it._source);
    })).subscribe(dat => {
      this.dataSource = new MatTableDataSource(dat);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
