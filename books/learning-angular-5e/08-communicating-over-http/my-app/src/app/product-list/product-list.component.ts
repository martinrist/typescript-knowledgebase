import {AfterViewInit, Component, DestroyRef, inject, OnInit, viewChild} from '@angular/core';
import {Product} from '../product';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {SortPipe} from '../sort.pipe';
import {ProductsService} from '../products.service';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ProductCreateComponent} from '../product-create/product-create.component';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductDetailComponent,
    SortPipe,
    AsyncPipe,
    ProductCreateComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  selectedProduct: Product | undefined;

  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.getProducts();
  }

  onAdded(product: Product) {
    alert(`${product.title} added to cart!`);
  }

  private getProducts() {
    this.products$ = this.productService.getProducts();
  }

}
