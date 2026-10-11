# TypeScript `tsconfig.json` — Practical 20: `noPropertyAccessFromIndexSignature`

## Step 1: What Does It Do?

An index signature allows an object to have properties with dynamic names.

`noPropertyAccessFromIndexSignature: true` requires bracket notation (`[]`) to access properties that are available only through an index signature.

## Step 2: Test Without the Option

Write this in `src/index.ts`:

```
interface UserSettings {
  [key: string]: string;
}

const settings: UserSettings = {
  theme: "dark",
  language: "Hindi",
};

console.log(settings.theme);
console.log(settings.language);
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
dark
Hindi
```

Without this option, TypeScript allows dot notation for these properties.

## Step 3: Enable the Option

Add this to `compilerOptions` in `tsconfig.json`:

```
"noPropertyAccessFromIndexSignature": true
```

Compile again:

```
npx tsc
```

Expected result: TypeScript reports errors on `settings.theme` and `settings.language` because neither property is explicitly declared in the interface.

## Step 4: Fix the Error

Use bracket notation:

```
interface UserSettings {
  [key: string]: string;
}

const settings: UserSettings = {
  theme: "dark",
  language: "Hindi",
};

console.log(settings["theme"]);
console.log(settings["language"]);
```

Compile and run:

```
npx tsc
node dist/index.js
```

Expected output:

```
dark
Hindi
```

## Step 5: When Can We Use Dot Notation?

Explicitly declare properties that you want to access using dot notation:

```
interface UserSettings {
  theme: string;
  [key: string]: string;
}

const settings: UserSettings = {
  theme: "dark",
  language: "Hindi",
};

console.log(settings.theme);
console.log(settings["language"]);
```

Expected output:

```
dark
Hindi
```

Here, `theme` is explicitly declared, so dot notation is allowed. `language` is available through the index signature, so bracket notation is required.

**Important:** Bracket notation does not guarantee that a dynamic property exists.

## Best Practice

Use `"noPropertyAccessFromIndexSignature": true` when working with dynamic configuration objects or API data. It makes the distinction between declared and dynamic properties clearer.

## Key Takeaway

- Explicitly declared properties can use dot notation.
- Properties available only through an index signature require bracket notation.
- This option improves clarity but does not validate whether a property exists at runtime.

## Next Lesson: `strict`

Learn how TypeScript enables multiple strict type-checking options together.
