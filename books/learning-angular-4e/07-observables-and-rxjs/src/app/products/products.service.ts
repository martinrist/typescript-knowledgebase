import {Injectable} from '@angular/core';
import {Product} from './product';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private static nextId = 1;
  readonly serviceId;

  private products: Product[] = [
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

  constructor() {
    this.serviceId = ProductsService.nextId;
    ProductsService.nextId++;
    console.log(`Constructing ProductsService #${this.serviceId}`)
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

}
