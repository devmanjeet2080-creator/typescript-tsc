# TypeScript `tsconfig.json` — Practical 2: `outDir`

## Goal

Learn how to keep TypeScript source files separate from compiled JavaScript files.

## Step 1: What Does `outDir` Do?

The `outDir` option specifies the directory where TypeScript writes compiled JavaScript files.

Without `outDir`, JavaScript files are generally generated alongside their TypeScript source files.

Best practice is to keep source code in `src/` and compiled output in `dist/`.

## Step 2: Update `tsconfig.json`

Replace your configuration with:

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

## Step 3: Remove the Old JavaScript File

Delete the previously generated JavaScript file:

```
rm src/index.js
```

Now compile the project:

```
npx tsc
```

Expected result: Compilation succeeds without errors.

Project structure:

```
typescript/
├── src/
│   └── index.ts
├── dist/
│   └── index.js
├── package.json
└── tsconfig.json
```

**Note:** TypeScript does not automatically clean old output files from previous builds. We manually removed `src/index.js` because it was generated before `outDir` was configured.

## Step 4: Run the Generated JavaScript

Execute:

```
node dist/index.js
```

Expected output:

```
Amit
```

## Step 5: Verify the Directories

Run:

```
ls src
ls dist
```

Expected output:

First command (`ls src`):

```
index.ts
```

Second command (`ls dist`):

```
index.js
```

The commands produce separate outputs because each lists a different directory.

## Step 6: Add `dist` to `.gitignore`

Create or update `.gitignore`:

```
dist/
node_modules/
```

This prevents generated build files and installed dependencies from being committed to Git by default.

## Key Takeaways

- `rootDir` defines the source root.
- `outDir` specifies where compiled JavaScript is emitted.
- Keeping `src/` and `dist/` separate makes projects easier to maintain.
- TypeScript does not automatically delete stale output files.
