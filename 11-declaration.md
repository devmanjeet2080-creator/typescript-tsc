# TypeScript `tsconfig.json` — Practical 11: `declaration`

## Step 1: What Does `declaration` Do?

The `declaration` option tells TypeScript whether to generate `.d.ts` files alongside compiled JavaScript.

- `.ts` — source code and implementation.
- `.js` — executable JavaScript.
- `.d.ts` — type information for other TypeScript files and projects.

Declaration files are especially useful when building reusable libraries and SDKs.

## Step 2: Create a TypeScript Function

Create or update `src/utils/message.ts`:

```
export function getMessage(name: string): string {
  return `Hello, ${name}!`;
}
```

## Step 3: Test with `declaration: false`

In `tsconfig.json`, set:

```
"declaration": false
```

Compile:

```
npx tsc
find dist -type f
```

Expected output for this file:

```
dist/utils/message.js
```

No `message.d.ts` file is generated.

## Step 4: Enable `declaration: true`

Update `tsconfig.json`:

```
"declaration": true
```

Compile again:

```
npx tsc
find dist -type f
```

Expected output includes:

```
dist/utils/message.js
dist/utils/message.d.ts
```

Other compiled files may also appear, depending on your project.

## Step 5: Inspect the Declaration File

Run:

```
cat dist/utils/message.d.ts
```

Expected output:

```
export declare function getMessage(name: string): string;
```

### Understand the Output

- `getMessage` is an exported function.
- It accepts a `string` parameter named `name`.
- It returns a `string`.
- `declare` describes the function's type; its implementation remains in the JavaScript file.

## Step 6: Test the Function

In `src/index.ts`, write:

```
import { getMessage } from "./utils/message.js";

console.log(getMessage("Amit"));
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Hello, Amit!
```

The JavaScript executes the function, while the declaration file provides its type information.

## Step 7: Real-World Use

When you publish a reusable TypeScript library, `.d.ts` files help consumers and their editors understand your exported functions, parameters, and return types.

**Best practice:**

- Regular Node.js applications may not need declaration files.
- Reusable TypeScript libraries and SDKs often benefit from `"declaration": true`.

## Key Takeaway

`declaration: true` generates `.d.ts` files containing type information about your exported code.

## Next Lesson: `declarationMap`

We will learn how to connect generated declaration files back to their original TypeScript source files.

