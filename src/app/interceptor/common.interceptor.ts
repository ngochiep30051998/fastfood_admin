import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import { AuthService } from '../services/auth/auth.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import { HelperService } from '../services/helper/helper.service';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class CommonHttpInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private authService: AuthService,
        private toastr: ToastrService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': accessToken,
                },
                withCredentials: true,
            });
        } else {
            return next.handle(request);
        }
        return next.handle(request).catch((err: any) => {
            if (err.status === 401) {
                const params = {
                    refreshToken: localStorage.getItem('refreshToken')
                };
                return this.authService.getRefreshToken(params).mergeMap((data: any) => {
                    localStorage.setItem('accessToken', data.accessToken);
                    request = request.clone({
                        setHeaders: {
                            'x-access-token': data.accessToken,
                        },
                        withCredentials: true,
                    });
                    return next.handle(request);
                });
            }
            if (err.status === 403) {
                this.toastr.error('Phiên làm việc đã hết, vui lòng đăng nhập lại');
                this.router.navigate(['dang-nhap']);
            }
            return Observable.throw(err);
        });
    }
}
