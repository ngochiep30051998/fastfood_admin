import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingInsideBtnComponent } from './loading-inside-btn/loading-inside-btn.component';
import { DemoMaterialModule } from '../demo-material-module';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ListProductComponent } from './list-product/list-product.component';
import { AddProductToMenuComponent } from './add-product-to-menu/add-product-to-menu.component';
import { MatDialogRef, MatFormFieldModule, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { PopupRemoveProductComponent } from './popup-remove-product/popup-remove-product.component';

@NgModule({
  declarations: [
    LoadingInsideBtnComponent,
    OverlayComponent,
    ListProductComponent,
    AddProductToMenuComponent,
    PopupRemoveProductComponent,
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    OverlayModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
  ],
  exports: [
    LoadingInsideBtnComponent,
    OverlayComponent,
    ListProductComponent,
    AddProductToMenuComponent
  ],
  entryComponents: [
    AddProductToMenuComponent,
    PopupRemoveProductComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class ComponentsModule { }
