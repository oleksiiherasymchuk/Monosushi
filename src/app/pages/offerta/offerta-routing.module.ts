import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OffertaComponent } from './offerta.component';

const routes: Routes = [
  {
    path: '', component: OffertaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffertaRoutingModule { }