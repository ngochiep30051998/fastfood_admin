import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public loading: boolean;
  public changePasswordForm: FormGroup;
  constructor(
    public helperService: HelperService,
    private authService: AuthService,
    private toastr: ToastrService,
    public fb: FormBuilder,
  ) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async update() {
    try {
      this.helperService.markFormGroupTouched(this.changePasswordForm);
      if (this.changePasswordForm.invalid) {
        return;
      }
      this.loading = true;
      // const user = this.authService.getCurrentUser();
      // const params = {
      //   employeeId: user.NhanVienId,
      //   ...this.changePasswordForm.value
      // };
      // console.log(params);
      // const update: any = await this.authService.updatePassword(params);
      // this.toastr.success(update.message);
      // this.loading = false;
    } catch (e) {
      this.loading = false;
      if (e.error) {
        this.toastr.error(e.error.message);
      }
    }
  }
}
