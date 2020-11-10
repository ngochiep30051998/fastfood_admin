import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillsManagementComponent } from './bills-management.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { DemoMaterialModule } from '../../demo-material-module';
import { DirectivesModule } from '../../directives/directives.module';
import { BillDetailComponent } from './bill-detail/bill-detail.component';



@NgModule({
  declarations: [BillsManagementComponent, BillDetailComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild([{
      path: '',
      component: BillsManagementComponent
    }])
  ]
})
export class BillsManagementModule { }
