import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, products} from "../products";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // first get the product id from the current route
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    // Find the product that corresponds to the id provided in the route
    this.product = products.find(product => product.id === productIdFromRoute);
  }

  addToCart(product: Product) {
    this.cartService.addToCard(product);
    window.alert('Your product has been added to your cart!');
  }
}
