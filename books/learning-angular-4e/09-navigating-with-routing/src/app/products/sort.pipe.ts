import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'sort',

  // Setting this to `false` means that it'll get re-evaluated when a new product
  // is `.push()`ed onto the `products` list in the `product-list` component.

  // With this set to `true`, `.push()` doesn't re-evaluate the pipe, so the new
  // product is added to the end.
  pure: true
})
export class SortPipe implements PipeTransform {

  transform(products: Product[]): Product[] {
    if (products) {
      return products.sort((a: Product, b: Product) => {
        if (a.name < b.name) {
          return -1;
        } else if (b.name < a.name) {
          return 1;
        }

        return 0;
      });
    }

    return [];
  }

}
