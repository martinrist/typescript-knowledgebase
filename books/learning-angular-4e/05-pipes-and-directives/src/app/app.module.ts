import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ProductListComponent} from "./products/product-list/product-list.component";
import {ProductsModule} from "./products/products.module";
import {SortPipe} from "./products/sort.pipe";
import { CopyrightDirective } from './copyright.directive';
import { NumericDirective } from './numeric.directive';

@NgModule({
  declarations: [
    AppComponent,
    CopyrightDirective,
    NumericDirective
  ],
  imports: [
    BrowserModule,
    ProductsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
