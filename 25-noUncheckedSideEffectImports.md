# TypeScript `tsconfig.json` — Practical 25: `noUncheckedSideEffectImports`

## Step 1: What Does It Do?

A side-effect import loads a module to execute its code without importing a specific function or variable.

For example:

```
import "./setup.js";
```

`noUncheckedSideEffectImports: true` helps TypeScript report unresolved side-effect imports.

## Step 2: Enable the Option

Add this to `compilerOptions` in your existing `tsconfig.json`:

```
"noUncheckedSideEffectImports": true
```

Keep your other settings unchanged.

## Step 3: Create a Working Example

Create `src/setup.ts`:

```
console.log("Setup module loaded");
```

Now update `src/index.ts`:

```
import "./setup.js";

console.log("Application started");
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Setup module loaded
Application started
```

The setup module executes first because `index.ts` imports it.

## Step 4: Test an Invalid Import

Change `src/index.ts` to:

```
import "./missing.js";

console.log("Application started");
```

Compile:

```
npx tsc
```

Expected result: TypeScript reports an error because it cannot resolve `./missing.js`.

**Note:** The file does not exist, so compilation should fail. Restore the valid import before continuing.

## Step 5: When Is It Useful?

- Detecting misspelled or unresolved side-effect import paths.
- Loading initialization or registration modules.
- Checking imports in modern TypeScript projects.

If your project imports CSS or other assets, you may need appropriate declarations or tool-specific configuration.

## Best Practice

Use `"noUncheckedSideEffectImports": true` to catch unresolved side-effect imports early. Remember that it does not guarantee every imported module will work correctly at runtime.

## Next Lesson: `moduleDetection`

Learn how TypeScript determines whether a file is a module or a global script.
