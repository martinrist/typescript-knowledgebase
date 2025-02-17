import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ProductDetailComponent} from "../product-detail/product-detail.component";
import {Product} from "../product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit {
  @ViewChild(ProductDetailComponent) productDetail!: ProductDetailComponent;

  products: Product[] = [
    {
      name: 'Webcam',
      price: 100
    },
    {
      name: 'Microphone',
      price: 200
    },
    {
      name: 'Wireless Keyboard',
      price: 85
    }];

  selectedProduct: Product | undefined;

  ngAfterViewInit(): void {
    if (this.productDetail) {
      console.log(`ProductListComponent#ngAfterViewInit() - ${this.productDetail.product?.name}`);
    } else {
      console.log(`ProductListComponent#ngAfterViewInit()`);
    }
  }

  onBuy(name: string) {
    window.alert(`You just bought ${name}`)
  }

  addProduct() {
    this.products.push({
      name: "New Product",
      price: 200
    })
  }
}
