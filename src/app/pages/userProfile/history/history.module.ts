import { SharedModule } from './../../../shared/shared.module';
import { HistoryComponent } from './history.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRoutingModule } from './history-routing.module';

@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule,
  ]
})
export class HistoryModule { }