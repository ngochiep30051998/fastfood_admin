import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { BILL_STATUS, PAYMENT_STATUS, TRANS_TYPE } from '../../constants/constants';
import { IBill } from '../../interfaces/bill.interface';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-bills-management',
  templateUrl: './bills-management.component.html',
  styleUrls: ['./bills-management.component.scss']
})
export class BillsManagementComponent implements OnInit {
  public BILL_STATUS = BILL_STATUS;
  public TRANS_TYPE = TRANS_TYPE;
  public PAYMENT_STATUS = PAYMENT_STATUS;
  
  public displayedColumns: string[] = [
    'id',  'user.email', 'address', 'totalItem', 'payment', 'status', 'paymentStatus', 'date', 'action'
  ];

  public dataSource = new MatTableDataSource<IBill>();
  public selection = new SelectionModel<IBill>(true, []);
  public listBill: IBill[] = [];
  public txtSearch = '';
  public allData: IBill[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
    this.firebaseService.getBills().subscribe(res => {
      console.log(res);
      this.allData = res;
      this.listBill = Object.assign([], this.allData);
      this.dataSource.data = Object.assign([], this.allData);
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onChangeSelect() {
    // if (this.catId) {
    //   this.dataSource.data = this.listProduct.filter(
    //     x => x.catId === this.catId
    //   );
    // } else {
    //   this.dataSource.data = this.allData;
    // }
    this.dataSource.filter = this.txtSearch.trim().toLowerCase();
  }
}
