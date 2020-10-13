import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ICategories, IProduct } from '../../interfaces/products.interface';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  public displayedColumns: string[] = [
    'key', 'name', 'displayImage', 'catName', 'action'
  ];

  public dataSource = new MatTableDataSource<IProduct>();
  public selection = new SelectionModel<IProduct>(true, []);
  public listProduct: IProduct[] = [];
  public categories: ICategories[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
    this.firebaseService.getCategories().subscribe(res => {
      this.categories = res;
      this.listProduct = res.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.products);
      }, []);
      this.dataSource.data = this.listProduct;
    });
  }
}
