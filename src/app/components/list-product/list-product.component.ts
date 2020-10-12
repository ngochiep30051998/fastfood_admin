import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { FirebaseService } from '../../services/firebase/firebase.service';
import * as moment from 'moment';
import { IMenu } from '../../interfaces/menu.interfaces';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  @Input() date: any;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  async getProduct() {
    try {
      const catId = '-MIyqPkogem_wdARRdmk';
      const prodId = '243395';
      const product = await this.firebaseService.getProductById(catId, prodId);
      const date = moment(this.date).format('DD-MM-YYYY');
      const menu: IMenu = {
        id: date,
        breakfast: [product]
      };
      this.firebaseService.createMenu(menu)
      console.log(menu);
    } catch (e) {
      console.log(e);
    }
  }
}
