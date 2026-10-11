# TypeScript `tsconfig.json` — Practical 21: `strict`

## Step 1: What Does It Do?

`strict: true` enables several strict type-checking options in TypeScript.

It helps catch type errors before your code runs.

## Step 2: Test Without Strict Mode

Write this in `src/index.ts`:

```
function greet(name) {
  return "Hello, " + name.toUpperCase();
}

console.log(greet("Amit"));
console.log(greet(100));
```

Compile:

```
npx tsc
```

Without strict checking, TypeScript may accept this code.

Run it:

```
node dist/index.js
```

Expected output before the error:

```
Hello, AMIT
```

Then Node.js throws a runtime error because `100` is a number and numbers do not have a `toUpperCase()` method.

## Step 3: Enable Strict Mode

Add this to `compilerOptions` in `tsconfig.json`:

```
"strict": true
```

Compile again:

```
npx tsc
```

Expected result: TypeScript reports an error because the `name` parameter implicitly has the `any` type.

## Step 4: Fix the Code

Update `src/index.ts`:

```
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}

console.log(greet("Amit"));
console.log(greet(100));
```

Compile:

```
npx tsc
```

Now TypeScript reports an error on `greet(100)` because the function expects a string.

Remove the invalid call:

```
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}

console.log(greet("Amit"));
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Hello, AMIT
```

## Step 5: What Does `strict: true` Enable?

Some important checks include:

| Option | Purpose |
| --- | --- |
| `strictNullChecks` | Checks `null` and `undefined` separately |
| `noImplicitAny` | Reports parameters and other cases that implicitly use `any` |
| `strictFunctionTypes` | Checks function parameter compatibility more strictly |
| `strictBindCallApply` | Checks arguments passed to `bind()`, `call()` and `apply()` |
| `strictPropertyInitialization` | Checks whether class properties are initialized |
| `noImplicitThis` | Reports `this` expressions with an implicit `any` type |
| `alwaysStrict` | Parses code in strict mode and emits `"use strict"` where applicable |

It also enables checks such as `strictBuiltinIteratorReturn` and `useUnknownInCatchVariables`.

**Important:** `noUnusedLocals`, `noUnusedParameters` and `noImplicitReturns` are not automatically enabled by `strict: true`.

## Best Practice

For Node.js backend projects, `strict: true` is a good default:

```
{
  "compilerOptions": {
    "strict": true
  }
}
```

Keep your existing compiler options; add `strict` rather than replacing your configuration.

## Key Takeaway

`strict: true` enables multiple type-safety checks, helping you catch mistakes during compilation instead of discovering them at runtime.

## Next Lesson: `jsx`

Learn how TypeScript handles JSX syntax used by React and other JSX-based frameworks.
