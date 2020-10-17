import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { errorStatus } from '../../constants/errors-status';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.api;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) { }
  async login(params) {
    try {
      const url = `${this.api}auth`;
      const res: any = await this.httpClient.post(url, params).toPromise();
      if (res.idToken) {
        // return firebase.auth().signInWithCustomToken(res.idToken);
        return this.angularFireAuth.auth.signInWithCustomToken(res.idToken);
      } else {
        throw {
          code: 'firebase login fail',
          message: 'Đăng nhập thất bại'
        };
      }
    } catch (e) {
      return Promise.reject(e);
    }

  }

  handleErrors(e) {
    let message = 'Đăng nhập thất bại';
    if (e && e.code) {
      switch (e.code) {
        case errorStatus.wrongPassword:
          message = `Mật khẩu không hợp lệ hoặc người dùng không có mật khẩu,
          thử lại với phương thức đăng nhập khác.`
          break;
        case errorStatus.userNotFound:
          message = 'Không tìm thấy tài khoản, có thể tài khoản của bạn đã bị xoá.';
          break;
        case errorStatus.existedEmail:
          message = 'Email đã được sử dụng.';
          break;
        default:
          break;
      }
    }
    return message;
  }
  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/dang-nhap']);
  }
  getCurrentUser() {
    return this.angularFireAuth.user;
  }
}
