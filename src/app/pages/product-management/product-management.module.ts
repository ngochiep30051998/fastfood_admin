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
import { NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { config } from 'process';
import { ModalDeleteProductComponent } from './modal-delete-product/modal-delete-product.component';


@NgModule({
  declarations: [
    ProductManagementComponent,
    AddProductComponent,
    ModalDeleteProductComponent
  ]
  ,
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild([{ path: '', component: ProductManagementComponent }])
  ],
  entryComponents: [
    AddProductComponent,
    ModalDeleteProductComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }
  ]
})
export class ProductManagementModule { }
