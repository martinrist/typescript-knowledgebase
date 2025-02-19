import {Injectable} from '@angular/core';
import {ProductsService} from "../products.service";
import {Product} from '../product';
import {Observable, of, switchMap} from "rxjs";

@Injectable()
export class ProductViewService {

  private static nextId = 1;
  private readonly serviceId ;

  private product: Product | undefined;

  constructor(private productService: ProductsService) {
    this.serviceId = ProductViewService.nextId;
    ProductViewService.nextId++;
    console.log(`Constructing ProductViewService #${this.serviceId}`)
    console.log(`ProductViewService: Using ProductService #${productService.serviceId}`);
  }

  getProduct(id: number) : Observable<Product> {
    return this.productService.getProducts()
      .pipe(
        switchMap(products => {
          if (!this.product) {
            this.product = products[id];
          }
          return of(this.product);
        })
      );
  }
}
