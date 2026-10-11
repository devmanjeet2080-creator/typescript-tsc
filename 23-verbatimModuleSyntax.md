# TypeScript `tsconfig.json` — Practical 23: `verbatimModuleSyntax`

## Step 1: What Does It Do?

`verbatimModuleSyntax: true` makes the distinction between runtime imports and type-only imports explicit.

- `import` — imports runtime values such as functions.
- `import type` — imports types that are removed from the JavaScript output.

## Step 2: Create the Example

Create `src/user.ts`:

```
export interface User {
  id: number;
  name: string;
}

export function getUser(): User {
  return {
    id: 1,
    name: "Amit",
  };
}
```

Now create `src/index.ts`:

```
import { User, getUser } from "./user.js";

const user: User = getUser();

console.log(user);
```

Here, `User` is a type, while `getUser` is a runtime function.

## Step 3: Enable the Option

Add this to `compilerOptions` in `tsconfig.json`:

```
"verbatimModuleSyntax": true
```

Compile:

```
npx tsc
```

Expected result: TypeScript reports an error because `User` is used only as a type but is imported using a regular import.

## Step 4: Fix the Import

Update `src/index.ts`:

```
import { getUser } from "./user.js";
import type { User } from "./user.js";

const user: User = getUser();

console.log(user);
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
{ id: 1, name: 'Amit' }
```

## Step 5: Understand the Difference

**Runtime import:**

```
import { getUser } from "./user.js";
```

The function is needed when the JavaScript runs.

**Type-only import:**

```
import type { User } from "./user.js";
```

The interface is needed only for type checking, so this import is removed from the JavaScript output.

## Best Practice

Use `"verbatimModuleSyntax": true` in modern TypeScript projects to make imports explicit and predictable. With `module: "NodeNext"`, also ensure your imports and exports match your package's ESM or CommonJS configuration.

## Next Lesson: `isolatedModules`

Learn how to keep TypeScript code compatible with tools that transpile each file independently.
