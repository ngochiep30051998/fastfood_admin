import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLineBreakPipe } from './multi-line-break/multi-line-break.pipe';



@NgModule({
  declarations: [
    MultiLineBreakPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MultiLineBreakPipe
  ]
})
export class PipesModule { }
