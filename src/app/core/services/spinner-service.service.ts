import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public showSpinner: BehaviorSubject<boolean>;
  constructor() {
    this.showSpinner = new BehaviorSubject(false);
  }
}
