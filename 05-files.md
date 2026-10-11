# TypeScript `tsconfig.json` — Practical 5: `files`

## Goal

Learn how to explicitly specify which TypeScript files belong to a project.

## Step 1: What Does `files` Do?

The `files` option accepts an explicit list of files to include in the TypeScript project.

- `include` discovers files using patterns.
- `files` explicitly lists individual files.

## Step 2: Create a New File

Assume your project already contains:

```
typescript/
├── src/
│   ├── index.ts
│   ├── user.ts
│   └── utils/
│       └── message.ts
├── dist/
└── tsconfig.json
```

Create `config.ts` in the project root:

```
const appName: string = "TypeScript Learning";

console.log(appName);
```

## Step 3: Update `tsconfig.json`

For this experiment, use:

```
{
  "compilerOptions": {
    "rootDir": ".",
    "outDir": "./dist"
  },
  "files": [
    "config.ts"
  ]
}
```

Here, `rootDir` is `"."` because `config.ts` is located in the project root. Setting it to `"./src"` would cause an error because `config.ts` is outside that directory.

## Step 4: Compile the Project

Run:

```
npx tsc
```

Expected result: Compilation succeeds.

Run:

```
find dist -type f
```

Expected output for this clean experiment:

```
dist/config.js
```

If other files already exist in `dist/`, they may also appear.

Run the generated JavaScript:

```
node dist/config.js
```

Output:

```
TypeScript Learning
```

**Important:** If `config.ts` imports other TypeScript files, those dependencies can also be included in compilation.

## Step 5: Experiment with an Empty `files` Array

Update `tsconfig.json`:

```
{
  "compilerOptions": {
    "rootDir": ".",
    "outDir": "./dist"
  },
  "files": []
}
```

Run:

```
npx tsc
```

Expected result: Compilation succeeds without compiling any source files, assuming there are no other configuration issues.

Check the output:

```
find dist -type f
```

The old `dist/config.js` may still exist because TypeScript does not automatically delete previously generated files.

To verify the empty build cleanly, remove the output directory before compiling:

```
rm -rf dist
npx tsc
find dist -type f
```

Expected result: `dist/` will not be created by this empty compilation, so `find` reports that the directory does not exist.

## Step 6: Best Practice for Node.js Projects

For a typical backend, pattern-based discovery is usually more convenient:

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Use `files` when you deliberately want to specify a small, explicit set of entry files.

## Key Takeaways

- `files` explicitly lists project source files.
- `include` discovers files using glob patterns.
- Imported dependencies can still be included when needed.
- An empty `files` array with no `include` means no source files are discovered.
- TypeScript does not automatically clean stale build output.

## Part 1 Complete

You have learned:

1. `rootDir`
2. `outDir`
3. `include`
4. `exclude`
5. `files`

## Next: Part 2 — Environment Settings

We will begin with **`module`**, exploring how TypeScript generates JavaScript modules for Node.js projects.

Save it as `05-files.md` in your documentation folder.