import { AdminAuthorizationComponent } from './admin/admin-authorization/admin-authorization.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductInfoComponent } from './pages/product/product-info/product-info.component';
import { ProductComponent } from './pages/product/product.component';
import { HistoryComponent } from './pages/userProfile/history/history.component';
import { PersonalInfoComponent } from './pages/userProfile/personal-info/personal-info.component';
import { UserProfileComponent } from './pages/userProfile/user-profile/user-profile.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { ProductResolver } from './shared/services/product/product.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discount', loadChildren: () => import('./pages/discount/discount.module').then(m => m.DiscountModule) },
  // { path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  { path: 'product/:category', component: ProductComponent },
  { path: 'product/:category/:id', component: ProductInfoComponent, resolve: { productInfo: ProductResolver } },
  { path: 'payment', loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentModule) },
  { path: 'delivery', loadChildren: () => import('./pages/delivery/delivery.module').then(m => m.DeliveryModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'news', loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule) },
  { path: 'offerta', loadChildren: () => import('./pages/offerta/offerta.module').then(m => m.OffertaModule) },
  { path: 'partners', loadChildren: () => import('./pages/partners/partners.module').then(m => m.PartnersModule) },
  { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'profile', canActivate: [AuthGuard], loadChildren: () => import('./pages/userProfile/user-profile/user-profile.module').then(m => m.UserProfileModule) },
  { path: 'auth', component: AdminAuthorizationComponent },
  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

