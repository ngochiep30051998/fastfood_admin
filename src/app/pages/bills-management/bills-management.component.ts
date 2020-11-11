import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BILL_STATUS, PAYMENT_STATUS, TRANS_TYPE } from '../../constants/constants';
import { IBill } from '../../interfaces/bill.interface';
import { IPopupData } from '../../interfaces/products.interface';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { BillDetailComponent } from './bill-detail/bill-detail.component';

@Component({
  selector: 'app-bills-management',
  templateUrl: './bills-management.component.html',
  styleUrls: ['./bills-management.component.scss']
})
export class BillsManagementComponent implements OnInit, OnDestroy {
  public BILL_STATUS = BILL_STATUS;
  public TRANS_TYPE = TRANS_TYPE;
  public PAYMENT_STATUS = PAYMENT_STATUS;
  public displayedColumns: string[] = [
    'id', 'email', 'address', 'totalItem', 'payment', 'status', 'paymentStatus', 'date'
  ];

  public dataSource = new MatTableDataSource<IBill>();
  public selection = new SelectionModel<IBill>(true, []);
  public listBill: IBill[] = [];
  public txtSearch = '';
  public status = '';
  public allData: IBill[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private billSub$: Subscription;
  constructor(
    private firebaseService: FirebaseService,
    public dialog: MatDialog,
  ) {
    this.getBills();
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getBills() {
    this.billSub$ = this.firebaseService.getBills().pipe(
      map(x => x.map((bill: any) => {
        return { ...bill, email: bill.user && bill.user.email };
      }))
    ).subscribe(res => {
      console.log(res);
      this.allData = res;
      this.listBill = Object.assign([], this.allData);
      this.dataSource.data = Object.assign([], this.allData);
    });

  }

  applyFilter(event: Event) {
    if (this.status) {
      this.dataSource.data = this.dataSource.data.filter(
        x => x.status === this.status
      );
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onChangeSelect() {
    if (this.status) {
      this.dataSource.data = this.listBill.filter(
        x => x.status === this.status
      );

    } else {
      this.dataSource.data = this.allData;
    }
    this.dataSource.filter = this.txtSearch.trim().toLowerCase();
  }

  openDetail(bill: IBill) {
    const data: IPopupData = {
      bill
    };
    this.dialog.open(BillDetailComponent, {
      data,
      width: '1000px',
      minHeight: '380px',
      autoFocus: false
    });
  }
  ngOnDestroy() {
    if (this.billSub$) {
      this.billSub$.unsubscribe();
    }
  }
}
