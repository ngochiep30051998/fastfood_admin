import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import { FileValidator } from 'ngx-material-file-input';
import { ToastrService } from 'ngx-toastr';
import { ICategories, IPopupData, IProduct } from '../../../interfaces/products.interface';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public categories: ICategories[] = [];
  public form: FormGroup;
  public imageUrl: string = 'https://images.foody.vn/res/g10/98048/prof/s640x400/foody-upload-api-foody-mobile-com-190311132057.jpg';
  public loading: boolean;
  private product: IProduct;
  public images: any[] = [];
  /**
    * In this example, it's 2 MB (=2 * 2 ** 20).
    */
  readonly maxSize = 0.5 * 2 ** 20;
  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private firebaseService: FirebaseService,
    private helperService: HelperService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private imageCompress: NgxImageCompressService,
    @Inject(MAT_DIALOG_DATA) public dialogData: IPopupData,
  ) {
    this.form = this.fb.group({
      category: ['', Validators.required],
      search: [''],
      productId: [''],
      productName: ['', Validators.required],
      detail: [''],
      price: ['', Validators.required],
      promotionPrice: [''],
      amount: [0, Validators.required],
      unit: [''],
      photos: [undefined, [Validators.required, FileValidator.maxContentSize(this.maxSize)]]
    },
      {
        validators: this.helperService.MustLower('price', 'promotionPrice')
      });
    this.firebaseService.getCategories().subscribe((res: any) => {
      this.categories = res;
    });

  }

  ngOnInit() {
  }

  onFileChange(event) {
    if (this.form.value.photos && this.form.value.photos._files && this.form.value.photos._files[0]) {
      const filesAmount = this.form.value.photos._files.length;
      this.images = [];
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

  create() {
    this.form.markAllAsTouched();
    console.log(this.form.value)
  }
}

