import { Component, OnInit } from '@angular/core';
import { SearchESService } from 'src/app/core/services/search-es.service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {
  private exchangeRates: Object[];
  constructor(private searchESService: SearchESService) { }
  menus = ['exchange rate', 'realestate', 'stocks'];
  ngOnInit(): void {
  }

}
