import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { FirebaseService } from '../../services/firebase/firebase.service';
import * as moment from 'moment';
import { IMenu } from '../../interfaces/menu.interfaces';
import { ICategories, IPopupData, IProduct } from '../../interfaces/products.interface';
import { AddProductToMenuComponent } from '../add-product-to-menu/add-product-to-menu.component';
import { PopupRemoveProductComponent } from '../popup-remove-product/popup-remove-product.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit, OnChanges {
  @Input() date: any;
  @Input() tab = 'breakfast';
  @Input() lisProduct: IProduct[] = [];
  public pageSize = 8;
  public pageSizeOptions: number[] = [4, 8, 12, 48];
  public dataSource: IProduct[] = [];
  constructor(
    private firebaseService: FirebaseService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    if (this.lisProduct) {
      this.dataSource = this.lisProduct.slice(0, this.pageSize);
    }
  }

  showModal() {
    const data: IPopupData = {
      tab: this.tab,
      menuId: moment(this.date).format('DD-MM-YYYY')
    };
    this.dialog.open(AddProductToMenuComponent, {
      data,
      width: '640px',
      minHeight: '380px',
      autoFocus: false
    });
  }

  editProduct(product: IProduct) {
    const data: IPopupData = {
      tab: this.tab,
      product,
      menuId: moment(this.date).format('DD-MM-YYYY')
    };
    this.dialog.open(AddProductToMenuComponent, {
      data,
      width: '640px',
      minHeight: '380px',
      autoFocus: false
    });
  }
  removeProduct(product: IProduct) {
    const data: IPopupData = {
      tab: this.tab,
      menuId: moment(this.date).format('DD-MM-YYYY'),
      product
    };
    this.dialog.open(PopupRemoveProductComponent, {
      data,
      width: '350px',
      height: '250px',
      autoFocus: false
    });
  }

  pageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.lisProduct.length) {
      endIndex = this.lisProduct.length;
    }
    this.dataSource = this.lisProduct.slice(startIndex, endIndex);
  }
}
