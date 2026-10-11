# TypeScript `tsconfig.json` — Practical 22: `jsx`

## Step 1: What Does It Do?

JSX lets you write HTML-like syntax inside JavaScript or TypeScript.

```
const element = <h1>Hello World</h1>;
```

The `jsx` option tells TypeScript how to handle JSX during compilation.

**Important:** Files containing JSX must use the `.tsx` extension instead of `.ts`.

## Step 2: Create a React Component

Create `src/App.tsx`:

```
interface User {
  name: string;
}

function App() {
  const user: User = {
    name: "Amit",
  };

  return <h1>Hello, {user.name}!</h1>;
}

export default App;
```

## Step 3: Configure `tsconfig.json`

Add `"jsx": "react-jsx"` and include `.tsx` files:

```
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "NodeNext",
    "target": "ESNext",
    "types": ["node"],
    "strict": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

## Step 4: Install Dependencies and Compile

Install React and its TypeScript definitions:

```
npm install react
npm install -D @types/react
```

Compile your project:

```
npx tsc
```

Expected result:

```
dist/
├── App.js
└── index.js
```

`App.js` contains the compiled JavaScript for your React component.

With `react-jsx`, this JSX:

```
return <h1>Hello, {user.name}!</h1>;
```

is transformed into code that uses the automatic JSX runtime, conceptually similar to:

```
return jsx("h1", { children: `Hello, ${user.name}!` });
```

**Note:** Compilation does not start a React application. To display the component in a browser, you also need a React application setup.

## Step 5: Important `jsx` Options

| Value | Purpose |
| --- | --- |
| `"preserve"` | Keeps JSX in the output |
| `"react"` | Transforms JSX into `React.createElement()` calls |
| `"react-jsx"` | Uses the modern automatic JSX runtime |
| `"react-jsxdev"` | Uses the development JSX runtime |
| `"react-native"` | Preserves JSX for React Native tooling |

## Best Practice

For modern React projects, `"jsx": "react-jsx"` is generally a good choice.

For a normal Node.js backend that does not use JSX, you usually do not need this option.

## Key Takeaway

- Use `.tsx` for TypeScript files containing JSX.
- Configure `jsx` to control JSX transformation.
- JSX compilation alone does not run or display a React application.

## Next Lesson: `verbatimModuleSyntax`

Learn the difference between `import` and `import type`, and how TypeScript handles imports during compilation.
