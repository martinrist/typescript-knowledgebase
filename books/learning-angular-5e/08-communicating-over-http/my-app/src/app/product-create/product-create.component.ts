import { Component } from '@angular/core';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-product-create',
  imports: [],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  constructor(private productService: ProductsService) {}

  createProduct(title: string, price: string, category: string) {
    this.productService.addProduct({
      title,
      price: Number(price),
      category
    }).subscribe();
  }
}
