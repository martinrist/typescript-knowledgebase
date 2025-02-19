# Observables

<!-- TOC -->
* [Observables](#observables)
  * [Overview](#overview)
<!-- TOC -->

## Overview

- _Reactive programming_ is a programming paradigm that helps us consume,
  digest and transform asynchronous information using data streams.

- RxJS is a JavaScript library that provides methods to manipulate data
  using _observables_.


## Callbacks and `Promise`s

- Early mechanisms for handling asynchronous state changes operated via
  _callbacks_, where a callback function is provided to a method, which is
  then called when results are available.

- A common problem with callbacks is that they can be hard to compose and
  sequence, resulting in _callback hell_ a.k.a. the _pyramid of doom_, where
  callbacks are nested inside other callbacks:

    ```typescript
    getRootFolder(folder => {
      getAssetsFolder(folder, assets => {
        getPhotos(assets, photos => {
          // do something with photos
        })
      })
    })
    ```

- This can be avoided using `Promise`s, which allow different asynchronous
  operations to be chained together at the same level:

    ```typescript
    getRootFolder()
      .then(getAssetsFolder)
      .then(getPhotos)
      .then(...);
    ```

- However, `Promise`s have various limitations:
    - They cannot be cancelled.
    - They are immediately executed.
    - They are one-time operations - there's no easy way to retry them.
    - They respond with only one value.


## Observables

- An _observable_ is an object that maintains a list of dependents called
  _observers_ and can inform them about state and data changes by emitting
  events asynchronously.

- Observers _subscribe_ to an observable in order to be notified and react
  to events emitted by the observable.

- Example:

    ```typescript
    export class AppComponent {
      title: string = appSettings.title;

      // Observable properties are conventionally suffixed with `$`
      title$ = new Observable(observer => {
        setInterval(() => {
          observer.next();
        }, 2000);
      });

      constructor() {
        // Subscribes to the observable, otherwise no events will be emitted
        this.title$.subscribe(this.setTitle)
      }

      private setTitle = () => {
        this.title = `Learning Angular - ${new Date().toLocaleTimeString()}`;
      }
    }
    ```


## Creating Observables

- The `fromEvent` operator creates an `Observable` from a DOM event.

- The `of` operator creates an `Observable` from values:

    ```typescript
    const values = of(1, 2, 3);
    values.subscribe(value => console.log(value));
    ```

- The `from` operator creates an `Observable` from an array or a `Promise`:

    ```typescript
    const values = from([1, 2, 3]);
    values.subscribe(value => console.log(value));
    ```


## Transforming Observables

- The `pipe` operator is used to link and combine multiple operators
  together separated by commas.

- The `tap` operator performs an action (usually with a side effect) when we
  want to do something with a stream that doesn't modify it.

- The `map` operator applies a transformation to events in the stream.

- The `filter` operator takes a predicate and removes events from the stream
  for which the predicate evaluates to `false`.

- The above operators are all illustrated in the example below:

    ```typescript
    const logger$ = fromEvent<KeyboardEvent>(
      this.input?.nativeElement,
     'keyup');

    logger$.pipe(
      map(evt => evt.key.charCodeAt(0)),
      filter(code => {
        return (code > 31 && (code < 48 || code > 57)) === false;
      }),
      tap(evt => this.keys += evt.key)
    ).subscribe();
    ```


## Using `switchMap` and `mergeMap`

- The `switchMap` operator takes an `Observable` as a source, and applies a
  transformation function on each event that _itself_ returns an inner
  `Observable`:
    - It returns an output `Observable` with values emitted from
      each inner `Observable`.
    - As soon as an inner `Observable` emits a new value, the output
      `Observable` stops receiving values from the other inner `Observable`s
      (i.e. the output _switches_ to the latest inner `Observable`).

- `mergeMap` is an alternative to `switchMap` that doesn't stop receiving
  values from the other inner `Observable`s, but merges all their values.


## Unsubscribing from Observables

- Subscribing to an `Observable` creates an observer that listens to changes.
  This consumes memory, so we need to unsubscribe (and clear up resources)
  when the component that created the subscription needs to be destroyed.

- One option for unsubscribing is to make the component implement the
  `OnDestroy` lifecycle hook and unsubscribe manually in the `ngOnDestroy()`
  method.  This requires storing the subscription state:

    ```typescript
    export class ProductListComponent implements OnInit, OnDestroy {
      private productsSub = Subscription | undefined;

      ngOnInit() {
        this.productsSub = this.productService.getProducts()
          .subscribe(products => { this.products = products; });
      }

      ngOnDestroy() {
        this.productsSub?.unsubscribe();
      }
    }
    ```

- As an alternative to this boilerplate to manually unsubscribe, the `async`
  pipe can be used to avoid needing to set up and tear down subscriptions:
    - The `async` pipe automatically subscribes to an `Observable`
    - It also automatically unsubscribes when the component using it is
      destroyed.

- In this approach, we expose an `Observable` all the way out to the view
  (instead of subscribing in the component's view model TypeScript file),
  then use `| async` in the view, e.g.:

    ```typescript
    export class ProductListComponent {
      // Instead of having `products: Product[]` state, we expose an Observable
      products$: Observable<Product[]> | undefined;

      private getProducts(): Observable<Product[]> {
        // `getProducts()` no longer subscribes to the Observable returned from
        // `ProductsService`, therefore doesn't need to unsubscribe
        this.products$ = this.productService.getProducts();
      }
    }
    ```

    ```html
    <h2>Product List</h2>
    <ul>
      <li
        <!-- This uses the `async` pipe to get the latest product list -->
        *ngFor="let product of (products$ | async)!; let i=index"
        (click)="selectedProduct = product">
          <app-product-view [id]="i"></app-product-view>
      </li>
    </ul>
    ```


<!-- References -->
