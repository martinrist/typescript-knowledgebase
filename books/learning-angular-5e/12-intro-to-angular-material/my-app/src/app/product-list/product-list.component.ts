import {Component, inject, OnInit} from '@angular/core';
import {Product} from '../product';
import {SortPipe} from '../sort.pipe';
import {ProductsService} from '../products.service';
import {Observable, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [
    SortPipe,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  constructor(private productService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProducts();
  }

  onAdded(product: Product) {
    alert(`${product.title} added to cart!`);
  }

  private getProducts() {
    this.products$ =
      this.route.queryParamMap.pipe(
        switchMap(params => {
          return this.productService.getProducts(Number(params.get('limit')));
        })
      );
  }

}
