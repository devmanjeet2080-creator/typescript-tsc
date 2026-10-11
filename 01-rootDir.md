# TypeScript `tsconfig.json` — Practical 1: `rootDir`

## Goal

Understand how `rootDir` works in a practical Node.js project.

## Step 1: Project Setup

Run:

```
mkdir -p typescript/src
cd typescript
npm init -y
npm install -D typescript
```

Create `src/index.ts`:

```
const username: string = "Amit";

console.log(username);
```

Create `tsconfig.json`:

```
{
  "compilerOptions": {
    "rootDir": "./src"
  }
}
```

## Step 2: Compile the Project

Run:

```
npx tsc
```

Expected result: Compilation succeeds without errors.

Because `outDir` is not configured, the generated JavaScript file is placed alongside the source file.

Project structure:

```
typescript/
├── src/
│   ├── index.ts
│   └── index.js
├── package.json
├── package-lock.json
├── node_modules/
└── tsconfig.json
```

## Step 3: Run the JavaScript

Run:

```
node src/index.js
```

Output:

```
Amit
```

## Step 4: Check the Source Directory

Run:

```
ls src
```

Expected output (order may vary):

```
index.js
index.ts
```

The `ls` command lists filenames; it does not display the program's output.

## Step 5: Experiment with an Unused Variable

Update `src/index.ts`:

```
const username: string = "Amit";

console.log(username);

const age: number = 25;
```

Compile again:

```
npx tsc
```

Expected result: Compilation succeeds. Unused-variable checking is not enabled by default.

## Key Takeaways

- `rootDir` specifies the source root and influences the relative directory structure of emitted files.
- It does not specify the output directory.
- It does not determine which files are included in compilation.
- TypeScript annotations are removed during compilation.
- Without `outDir`, emitted JavaScript is generally written alongside its corresponding TypeScript source file.
