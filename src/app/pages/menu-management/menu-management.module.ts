import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { DemoMaterialModule } from '../../demo-material-module';
import { DirectivesModule } from '../../directives/directives.module';
import { MenuManagementComponent } from './menu-management.component';
import { CopyMenuComponent } from './copy-menu/copy-menu.component';



@NgModule({
  declarations: [
    MenuManagementComponent,
    CopyMenuComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild([{ path: '', component: MenuManagementComponent }])
  ],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VI' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  entryComponents: [
    CopyMenuComponent
  ]
})
export class MenuManagementModule { }
