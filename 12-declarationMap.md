# TypeScript `tsconfig.json` — Practical 12: `declarationMap`

## Step 1: What Does `declarationMap` Do?

In the previous lesson, `declaration: true` generated `.d.ts` files containing type information.

`declarationMap: true` additionally generates `.d.ts.map` files that map declaration files back to their original TypeScript source.

This helps supported editors navigate to the original source when using features such as **Go to Definition**.

## Step 2: Update `tsconfig.json`

Add these options to your existing `compilerOptions`:

```
"declaration": true,
"declarationMap": true
```

Your configuration should include:

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "NodeNext",
    "target": "ESNext",
    "types": ["node"],
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

**Important:** `declarationMap` requires `declaration` to be enabled.

## Step 3: Create the Source Files

Create `src/utils/message.ts`:

```
export function getMessage(name: string): string {
  return `Hello, ${name}!`;
}
```

Update `src/index.ts`:

```
import { getMessage } from "./utils/message.js";

console.log(getMessage("Amit"));
```

Compile:

```
npx tsc
```

## Step 4: Inspect the Generated Files

Run:

```
find dist -type f
```

Expected files include:

```
dist/index.js
dist/index.d.ts
dist/index.d.ts.map
dist/utils/message.js
dist/utils/message.d.ts
dist/utils/message.d.ts.map
```

The listing order may vary.

### Understand the Three Files

- `message.js` — JavaScript implementation executed by Node.js.
- `message.d.ts` — public type information and function signatures.
- `message.d.ts.map` — mapping information connecting the declaration file to its original TypeScript source.

## Step 5: Test the Output

Run:

```
node dist/index.js
```

Expected output:

```
Hello, Amit!
```

## Step 6: Try It in VS Code

1. Open `src/index.ts`.
2. Right-click `getMessage` and select **Go to Definition**.
3. Check where the editor navigates.

For this local project, the editor will generally navigate directly to `src/utils/message.ts`.

Declaration maps are particularly useful when consuming published TypeScript libraries whose original source files are available and whose editors support the mappings.

## Best Practice

- Use `declaration: true` when publishing reusable TypeScript libraries.
- Add `declarationMap: true` to improve source navigation for library consumers.
- Ordinary Node.js applications often do not need declaration maps.

## Key Takeaway

`declarationMap` generates `.d.ts.map` files that help supported editors connect declaration files to their original TypeScript source.

## Next Lesson: `noUncheckedIndexedAccess`

We will learn why accessing an array element can produce `undefined` and how TypeScript helps catch potential runtime errors.
