import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { IPopupData, IProduct } from '../../interfaces/products.interface';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-popup-remove-product',
  templateUrl: './popup-remove-product.component.html',
  styleUrls: ['./popup-remove-product.component.css']
})
export class PopupRemoveProductComponent implements OnInit {
  public loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<PopupRemoveProductComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IPopupData,
    private firebaseService: FirebaseService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  delete() {
    this.loading = true;
    this.firebaseService.removeProductFromMenu(this.dialogData.menuId, this.dialogData.tab, this.dialogData.product).then((res: any) => {
      console.log(res);
      this.loading = false;
      this.toastr.success('Xoá thành công');
      this.dialogRef.close(res);
    }).catch(e => {
      console.log(e);
      this.toastr.error('Xoá thất bại');
      this.loading = false;
    });
  }

}
