import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
  selector: 'app-copy-menu',
  templateUrl: './copy-menu.component.html',
  styleUrls: ['./copy-menu.component.scss']
})
export class CopyMenuComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean;
  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private firebaseService: FirebaseService,
    private toastr: ToastrService,

  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.form = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }

  async copy() {
    try {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.helperService.showLoading();
      const fromDate = moment(this.form.value.fromDate).format('DD-MM-YYYY');
      const toDate = moment(this.form.value.toDate).format('DD-MM-YYYY');
      const fromMenu = await this.getMenu(fromDate);
      await this.firebaseService.copyMenu(toDate, fromMenu);
      this.toastr.success('Sao chép thành công');
    } catch (e) {
      this.toastr.error('Sao chép thất bại');
    } finally {
      this.helperService.hideLoading();
    }
  }

  getMenu(date) {
    return new Promise((resolve, reject) => {
      this.firebaseService.getMenuByDate(date).subscribe(res => {
        console.log(res);
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
}
