import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { IPopupData } from '../../../interfaces/products.interface';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { ProductManagementComponent } from '../product-management.component';

@Component({
  selector: 'app-modal-delete-product',
  templateUrl: './modal-delete-product.component.html',
  styleUrls: ['./modal-delete-product.component.scss']
})
export class ModalDeleteProductComponent implements OnInit {
  public loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<ProductManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IPopupData,
    private firebaseService: FirebaseService,
    private toastr: ToastrService,

  ) {
    console.log(dialogData);
   }

  ngOnInit() {
  }

  delete() {
    this.loading = true;
    this.firebaseService.removeProduct(this.dialogData.product).then((res: any) => {
      console.log(res);
      this.loading = false;
      this.toastr.success('Xoá thành công');
      this.dialogRef.close();
    }).catch(e => {
      console.log(e);
      this.toastr.error('Xoá thất bại');
      this.loading = false;
    });
  }
}
