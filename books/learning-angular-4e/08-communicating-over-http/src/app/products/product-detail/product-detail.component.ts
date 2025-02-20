import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {Product} from "../product";
import {ProductsService} from "../products.service";

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
  @Input() product: Product | undefined;
  @Output() bought = new EventEmitter<string>();

  constructor(private productService: ProductsService) {
    console.log(`ProductDetailComponent#constructor() - name = ${this.product?.name}`);
    console.log(`ProductDetailComponent: Using ProductService #${productService.serviceId}`);
  }

  ngOnInit(): void {
    console.log(`ProductDetailComponent#ngOnInit() - name = ${this.product?.name}`);
  }

  ngOnDestroy(): void {
    console.log('ProductDetailComponent#ngOnDestroy()')
  }

  ngOnChanges(changes: SimpleChanges): void {
    const product = changes['product'];
    console.log(
      `ProductDetailComponent#ngOnChanges() - Changed from ${product.previousValue} to ${product.currentValue}`
    );
  }

  buy() {
    if (this.product) {
      this.bought.emit(this.product!.name);
    }
  }

  get productName(): string {
    if (this.product) {
      console.log(`Get ${this.product?.name}`);
      return this.product!.name;
    } else {
      return '';
    }
  }
}
