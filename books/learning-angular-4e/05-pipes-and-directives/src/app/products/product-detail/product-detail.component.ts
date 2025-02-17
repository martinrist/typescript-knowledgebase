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

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public name = '';
  @Output() bought = new EventEmitter<string>();

  constructor() {
    console.log(`ProductDetailComponent#constructor() - name = ${this.name}`);
  }

  ngOnInit(): void {
    console.log(`ProductDetailComponent#ngOnInit() - name = ${this.name}`);
  }

  ngOnDestroy(): void {
    console.log('ProductDetailComponent#ngOnDestroy()')
  }

  ngOnChanges(changes: SimpleChanges): void {
    const product = changes['name'];
    console.log(
      `ProductDetailComponent#ngOnChanges() - Changed from ${product.previousValue} to ${product.currentValue}`
    );
  }

  buy() {
    this.bought.emit(this.name);
  }

  get productName(): string {
    console.log(`Get ${this.name}`);
    return this.name;
  }
}
