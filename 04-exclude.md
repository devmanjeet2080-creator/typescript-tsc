# TypeScript `tsconfig.json` — Practical 4: `exclude`

## Goal

Learn how to exclude files and directories from TypeScript's automatic file discovery.

## Step 1: What Does `exclude` Do?

The `exclude` option tells TypeScript which files and directories to skip when discovering files through `include`.

Example project structure:

```
typescript/
├── src/
│   ├── index.ts
│   ├── user.ts
│   └── experiments/
│       └── demo.ts
├── dist/
└── tsconfig.json
```

We want TypeScript to compile the regular source files but skip `src/experiments/demo.ts`.

## Step 2: Update `tsconfig.json`

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/experiments"]
}
```

The `exclude` pattern prevents TypeScript from discovering files inside `src/experiments` through the `include` pattern.

## Step 3: Create an Experiment File

Create the directory:

```
mkdir -p src/experiments
```

Create `src/experiments/demo.ts`:

```
const demoMessage: string = "This is an experiment";

console.log(demoMessage);
```

Compile:

```
npx tsc
```

Inspect the generated files:

```
find dist -type f
```

Expected files:

```
dist/index.js
dist/user.js
dist/utils/message.js
```

The listing order may vary. Assuming those existing source files are present, `dist/experiments/demo.js` should **not** be generated.

## Step 4: Important Experiment — `exclude` Is Not a Guarantee

`exclude` does not prevent a file from being compiled if it is imported by another included file.

For example, add this to `src/index.ts`:

```
import { demo } from "./experiments/demo.js";
```

For this import to compile, `src/experiments/demo.ts` must export `demo`, so update that file:

```
export const demo: string = "This is an experiment";
```

Compile again:

```
npx tsc
```

TypeScript can now include the excluded file because it is an imported dependency.

**Important:** This example uses a `.js` import specifier, which TypeScript can resolve to the corresponding `.ts` source file under Node.js-compatible module resolution settings.

Also, `exclude` does not override files explicitly listed in `files`.

## Step 5: Best Practices

A typical configuration might use:

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

Because `include` already restricts discovery to `src/`, test files outside `src/` are not included in the first place.

Keep exclusions aligned with your actual project structure.

## Key Takeaways

- `exclude` affects file discovery through `include`.
- Imported dependencies can still be compiled even if they match an exclusion.
- Files explicitly listed in `files` are not removed by `exclude`.
- `include`, `exclude`, and `files` determine file selection in different ways.
