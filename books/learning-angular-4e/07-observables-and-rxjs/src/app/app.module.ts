import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProductsModule} from "./products/products.module";
import {CopyrightDirective} from './copyright.directive';
import {NumericDirective} from './numeric.directive';
import {KeyLoggerComponent} from './key-logger/key-logger.component';

@NgModule({
  declarations: [
    AppComponent,
    CopyrightDirective,
    NumericDirective,
    KeyLoggerComponent,
    KeyLoggerComponent
  ],
  imports: [
    BrowserModule,
    ProductsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
