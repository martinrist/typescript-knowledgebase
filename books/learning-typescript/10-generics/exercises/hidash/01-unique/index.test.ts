import { describe, expect, test } from "@jest/globals";

import * as index from "./index";
import * as solution from "./solution";

const { unique } = process.env.TEST_SOLUTIONS ? solution : index;

describe(unique, () => {
  test.each([
    [[], []],
    [[[]], []],
    [[[], []], []],
    [
      [[1], [2]],
      [1, 2],
    ],
    [
      [[1], [2, 3]],
      [1, 2, 3],
    ],
    [
      [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        [1, 2],
        [3, 4],
        [5, 6],
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      [1, 2, 3, 4, 5, 6],
    ],
    [
      [
        [1, 2],
        [3, 4],
        [5, 6],
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
      ],
      [1, 2, 3, 4, 5, 6, 7, 8],
    ],
    [
      [
        [1, 2],
        [3, 4],
        [5, 6],
        [1, 2],
        [3, 4],
        [5, 6],
        [1, 7],
      ],
      [1, 2, 3, 4, 5, 6, 7],
    ],
    [[[1, 2, 3, 4, 5, 6, 7]], [1, 2, 3, 4, 5, 6, 7]],
    [[["a"], []], ["a"]],
    [[[], ["a"]], ["a"]],
    [
      [[], ["a"], ["b"]],
      ["a", "b"],
    ],
    [[["a"], ["a"]], ["a"]],
    [
      [
        ["a", "b"],
        ["a", "b"],
      ],
      ["a", "b"],
    ],
    [
      [
        ["a", "b"],
        ["b", "a"],
      ],
      ["a", "b"],
    ],
    [
      [
        ["a", "b"],
        ["a", "a"],
      ],
      ["a", "b"],
    ],
    [
      [
        ["a", "b", "c", "d"],
        ["a", "b", "c", "d"],
      ],
      ["a", "b", "c", "d"],
    ],
    [
      [
        ["a", "b", "c"],
        ["a", "b", "c", "d"],
      ],
      ["a", "b", "c", "d"],
    ],
  ])("%j", (items: unknown[][], result: unknown) => {
    expect(unique(...items)).toEqual(result);
  });
});
