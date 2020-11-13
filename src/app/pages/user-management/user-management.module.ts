import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { config } from 'process';
import { ComponentsModule } from '../../components/components.module';
import { DemoMaterialModule } from '../../demo-material-module';
import { DirectivesModule } from '../../directives/directives.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserManagementComponent } from './user-management.component';



@NgModule({
  declarations: [UserManagementComponent, CreateUserComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild([{ path: '', component: UserManagementComponent }])
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }
  ],
  entryComponents:[
    CreateUserComponent
  ]
})
export class UserManagementModule { }
