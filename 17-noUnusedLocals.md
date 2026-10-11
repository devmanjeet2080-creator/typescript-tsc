# TypeScript `tsconfig.json` — Practical 17: `noUnusedLocals`

## Step 1: What Does It Do?

`noUnusedLocals: true` reports local variables and other declarations that are declared but never used.

It helps keep your code clean and easier to maintain.

## Step 2: Test Without the Option

Write this code in `src/index.ts`:

```
function getUserName(): string {
  const userName = "Amit";
  const userAge = 25;

  return userName;
}

console.log(getUserName());
```

Compile:

```
npx tsc
```

Without `noUnusedLocals`, TypeScript normally does not report an error for the unused `userAge` variable.

## Step 3: Enable the Option

Add this to `compilerOptions` in `tsconfig.json`:

```
"noUnusedLocals": true
```

Compile again:

```
npx tsc
```

Expected error:

```
'userAge' is declared but its value is never read.
```

TypeScript detects that `userAge` is declared but never used.

## Step 4: Fix the Error

If you do not need the variable, remove it:

```
function getUserName(): string {
  const userName = "Amit";

  return userName;
}

console.log(getUserName());
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Amit
```

Alternatively, if you need `userAge`, use it:

```
function getUserName(): string {
  const userName = "Amit";
  const userAge = 25;

  console.log("User age:", userAge);

  return userName;
}

console.log(getUserName());
```

Expected output:

```
User age: 25
Amit
```

## Step 5: Real-World Use

In a Node.js backend, unused variables can remain after refactoring or when you change your API logic.

`noUnusedLocals: true` helps identify these leftovers during compilation.

**Best practice:** Enable this option to keep your code clean and maintainable.

## Key Takeaway

- `noUnusedLocals: true` reports unused local declarations.
- Remove unnecessary variables or use them where needed.
- It helps catch leftover code during development.

## Next Lesson: `noUnusedParameters`

Learn how TypeScript detects unused function parameters.
