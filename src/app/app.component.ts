import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { HelperService } from './services/helper/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  public loading = false;
  constructor(
    private helperService: HelperService,
    private cdr: ChangeDetectorRef
  ) {
    this.helperService.doSpinner.subscribe(res => {
      this.loading = res;
    }, err => {
      this.loading = false;
    });
  }
  ngAfterViewInit() {
    // this.message = 'all done loading :)'
    this.cdr.detectChanges();
  }
}
