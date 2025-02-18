import { Component } from '@angular/core';
import {ProductsService} from "./products/products.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private productService: ProductsService) {
    // This will be the version of `ProductService` from the root injector
    console.log(`AppComponent: Using ProductService #${productService.serviceId}`);
  }

  title = 'my-app';
}
