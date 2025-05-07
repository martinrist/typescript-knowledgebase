# Regular Expressions

## Contents
<!-- TOC -->
- [Regular Expressions](#regular-expressions)
  - [Contents](#contents)
  - [Overview](#overview)
    - [Literal Characters](#literal-characters)
    - [Character Classes](#character-classes)
    - [Repetition](#repetition)
    - [Alternation, Grouping \& References](#alternation-grouping--references)
    - [Match Position](#match-position)
    - [Flags](#flags)
  - [String Methods for Pattern Matching](#string-methods-for-pattern-matching)
  - [The `RegExp` Class](#the-regexp-class)
<!-- TOC -->

## Overview

- Regular expression support in JavaScript is provided by the `RegExp` class:
    - Both `String` and `RegExp` provide methods that use regular expressions
      to perform pattern-matching and search-and-replace functions on text.

- Regular expressions can be created either by:
    - Using the `RegExp()` constructor.
    - Using _regular expression literals_ - characters within a pair of slash
      (`/`) characters - e.g. `/s$/`.

- Regular expressions can have one or more flags that affect their operation:
    - Specified after the closing `/` in literals - e.g. `/s$/i`.
    - Specified as second argument in the `RegExp` constructor - e.g.
      `new RegExp('s$', 'i');`.



## Regular Expression Syntax

### Literal Characters

- All alphabetical characters and digits match themselves literally in regular
  expressions.

- Some non-alphabetical characters match using escape sequences beginning with
  `\`:
    - `\0` - The NUL character (`\u0000`).
    - `\t` - Tab (`\u0009`).
    - `\n` - Newline (`\u000A`).
    - `\v` - Vertical tab (`\u0008`).
    - `\f` - Form feed (`\u000C`).
    - `\r` - Carriage return (`\u000D`).
    - `\x`_nn_ - Latin character specified by the hex number _nn_.
    - `\u`_xxxx_ - Unicode character specified by the hex number _xxxx_.
    - `\u`_{n}_ - Unicode character specified by the code point _n_, where _n_
      is one to six hex digits between 0 and 10FFFF.
    - `\c`_X_ - The control character _X_ - e.g. `\cJ` is equivalent to `\n`.

- Various punctuation marks (e.g. `^`, `$`, `*` etc) have special meanings - to
  match them literally, prefix them with an escaping `\` - e.g. `\^`.


### Character Classes

- Individual charactere can be combined into _character classes_ by placing them
  within square brackets:
    - Character class matches any one character in the class.
    - e.g. `\[abc]\` matches one of `a`, `b` or `c`.

- Negated character classes start with a `^` and match anything except the
  contents of the class - e.g. `\[^abc]\` matches anything except `a`, `b` or
  `c`.

- Character classes can use a hyphen to match a range of characters:
    - e.g. `\[a-z]\` matches any lower-case Latin letter.

- Summary of character classes:
    - `[...]` - any character between the brackets.
    - `[^...]` - any character except those between the brackets.
    - `\w` - any ASCII word character - equivalent to `[a-zA-Z0-9_]`.
    - `\W` - any character that is not an ASCII word character.
    - `\s` - any character that is Unicode whitespace.
    - `\S` - any character that is not Unicode whitespace.
    - `\d` - any ASCII digit - equivalent to `[0-9]`.
    - `\D` - any character other than an ASCII digit.
    - `[\b]` - a literal backspace.

- If the regular expression has the `u` flag, then the _Unicode Character
  Classes_ `\p{...}` and their negation `\P{...}` are supported.


### Repetition

- Characters that specify repetition always follow the pattern to which they
  are applied.

- Standard repetition characters:
    - `{n,m}` - match at least _n_ times, but no more than _m_ times.
    - `{n,}` - match _n_ or more times.
    - `{n}` - match exactly _n_ times.
    - `?` - match zero or one times - equivalent to `{0,1}`.
    - `+` - match one or more times - equivalent to `{1,}`.
    - `*` - match zero or more times - equivalent to `{0,}`.

- Brackets may need to be used to define groups if those groups need the
  repetition applied.

- Take care that both `*` and `?` can match nothing.

- By default, repetitions are _greedy_ - consuming as much of the input string
  as possible.  Non-greedy repetitions have a `?` after, e.g.:
    - `*?` - match zero or more times (non-greedy).
    - `{1, 5]?` - match 1-5 times (non-greedy).


### Alternation, Grouping & References

- Alternative matches are specified with the `|` character, e.g:
    - `/ab|cd|ef/` - match either `ab` or `cd` or `ef`.
    - Alternatives are always considered left-to-right, even if a right-hand
      alternative would provide a 'better' match.

- Expressions can be _grouped_ using parentheses, e.g.:
    - To apply repetitions to a group - `/(ab|cd)+|ef/`.
    - To define subpatterns  ('capture groups') that can be referred back to
      later in the pattern, or extracted by matching and substitution APIs.

- To refer back to a subexpression later in the pattern, use `\n`, where _n_
  is the 1-based index of the subexpression, e.g.:
    - `\(['"])[^'"]*\1/` - matches a quoted expression that can use single-
      or double quotes, where the opening and closing quotes must be the same.

- To group subexpressions without capturing them, use `(?:` / `)`.

- ES2018 standardised _named capture groups_ that allow us to associate a name
  with the opening parenthesis, so we can refer to the matching text by name:
    - Uses `(?<...>` instead of `(`.
    - Example `/(?<city>\w+) (?<state>[A-Z]{2}) (?<zipcode>\d{5})(?<zip9>-\d{4})?/`.
    - To refer back to a named capture group, use `\k<name>`, e.g.:
      `/(?<quote>['"])[^'"]*\k<quote>/`


### Match Position

- Position of the required match (e.g. start or end of string / line) can be
  specified using _anchor characters_:
    - `^` - Match the beginning of the string or, with the `m` flag, the
      beginning of a line.
    - `$` - Match the end of the string and, with the `m` flag, the end of a
      line.
    - `\b` - Match a word boundary - the position between a `\w` character and
      a `\W` character or between a `\w` character and the beginning or end of
      a string. (Note, however, that `[\b]` matches backspace.)
    - `\B` - Match a position that is not a word boundary.


### Flags

- Flags can alter the matching behaviour - these are specified after the
  trailing `/` for the literal, or as the second argument to the `RegExp`
  constructor.

- Common flags:
    - `g` - global matches - i.e. find all matches rather than the first.
    - `i` - case-insensitive match.
    - `m` - multi-line matching - `^` and `$` anchors should match both the
      beginning and end of the string and also the beginning and end of
      individual lines in the string.
    - `s` - allows `.` to match line terminators as well as other characters.
    - `u` - matches full Unicode endpoints rather than 16-bit values.


## String Methods for Pattern Matching

- Strings support four main methods using regular expressions.

- `search()` - takes a regex argument and returns either the position
  of the first match, or -1 if there is no match.

- `replace()` - performs search-and-replace - taking a regular expression
  as the first argument, and a replacement string as the second:
    - If the regex has the `g` flag, all occurrences are replaced.
    - The replacement string may refer to numbered capture groups using `$1`,
      `$2` etc.
    - Can also refer to named capture groups using `$<name>`.
    - Can also pass a function instead of the replacement string.  Function
      will be invoked with entire matched text, then any capture groups,
      then match position, then entire string.

- `match()` - takes a regex as its only argument, and returns array containing
  match results, or `null` if no match found:
    - If regex has the `g` flag, returns an array containing all matches.
    - If regex doens't have the `g` flag, still returns an array, but contents
      differ:
        - First element - matching string
        - Remaining elements - substrings matching capture groups

- `matchAll()` - expects a regex with the `g` flag set and returns an iterator
  that yields the match objects that `match()` returns when used with a
  non-global regex.

- `split()` - breaks up the string on which it is called into an array of
  substrings, with the supplied regex used as a separator.


## The `RegExp` Class

- The `RegExp` constructor takes one or two string arguments:
    - First argument - string containing the body of the regex.
    - Second argument - one or more flags.

- `RegExp` properties:
    - `source` - source text of the regex - the characters that appear between
      the slashes in a literal.
    - `flags` - the flags for the regex.
    - `global` - boolean property specifying whether the `g` flag is set.
    - `ignoreCase` - boolean property specifying whether the `i` flag is set.
    - `multiline` - boolean property specifying whether the `m` flag is set.
    - `dotAll` - boolean property specifying whether the `s` flag is set.
    - `unicode` - boolean property specifying whether the `u` flag is set.
    - `sticky` - boolean property specifying whether the `y` flag is set.

- `test()` method - takes a string argument and returns `true` if the string
  matches, `false` if not.

- `exec()` - most general and powerful way to use regexes:
    - Takes a single string argument and looks for a match in the string.
    - Returns `null` if no match found.
    - If match found, returns array as per `match()` method for non-global
      searches.