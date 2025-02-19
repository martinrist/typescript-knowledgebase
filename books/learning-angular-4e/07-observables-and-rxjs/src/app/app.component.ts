import {Component, Inject, OnInit} from '@angular/core';
import {ProductsService} from "./products/products.service";
import {APP_CONFIG, AppConfig, appSettings} from "./app.config";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: APP_CONFIG, useValue: appSettings },
  ]
})
export class AppComponent {

  title: string = appSettings.title;

  title$ = new Observable(observer => {
    setInterval(() => {
      observer.next();
    }, 1000);
  });

  constructor(
    private productService: ProductsService,
    @Inject(APP_CONFIG) config: AppConfig) {
    // This will be the version of `ProductService` from the root injector
    console.log(`AppComponent: Using ProductService #${productService.serviceId}`);

    this.title$.subscribe(this.setTitle)
  }

  private setTitle = () => {
    const timestamp = new Date();
    this.title = `Learning Angular - ${timestamp.toLocaleTimeString()}`;
  }

}
