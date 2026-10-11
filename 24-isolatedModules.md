# TypeScript `tsconfig.json` — Practical 24: `isolatedModules`

## Step 1: What Does It Do?

`isolatedModules: true` warns about certain TypeScript patterns that cannot be safely handled when files are transpiled individually.

Tools such as Babel, SWC, and esbuild often transpile files without analyzing the entire TypeScript project.

**Important:** This option does not perform the transpilation itself or replace type checking.

## Step 2: Enable the Option

Add this to `compilerOptions` in your existing `tsconfig.json`:

```
"isolatedModules": true
```

Keep your other settings unchanged.

## Step 3: Create a Practical Example

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
import type { User } from "./user.js";
import { getUser } from "./user.js";

const user: User = getUser();

console.log(user);
```

Notice that `User` is imported using `import type` because it is only a TypeScript type.

## Step 4: Compile and Run

Execute these commands:

```
npx tsc
node dist/index.js
```

Expected output:

```
{ id: 1, name: 'Amit' }
```

## Step 5: Why Is It Useful?

Tools such as Babel and esbuild can transpile each file independently. Some TypeScript features require information about other files, which these tools might not have.

`isolatedModules: true` helps identify certain patterns that could cause problems with single-file transpilation.

It does not replace `strict: true` or guarantee that every transpilation issue will be detected.

## Best Practice

Use `"isolatedModules": true` when working with tools such as Vite, Babel, SWC, or esbuild.

It is especially useful when your build tool transpiles TypeScript separately from the TypeScript compiler's type-checking process.

## Next Lesson: `noUncheckedSideEffectImports`

Learn how TypeScript handles imports that execute a module's side effects without importing a specific value.
