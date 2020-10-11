import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuManagementComponent } from './menu-management.component';



@NgModule({
  declarations: [MenuManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MenuManagementComponent }])
  ]
})
export class MenuManagementModule { }
