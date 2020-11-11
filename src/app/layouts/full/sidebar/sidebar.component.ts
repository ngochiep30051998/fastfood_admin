import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,

  OnDestroy,
  OnInit
} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}


const MENUITEMS = [
  { state: 'trang-chu', name: 'Trang chủ', type: 'link', icon: 'av_timer' },
  { state: 'quan-ly-san-pham', type: 'link', name: 'Quản lý sản phẩm', icon: 'view_comfy' },
  { state: 'quan-ly-thuc-don', type: 'link', name: 'Quản lý thực đơn', icon: 'view_list' },
  { state: 'quan-ly-don-hang', type: 'link', name: 'Quản lý đơn hàng', icon: 'description' },
];

const MENUITEMS_SUPERADMIN = [
  { state: 'trang-chu', name: 'Trang chủ', type: 'link', icon: 'av_timer' },
  { state: 'quan-ly-san-pham', type: 'link', name: 'Quản lý sản phẩm', icon: 'view_comfy' },
  { state: 'quan-ly-thuc-don', type: 'link', name: 'Quản lý thực đơn', icon: 'view_list' },
  { state: 'quan-ly-don-hang', type: 'link', name: 'Quản lý đơn hàng', icon: 'description' },
  { state: 'quan-ly-nguoi-dung', type: 'link', name: 'Quản lý người dùng', icon: 'account_circle' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  menuItems: Menu[];
  private _mobileQueryListener: () => void;
  public currentUser: any;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  async ngOnInit() {
    const tokenResult: any = await this.authService.getResultToken();
    if (tokenResult && tokenResult.claims) {
      if (tokenResult.claims.isSuperAdmin) {
        this.menuItems = MENUITEMS_SUPERADMIN;
      } else {
        this.menuItems = MENUITEMS;

      }
    }
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
