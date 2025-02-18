import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class ProductsService {

  private static nextId = 1;
  readonly serviceId ;

  constructor() {
    this.serviceId = ProductsService.nextId;
    ProductsService.nextId++;
    console.log(`Constructing ProductsService #${this.serviceId}`)
  }

  getProducts(): Product[] {
    return [{
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
  }

}
