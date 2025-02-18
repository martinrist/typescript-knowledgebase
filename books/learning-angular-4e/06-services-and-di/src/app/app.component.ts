import {Component, Inject, OnInit} from '@angular/core';
import {ProductsService} from "./products/products.service";
import {APP_CONFIG, AppConfig, appSettings} from "./app.config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: APP_CONFIG, useValue: appSettings },
  ]
})
export class AppComponent {

  constructor(
    private productService: ProductsService,
    @Inject(APP_CONFIG) config: AppConfig
    ) {
    // This will be the version of `ProductService` from the root injector
    console.log(`AppComponent: Using ProductService #${productService.serviceId}`);
  }

  get title(): string {
    return appSettings.title
  }
}
