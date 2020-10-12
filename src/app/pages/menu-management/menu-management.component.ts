import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css']
})
export class MenuManagementComponent implements OnInit {

  date: any;
  constructor(private _adapter: DateAdapter<any>) { }

  ngOnInit() {
  }

  getDate() {
    const date = moment(this.date).format('DD/MM/YYYY')
    console.log(date)
  }
}
