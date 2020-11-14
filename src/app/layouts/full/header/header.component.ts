import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent implements OnDestroy {
  public currentUser: any;
  private userSub$: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.userSub$ = this.angularFireAuth.user.subscribe(res => {
      this.currentUser = res;
      console.log(this.currentUser)
    })
  }
  goto(page) {
    this.router.navigate([page]);
  }
  logout() {
    this.authService.logout();
    this.goto('dang-nhap');
  }
  ngOnDestroy(): void {
    if (this.userSub$) {
      this.userSub$.unsubscribe();
    }
  }
}
