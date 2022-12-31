import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './pages/product/product.component';
import { MainComponent } from './pages/main/main.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductListComponent } from './components/productList/productList.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderComponent } from './pages/order/order.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/resetPassword/reset-password.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    AdminPageComponent,
    OrderComponent,
    HelloComponent,
    HeaderComponent,
    CartComponent,
    ProductComponent,
    MainComponent,
    ShopComponent,
    AddProductComponent,
    ProductDetailComponent,
    ProductListComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
