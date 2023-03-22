import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { OffertaComponent } from './offerta.component';
import { OffertaRoutingModule } from './offerta-routing.module';

@NgModule({
  declarations: [
    OffertaComponent
  ],
  imports: [
    CommonModule,
    OffertaRoutingModule,
    SharedModule,
  ]
})
export class OffertaModule { }