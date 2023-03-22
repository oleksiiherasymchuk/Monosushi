import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PartnersComponent
  ],
  imports: [
    CommonModule,
    PartnersRoutingModule,
    SharedModule,
  ]
})
export class PartnersModule { }