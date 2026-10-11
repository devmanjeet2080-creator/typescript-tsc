# TypeScript `tsconfig.json` — Practical 8: `types: ["node"]`

## Goal

Understand how TypeScript loads Node.js type definitions for globals such as `process`, `Buffer`, and `NodeJS`.

## Step 1: What Does `types` Do?

TypeScript needs type definitions to understand APIs provided by Node.js.

The `@types/node` package provides these definitions.

Examples include:

- `process` — information about the running Node.js process.
- `Buffer` — handles binary data.
- `NodeJS` — contains Node.js-specific types and namespaces.

## Step 2: Install Node.js Types

Run:

```
npm install -D @types/node
```

Update `tsconfig.json` by adding `"types": ["node"]` to your existing configuration:

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "NodeNext",
    "target": "ESNext",
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Keep your existing options and avoid duplicating them.

## Step 3: Test Node.js Types

Replace the contents of `src/index.ts` with:

```
console.log("Node environment:", process.version);

const buffer = Buffer.from("Hello TypeScript");

console.log(buffer.toString());
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Node environment: vXX.XX.X
Hello TypeScript
```

`vXX.XX.X` is a placeholder. Your actual Node.js version will appear.

### Understand the Code

- `process.version` returns the running Node.js version.
- `Buffer.from()` creates a buffer from text.
- `buffer.toString()` converts the buffer back into text.

## Step 4: Compare `types` Configurations

### Option A: `"types": []`

```
"types": []
```

Automatically included global declarations from visible `@types` packages are disabled.

### Option B: `"types": ["node"]`

```
"types": ["node"]
```

Node.js type declarations are included in the global type environment.

### Option C: Omit `types`

If `types` is omitted, TypeScript generally includes global declarations from visible `@types` packages automatically.

**Important:** The `types` option does not prevent you from importing packages. It controls which `@types` packages contribute automatically included global declarations.

## Step 5: Practical Experiment

Change the configuration to:

```
"types": []
```

Keep the `src/index.ts` code unchanged and run:

```
npx tsc
```

Expected result: TypeScript reports errors because `process` and `Buffer` are no longer available through automatically included Node.js global type declarations.

Restore:

```
"types": ["node"]
```

Compile again:

```
npx tsc
```

Expected result: Compilation succeeds, assuming the package is installed and the rest of the project is configured correctly.

## Best Practice

For a typical Node.js backend:

```
"types": ["node"]
```

This makes the intended global type environment explicit.

Projects that use both browser and Node.js APIs may need additional configuration depending on their requirements.

## Key Takeaways

- `@types/node` provides Node.js type definitions.
- `types` controls automatically included global type packages.
- `"types": []` disables automatic inclusion of those package globals.
- The `types` setting does not disable ordinary module imports.

## Next Lesson: `lib`

We will learn where TypeScript gets type definitions for built-in APIs such as `Promise`, `Map`, `Set`, and browser APIs such as `document`.
