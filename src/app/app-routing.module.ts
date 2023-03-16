import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminComponent } from './admin/admin.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { OffertaComponent } from './pages/offerta/offerta.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ProductComponent } from './pages/product/product.component';
import { HistoryComponent } from './pages/userProfile/history/history.component';
import { PersonalInfoComponent } from './pages/userProfile/personal-info/personal-info.component';
import { UserProfileComponent } from './pages/userProfile/user-profile/user-profile.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { DiscountResolver } from './shared/services/discount/discount.resolver';


import { ProductResolver } from './shared/services/product/product.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discount', component: DiscountComponent},
  { path: 'discount/:id', component: DiscountInfoComponent, resolve: {
    discountInfo: DiscountResolver
  } },
  { path: 'product/:category', component: ProductComponent },
  { path: 'product/:category/:id', component: ProductInfoComponent, resolve: {
    productInfo: ProductResolver
  } },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'offerta', component: OffertaComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'profile',canActivate: [AuthGuard], component: UserProfileComponent, children: [
    { path: 'personal-info', component: PersonalInfoComponent },
    { path: 'history', component: HistoryComponent },

  ] },
  { path: 'admin', component: AdminComponent,canActivate: [AuthGuard] , children: [
    { path: 'category', component: AdminCategoryComponent },
    { path: 'product', component: AdminProductComponent },
    { path: 'discount', component: AdminDiscountComponent },
    { path: 'news', component: AdminNewsComponent },
    { path: 'order', component: AdminOrderComponent },
    { path: '', pathMatch: 'full', redirectTo: 'category' }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
