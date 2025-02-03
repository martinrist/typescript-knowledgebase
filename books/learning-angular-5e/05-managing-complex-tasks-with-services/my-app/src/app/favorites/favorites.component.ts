import {Component, OnInit} from '@angular/core';
import { Product } from '../product';
import {ProductsService} from '../products.service';
import {favoritesFactory} from './favorites';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  providers: [
    { provide: ProductsService, useFactory: favoritesFactory(true) }
  ]
})
export class FavoritesComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

}
