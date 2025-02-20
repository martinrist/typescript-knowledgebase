import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductDetailComponent} from "../product-detail/product-detail.component";
import {Product} from "../product";
import {ProductsService} from "../products.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(ProductDetailComponent) productDetail!: ProductDetailComponent;

  products: Product[] = [];
  selectedProduct: Product | undefined;

  private productsSub: Subscription | undefined;

  constructor(private productService: ProductsService) {
    console.log(`ProductListComponent: Using ProductService #${productService.serviceId}`);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    if (this.productDetail) {
      console.log(`ProductListComponent#ngAfterViewInit() - ${this.productDetail.id}`);
    } else {
      console.log(`ProductListComponent#ngAfterViewInit()`);
    }
  }

  ngOnDestroy() {
    this.productsSub?.unsubscribe();
  }

  onBuy(name: string) {
    window.alert(`You just bought ${name}`)
  }

  onAdd(product: Product) {
    this.products.push(product);
  }

  private getProducts() {
    this.productsSub = this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }
}
