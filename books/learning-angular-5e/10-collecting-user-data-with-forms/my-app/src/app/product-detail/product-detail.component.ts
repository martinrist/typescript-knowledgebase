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
import {Observable, switchMap} from 'rxjs';
import {ProductsService} from '../products.service';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.Emulated,     // This is the default
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product> | undefined;
  id = input<number>();

  constructor(
    private productService: ProductsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  addToCart() {
    console.log("Not implemented yet")
  }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.productService.getProduct(Number(params.get('id')));
      })
    )
  }

  changePrice(product: Product, price: string) {
    this.productService.updateProduct(product.id, Number(price)).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
