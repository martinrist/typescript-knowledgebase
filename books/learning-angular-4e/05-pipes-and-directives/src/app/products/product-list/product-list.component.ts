import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ProductDetailComponent} from "../product-detail/product-detail.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit {
  @ViewChild(ProductDetailComponent) productDetail!: ProductDetailComponent;
  selectedProduct = '';

  ngAfterViewInit(): void {
    if (this.productDetail) {
      console.log(`ProductListComponent#ngAfterViewInit() - ${this.productDetail.name}`);
    } else {
      console.log(`ProductListComponent#ngAfterViewInit()`);
    }
  }

  onBuy(name: string) {
    window.alert(`You just bought ${name}`)
  }
}
