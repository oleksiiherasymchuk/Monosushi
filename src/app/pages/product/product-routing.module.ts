import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from 'src/app/shared/services/product/product.resolver';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '', component: ProductComponent
  },
  {
    path: ':id',
    component: ProductInfoComponent,
    resolve: {
            productInfo: ProductResolver
          }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }