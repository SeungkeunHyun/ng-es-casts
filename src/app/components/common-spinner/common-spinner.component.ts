import { Component, OnInit, Input } from '@angular/core';
import { SpinnerService } from 'src/app/core/services/spinner-service.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-common-spinner',
  templateUrl: './common-spinner.component.html',
  styleUrls: ['./common-spinner.component.css']
})
export class CommonSpinnerComponent implements OnInit {
  isLoading: boolean;
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.showSpinner.subscribe(val => this.isLoading = val);
  }
  
}
