import {AfterViewInit, Component, DestroyRef, inject, OnInit, viewChild} from '@angular/core';
import {Product} from '../product';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {SortPipe} from '../sort.pipe';
import {ProductsService} from '../products.service';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe, SortPipe, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService]
})
export class ProductListComponent implements AfterViewInit, OnInit {
  products$: Observable<Product[]> | undefined;
  selectedProduct: Product | undefined;

  private productService = inject(ProductsService);

  productDetail = viewChild(ProductDetailComponent);

  ngOnInit(): void {
    this.getProducts();
  }

  onAdded(product: Product) {
    alert(`${product.title} added to cart!`);
  }

  ngAfterViewInit(): void {
    console.log(this.productDetail()!.product());
  }

  private getProducts() {
    this.products$ = this.productService.getProducts();
  }

}
