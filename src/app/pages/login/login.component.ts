import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { HelperService } from '../../services/helper/helper.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // errorMessage = 'required';
  public loginForm: FormGroup;
  public loading: boolean;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public helperService: HelperService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  async login() {
    try {
      this.helperService.markFormGroupTouched(this.loginForm);
      if (this.loginForm.invalid) {
        return;
      }
      this.loading = true;
      const res: any = await this.authService.login(this.loginForm.value);
      console.log(res.user);
      this.router.navigate(['/trang-chu']);
    } catch (err) {
      console.log(err);
      this.loading = false;
      if (err.status === 401) {
        const mess = this.authService.handleErrors(err.error);
        this.toastr.error(mess);
      }
    } finally {
      this.loading = false;
    }
  }

}
