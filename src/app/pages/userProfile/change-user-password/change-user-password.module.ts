import { ChangeUserPasswordRoutingModule } from './change-user-password-routing.module';
import { ChangeUserPasswordComponent } from './change-user-password.component';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ChangeUserPasswordComponent
  ],
  imports: [
    CommonModule,
    ChangeUserPasswordRoutingModule,
    SharedModule,
  ]
})
export class ChangeUserPasswordModule { }