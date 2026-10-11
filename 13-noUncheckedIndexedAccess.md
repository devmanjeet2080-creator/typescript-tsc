# TypeScript `tsconfig.json` — Practical 13: `noUncheckedIndexedAccess`

## Step 1: What Does It Do?

`noUncheckedIndexedAccess: true` makes TypeScript account for the possibility that an array index or object key might not exist.

This helps prevent runtime errors caused by accessing missing values.

## Step 2: Test Without the Option

In `src/index.ts`, write:

```
const users: string[] = ["Amit", "Rahul"];

const user = users[5];

console.log(user.toUpperCase());
```

Ensure this option is absent from `tsconfig.json`.

Compile and run:

```
npx tsc
node dist/index.js
```

Compilation succeeds, but execution throws a runtime error similar to:

```
TypeError: Cannot read properties of undefined (reading 'toUpperCase')
```

**Why?** The array contains only two elements. Index `5` does not exist, so `user` is `undefined`.

## Step 3: Enable the Option

Add this to `compilerOptions` in `tsconfig.json`:

```
"noUncheckedIndexedAccess": true
```

For example:

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "NodeNext",
    "target": "ESNext",
    "types": ["node"],
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Compile:

```
npx tsc
```

Expected result: TypeScript reports an error at:

```
console.log(user.toUpperCase());
```

The error occurs because `user` has the type `string | undefined`. TypeScript cannot guarantee that the requested element exists.

## Step 4: Fix the Error Safely

Update `src/index.ts`:

```
const users: string[] = ["Amit", "Rahul"];

const user = users[5];

if (user !== undefined) {
  console.log(user.toUpperCase());
} else {
  console.log("User not found");
}
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
User not found
```

## Step 5: Key Takeaways

- Without this option, TypeScript may assume an indexed array value exists when it cannot guarantee that.
- With this option enabled, indexed access accounts for `undefined`.
- Check the value before using methods such as `.toUpperCase()`.
- The option also affects indexed access to object properties when their presence is not guaranteed.

## Best Practice

For Node.js backends, this option is useful when working with arrays, dynamic object keys, API responses, and other data where a requested value might be missing.

**Next lesson:** `exactOptionalPropertyTypes` — understand the difference between omitting an optional property and explicitly assigning `undefined`.
