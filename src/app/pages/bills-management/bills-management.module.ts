import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillsManagementComponent } from './bills-management.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { DemoMaterialModule } from '../../demo-material-module';
import { DirectivesModule } from '../../directives/directives.module';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { config } from 'process';
import { BillPdfComponent } from './bill-pdf/bill-pdf.component';



@NgModule({
  declarations: [BillsManagementComponent, BillDetailComponent, BillPdfComponent],
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
  ],
  entryComponents: [
    BillDetailComponent,
    BillPdfComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }
  ]
})
export class BillsManagementModule { }
