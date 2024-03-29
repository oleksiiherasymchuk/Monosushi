import { CheckoutRoutingModule } from './../checkout/checkout-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
  ]
})
export class CheckoutModule { }