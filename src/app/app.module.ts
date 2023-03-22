import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product/product-info/product-info.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';


import { SharedModule } from './shared/shared.module';
import { AuthComponent } from './component/auth/auth/auth.component';

import { AdminAuthorizationComponent } from './admin/admin-authorization/admin-authorization.component';
import { HomeComponent } from './pages/home/home.component';
import { ChangeUserPasswordComponent } from './pages/userProfile/change-user-password/change-user-password.component';
import { CallModalComponent } from './component/call-modal/call-modal.component';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,
    HomeComponent,

    ProductComponent,
    ProductInfoComponent,

    AuthComponent,
    AdminAuthorizationComponent,
    ChangeUserPasswordComponent,
    CallModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    ToastrModule.forRoot(),
    SharedModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

