import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { OffertaComponent } from './pages/offerta/offerta.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './pages/userProfile/user-profile/user-profile.component';
import { PersonalInfoComponent } from './pages/userProfile/personal-info/personal-info.component';
import { HistoryComponent } from './pages/userProfile/history/history.component';
import { SharedModule } from './shared/shared.module';
import { AuthComponent } from './component/auth/auth/auth.component';
import { AdminAuthorizationComponent } from './admin/admin-authorization/admin-authorization.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminDiscountComponent,
    AdminNewsComponent,
    AdminOrderComponent,
    AdminProductComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    CheckoutComponent,
    ContactComponent,
    DeliveryComponent,
    DiscountComponent,
    DiscountInfoComponent,
    HomeComponent,
    NewsComponent,
    OffertaComponent,
    PartnersComponent,
    PaymentComponent,
    ProductComponent,
    ProductInfoComponent,
    UserProfileComponent,
    PersonalInfoComponent,
    HistoryComponent,
    AuthComponent,
    AdminAuthorizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    ToastrModule.forRoot(),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

