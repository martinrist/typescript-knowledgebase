import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {SortPipe} from './sort.pipe';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductCreateComponent } from './product-create/product-create.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    SortPipe,
    FavoritesComponent,
    FavoritesComponent,
    ProductViewComponent,
    ProductViewComponent,
    ProductCreateComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ProductListComponent,
  ]
})
export class ProductsModule { }
