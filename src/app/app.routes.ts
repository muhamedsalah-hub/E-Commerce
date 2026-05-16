import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgotPassword', component: ForgotPasswordComponent },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', component: HomeComponent },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (c) => c.ProductsComponent,
          ),
      },
      {
        path: 'productDetails/:productId',
        loadComponent: () =>
          import('./components/product-details/product-details.component').then(
            (c) => c.ProductDetailsComponent,
          ),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (c) => c.BrandsComponent,
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (c) => c.CartComponent,
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (c) => c.CategoriesComponent,
          ),
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (c) => c.AllordersComponent,
          ),
      },
      {
        path: 'orders/:cartId',
        loadComponent: () =>
          import('./components/orders/orders.component').then(
            (c) => c.OrdersComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent,
      ),
  },
];
