import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-spinner',
  templateUrl: './common-spinner.component.html',
  styleUrls: ['./common-spinner.component.css']
})
export class CommonSpinnerComponent implements OnInit {
  @Input() isLoading;
  constructor() { }

  ngOnInit(): void {
  }

}
