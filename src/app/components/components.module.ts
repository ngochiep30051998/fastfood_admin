import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingInsideBtnComponent } from './loading-inside-btn/loading-inside-btn.component';
import { DemoMaterialModule } from '../demo-material-module';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ListProductComponent } from './list-product/list-product.component';


@NgModule({
  declarations: [
    LoadingInsideBtnComponent,
    OverlayComponent,
    ListProductComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    OverlayModule
  ],
  exports: [
    LoadingInsideBtnComponent,
    OverlayComponent,
    ListProductComponent
  ]
})
export class ComponentsModule { }
