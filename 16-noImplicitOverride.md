# TypeScript `tsconfig.json` — Practical 16: `noImplicitOverride`

## Step 1: What Does It Do?

When one class extends another, the child class can override a parent class method.

`noImplicitOverride: true` requires you to use the `override` keyword when overriding a parent method. This helps catch inheritance mistakes during refactoring.

## Step 2: Test Without the Option

Write this code in `src/index.ts`:

```
class User {
  getRole(): string {
    return "User";
  }
}

class Admin extends User {
  getRole(): string {
    return "Admin";
  }
}

const admin = new Admin();

console.log(admin.getRole());
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Admin
```

The `Admin` class overrides the `getRole()` method inherited from `User`.

## Step 3: Enable `noImplicitOverride`

Add this to `compilerOptions` in `tsconfig.json`:

```
"noImplicitOverride": true
```

Compile again:

```
npx tsc
```

Expected result: TypeScript reports an error because the overriding method does not use the `override` keyword.

## Step 4: Fix the Error

Update your code:

```
class User {
  getRole(): string {
    return "User";
  }
}

class Admin extends User {
  override getRole(): string {
    return "Admin";
  }
}

const admin = new Admin();

console.log(admin.getRole());
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Admin
```

## Step 5: Test a Real Mistake

Imagine you rename the parent method but forget to update the child class:

```
class User {
  getUserRole(): string {
    return "User";
  }
}

class Admin extends User {
  override getRole(): string {
    return "Admin";
  }
}
```

Run:

```
npx tsc
```

Expected result: TypeScript reports an error because `getRole()` does not exist in the parent class.

The `override` keyword helps catch this mistake during compilation.

## Best Practice

Use `"noImplicitOverride": true` in projects that use classes and inheritance. It makes refactoring safer by ensuring that overridden methods are intentional.

## Key Takeaway

- `override` explicitly marks a method that overrides a parent method.
- `noImplicitOverride: true` requires this keyword for overriding methods.
- TypeScript catches mistakes when a parent method is renamed or removed.

## Next Lesson: `noUnusedLocals`

Learn how TypeScript detects unused variables and declarations.
