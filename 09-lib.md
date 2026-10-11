Here’s the ready-to-save Markdown file for Practical 9: `"lib"`, with corrected examples and expected outputs.

Writing

# TypeScript `tsconfig.json` — Practical 9: `lib`

## Goal

Understand how TypeScript provides type definitions for JavaScript built-ins and environment-specific APIs.

## Step 1: What Does `lib` Do?

The `lib` option specifies which built-in library type definitions TypeScript makes available.

Examples:

- `Promise` — asynchronous operations.
- `Map` and `Set` — data structures.
- `Array` — array methods.
- `document` and `window` — browser DOM APIs.

**Important:** `lib` provides type definitions; it does not install APIs or make them available at runtime.

## Step 2: Configure `lib`

Update `tsconfig.json`:

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "NodeNext",
    "target": "ESNext",
    "types": ["node"],
    "lib": ["ESNext"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

`ESNext` provides the latest ECMAScript library definitions supported by your installed TypeScript version.

## Step 3: Write Practical Code

Replace `src/index.ts` with:

```
const userNames: string[] = ["Amit", "Rahul", "Neha"];

const uniqueNames = new Set(userNames);

const userMap = new Map<number, string>();

userMap.set(1, "Amit");
userMap.set(2, "Rahul");

const message: Promise<string> =
  Promise.resolve("Hello TypeScript");

console.log([...uniqueNames]);
console.log(userMap.get(1));

message.then((result) => {
  console.log(result);
});
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
[ 'Amit', 'Rahul', 'Neha' ]
Amit
Hello TypeScript
```

This demonstrates the use of `Set`, `Map`, and `Promise`.

## Step 4: Understand Browser vs. Node.js APIs

Add this line to `src/index.ts`:

```
console.log(document.title);
```

Compile:

```
npx tsc
```

Expected result: A TypeScript error similar to:

```
Cannot find name 'document'.
```

This happens because `document` belongs to the browser DOM API, which is not included in `lib: ["ESNext"]`.

For browser projects, you can use:

```
"lib": ["ESNext", "DOM", "DOM.Iterable"]
```

For a Node.js-only backend, you generally do not need DOM definitions.

**Important:** Adding `"DOM"` provides TypeScript types for browser APIs, but it does not make `document` available in Node.js.

Remove the `document.title` line before continuing.

## Step 5: Experiment Without `lib`

Remove the `lib` option from `tsconfig.json`:

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "NodeNext",
    "target": "ESNext",
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Now replace `src/index.ts` with:

```
console.log(typeof document);
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
undefined
```

**Why does this happen?**

- TypeScript chooses default library definitions based on `target` and other compiler settings when `lib` is omitted.
- With `target: "ESNext"`, the default libraries may include DOM definitions, so `document` can compile without an explicit `lib` setting.
- At runtime, Node.js does not normally provide the browser's `document` object, so `typeof document` evaluates to `"undefined"`.

This demonstrates the difference between compile-time types and runtime APIs.

## Step 6: Compare `target` and `lib`

- `target` controls the JavaScript language version TypeScript generates.
- `lib` controls which built-in API type definitions are available during type checking.

These options serve different purposes.

## Best Practice

For a Node.js backend, consider:

```
"lib": ["ESNext"]
```

This explicitly selects ECMAScript library definitions without adding browser DOM types.

However, ensure your actual Node.js runtime supports the APIs your application uses. Type definitions alone do not guarantee runtime compatibility.

## Key Takeaways

- `lib` provides type definitions, not runtime APIs.
- `ESNext` includes modern ECMAScript library definitions.
- Browser APIs such as `document` require DOM types for TypeScript to recognize them.
- Omitting `lib` lets TypeScript choose default libraries.
- Successful compilation does not guarantee an API exists in your runtime.

## Next Lesson: Module Resolution

We will explore how TypeScript resolves imports and finds the corresponding source files and type definitions in Node.js projects.
