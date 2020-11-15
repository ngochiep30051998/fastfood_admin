import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { BILL_STATUS, PAYMENT_STATUS, TRANS_TYPE } from '../../../constants/constants';
import { IBill } from '../../../interfaces/bill.interface';
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
  public billDetail: IBill;

  constructor(
    public dialogRef: MatDialogRef<BillDetailComponent>,
    private firebaseService: FirebaseService,
    private helperService: HelperService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogData: IPopupData,
  ) {
    this.billDetail = this.dialogData.bill;
    this.dataSource.data = this.billDetail.products.map(product => {
      product.totalPrice = product.promotionPrice ? product.promotionPrice * product.amount : product.price * product.amount;
      return product;
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  async updateStatus(status: string) {
    try {
      if (this.billDetail.status === BILL_STATUS.canceled.key) {
        return;
      }

      if (status === BILL_STATUS.accept.key) {
        console.log(this.billDetail)
        const menu = await this.firebaseService.getRefData(`menus/${this.billDetail.products[0].menuId}`);
        for (const product of this.billDetail.products) {
          if (!menu[product.meal]) {
            this.toastr.error(`Không có: ${product.name} trong thực đơn`);
            return;
          }
          const curProuct = menu[product.meal][product.id];
          if (curProuct) {
            if (curProuct.amount >= product.amount) {
              menu[product.meal][product.id].amount = curProuct.amount - product.amount;
            } else {
              this.toastr.error(`Không đủ số lượng: ${product.name} trong thực đơn`);
              return;
            }
          } else {
            this.toastr.error(`Không có: ${product.name} trong thực đơn`);
            return;
          }
        }
        // this.toastr.success('Cập nhật thành công');
        await this.firebaseService.updateRef(`menus/${this.billDetail.products[0].menuId}`, menu);
      } else if (status === BILL_STATUS.canceled.key && this.billDetail.status === BILL_STATUS.accept.key) {
        console.log(this.billDetail)
        const menu = await this.firebaseService.getRefData(`menus/${this.billDetail.products[0].menuId}`);
        for (const product of this.billDetail.products) {
          console.log(menu[product.meal][product.id]);
          const curProuct = menu[product.meal][product.id];
          if (curProuct) {
            menu[product.meal][product.id].amount = curProuct.amount + product.amount;
          }
        }
        // this.toastr.success('Cập nhật thành công');
        console.log(menu)
        await this.firebaseService.updateRef(`menus/${this.billDetail.products[0].menuId}`, menu);
      }
      this.helperService.showLoading();
      this.billDetail.status = status;
      const update = await this.firebaseService.updateBill({ ...this.billDetail });
      this.toastr.success('Cập nhật thành công');
    } catch (e) {
      console.log(e);
      if (e && e.code === 'PERMISSION_DENIED') {
        this.toastr.error('Số lượng sản phẩm trong thực đơn không đủ');
      } else {
        this.toastr.error('Cập nhật thất bại');
      }
    } finally {
      this.helperService.hideLoading();
    }
  }

  async payment(status: string) {
    try {
      this.helperService.showLoading();
      this.billDetail.paymentStatus = status;
      const update = await this.firebaseService.updateBill({ ...this.billDetail });
      this.toastr.success('Cập nhật thành công');
    } catch (e) {
      console.log(e);
      this.toastr.error('Cập nhật thất bại');
    } finally {
      this.helperService.hideLoading();
    }
  }

}
