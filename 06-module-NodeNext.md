# TypeScript `tsconfig.json` — Practical 6: `module: "NodeNext"`

## Goal

Understand how TypeScript handles JavaScript modules for Node.js applications using `NodeNext`.

## Step 1: What Does `module` Do?

The `module` option controls how TypeScript interprets and emits JavaScript modules.

Node.js supports two main module systems.

### 1\. CommonJS

```
const fs = require("node:fs");

module.exports = fs;
```

CommonJS is used by many existing Node.js projects.

### 2\. ES Modules (ESM)

```
import fs from "node:fs";

export default fs;
```

ESM is the standard JavaScript module system used by modern applications.

## Step 2: Update `tsconfig.json`

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "NodeNext"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

**Important:** With `module: "NodeNext"`, TypeScript also requires a compatible `moduleResolution` setting. It defaults to `NodeNext` when not explicitly specified.

## Step 3: Configure ESM

In your existing `package.json`, add:

```
"type": "module"
```

Preserve all existing properties.

For example:

```
{
  "name": "typescript",
  "version": "1.0.0",
  "type": "module"
}
```

Create or update `src/utils/message.ts`:

```
export const getMessage = (): string => {
  return "Hello from NodeNext";
};
```

Update `src/index.ts`:

```
import { getMessage } from "./utils/message.js";

console.log(getMessage());
```

**Why****`.js`****in a****`.ts`****file?**

With Node.js ESM, relative imports generally need explicit file extensions. TypeScript can resolve the `.js` specifier to the corresponding `.ts` source file during compilation.

## Step 4: Compile and Run

Run:

```
npx tsc
node dist/index.js
```

Expected output:

```
Hello from NodeNext
```

The compiled project will contain:

```
dist/
├── index.js
└── utils/
    └── message.js
```

## Step 5: Understand `NodeNext`

`NodeNext` follows Node.js module rules, taking file extensions and the nearest applicable `package.json` into account.

- `"type": "module"` — `.js` files are interpreted as ESM.
- `"type": "commonjs"` — `.js` files are interpreted as CommonJS.
- If `"type"` is omitted, `.js` files are generally treated as CommonJS, subject to Node.js version and module-detection rules.
- `.mts` explicitly identifies ESM source files.
- `.cts` explicitly identifies CommonJS source files.

With `NodeNext`, TypeScript checks that your imports, exports, and emitted JavaScript are compatible with Node.js module behavior.

## Step 6: Practical Experiment — Remove the Extension

Change the import in `src/index.ts` to:

```
import { getMessage } from "./utils/message";
```

Run:

```
npx tsc
```

Expected result: TypeScript reports an error because the relative ESM import does not follow Node.js's required explicit-extension rules.

Restore the import:

```
import { getMessage } from "./utils/message.js";
```

Compile again.

## Best Practice

For modern Node.js backends:

- Use `"module": "NodeNext"`.
- Keep `package.json`'s `"type"` field consistent with your intended module system.
- Use explicit `.js` extensions in relative ESM imports.
- Keep `module` and module resolution settings compatible.

## Key Takeaways

- `module` controls module interpretation and JavaScript emission.
- `NodeNext` follows Node.js module semantics.
- `package.json` influences how `.js` files are interpreted.
- `.mts` and `.cts` provide explicit module-format choices.

## Next Lesson: `target`

We will learn which JavaScript language features TypeScript preserves or transforms when compiling.
