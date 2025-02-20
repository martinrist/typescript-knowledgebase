import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from "./products/product-list/product-list.component";
import {CartComponent} from "./cart/cart.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ProductDetailComponent} from "./products/product-detail/product-detail.component";
import {authGuard} from "./auth/auth.guard";
import {checkoutGuard} from "./checkout.guard";
import {productDetailResolver} from "./products/product-detail.resolver";

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    // This route uses a resolver to prefetch product data
    resolve: productDetailResolver
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'cart',
    component: CartComponent,
    // This determines whether the cart is accessible by providing a guard function
    canActivate: [ authGuard ],
    canDeactivate: [ checkoutGuard ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
