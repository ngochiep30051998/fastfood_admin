import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateAdapter, MatDialog } from '@angular/material';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { IMenu } from '../../interfaces/menu.interfaces';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { CopyMenuComponent } from './copy-menu/copy-menu.component';


@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.scss']
})
export class MenuManagementComponent implements OnInit, OnDestroy {

  public date = new Date();
  public menu: IMenu;
  public menuSub$: Subscription;
  constructor(
    private _adapter: DateAdapter<any>,
    private firebaseService: FirebaseService,
    public dialog: MatDialog,
  ) {
    this.changeDate();
  }

  ngOnInit() {
  }

  getDate() {
    const date = moment(this.date).format('DD/MM/YYYY');
  }

  changeDate() {
    const id = moment(this.date).format('DD-MM-YYYY');
    this.menuSub$ = this.firebaseService.getMenu(id).subscribe((res) => {
      console.log(res);
      this.menu = res;
    });
  }

  copyMenu() {
    this.dialog.open(CopyMenuComponent, {
      width: '350px',
      height: '300px',
      autoFocus: false
    });
  }
  ngOnDestroy() {
    if (this.menuSub$) {
      this.menuSub$.unsubscribe();
    }
  }
}
