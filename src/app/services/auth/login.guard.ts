import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private angularFireAuth: AngularFireAuth
    ) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.angularFireAuth.idTokenResult.pipe(
            take(1),
            map((idTokenResult: any) => {
                if (idTokenResult && idTokenResult.claims && idTokenResult.claims.isAdmin) {
                    this.router.navigate(['/trang-chu']);
                    return false;
                }
                return true;
            })
        );
    }

}
