import { Component, OnInit } from '@angular/core';
import { SearchESService } from 'src/app/core/services/search-es.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  dataSource$: Observable<Object[]>;
  columnsToDisplay: string[];
  constructor(private searchESService: SearchESService) { }

  ngOnInit(): void {
    console.log('starts init realestate');
    this.dataSource$ = this.searchESService.search('realestate.trade', this.esQuery).pipe(map(res => {
      console.log(res);
      this.columnsToDisplay = Object.keys(res.hits.hits[0]._source);
      console.log(this.columnsToDisplay);
      return res.hits.hits.map(it => it._source);
    }));
  }
}
