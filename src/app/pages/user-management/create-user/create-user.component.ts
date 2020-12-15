import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public loading: boolean;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    private toastr: ToastrService,
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: [''],
      isAdmin: [false]
    });
  }
  async create() {
    try {
      this.loading = true;
      this.form.markAllAsTouched();
      console.log(this.form.value)
      if (this.form.invalid) {
        return;
      }
      const { email, displayName, password, phoneNumber, isAdmin } = this.form.value;
      const create = await this.apiService.createUser({ email, displayName, phoneNumber, password, isAdmin });
      console.log(create);
      this.toastr.success('Tạo mới thành công');
      this.dialogRef.close(create);
    } catch (e) {
      console.log(e);
      if (e && e.code === 'auth/email-already-exists') {
        this.toastr.error('email đã tồn tại');
      } else {
        this.toastr.error('Không thể thêm mới, vui lòng kiểm tra lại thông tin');
      }
      this.dialogRef.close(false);
    } finally {
      this.loading = false;
    }
  }

}
