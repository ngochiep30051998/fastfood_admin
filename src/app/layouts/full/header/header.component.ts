import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }
  goto(page) {
    this.router.navigate([page]);
  }
  logout(){
    this.authService.logout();
    this.goto('dang-nhap');
  }
}
