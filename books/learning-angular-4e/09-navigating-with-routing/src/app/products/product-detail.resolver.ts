import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {Product} from "./product";
import {inject} from "@angular/core";
import {ProductsService} from "./products.service";

export const productDetailResolver: ResolveFn<Product> = (route: ActivatedRouteSnapshot)=> {
  console.log('productDetailResolver');
  const productService = inject(ProductsService);
  const id = Number(route.paramMap.get('id'));
  return productService.getProduct(id);
}
