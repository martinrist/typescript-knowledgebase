import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import {Observable} from 'rxjs';
import {ProductsService} from '../products.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.Emulated,     // This is the default
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnChanges {
  product$: Observable<Product> | undefined;
  id = input<number>();
  added = output();
  deleted = output();

  constructor(private productService: ProductsService, public authService: AuthService) { }

  addToCart() {
    this.added.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.product$ = this.productService.getProduct(this.id()!);
  }

  changePrice(product: Product, price: string) {
    this.productService.updateProduct(product.id, Number(price)).subscribe();
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    });
  }
}
