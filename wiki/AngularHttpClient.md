# The HTTP Client

<!-- TOC -->
* [The HTTP Client](#the-http-client)
  * [Overview](#overview)
  * [The Angular HTTP Client](#the-angular-http-client)
  * [Authenticating Requests](#authenticating-requests)
  * [HTTP Interceptors](#http-interceptors)
<!-- TOC -->

## Overview

- Angular provides a built-in HTTP client providing support for communicating
  with servers over HTTP.

- The Angular HTTP client is based on [RxJS Observables][ref-Observables],
  allowing the resulting data to be processed and transformed effectively.


## The Angular HTTP Client

- To start using the HTTP Client, import `HttpClientModule` into the main
  `app.module.ts`:

    ```typescript
    @NgModule({
      /* ... declarations, providers etc */
      imports: [
        HttpClientModule
      ]
    })
    ```

- The most basic service provided by the `HttpClientModule` is the
  `HttpClient` service, which provides APIs to handle various HTTP methods,
  e.g.:
    - `get` - performs an HTTP `GET` operation to fetch data.
    - `post` - performs an HTTP `POST` operation to add new data.
    - `put` / `patch` - performs HTTP `PUT` and `PATCH` operations to update
      existing data.
    - `delete` - performs an HTTP `DELETE` operation to remove existing data.


## Authenticating Requests

- Typically, APIs use the HTTP `Authorization` header to pass a token to
  authenticate against a backend API.

- Calls to the `HttpClient` service can take an `options` parameter - an
  object that contains various options, e.g. `headers`:

    ```typescript
    const options = {
      headers: new HttpHeaders({ Authorization: 'myAuthToken' })
    };

    return this.http.get<ProductDTO[]>(this.productsUrl, options).pipe(
      // Transform received DTOs
    )
    ```


## HTTP Interceptors

- Instead of having to manually set the `Authorization` header in every call,
  it's possible to use an _HTTP Interceptor_.

- Interceptors are created using the `ng generate interceptor <name>` CLI
  command.

- Interceptors need to be imported as a provider into the same module that
  imports `HttpClientModule`, using the `HTTP_INTERCEPTORS` injection token:

    ```typescript
    @NgModule({
      declarations: [ AppComponent ],
      imports: [ HttpClientModule ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    })
    ```

- The interceptor is a normal `@Injectable` service that implements the
  `HttpInterceptor` interface:

    ```typescript
    @Injectable()
    export class AuthInterceptor implements HttpInterceptor {
      intercept(request: HttpRequest<unknown>, next: HttpHandler):
        Observable<HttpEvent<unknown>> {

        // Custom interceptor logic goes here
        const authReq = request.clone({
          setHeaders: { Authorization: 'myAuthToken' }
        });

        // This forwards the request to the next handler in the chain
        return next.handle(request);
      }
    }
    ```





<!-- References -->

[ref-Observables]: AngularObservables.md
