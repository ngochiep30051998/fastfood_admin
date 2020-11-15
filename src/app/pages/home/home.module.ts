import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartistModule } from 'ng-chartist';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentUtcDateAdapter } from '../../common/MomentUtcDateAdapter';
import {DateAdapter, MAT_DATE_FORMATS} from 'saturn-datepicker';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }])
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentUtcDateAdapter, deps: [MAT_DATE_LOCALE], useValue: 'vi-vi' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    // { provide: MAT_DATE_LOCALE, useValue: 'vi-vi' },
    // { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ]
})
export class HomeModule { }
