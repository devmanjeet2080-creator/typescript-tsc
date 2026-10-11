# TypeScript `tsconfig.json` — Practical 26: `moduleDetection`

## Step 1: What Does It Do?

`moduleDetection` tells TypeScript how to identify a file as a module or a global script.

It has three values:

| Value | Purpose |
| --- | --- |
| `"auto"` | Detects modules using imports, exports, and relevant project settings |
| `"legacy"` | Primarily identifies modules using imports and exports |
| `"force"` | Treats every non-declaration source file as a module |

## Step 2: Enable the Option

Add this to `compilerOptions` in your existing `tsconfig.json`:

```
"moduleDetection": "force"
```

Keep your other settings unchanged.

## Step 3: Create a Practical Example

Create `src/user.ts`:

```
const userName = "Amit";

console.log(userName);
```

Now create `src/index.ts`:

```
const userName = "Rahul";

console.log(userName);
```

Compile:

```
npx tsc
```

Expected result: Compilation succeeds without duplicate variable declaration errors.

Why? With `"force"`, both files are treated as separate modules, so their top-level variables do not share the same global scope.

## Step 4: Test `"legacy"`

Change the setting to:

```
"moduleDetection": "legacy"
```

Compile again:

```
npx tsc
```

Expected result: TypeScript can report duplicate declaration errors because neither file contains an import or export, so both may be treated as global scripts.

Restore `"force"` or use `"auto"` before continuing.

## Step 5: Which Value Should You Use?

- `"auto"` — Generally sufficient for modern Node.js projects.
- `"force"` — Useful when you want every source file treated as a module.
- `"legacy"` — Useful mainly when maintaining projects that rely on older module-detection behavior.

**Best practice:** For a modern Node.js project using `"module": "NodeNext"` and `"type": "module"` in `package.json`, `"auto"` is usually a suitable choice.

## Key Takeaway

`moduleDetection` controls how TypeScript identifies modules. Using `"force"` can prevent accidental global-scope conflicts between files that contain no imports or exports.

## Next Lesson: `skipLibCheck`

Learn how TypeScript checks declaration files (`.d.ts`) and when skipping those checks can improve compilation speed.
