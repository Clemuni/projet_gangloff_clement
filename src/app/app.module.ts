import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ClientFormComponent } from './components/customerAccount/client-form/client-form.component';
import { RecapComponent } from './components/customerAccount/recap/recap.component';
import { InputComponent } from './components/common/input/input.component';

import { PhonePipe } from './pipes/phone.pipe';
import { MonService } from './services/mon-service.service';
import { CatalogComponent } from './components/products/catalog/catalog.component';
import { CartComponent } from './components/products/cart/cart.component';
import { CustomerAccountComponent } from './components/customerAccount/customer-account/customer-account.component';
import { HomeComponent } from './components/common/home/home.component';
import { Page404Component } from './components/common/page404/page404.component';

import { ProductState } from './redux/states/product.state';
import { DetailsComponent } from './components/products/details/details.component';
import { AddProductButtonComponent } from './components/common/products/add-product-button/add-product-button.component';
import { RemoveProductButtonComponent } from './components/common/products/remove-product-button/remove-product-button.component';
import { SeeDetailsProductButtonComponent } from './components/common/products/see-details-product-button/see-details-product-button.component';

import { ApiHttpInterceptor } from './http/api-httpinterceptor';
import { LoginComponent } from './components/http/login/login.component';

import { AuthService } from './services/auth-service.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compte-client', component: CustomerAccountComponent },
  { path: 'produits/catalogue', component: CatalogComponent },
  { path: 'produits/panier', component: CartComponent },
  { path: 'produits/:label', component: DetailsComponent },
  { path: 'connexion', component: LoginComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientFormComponent,
    RecapComponent,
    InputComponent,
    PhonePipe,
    CatalogComponent,
    CustomerAccountComponent,
    HomeComponent,
    Page404Component,
    CartComponent,
    DetailsComponent,
    AddProductButtonComponent,
    RemoveProductButtonComponent,
    SeeDetailsProductButtonComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([ProductState]),
  ],
  providers: [
    AuthService,
    MonService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
