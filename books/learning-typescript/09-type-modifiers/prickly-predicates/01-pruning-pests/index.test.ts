import { describe, expect, it, test } from "@jest/globals";
import { expectType } from "tsd";

import * as index from "./index";

const { isCropName } = index;

describe(isCropName, () => {
	describe("types", () => {
		test("function type", () => {
			expectType<(name: string) => name is keyof typeof index.cropFamilies>(
				isCropName,
			);
		});
	});

	it.each([
		["", false],
		["dandelion", false],
		["purslane", false],
		["cactus", true],
		["cassava", true],
		["chia", true],
	])("when given %j, returns %j", (input, expected) => {
		expect(isCropName(input)).toBe(expected);
	});
});
