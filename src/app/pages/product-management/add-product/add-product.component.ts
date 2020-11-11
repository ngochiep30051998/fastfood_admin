import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import { FileValidator } from 'ngx-material-file-input';
import { ToastrService } from 'ngx-toastr';
import { ICategories, IPopupData, IProduct } from '../../../interfaces/products.interface';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { HelperService } from '../../../services/helper/helper.service';
import { finalize, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  public categories: ICategories[] = [];
  public form: FormGroup;
  public loading: boolean;
  private product: IProduct;
  public images: any[] = [];
  public displayImage: any;
  /**
    * In this example, it's 2 MB (=2 * 2 ** 20).
    */
  readonly maxSize = 0.5 * 2 ** 20;
  private catSub$: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private firebaseService: FirebaseService,
    private helperService: HelperService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private imageCompress: NgxImageCompressService,
    public storage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public dialogData: IPopupData,
  ) {
    this.initForm();
    this.catSub$ = this.firebaseService.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
    this.patchValue();
  }

  ngOnInit() {
  }

  initForm() {
    this.form = this.fb.group({
      category: ['', Validators.required],
      search: [''],
      productId: [''],
      productName: ['', Validators.required],
      detail: [''],
      price: ['', Validators.required],
      promotionPrice: [''],
      unit: [''],
      photos: [undefined],
      displayImage: [undefined]
    },
      {
        validators: this.helperService.MustLower('price', 'promotionPrice')
      });

    // if (!this.dialogData || !this.dialogData.product) {
    //   this.form.get('photos').setValidators([Validators.required, FileValidator.maxContentSize(this.maxSize)])
    //   this.form.get('displayImage').setValidators([Validators.required, FileValidator.maxContentSize(this.maxSize)])
    // }
  }

  patchValue() {
    if (this.dialogData && this.dialogData.product) {
      this.form.patchValue({
        category: this.dialogData.product.catId,
        productId: this.dialogData.product.id,
        productName: this.dialogData.product.name,
        detail: this.dialogData.product.detail,
        price: this.dialogData.product.price,
        promotionPrice: this.dialogData.product.promotionPrice,
        unit: this.dialogData.product.unit,
      });
      console.log(this.dialogData)
      this.images = this.dialogData.product.photos.map(x => x.value);
      this.displayImage = this.dialogData.product.displayImage;
    }
  }

  onChangeDisplayImage(event) {
    if (this.form.value.displayImage && this.form.value.displayImage._files && this.form.value.displayImage._files[0]) {
      const filesAmount = this.form.value.displayImage._files.length;
      this.images = [];
      const orientation = DOC_ORIENTATION;
      const reader = new FileReader();
      reader.readAsDataURL(this.form.value.displayImage._files[0]);

      reader.onload = async (e: any) => {
        this.displayImage = await this.imageCompress.compressFile(reader.result, orientation, 20, 15);
      };
    } else {
      this.displayImage = this.dialogData && this.dialogData.product && this.dialogData.product.displayImage;
    }
  }

  onFileChange(event) {
    if (this.form.value.photos && this.form.value.photos._files && this.form.value.photos._files[0]) {
      const filesAmount = this.form.value.photos._files.length;
      // this.images = [];
      const orientation = DOC_ORIENTATION;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(this.form.value.photos._files[i]);

        reader.onload = async (e: any) => {
          // this.images.push(e.target.result);
          const result = await this.imageCompress.compressFile(reader.result, orientation, 20, 15);
          this.images.push(result);
        };
      }
    }
  }

  async create() {
    try {
      this.form.markAllAsTouched();
      console.log(this.form.value);
      // if (this.form.invalid) {
      //   return;
      // };
      this.helperService.showLoading();
      const params: IProduct = {
        // id: this.helperService.generateRandomUID(20),
        name: this.form.value.productName,
        price: this.form.value.price,
        promotionPrice: this.form.value.promotionPrice,
        unit: this.form.value.unit || 'suất',
        detail: this.form.value.detail,
        catId: this.form.value.category
      };
      const res = await this.firebaseService.createProduct(params);

      const displayImageName = Date.now().toString();
      this.storage.ref(`/products/${displayImageName}`).putString(this.displayImage.split(',')[1], 'base64').then(upload => {
        upload.ref.getDownloadURL().then(url => {
          res.update({ displayImage: url });
        });
      });
      res.update({ id: res.key });
      for (const photo of this.images) {
        if (photo.includes('base64')) {
          const name = Date.now().toString();
          const upload = await this.storage.ref(`/products/${name}`).putString(photo.split(',')[1], 'base64');
          upload.ref.getDownloadURL().then(url => {
            this.firebaseService.getRef(`categories/${params.catId}/products/${res.key}/photos`).push(url);
          });

        }

      }
      this.toastr.success('Thêm mới thành công');
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    } finally {
      this.helperService.hideLoading();
    }
  }

  async updateProduct() {
    try {
      this.form.markAllAsTouched();
      console.log(this.form.value);
      // if (this.form.invalid) {
      //   return;
      // };
      this.helperService.showLoading();
      const params: IProduct = {
        id: this.dialogData.product.id,
        name: this.form.value.productName,
        price: this.form.value.price,
        promotionPrice: this.form.value.promotionPrice,
        unit: this.form.value.unit || 'suất',
        detail: this.form.value.detail || '',
        catId: this.form.value.category
      };

      if (this.form.value.displayImage) {
        const displayImageName = Date.now().toString();
        this.storage.ref(`/products/${displayImageName}`).putString(this.displayImage.split(',')[1], 'base64').then(upload => {
          upload.ref.getDownloadURL().then(async (url) => {
            params.displayImage = url;
            await this.firebaseService.updateProduct(params);
          });
        });
      } else {
        await this.firebaseService.updateProduct(params);
      }
      if (this.form.value.photos) {
        for (const photo of this.images) {
          if (photo.includes('base64')) {
            const name = Date.now().toString();
            const task = this.storage.ref(`/products/${name}`).putString(photo.split(',')[1], 'base64').then(upload => {
              upload.ref.getDownloadURL().then(url => {
                this.firebaseService.getRef(`categories/${params.catId}/products/${this.dialogData.product.id}/photos`).push(url);
              });
            });
          }
        }
      }

      this.toastr.success('Cập nhật thành công');
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    } finally {
      this.helperService.hideLoading();
    }
  }
  async removePhoto(index, path) {
    try {
      this.helperService.showLoading()
      if (this.dialogData && this.dialogData.product && this.dialogData.product.photos[index]) {
        const key = this.dialogData.product.photos[index].key;
        await this.firebaseService.removePhotoFromProduct(this.dialogData.product, key);
        this.dialogData.product.photos.splice(index, 1);
        // await this.firebaseService.removePhoto(path);
      }
      this.images.splice(index, 1);
      this.toastr.success('Xoá thành công');
    } catch (e) {
      console.log(e);
    } finally {
      this.helperService.hideLoading();
    }
  }

  async removeDisplayImage() {
    try {
      this.helperService.showLoading();
      this.displayImage = null;
      if (this.dialogData && this.dialogData.product) {
        this.form.get('displayImage').reset();
        const params: IProduct = { ... this.dialogData.product };
        delete params.displayImage;
        const res = await this.firebaseService.removeChildProduct(params, 'displayImage');
        // await this.firebaseService.removePhoto(this.displayImage);
      }
      this.toastr.success('Xoá thành công');
    } catch (e) {
      console.log(e);
    } finally {
      this.helperService.hideLoading();
    }
  }
  ngOnDestroy(): void {
    if (this.catSub$) {
      this.catSub$.unsubscribe();
    }

  }
}

