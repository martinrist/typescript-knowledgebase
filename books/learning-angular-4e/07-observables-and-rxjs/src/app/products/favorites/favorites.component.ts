import {Component, Host, OnInit, Optional} from '@angular/core';
import {Product} from '../product';
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  products: Product[] = [];

  private readonly id: number;
  private static nextId = 0;

  constructor(private productService: ProductsService) {
    this.id = FavoritesComponent.nextId;
    FavoritesComponent.nextId++;
    console.log(`Constructing FavoritesComponent #${this.id}`);
    console.log(`FavoritesComponent: Using ProductService #${productService.serviceId}`);
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}
