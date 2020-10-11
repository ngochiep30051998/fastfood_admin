import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingInsideBtnComponent } from './loading-inside-btn/loading-inside-btn.component';
import { DemoMaterialModule } from '../demo-material-module';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    LoadingInsideBtnComponent,
    OverlayComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    OverlayModule
  ],
  exports: [
    LoadingInsideBtnComponent,
    OverlayComponent
  ]
})
export class ComponentsModule { }
