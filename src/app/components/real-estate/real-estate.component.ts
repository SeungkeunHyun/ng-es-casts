import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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

  constructor() { }
  ngOnInit(): void {
    console.log('starts init realestate');
  }
}
