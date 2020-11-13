import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ApiService } from '../../services/api/api.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { HelperService } from '../../services/helper/helper.service';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  public listUser: any[] = [];
  public displayedColumns: string[] = [
    'email', 'displayName', 'phoneNumber', 'isAdmin', 'action'
  ];

  public dataSource = new MatTableDataSource<any>();
  public selection = new SelectionModel<any>(true, []);
  public catId: any;
  public txtSearch = '';
  public allData: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private firebaseService: FirebaseService,
    public dialog: MatDialog,
    public apiService: ApiService,
    public helperService: HelperService
  ) {
  }

  ngOnInit() {
    this.getAllUser();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getAllUser() {
    try {
      const res: any = await this.apiService.getAllUser();
      this.allData = res.data;
      this.listUser = Object.assign([], this.allData);
      this.dataSource.data = Object.assign([], this.allData);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async upgradeUser(user: any) {
    try {
      this.helperService.showLoading();
      const res = await this.apiService.upgradeUser(user.uid);
      console.log(res);
      user.isAdmin = true;
    } catch (e) {
      console.log(e);
    } finally {
      this.helperService.hideLoading();
    }
  }

  async downgradeUser(user: any) {
    try {
      this.helperService.showLoading();
      const res = await this.apiService.downgradeUser(user.uid);
      console.log(res);
      delete user.isAdmin;
    } catch (e) {
      console.log(e);
    } finally {
      this.helperService.hideLoading();
    }
  }

  openModal() {
    this.dialog.open(CreateUserComponent, {
      width: '350px',
      height: '380px',
      autoFocus: false
    }).afterClosed().subscribe(res => {
      if (res) {
        this.allData.push(res);
        this.dataSource.data = Object.assign([], this.allData);
      }
    });
  }
}
