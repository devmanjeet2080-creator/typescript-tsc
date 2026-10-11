Here’s the ready-to-save Markdown file for Practical 3: `include`, with corrected commands and expected outputs.

Writing

# TypeScript `tsconfig.json` — Practical 3: `include`

## Goal

Learn how to control which TypeScript files the compiler includes in a project.

## Step 1: What Does `include` Do?

The `include` option specifies which files TypeScript should include in compilation.

Example project structure:

```
typescript/
├── src/
│   ├── index.ts
│   └── user.ts
├── tests/
│   └── user.test.ts
└── tsconfig.json
```

Suppose we want to compile files inside `src/`, but not include test files from `tests/`.

## Step 2: Update `tsconfig.json`

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"]
}
```

The pattern `src/**/*.ts` matches TypeScript files inside `src/`, including files in nested directories.

## Step 3: Create a New File

Create `src/user.ts`:

```
export const getUserName = (): string => {
  return "Rahul";
};
```

Compile:

```
npx tsc
```

Check the output:

```
ls dist
```

Expected output:

```
index.js
user.js
```

The listing order may vary.

## Step 4: Experiment with Nested Folders

Create the directory:

```
mkdir -p src/utils
```

Create `src/utils/message.ts`:

```
export const getMessage = (): string => {
  return "Hello from utils";
};
```

Compile again:

```
npx tsc
```

Check the generated files:

```
ls dist/utils
```

Expected output:

```
message.js
```

The compiled file is generated at `dist/utils/message.js` because the source file is inside `src/utils/`.

## Step 5: Verify the Complete Output

Run:

```
find dist -type f
```

Expected files:

```
dist/index.js
dist/user.js
dist/utils/message.js
```

The exact listing order may vary.

## Key Takeaways

- `include` controls which files are included in the TypeScript project.
- `src/**/*.ts` matches `.ts` files throughout `src/`, including nested folders.
- `rootDir` controls the source root and constrains the directory structure of emitted files.
- `outDir` specifies where compiled files are written.
- `include` and `rootDir` have different responsibilities.

**Best practice:** For a typical Node.js backend, `"include": ["src/**/*.ts"]` makes the intended source scope explicit.
