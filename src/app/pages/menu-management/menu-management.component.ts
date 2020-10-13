import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material';

import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { IMenu } from '../../interfaces/menu.interfaces';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css']
})
export class MenuManagementComponent implements OnInit, OnDestroy {

  public date = new Date();
  public menu: IMenu;
  public menuSub$: Subscription;
  constructor(
    private _adapter: DateAdapter<any>,
    private firebaseService: FirebaseService
  ) {
    this.changeDate();
  }

  ngOnInit() {
  }

  getDate() {
    const date = moment(this.date).format('DD/MM/YYYY')
    console.log(date)
  }

  changeDate() {
    const id = moment(this.date).format('DD-MM-YYYY');
    this.menuSub$ = this.firebaseService.getMenu(id).subscribe((res) => {
      console.log(res);
      this.menu = res;
    });
  }
  ngOnDestroy() {
    if (this.menuSub$) {
      this.menuSub$.unsubscribe();
    }
  }
}
