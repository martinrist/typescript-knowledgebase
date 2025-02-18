import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductDetailComponent} from "../product-detail/product-detail.component";
import {Product} from "../product";
import {ProductsService} from "../products.service";
import {ProductViewService} from "../product-view/product-view.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductsService]
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @ViewChild(ProductDetailComponent) productDetail!: ProductDetailComponent;

  products: Product[] = [];
  selectedProduct: Product | undefined;

  constructor(private productService: ProductsService) {
    console.log(`ProductListComponent: Using ProductService #${productService.serviceId}`);
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

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
