import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {
  private exchangeRates: Object[];
  constructor(private route: ActivatedRoute) { }
  menus = ['exchange rate', 'realestate', 'stocks'];
  ngOnInit(): void {
  }

}
 