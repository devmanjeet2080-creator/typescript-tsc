# TypeScript `tsconfig.json` — Practical 19: `noFallthroughCasesInSwitch`

## Step 1: What Does It Do?

In JavaScript, if a `switch` case has no `break`, execution can continue into the next case. This is called **fallthrough**.

`noFallthroughCasesInSwitch: true` helps catch accidental fallthrough between cases.

## Step 2: Test Without the Option

Write this code in `src/index.ts`:

```
const role = "admin";

switch (role) {
  case "admin":
    console.log("Admin dashboard");

  case "user":
    console.log("User dashboard");
    break;

  default:
    console.log("Unknown role");
}
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Admin dashboard
User dashboard
```

**Problem:** The role is `"admin"`, but the `"user"` case also executes because the first case has no `break`.

## Step 3: Enable the Option

Add this to `compilerOptions` in `tsconfig.json`:

```
"noFallthroughCasesInSwitch": true
```

Compile again:

```
npx tsc
```

Expected result: TypeScript reports an error because the `admin` case falls through into the next case.

## Step 4: Fix the Error

Add `break` after the admin case:

```
const role = "admin";

switch (role) {
  case "admin":
    console.log("Admin dashboard");
    break;

  case "user":
    console.log("User dashboard");
    break;

  default:
    console.log("Unknown role");
}
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Admin dashboard
```

## Step 5: Can We Use Multiple Cases Together?

Yes! Multiple cases can intentionally share the same logic:

```
const role = "admin";

switch (role) {
  case "admin":
  case "manager":
    console.log("Management dashboard");
    break;

  case "user":
    console.log("User dashboard");
    break;

  default:
    console.log("Unknown role");
}
```

Expected output:

```
Management dashboard
```

Here, `admin` and `manager` intentionally share the same code. No accidental fallthrough occurs between statements in the cases.

## Best Practice

Use `"noFallthroughCasesInSwitch": true` when handling roles, payment statuses, or other application states. It helps prevent unintended execution of subsequent cases.

## Key Takeaway

- Missing `break` can cause unexpected behavior.
- `noFallthroughCasesInSwitch: true` catches accidental fallthrough.
- Multiple cases can intentionally share logic.

## Next Lesson: `noPropertyAccessFromIndexSignature`

Learn how TypeScript encourages clearer property access when working with objects that have dynamic keys.
