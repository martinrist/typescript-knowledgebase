# Pipes

<!-- TOC -->
- [Pipes](#pipes)
  - [Overview](#overview)
  - [Formatting Strings](#formatting-strings)
  - [Formatting Numbers](#formatting-numbers)
  - [Formatting Collections](#formatting-collections)
  - [Formatting Dates](#formatting-dates)
  - [Formatting Objects](#formatting-objects)
  - [Miscellaneous Pipes](#miscellaneous-pipes)
  - [Building Custom Pipes](#building-custom-pipes)
  - [Pure vs Impure Pipes](#pure-vs-impure-pipes)
  - [Standalone Pipes](#standalone-pipes)
<!-- TOC -->

## Overview

- Pipes allow transformation of the output of expressions at the view level.
  They take data as input, transform it to the desired format, then display
  the output in the template.

- Pipes are separated from expressions using the `|` operator - e.g.
  `{{ product.name | uppercase }}`.

- Pipes can be chained - e.g. `{{ today | date | uppercase }}`


## Formatting Strings

- The following pipes are available to transform `string`s:
    - `uppercase` - transforms a string to upper case
    - `lowercase` - transforms a string to lower case
    - `titlecase` - transforms a string to title case

- The `slice` pipe discussed under
  ['Formatting Collections'](#formatting-collections) also works for `string`s.


## Formatting Numbers

- The `percent` pipe formats a `number` as a percentage:
    - `{{ 0.1234 | percent }}` produces `12%`

- The `currency` pipe formats a `number` as a local currency - the currency can
  be overridden and passed in as a pipe parameter:
    - `{{ 200 | currency: 'EUR'}}` produces `€200.00`


## Formatting Collections

- The `slice` pipe extracts a subset (slice) of a collection or string, by
  accepting a starting index and an optional end index:
    - `{{ [1, 2, 3, 4] | slice:1:3}}` produces `2, 3`


## Formatting Dates

- The `date` pipe formats a `Date` or a `string` as a particular date format:
    - `{{ today | date }}`, where `today = new Date();` displays the current
      date in the format of the user's machine.
    - Additional formats can be passed as parameters - e.g. `{{ today |
      date:'fullDate' }}`


## Formatting Objects

- The `json` pipe takes a general object as an input and outputs it in JSON
  format:
    - `{{ product | json }}` produces `{ name: 'Webcam', price: 100 }`


## Miscellaneous Pipes

- The `async` pipe is used when we manage data that is retrieved
  asynchronously by the component class.

- The `keyvalue` pipe converts an object into a collection of key-value
  pairs where the key of each item represents the object property and the
  value is the actual value:
    - This is handy when we want to iterate over object properties using the
      `*ngFor` directive - e.g. `*ngFor="let product of products | keyvalue"`.


## Building Custom Pipes

- To create a new custom pipe, use the `ng generate pipe <name>` CLI command.

- A custom pipe is a TypeScript class marked with the `@Pipe` decorator,
  that implements the `PipeTransform` interface:

    ```typescript
    @Pipe({
      name: 'sort'
    })
    export class SortPipe implements PipeTransform {
      transform(value: unknown, ...args: unknown[]): unknown {
        return null;
      }
    }
    ```

- Note that the signature of `transform` contains `unknown`-typed arguments
  and an `unknown` return type.  These need to be updated to match the
  actual type of expected value, arguments:

    ```typescript
    export class SortPipe implements PipeTransform {
      transform(value: Product[]): Product[] {
        // implementation goes here
        return [];
      }
    }
    ```


## Pure vs Impure Pipes

- Pipes are considered _pure_ by default - i.e. they are pure
  transformations that have no side-effects.

- Angular executes pure pipes when there is a change to the reference of the
  input variable, but not when the object reference does not change.
    - e.g. for the `sort` pipe above, the pipe executes when the `products`
      reference changes completely, but _not_ when `products.push(...)` is
      called.
    - Similarly, if a pure pipe operates on a single object, then a change
      to a property of that object will not cause the pipe to be re-evaluated.

- By setting the `pure` property on the `@Pipe` decorator to `false`, the
  pipe will get re-evaluated if a method is called, or a property set on the
  input value, even if its object reference hasn't changed.

- Note however, that impure pipes call the `transform` method every time the
  change detection cycle is triggered, which might be bad for performance.


## Standalone Pipes

- By setting the `standalone` property on the `@Pipe` directive to `true`,
  it's possible to declare a _standalone pipe_.

- They can also be created by running `ng generate pipe <name> --standalone`.

- Standalone pipes do not belong to a module, but instead need to be
  imported into their usage location in the `imports` property of the
  `@NgModule` that wants to use them.


<!-- References -->
