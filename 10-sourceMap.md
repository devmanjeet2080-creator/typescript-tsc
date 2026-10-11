# TypeScript `tsconfig.json` — Practical 10: `sourceMap`

## Step 1: What Does `sourceMap` Do?

TypeScript converts `.ts` files into `.js` files.

When an error occurs, Node.js may show the location in the generated JavaScript instead of your original TypeScript code.

Setting `"sourceMap": true` generates a `.js.map` file that connects the JavaScript back to the original TypeScript source.

## Step 2: Configure `tsconfig.json`

Add `sourceMap` to your existing `compilerOptions`:

```
"sourceMap": true
```

Your configuration should include:

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "NodeNext",
    "target": "ESNext",
    "types": ["node"],
    "sourceMap": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

## Step 3: Create a Deliberate Error

Write this code in `src/index.ts`:

```
function calculateTotal(
  price: number,
  quantity: number
): number {
  const total = price * quantity;
  return total;
}

const result = calculateTotal(100, 2);

console.log("Total:", result);

throw new Error("Something went wrong!");
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output (paths and line numbers may vary):

```
Total: 200

Error: Something went wrong!
    at file:///.../dist/index.js:11:7
```

**Problem:** The error points to `dist/index.js`, not directly to your original `src/index.ts` file.

## Step 4: Enable Source Maps

Compile again:

```
npx tsc
```

Check the generated files:

```
find dist -type f
```

Expected files:

```
dist/index.js
dist/index.js.map
```

- `index.js` — compiled JavaScript.
- `index.js.map` — mapping information connecting generated JavaScript to the original TypeScript.

## Step 5: See the Actual Difference

Run Node.js with source-map support enabled:

```
node --enable-source-maps dist/index.js
```

Expected error location (paths and line numbers may vary):

```
Total: 200

Error: Something went wrong!
    at file:///.../src/index.ts:12:7
```

Now the stack trace can point to your original TypeScript file.

### Compare the Results

| Configuration | Error location |
| --- | --- |
| `sourceMap: false` | Usually `dist/index.js` |
| `sourceMap: true` without Node.js source-map support | Usually generated JavaScript locations |
| `sourceMap: true` with `--enable-source-maps` | Can show original TypeScript locations |

## Step 6: Best Practices

- Enable `sourceMap: true` during development.
- Use `node --enable-source-maps` when you want Node.js stack traces mapped to TypeScript.
- Decide whether to publish source maps in production based on your debugging and source-code exposure requirements.
- Remove `throw new Error("Something went wrong!")` after the experiment.

**Important:** `sourceMap` creates mapping information; it does not automatically start a debugger or enable every debugging feature.

## Key Takeaway

`sourceMap` helps you find errors in the TypeScript code you actually write instead of searching through generated JavaScript.

## Next Lesson: `declaration`

We will learn how to generate `.d.ts` files containing TypeScript type declarations.
