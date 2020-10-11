import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/products.interface';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  public listProduct: IProduct[] = [];
  constructor(
    private firebaseService: FirebaseService
  ) {
    this.getCategories();
  }

  ngOnInit() {
  }

  getCategories() {
    this.firebaseService.getCategories().subscribe(res => {
      this.listProduct = res.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.products);
      }, []);
      console.log(this.listProduct)
    });
  }
}
