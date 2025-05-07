# Dates & Times

## Contents
<!-- TOC -->
- [Dates \& Times](#dates--times)
  - [Contents](#contents)
  - [Creating Dates](#creating-dates)
  - [Getting and Setting Date Components](#getting-and-setting-date-components)
  - [Timestamps](#timestamps)
  - [Date Arithmetic](#date-arithmetic)
  - [Formatting \& Parsing Date Strings](#formatting--parsing-date-strings)
<!-- TOC -->

## Creating Dates

- The `Date` class is the JavaScript API for working with dates & times:
    - Created with the `Date()` constructor.

- Create new dates with the `Date()` constructor:
    - With no args, this returns the current time.
    - Single numeric argument is the number of ms since the 1970-01-01 epoch.
    - Two or more integer arguments are interpreted as the year, month,
      day-of-month, hour, minute, second and millisecond in the local timezone.
    - Note that years are zero-based, but days are 1-based.
    - String argument is parsed as a timestamp in UTC / ISO format.

- `Date.UTC()` takes the same arguments as the `Date()` constructor, interprets
  them as UTC and returns a millisecond timestamp that can be passed to the
  `Date()` constructor.


## Getting and Setting Date Components

- Once you have a `Date` instance, various components can be retrieved or set
  using accessor / mutator methods, e.g.:
    - `getFullYear()` / `setFullYear()`
    - `getUTCFullYear()` / `setUTCFullYear()`
    - Other methods use `Month` / `Date` / `Hours` / `Minutes` / `Seconds` /
      `Milliseconds` in place of `FullYear`.


## Timestamps

- To get or set the epoch-based millisecond timestamp, use `getTime()` /
  `setTime()`.

- Static method `Date.now()` returns the current time as a timestamp.


## Date Arithmetic

- `Date` objects can be compared with the standard `<`, `<=`, `>` and `>=`
  comparison operators.

- One `Date` instance can be subtracted from another to determine the number
  of milliseconds between the two dates.

- To add or subtract a specific number of seconds, minutes or hours, use the
  following idiom:

    ```javascript
    let d = new Date();
    d.setMonth(d.getMonth() + 3, d.getDate() + 14);
    ```


## Formatting & Parsing Date Strings

- Various methods exist to convert `Date` objects to strings, e.g.:

    ```javascript
    let d = new Date(2020, 0, 1, 17, 10, 30); // 5:10:30pm on New Year's Day 2020
    d.toString()  // => "Wed Jan 01 2020 17:10:30 GMT-0800 (Pacific Standard Time)"
    d.toUTCString()         // => "Thu, 02 Jan 2020 01:10:30 GMT"
    d.toLocaleDateString()  // => "1/1/2020": 'en-US' locale
    d.toLocaleTimeString()  // => "5:10:30 PM": 'en-US' locale
    d.toISOString()         // => "2020-01-02T01:10:30.000Z"
    ```

- There is also a static `Date.parse()` method that takes a string as an
  argument and attempts to parse it into a valid date.


<!-- References -->
