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
      // this.pageSize = this.lisProduct.length;
      this.dataSource = this.lisProduct.slice(0, this.pageSize);
    }
  }
  async getProduct() {
    try {
      const catId = '-MIys7i-9MBKrV-OpmBM';
      const prodId = '13882';
      const category: ICategories = await this.firebaseService.getCatById(catId);
      const product: IProduct = await this.firebaseService.getProductById(catId, prodId);
      product.catId = catId;
      product.catName = category.categoryName;
      product.detail = 'sản phẩm dành cho người thích ăn cơm rang';
      const date = moment(this.date).format('DD-MM-YYYY');
      const menu: IMenu = {
        id: date
      };
      menu[this.tab] = [product];
      console.log(menu)
      this.firebaseService.createMultiValuesMenu(menu);
    } catch (e) {
      console.log(e);
    }
  }

  showModal() {
    const data: IPopupData = {
      tab: this.tab,
      menuId: moment(this.date).format('DD-MM-YYYY')
    };
    this.dialog.open(AddProductToMenuComponent, {
      data,
      minWidth: 600,
      minHeight: 200,
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
      minWidth: 200,
      minHeight: 100,
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
