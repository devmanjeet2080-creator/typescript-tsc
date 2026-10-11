# TypeScript `tsconfig.json` — Practical 27: `skipLibCheck`

## Step 1: What Does It Do?

`skipLibCheck: true` skips type-checking the internal contents of declaration files (`.d.ts`), which often come from third-party libraries.

**Important:** TypeScript still checks your regular `.ts` files.

## Step 2: Enable the Option

Add this to `compilerOptions` in your existing `tsconfig.json`:

```
"skipLibCheck": true
```

Keep your other settings unchanged.

## Step 3: Test With Correct Types

Write this in `src/index.ts`:

```
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Amit",
};

console.log(user);
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
{ id: 1, name: 'Amit' }
```

## Step 4: Test an Incorrect Type

Change the object to:

```
const user: User = {
  id: "wrong",
  name: "Amit",
};
```

Compile:

```
npx tsc
```

Expected result: TypeScript reports an error because `id` must be a number, not a string.

**Why?** `skipLibCheck` does not disable type-checking in your own source files.

## Step 5: Why Is It Useful?

- `true` — Skips checking the internal types of declaration files and can speed up compilation.
- `false` — Checks declaration files too, which can help identify problems in library declarations.

## Best Practice

For many Node.js applications, `"skipLibCheck": true` is a practical choice.

However, it does not fix dependency type conflicts; it only skips checking declaration files.

## Key Takeaway

`skipLibCheck` can improve compilation speed without disabling type-checking in your application code.

## Next Lesson: `forceConsistentCasingInFileNames`

Learn how TypeScript catches import paths with incorrect uppercase or lowercase file names.
