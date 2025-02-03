import {AfterViewInit, Component, inject, OnInit, viewChild} from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../sort.pipe';
import {ProductsService} from '../products.service';
import {FavoritesComponent} from '../favorites/favorites.component';
import {ProductViewComponent} from '../product-view/product-view.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe, FavoritesComponent, ProductViewComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService]
})
export class ProductListComponent implements AfterViewInit, OnInit {
  products: Product[] = [];
  selectedProduct: Product | undefined = this.products[0];

  private productService = inject(ProductsService);

  productDetail = viewChild(ProductDetailComponent);

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  onAdded(product: Product) {
    alert(`${product.title} added to cart!`);
  }

  ngAfterViewInit(): void {
    console.log(this.productDetail()!.product());
  }

}
