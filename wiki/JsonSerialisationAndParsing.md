# JSON Serialisation & Parsing

## Contents
<!-- TOC -->
- [JSON Serialisation \& Parsing](#json-serialisation--parsing)
  - [Contents](#contents)
  - [Overview](#overview)
  - [Additional Arguments](#additional-arguments)
  - [JSON Customisations](#json-customisations)
<!-- TOC -->

## Overview

- JavaScript supports JSON serialisation and deserialisation via the functions
  `JSON.stringify()` and `JSON.parse()`:
    - Assuming all objects in the object graph are JSON-serialisable, passing
      the object to `JSON.stringify()` will turn it into a JSON string
      representation.
    - Passing the result of that serialising back into `JSON.parse()` will
      recreate the original object.

- Example:

    ```javascript
    let o = {s: "", n: 0, a: [true, false, null]};
    let s = JSON.stringify(o);  // s == '{"s":"","n":0,"a":[true,false,null]}'
    let copy = JSON.parse(s);   // copy == {s: "", n: 0, a: [true, false, null]}
    ```

## Additional Arguments

- Both `JSON.stringify()` and `JSON.parse()` take an optional second argument
  that allows us to extend the JSON format (see next section).

- `JSON.stringify()` also takes an optional third-argument that specifies that
  the serialised JSON should be on multiple lines.  Also:
    - If the third argument is a number, that is used as the indent size.
    - If the third argument is a string of whitespace, that is used for each
      level of indentation.


## JSON Customisations

- If `JSON.stringify()` is asked to serialise a value that is not natively
  supported by the JSON format, it looks to see if that value has a `toJSON()`
  method:
    - If so, it calls that method and stringifies the return value in
      place of the original value.

- If you need to re-create things like `Date` objects or modify parsed objects,
  it's possible to pass a 'reviver' function as the second argument to
  `JSON.parse()`, which is invoked once for each primitive value parsed from
  the input string.

- The reviver function is invoked with two arguments:
    - The name of the property that's being deserialised, or an array index
      converted to a string.
    - The primitive value of that object property or array element.

- The return value of the reviver function becomes the new value of the
  named property, or `undefined` to delete the property.

- Example:

    ```javascript
    let data = JSON.parse(text, function(key, value) {
        // Remove any values whose property name begins with an underscore
        if (key[0] === "_") return undefined;

        // If the value is a string in ISO 8601 date format convert it to a Date.
        if (typeof value === "string" &&
            /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value)) {
            return new Date(value);
        }

        // Otherwise, return the value unchanged
        return value;
    });
    ```

<!-- References -->
