# TypeScript `tsconfig.json` — Practical 15: `noImplicitReturns`

## Step 1: Understand the Problem

Write this code in `src/index.ts`:

```
function getUserRole(isAdmin: boolean): string | undefined {
  if (isAdmin) {
    return "Admin";
  }
}

console.log(getUserRole(true));
console.log(getUserRole(false));
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Admin
undefined
```

When `isAdmin` is `false`, the function finishes without returning a value, so JavaScript returns `undefined`.

## Step 2: Enable `noImplicitReturns`

Add this option to `compilerOptions` in `tsconfig.json`:

```
"noImplicitReturns": true
```

Compile:

```
npx tsc
```

Expected result: TypeScript reports an error because the function does not explicitly return a value on every code path.

## Step 3: Fix the Error

Update `src/index.ts`:

```
function getUserRole(isAdmin: boolean): string {
  if (isAdmin) {
    return "Admin";
  }

  return "User";
}

console.log(getUserRole(true));
console.log(getUserRole(false));
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Admin
User
```

Now both code paths return a string.

## Step 4: Real-World Use

Imagine a function that determines a user's account status. If you accidentally forget to return a status for one condition, `noImplicitReturns` can catch the mistake during compilation.

**Important:** This option does not require every function to return a value. It checks functions for inconsistent return behavior when a return value is expected.

## Key Takeaways

- `noImplicitReturns: true` helps catch missing return statements.
- Every relevant code path should return an appropriate value.
- Fix the problem by handling all possible conditions explicitly.

## Next Lesson: `noImplicitOverride`

Learn how TypeScript helps prevent mistakes when overriding methods in inherited classes.
