# TypeScript `tsconfig.json` — Practical 14: `exactOptionalPropertyTypes`

## Step 1: What Does It Do?

An optional property (`?`) does not have to be present in an object.

However, these are different:

- Property is missing.
- Property exists with the value `undefined`.

`exactOptionalPropertyTypes: true` helps TypeScript distinguish between them.

## Step 2: Configure `tsconfig.json`

**Important:** `exactOptionalPropertyTypes` requires `strictNullChecks: true`.

Add both options to your existing `compilerOptions`:

```
"strictNullChecks": true,
"exactOptionalPropertyTypes": true
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
    "noUncheckedIndexedAccess": true,
    "strictNullChecks": true,
    "exactOptionalPropertyTypes": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

## Step 3: Test Without the Option

Temporarily remove `exactOptionalPropertyTypes` from your configuration.

Write this in `src/index.ts`:

```
interface User {
  name: string;
  nickname?: string;
}

const user1: User = {
  name: "Amit",
};

const user2: User = {
  name: "Rahul",
  nickname: undefined,
};

console.log(user1);
console.log(user2);
```

Run:

```
npx tsc
node dist/index.js
```

Expected output:

```
{ name: 'Amit' }
{ name: 'Rahul', nickname: undefined }
```

Without the option, TypeScript accepts `nickname: undefined`.

## Step 4: Enable the Option

Add this back to `tsconfig.json`:

```
"exactOptionalPropertyTypes": true
```

Run:

```
npx tsc
```

Expected result: TypeScript reports an error on `nickname: undefined`.

Why? With this option enabled, `nickname?: string` means the property can be omitted, but if present, its value must be a string.

## Step 5: Fix the Error

If the nickname is unavailable, omit the property:

```
interface User {
  name: string;
  nickname?: string;
}

const user1: User = {
  name: "Amit",
};

const user2: User = {
  name: "Rahul",
};

console.log(user1);
console.log(user2);
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
{ name: 'Amit' }
{ name: 'Rahul' }
```

### What If `undefined` Is Allowed?

Explicitly allow it in the type:

```
interface User {
  name: string;
  nickname?: string | undefined;
}
```

Now the property can be omitted or explicitly set to `undefined`.

## Step 6: What Does `strictNullChecks` Do?

With `strictNullChecks: true`, TypeScript treats `null` and `undefined` as distinct from ordinary values.

```
let userName: string = "Amit";

userName = undefined; // Error
```

To allow `undefined`:

```
let userName: string | undefined = "Amit";

userName = undefined; // Allowed
```

**Best practice:** `"strict": true` enables `strictNullChecks` and several other strict checks. We will explore those options individually in later lessons.

## Key Takeaways

- `exactOptionalPropertyTypes` requires `strictNullChecks: true`.
- An omitted property differs from a property explicitly set to `undefined`.
- Use `nickname?: string | undefined` when both behaviors are required.
- Strict checking helps catch mistakes before runtime.

## Next Lesson: `noImplicitReturns`

Learn how TypeScript detects functions that fail to return a value on some code paths.
