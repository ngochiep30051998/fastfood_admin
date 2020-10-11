import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './services/auth/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dang-nhap',
        pathMatch: 'full'
      },
      {
        path: 'trang-chu',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'quan-ly-san-pham',
        loadChildren: () => import('./pages/product-management/product-management.module').then(m => m.ProductManagementModule)
      },
      {
        path: 'quan-ly-thuc-don',
        loadChildren: () => import('./pages/menu-management/menu-management.module').then(m => m.MenuManagementModule)
      },
      { path: '**', redirectTo: 'dang-nhap', pathMatch: 'full' },
    ]
  },
  {
    path: 'dang-nhap',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
