import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { ICategories, IPopupData, IProduct } from '../../interfaces/products.interface';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { AddProductComponent } from './add-product/add-product.component';
import { ModalDeleteProductComponent } from './modal-delete-product/modal-delete-product.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = [
    'key', 'name', 'displayImage', 'catName', 'action'
  ];

  public dataSource = new MatTableDataSource<IProduct>();
  public selection = new SelectionModel<IProduct>(true, []);
  public listProduct: IProduct[] = [];
  public categories: ICategories[] = [];
  public catId: any;
  public txtSearch = '';
  public allData: IProduct[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private catSub$: Subscription;
  constructor(
    private firebaseService: FirebaseService,
    public dialog: MatDialog,
  ) {
    this.getCategories();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCategories() {
    this.catSub$ = this.firebaseService.getCategories().subscribe(res => {
      this.categories = res;
      this.allData = res.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.products);
      }, []);
      this.listProduct = Object.assign([], this.allData);
      this.dataSource.data = Object.assign([], this.allData);
    });
  }

  addProduct(product?: IProduct) {
    const data: IPopupData = {
      product
    };
    this.dialog.open(AddProductComponent, {
      data,
      width: '640px',
      minHeight: '380px',
      autoFocus: false
    });
  }
  async removeProduct(product: IProduct) {
    try {
      const data: IPopupData = {
        product
      };
      this.dialog.open(ModalDeleteProductComponent, {
        data,
        width: '450px',
        height: '170px',
        autoFocus: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  applyFilter(event: Event) {
    if (this.catId) {
      this.dataSource.data = this.dataSource.data.filter(
        x => x.catId === this.catId
      );
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onChangeSelect() {
    if (this.catId) {
      this.dataSource.data = this.listProduct.filter(
        x => x.catId === this.catId
      );
    } else {
      this.dataSource.data = this.allData;
    }
    this.dataSource.filter = this.txtSearch.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    if (this.catSub$) {
      this.catSub$.unsubscribe();
    }

  }
}
