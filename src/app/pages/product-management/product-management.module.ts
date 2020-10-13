import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { DemoMaterialModule } from '../../demo-material-module';
import { DirectivesModule } from '../../directives/directives.module';
import { ProductManagementComponent } from './product-management.component';
import { AddProductComponent } from './add-product/add-product.component';



@NgModule({
  declarations: [ProductManagementComponent, AddProductComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild([{ path: '', component: ProductManagementComponent }])
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class ProductManagementModule { }
