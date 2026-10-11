# TypeScript `tsconfig.json` — Practical 18: `noUnusedParameters`

## Step 1: What Does It Do?

`noUnusedParameters: true` reports function parameters that are declared but never used.

It helps keep functions clean and prevents unnecessary parameters from remaining in your code.

## Step 2: Test Without the Option

Write this code in `src/index.ts`:

```
function getUserName(userId: number, userName: string): string {
  return userName;
}

console.log(getUserName(101, "Amit"));
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

Without `noUnusedParameters`, TypeScript normally does not report the unused `userId` parameter.

## Step 3: Enable the Option

Add this to `compilerOptions` in `tsconfig.json`:

```
"noUnusedParameters": true
```

Compile again:

```
npx tsc
```

Expected error:

```
'userId' is declared but its value is never read.
```

TypeScript detects that `userId` is never used inside the function.

## Step 4: Fix the Error

**Option A: Remove the unnecessary parameter.**

```
function getUserName(userName: string): string {
  return userName;
}

console.log(getUserName("Amit"));
```

Expected output:

```
Amit
```

**Option B: Use the parameter if it is needed.**

```
function getUserName(userId: number, userName: string): string {
  console.log("User ID:", userId);
  return userName;
}

console.log(getUserName(101, "Amit"));
```

Expected output:

```
User ID: 101
Amit
```

## Step 5: What About the Underscore (`_`)?

TypeScript exempts parameters whose names begin with an underscore from unused-parameter errors.

For example:

```
function getUserName(_userId: number, userName: string): string {
  return userName;
}
```

This is useful when a parameter must remain in the function signature but is intentionally unused.

## Best Practice

Use `"noUnusedParameters": true` to catch unnecessary parameters and keep your functions maintainable.

## Key Takeaway

- Unused parameters can indicate outdated or unnecessary code.
- Remove parameters you do not need.
- Use an underscore prefix when a parameter is intentionally unused.

## Next Lesson: `noFallthroughCasesInSwitch`

Learn how TypeScript detects accidental fallthrough between `switch` cases.
