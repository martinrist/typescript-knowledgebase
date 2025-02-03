import {inject, Injectable} from '@angular/core';
import {Product} from './product';
import {map, Observable, of, tap} from 'rxjs';
import {APP_SETTINGS} from './app.settings';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ProductsService {

  private productsUrl = inject(APP_SETTINGS).apiUrl + '/products';

  private products: Product[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const options = new HttpParams().set('limit', 10);
    return this.http.get<Product[]>(this.productsUrl, {
      params: options,
    }).pipe(map(products => {
      this.products = products;
      return products;
    }));
  }

  getProduct(id: number): Observable<Product> {
    const product = this.products.find(product => product.id === id);
    return of(product!);
  }

  addProduct(newProduct: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, newProduct).pipe(
      map(product => {
        this.products.push(product);
        return product;
      })
    );
  }

  updateProduct(id: number, price: number): Observable<Product> {
    return this.http.patch<Product>(`${this.productsUrl}/${id}`, { price }).pipe(
      map(product => {
        const index = this.products.findIndex(product => product.id === id);
        this.products[index].price = price;
        return product;
      })
    )
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`).pipe(
      tap(() => {
        const index = this.products.findIndex(product => product.id === id);
        this.products.splice(index, 1);
      })
    )
  }
}
