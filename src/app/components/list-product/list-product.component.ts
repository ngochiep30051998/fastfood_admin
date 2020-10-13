import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { FirebaseService } from '../../services/firebase/firebase.service';
import * as moment from 'moment';
import { IMenu } from '../../interfaces/menu.interfaces';
import { ICategories, IPopupData, IProduct } from '../../interfaces/products.interface';
import { AddProductToMenuComponent } from '../add-product-to-menu/add-product-to-menu.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  @Input() date: any;
  @Input() tab = 'breakfast';
  @Input() lisProduct: IProduct[] = [];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private firebaseService: FirebaseService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
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
}
