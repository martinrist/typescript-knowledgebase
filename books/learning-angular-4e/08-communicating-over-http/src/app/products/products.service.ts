import {Injectable} from '@angular/core';
import {Product} from './product';
import {map, Observable, of, pipe} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface ProductDTO {
  id: number;
  title: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = 'https://fakestoreapi.com/products';
  private static nextId = 1;
  readonly serviceId;

  constructor(private http: HttpClient) {
    this.serviceId = ProductsService.nextId;
    ProductsService.nextId++;
    console.log(`Constructing ProductsService #${this.serviceId}`)
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductDTO[]>(this.productsUrl).pipe(
      map(products => products.map(this.convertToProduct))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<ProductDTO>(`${this.productsUrl}/${id}`).pipe(
      map(this.convertToProduct)
    )
  }

  addProduct(name: string, price: number): Observable<Product> {
    return this.http.post<ProductDTO>(this.productsUrl, {
      title: name,
      price: price
    }).pipe(
      map(this.convertToProduct)
    );
  }

  private convertToProduct(dto: ProductDTO): Product {
    return {
      id: dto.id,
      name: dto.title,
      price: dto.price
    };
  }
}
