import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminAuthorizationComponent } from './admin-authorization/admin-authorization.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'categories', component: AdminCategoryComponent },
      { path: 'products', component: AdminProductComponent },
      { path: 'discounts', component: AdminDiscountComponent },
      { path: 'news', component: AdminNewsComponent },
      { path: 'order', component: AdminOrderComponent },
      { path: '', pathMatch: 'full', redirectTo: 'category' }
    ]
  },
  { path: 'auth', component: AdminAuthorizationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }