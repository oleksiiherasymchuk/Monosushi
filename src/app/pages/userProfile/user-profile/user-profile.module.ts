import { HistoryComponent } from './../history/history.component';
import { UserProfileComponent } from './user-profile.component';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    HistoryComponent,
    PersonalInfoComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
  ]
})
export class UserProfileModule { }