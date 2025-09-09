# Effective TypeScript

Resources associated with the book ['Effective TypeScript'](https://effectivetypescript.com/)

## Chapter 1 - Getting to Know TypeScript
- [Item 1: Understand the Relationship Between TypeScript and JavaScript][ref-item-001]
- [Item 2: Know Which TypeScript Options You're Using][ref-item-002]
- [Item 3: Understand That Code Generation Is Independent of Types][ref-item-003]
- [Item 4: Get Comfortable with Structural Typing][ref-item-004]
- [Item 5: Limit Use of the `any` Type][ref-item-005]

## Chapter 2 - The TypeScript Type System
- [Item 6: Use Your Editor to Interrogate and Explore the Type System][ref-item-006]
- [Item 7: Think of Types as Sets of Values][ref-item-007]
- [Item 8: Know How to Tell Whether a Symbol Is in the Type Space or Value Space][ref-item-008]
- [Item 9: Prefer Type Annotations to Type Assertions][ref-item-009]
- [Item 10: Avoid Object Wrapper Types][ref-item-010]
- [Item 11: Distinguish Excess Property Checking from Type Checking][ref-item-011]
- [Item 12: Apply Types to Entire Function Expressions When Possible][ref-item-012]
- [Item 13: Know the Differences Between Type and Interface][ref-item-013]
- [Item 14: Use `readonly` to Avoid Errors Associated with Mutation][ref-item-014]
- [Item 15: Use Type Operations and Generic Types to Avoid Repeating Yourself][ref-item-015]
- [Item 16: Prefer More Precise Alternatives to Index Signatures][ref-item-016]
- [Item 17: Avoid Numeric Index Signatures][ref-item-017]

## Chapter 3 - Type Inference and Control Flow Analysis
- [Item 18: Avoid Cluttering Your Code with Inferable Types][ref-item-018]
- [Item 19: Use Different Variables for Different Types][ref-item-019]
- [Item 20: Understand How a Variable Gets Its Type][ref-item-020]
- [Item 21: Create Objects All at Once][ref-item-021]
- [Item 22: Understand Type Narrowing][ref-item-022]
- [Item 23: Be Consistent in Your Use of Aliases][ref-item-023]
- [Item 24: Understand How Context Is Used in Type Inference][ref-item-024]
- [Item 25: Understand Evolving Types][ref-item-025]
- [Item 26: Use Functional Constructs and Libraries to Help Types Flow][ref-item-026]
- [Item 27: Use `async` Functions Instead of Callbacks to Improve Type Flow][ref-item-027]
- [Item 28: Use Classes and Currying to Create New Inference Sites][ref-item-028]

## 4. Type Design
- [Item 29: Prefer Types That Always Represent Valid States][ref-item-029]
- [Item 30: Be Liberal in What You Accept and Strict in What You Produce][ref-item-030]
- [Item 31: Don't Repeat Type Information in Documentation][ref-item-031]
- [Item 32: Avoid Including `null` or `undefined` in Type Aliases][ref-item-032]
- [Item 33: Push Null Values to the Perimeter of Your Types][ref-item-033]
- [Item 34: Prefer Unions of Interfaces to Interfaces with Unions][ref-item-034]
- [Item 35: Prefer More Precise Alternatives to String Types][ref-item-035]
- [Item 36: Use a Distinct Type for Special Values][ref-item-036]
- [Item 37: Limit the Use of Optional Properties][ref-item-037]
- [Item 38: Avoid Repeated Parameters of the Same Type][ref-item-038]
- [Item 39: Prefer Unifying Types to Modeling Differences][ref-item-039]
- [Item 40: Prefer Imprecise Types to Inaccurate Types][ref-item-040]
- [Item 41: Name Types Using the Language of Your Problem Domain][ref-item-041]
- [Item 42: Avoid Types Based on Anecdotal Data][ref-item-042]

## Chapter 5 - Unsoundness and the `any` Type
- [Item 43: Use the Narrowest Possible Scope for `any` Types][ref-item-043]
- [Item 44: Prefer More Precise Variants of `any` to Plain `any`][ref-item-044]
- [Item 45: Hide Unsafe Type Assertions in Well-Typed Functions][ref-item-045]
- [Item 46: Use `unknown` Instead of `any` for Values with an Unknown Type][ref-item-046]
- [Item 47: Prefer Type-Safe Approaches to Monkey Patching][ref-item-047]
- [Item 48: Avoid Soundness Traps][ref-item-048]
- [Item 49: Track Your Type Coverage to Prevent Regressions in Type Safety][ref-item-049]

## Chapter 6 - Generics and Type-Level Programming
- [Item 50: Think of Generics as Functions Between Types][ref-item-050]
- [Item 51: Avoid Unnecessary Type Parameters][ref-item-051]
- [Item 52: Prefer Conditional Types to Overload Signatures][ref-item-052]
- [Item 53: Know How to Control the Distribution of Unions over Conditional Types][ref-item-053]
- [Item 54: Use Template Literal Types to Model DSLs and Relationships Between Strings][ref-item-054]
- [Item 55: Write Tests for Your Types][ref-item-055]
- [Item 56: Pay Attention to How Types Display][ref-item-056]
- [Item 57: Prefer Tail-Recursive Generic Types][ref-item-057]
- [Item 58: Consider Codegen as an Alternative to Complex Types][ref-item-058]

## Chapter 7 - TypeScript Recipes
- [Item 59: Use `never` Types to Perform Exhaustiveness Checking][ref-item-059]
- [Item 60: Know How to Iterate Over Objects][ref-item-060]
- [Item 61: Use Record Types to Keep Values in Sync][ref-item-061]
- [Item 62: Use Rest Parameters and Tuple Types to Model Variadic Functions][ref-item-062]
- [Item 63: Use Optional Never Properties to Model Exclusive Or][ref-item-063]
- [Item 64: Consider Brands for Nominal Typing][ref-item-064]

## Chapter 8 - Type Declarations and `@types`
- [Item 65: Put TypeScript and `@types` in `devDependencies`][ref-item-065]
- [Item 66: Understand the Three Versions Involved in Type Declarations][ref-item-066]
- [Item 67: Export All Types That Appear in Public APIs][ref-item-067]
- [Item 68: Use TSDoc for API Comments][ref-item-068]
- [Item 69: Provide a Type for this in Callbacks if It's Part of Their API][ref-item-069]
- [Item 70: Mirror Types to Sever Dependencies][ref-item-070]
- [Item 71: Use Module Augmentation to Improve Types][ref-item-071]

## Chapter 9 - Writing and Running Your Code
- [Item 72: Prefer ECMAScript Features to TypeScript Features][ref-item-072]
- [Item 73: Use Source Maps to Debug TypeScript][ref-item-073]
- [Item 74: Know How to Reconstruct Types at Runtime][ref-item-074]
- [Item 75: Understand the DOM Hierarchy][ref-item-075]
- [Item 76: Create an Accurate Model of Your Environment][ref-item-076]
- [Item 77: Understand the Relationship Between Type Checking and Unit Testing][ref-item-077]
- [Item 78: Pay Attention to Compiler Performance][ref-item-078]

## Chapter 10 - Modernisation and Migration
- [Item 79: Write Modern JavaScript][ref-item-079]
- [Item 80: Use `@ts-check` and JSDoc to Experiment with TypeScript][ref-item-080]
- [Item 81: Use `allowJs` to Mix TypeScript and JavaScript][ref-item-081]
- [Item 82: Convert Module by Module Up Your Dependency Graph][ref-item-082]
- [Item 83: Don't Consider Migration Complete Until You Enable `noImplicitAny`][ref-item-083]


<!-- References -->
[ref-item-001]: 01-getting-to-know-typescript/001-understand-the-relationship-between-typescript-and-javascript.md
[ref-item-002]: 01-getting-to-know-typescript/002-know-which-typescript-options-youre-using.md
[ref-item-003]: 01-getting-to-know-typescript/003-understand-that-code-generation-is-independent-of-types.md
[ref-item-004]: 01-getting-to-know-typescript/004-get-comfortable-with-structural-typing.md
[ref-item-005]: 01-getting-to-know-typescript/005-limit-use-of-the-any-type.md
[ref-item-006]: 02-the-typescript-type-system/006-use-your-editor-to-interrogate-and-explore-the-type-system.md
[ref-item-007]: 02-the-typescript-type-system/007-think-of-types-as-sets-of-values.md
[ref-item-008]: 02-the-typescript-type-system/008-know-how-to-tell-whether-a-symbol-is-in-the-type-space-or-value-space.md
[ref-item-009]: 02-the-typescript-type-system/009-prefer-type-annotations-to-type-assertions.md
[ref-item-010]: 02-the-typescript-type-system/010-avoid-object-wrapper-types.md
[ref-item-011]: 02-the-typescript-type-system/011-distinguish-excess-property-checking-from-type-checking.md
[ref-item-012]: 02-the-typescript-type-system/012-apply-types-to-entire-function-expressions-when-possible.md
[ref-item-013]: 02-the-typescript-type-system/013-know-the-differences-between-type-and-interface.md
[ref-item-014]: 02-the-typescript-type-system/014-use-readonly-to-avoid-errors-associated-with-mutation.md
[ref-item-015]: 02-the-typescript-type-system/015-use-type-operations-and-generic-types-to-avoid-repeating-yourself.md
[ref-item-016]: 02-the-typescript-type-system/016-prefer-more-precise-alternatives-to-index-signatures.md
[ref-item-017]: 02-the-typescript-type-system/017-avoid-numeric-index-signatures.md
[ref-item-018]: 03-type-inference-and-control-flow-analysis/018-avoid-cluttering-your-code-with-inferable-types.md
[ref-item-019]: 03-type-inference-and-control-flow-analysis/019-use-different-variables-for-different-types.md
[ref-item-020]: 03-type-inference-and-control-flow-analysis/020-understand-how-a-variable-gets-its-type.md
[ref-item-021]: 03-type-inference-and-control-flow-analysis/021-create-objects-all-at-once.md
[ref-item-022]: 03-type-inference-and-control-flow-analysis/022-understand-type-narrowing.md
[ref-item-023]: 03-type-inference-and-control-flow-analysis/023-be-consistent-in-your-use-of-aliases.md
[ref-item-024]: 03-type-inference-and-control-flow-analysis/024-understand-how-context-is-used-in-type-inference.md
[ref-item-025]: 03-type-inference-and-control-flow-analysis/025-understand-evolving-types.md
[ref-item-026]: 03-type-inference-and-control-flow-analysis/026-use-functional-constructs-and-libraries-to-help-types-flow.md
[ref-item-027]: 03-type-inference-and-control-flow-analysis/027-use-async-functions-instead-of-callbacks-to-improve-type-flow.md
[ref-item-028]: 03-type-inference-and-control-flow-analysis/028-use-classes-and-currying-to-create-new-inference-sites.md
[ref-item-029]: 04-type-design/029-prefer-types-that-always-represent-valid-states.md
[ref-item-030]: 04-type-design/030-be-liberal-in-what-you-accept-and-strict-in-what-you-produce.md
[ref-item-031]: 04-type-design/031-dont-repeat-type-information-in-documentation.md
[ref-item-032]: 04-type-design/032-avoid-including-null-or-undefined-in-type-aliases.md
[ref-item-033]: 04-type-design/033-push-null-values-to-the-perimeter-of-your-types.md
[ref-item-034]: 04-type-design/034-prefer-unions-of-interfaces-to-interfaces-with-unions.md
[ref-item-035]: 04-type-design/035-prefer-more-precise-alternatives-to-string-types.md
[ref-item-036]: 04-type-design/036-use-a-distinct-type-for-special-values.md
[ref-item-037]: 04-type-design/037-limit-the-use-of-optional-properties.md
[ref-item-038]: 04-type-design/038-avoid-repeated-parameters-of-the-same-type.md
[ref-item-039]: 04-type-design/039-prefer-unifying-types-to-modeling-differences.md
[ref-item-040]: 04-type-design/040-prefer-imprecise-types-to-inaccurate-types.md
[ref-item-041]: 04-type-design/041-name-types-using-the-language-of-your-problem-domain.md
[ref-item-042]: 04-type-design/042-avoid-types-based-on-anecdotal-data.md
[ref-item-043]: 05-unsoundness-and-the-any-type/043-use-the-narrowest-possible-scope-for-any-types.md
[ref-item-044]: 05-unsoundness-and-the-any-type/044-prefer-more-precise-variants-of-any-to-plain-any.md
[ref-item-045]: 05-unsoundness-and-the-any-type/045-hide-unsafe-type-assertions-in-well-typed-functions.md
[ref-item-046]: 05-unsoundness-and-the-any-type/046-use-unknown-instead-of-any-for-values-with-an-unknown-type.md
[ref-item-047]: 05-unsoundness-and-the-any-type/047-prefer-type-safe-approaches-to-monkey-patching.md
[ref-item-048]: 05-unsoundness-and-the-any-type/048-avoid-soundness-traps.md
[ref-item-049]: 05-unsoundness-and-the-any-type/049-track-your-type-coverage-to-prevent-regressions-in-type-safety.md
[ref-item-050]: 06-generics-and-type-level-programming/050-think-of-generics-as-functions-between-types.md
[ref-item-051]: 06-generics-and-type-level-programming/051-avoid-unnecessary-type-parameters.md
[ref-item-052]: 06-generics-and-type-level-programming/052-prefer-conditional-types-to-overload-signatures.md
[ref-item-053]: 06-generics-and-type-level-programming/053-know-how-to-control-the-distribution-of-unions-over-conditional-types.md
[ref-item-054]: 06-generics-and-type-level-programming/054-use-template-literal-types-to-model-dsls-and-relationships-between-strings.md
[ref-item-055]: 06-generics-and-type-level-programming/055-write-tests-for-your-types.md
[ref-item-056]: 06-generics-and-type-level-programming/056-pay-attention-to-how-types-display.md
[ref-item-057]: 06-generics-and-type-level-programming/057-prefer-tail-recursive-generic-types.md
[ref-item-058]: 06-generics-and-type-level-programming/058-consider-codegen-as-an-alternative-to-complex-types.md
[ref-item-059]: 07-typescript-recipes/059-use-never-types-to-perform-exhaustiveness-checking.md
[ref-item-060]: 07-typescript-recipes/060-know-how-to-iterate-over-objects.md
[ref-item-061]: 07-typescript-recipes/061-use-record-types-to-keep-values-in-sync.md
[ref-item-062]: 07-typescript-recipes/062-use-rest-parameters-and-tuple-types-to-model-variadic-functions.md
[ref-item-063]: 07-typescript-recipes/063-use-optional-never-properties-to-model-exclusive-or.md
[ref-item-064]: 07-typescript-recipes/064-consider-brands-for-nominal-typing.md
[ref-item-065]: 08-type-declarations-and-at-types/065-put-typescript-and-types-in-devdependencies.md
[ref-item-066]: 08-type-declarations-and-at-types/066-understand-the-three-versions-involved-in-type-declarations.md
[ref-item-067]: 08-type-declarations-and-at-types/067-export-all-types-that-appear-in-public-apis.md
[ref-item-068]: 08-type-declarations-and-at-types/068-use-tsdoc-for-api-comments.md
[ref-item-069]: 08-type-declarations-and-at-types/069-provide-a-type-for-this-in-callbacks-if-its-part-of-their-api.md
[ref-item-070]: 08-type-declarations-and-at-types/070-mirror-types-to-sever-dependencies.md
[ref-item-071]: 08-type-declarations-and-at-types/071-use-module-augmentation-to-improve-types.md
[ref-item-072]: 09-writing-and-running-your-code/072-prefer-ecmascript-features-to-typescript-features.md
[ref-item-073]: 09-writing-and-running-your-code/073-use-source-maps-to-debug-typescript.md
[ref-item-074]: 09-writing-and-running-your-code/074-know-how-to-reconstruct-types-at-runtime.md
[ref-item-075]: 09-writing-and-running-your-code/075-understand-the-dom-hierarchy.md
[ref-item-076]: 09-writing-and-running-your-code/076-create-an-accurate-model-of-your-environment.md
[ref-item-077]: 09-writing-and-running-your-code/077-understand-the-relationship-between-type-checking-and-unit-testing.md
[ref-item-078]: 09-writing-and-running-your-code/078-pay-attention-to-compiler-performance.md
[ref-item-079]: 10-modernisation-and-migration/079-write-modern-javascript.md
[ref-item-080]: 10-modernisation-and-migration/080-use-ts-check-and-jsdoc-to-experiment-with-typescript.md
[ref-item-081]: 10-modernisation-and-migration/081-use-allowjs-to-mix-typescript-and-javascript.md
[ref-item-082]: 10-modernisation-and-migration/082-convert-module-by-module-up-your-dependency-graph.md
[ref-item-083]: 10-modernisation-and-migration/083-dont-consider-migration-complete-until-you-enable-noimplicitany.md
