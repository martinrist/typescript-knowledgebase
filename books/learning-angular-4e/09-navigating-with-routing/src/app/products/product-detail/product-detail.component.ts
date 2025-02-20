import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Product} from "../product";
import {ProductsService} from "../products.service";
import {Observable, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Enabling this creates a separate instance of `ProductsService` for this component
  // which means it won't reuse the version from the parent ProductListComponent.
  // providers: [ProductsService]
})
export class ProductDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() id = -1
  @Output() bought = new EventEmitter<string>();

  product$: Observable<Product> | undefined;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {
    console.log(`ProductDetailComponent#constructor() - productId = ${this.id}`);
    console.log(`ProductDetailComponent: Using ProductService #${productService.serviceId}`);
  }

  ngOnInit(): void {
    console.log(`ProductDetailComponent#ngOnInit() - productId = ${this.id}`);

    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.productService.getProduct(Number(params.get('id')));
      })
    );
  }

  ngOnDestroy(): void {
    console.log('ProductDetailComponent#ngOnDestroy()')
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const product = changes['product'];
    // console.log(
    //   `ProductDetailComponent#ngOnChanges() - Changed from ${product.previousValue} to ${product.currentValue}`
    // );
    this.product$ = this.productService.getProduct(this.id);
  }

  buy() {
    this.bought.emit();
  }
}
