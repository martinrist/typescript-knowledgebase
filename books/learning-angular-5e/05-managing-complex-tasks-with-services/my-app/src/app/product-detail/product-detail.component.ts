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

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.Emulated,     // This is the default
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnChanges {
  product = input<Product>();
  added = output<Product>();

  constructor() {
    console.log('In constructor() - Product: ', this.product())

  }

  addToCart() {
    this.added.emit(this.product()!);
  }

  get productTitle() {
    return this.product()!.title;}

  ngOnInit(): void {
    console.log('In ngOnInit() - Product: ', this.product())
  }

  ngOnChanges(changes: SimpleChanges): void {
    const product = changes['product'];
    if (!product.isFirstChange()) {
      const oldValue = product.previousValue;
      const newValue = product.currentValue;
      console.log('In ngOnChanges() - oldValue: ', oldValue);
      console.log('In ngOnChanges() - newValue: ', newValue);
    }
  }
}
