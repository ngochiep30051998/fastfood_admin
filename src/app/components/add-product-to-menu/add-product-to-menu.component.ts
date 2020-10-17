import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ICategories, IPopupData, IProduct } from '../../interfaces/products.interface';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-add-product-to-menu',
  templateUrl: './add-product-to-menu.component.html',
  styleUrls: ['./add-product-to-menu.component.css']
})
export class AddProductToMenuComponent implements OnInit {
  public allProduct: IProduct[] = [];
  public categories: ICategories[] = [];
  public listProduct: IProduct[] = [];
  public form: FormGroup;
  public imageUrl: string;
  public loading: boolean;
  private product: IProduct;
  constructor(
    public dialogRef: MatDialogRef<AddProductToMenuComponent>,
    private firebaseService: FirebaseService,
    private helperService: HelperService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dialogData: IPopupData,
  ) {
    this.form = this.fb.group({
      category: ['', Validators.required],
      search: [''],
      productId: [{ value: '', disabled: true }],
      productName: [{ value: '', disabled: true }],
      detail: [''],
      price: ['', Validators.required],
      promotionPrice: [''],
      amount: [0, Validators.required],
      unit: ['']
    },
      {
        validators: this.helperService.MustLower('price', 'promotionPrice')
      });
    this.firebaseService.getCategories().subscribe((res: any) => {
      this.categories = res;

      this.allProduct = res.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.products);
      }, []);
    });

  }

  ngOnInit() {
    if (this.dialogData.product) {
      this.selectProduct(this.dialogData.product);
    }
  }

  searchProduct(value: string) {
    try {
      const text = value.toUpperCase();
      if (this.form.value.category) {
        this.listProduct = this.allProduct.filter(x => x.name.toUpperCase().includes(text) && x.catId === this.form.value.category);
      } else {
        this.listProduct = this.allProduct.filter(x => x.name.toUpperCase().includes(text));
      }
    } catch (e) {
      console.log(e);
    }
  }

  trackByFn(index, item) {
    return item.id;
  }

  selectProduct(product: IProduct) {
    this.form.patchValue({
      productId: product.id,
      productName: product.name,
      price: product.price,
      detail: product.detail,
      search: product.name,
      category: product.catId,
      amount: product.amount,
      promotionPrice: product.promotionPrice,
      unit: product.unit
    });
    console.log(product);
    this.product = product;
    this.imageUrl = product.displayImage || product.photos[0].value;
  }
  resetForm() {
    if (this.dialogData.product) {
      this.selectProduct(this.dialogData.product)
    } else {
      this.form.reset();
      this.imageUrl = '';
    }
  }

  categoryChange(value) {
    this.resetForm()
    this.form.get('category').patchValue(value);
  }

  async addProductToMenu() {
    try {
      this.helperService.markFormGroupTouched(this.form);
      if (this.form.invalid) {
        setTimeout(() => {
          this.helperService.scrollToError();
        }, 500);
        return;
      }
      this.loading = true;
      const product: IProduct = await this.firebaseService.getProductById(this.form.value.category, this.product.id);
      product.amount = Number(this.form.value.amount);
      product.price = this.form.value.price;
      if (this.form.value.promotionPrice) {
        product.promotionPrice = this.form.value.promotionPrice;

      }
      product.detail = this.form.value.detail || '';
      product.unit = this.form.value.unit;
      const params = { ...this.product, ...product };
      const res = await this.firebaseService.createMenu(this.dialogData.menuId, this.dialogData.tab, params);
      console.log(res);
      this.toastr.success('Thêm thành công');
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
      if (e && e.message) {
        this.toastr.error(e.message);

      }
    } finally {
      this.loading = false;
    }
  }

  async updateProduct() {
    try {
      this.helperService.markFormGroupTouched(this.form);
      if (this.form.invalid) {
        setTimeout(() => {
          this.helperService.scrollToError();
        }, 500);
        return;
      }
      this.loading = true;
      const product: IProduct = await this.firebaseService.getProductById(this.form.value.category, this.product.id);
      product.amount = Number(this.form.value.amount);
      product.price = this.form.value.price;
      product.promotionPrice = this.form.value.promotionPrice;
      product.detail = this.form.value.detail || '';
      const params = { ...this.product, ...product };
      const res = await this.firebaseService.updateProductInMenu(this.dialogData.menuId, this.dialogData.tab, params);
      console.log(res);
      this.toastr.success('Cập nhật thành công');
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
      if (e && e.message) {
        this.toastr.error(e.message);
      } else {
        this.toastr.error('Cập nhật thất bại');
      }
    } finally {
      this.loading = false;
    }
  }
}
