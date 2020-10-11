import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    FlexLayoutModule,
    PipesModule,
    RouterModule.forChild([{ path: '', component: UserProfileComponent }])
  ]
})
export class UserProfileModule { }
