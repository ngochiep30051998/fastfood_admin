import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberDirective } from './input-number/input-number.directive';



@NgModule({
  declarations: [
    InputNumberDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputNumberDirective
  ]
})
export class DirectivesModule { }
