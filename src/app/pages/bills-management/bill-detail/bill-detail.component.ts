import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { BILL_STATUS, PAYMENT_STATUS, TRANS_TYPE } from '../../../constants/constants';
import { IPopupData, IProduct } from '../../../interfaces/products.interface';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit {
  public displayedColumns: string[] = [
    'id', 'name', 'catName', 'amount', 'unit', 'price', 'promotionPrice', 'totalPrice'
  ];

  public dataSource = new MatTableDataSource<IProduct>();
  public selection = new SelectionModel<IProduct>(true, []);
  public listProduct: IProduct[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public BILL_STATUS = BILL_STATUS;
  public PAYMENT_STATUS = PAYMENT_STATUS;
  public TRANS_TYPE = TRANS_TYPE;
  constructor(
    public dialogRef: MatDialogRef<BillDetailComponent>,
    private firebaseService: FirebaseService,
    private helperService: HelperService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogData: IPopupData,
  ) {
    console.log(this.dialogData.bill)
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.dialogData.bill.products.map(product => {
      product.totalPrice = product.promotionPrice ? product.promotionPrice * product.amount : product.price * product.amount;
      return product;
    })
  }

}
