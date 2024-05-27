import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.routes'),
  },

  {
    path: 'checkout',
    loadComponent: () =>
      import('./modules/checkout/checkout.component').then(
        (m) => m.CheckoutComponent
      ),
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];
