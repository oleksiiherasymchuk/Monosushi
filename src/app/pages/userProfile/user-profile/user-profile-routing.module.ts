import { ChangeUserPasswordComponent } from './../change-user-password/change-user-password.component';
import { HistoryComponent } from './../history/history.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';

const routes: Routes = [
  {
    path: '', component: UserProfileComponent, children: [
      { path: 'personal-info', component: PersonalInfoComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'changepassword', component: ChangeUserPasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'personal-info' },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }