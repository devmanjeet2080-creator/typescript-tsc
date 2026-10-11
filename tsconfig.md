#TSC

tsc is the command-line compiler for TypeScript. It takes TypeScript code as input and transforms it into JavaScript code that can be executed by browsers or other JavaScript runtimes like Node.js. You use tsc to check for type errors, enforce coding standards, and ultimately prepare your TypeScript code for deployment.

# There are 2 common ways to install the TypeScript compiler (tsc).

## 1. Install Globally

```
npm install -g typescript
```

Check the version:

```
tsc --version
```

Use when: You want to use tsc across multiple projects.

## 2. Install Locally in a Project

```
npm install --save-dev typescript
```

Check the version:

```
npx tsc --version
```

Use when: You want each project to manage its own TypeScript version. This is generally recommended for projects.


#  What is tsconfig.json?

tsconfig.json is a configuration file for TypeScript. It defines how TypeScript checks and compiles your code.

You can configure:
- target — JavaScript version to generate.
- module — Module system to use.
- strict — Enable strict type-checking.
- rootDir — Source code directory.
- outDir — Output directory for compiled JavaScript.
- include — Files to compile.
- exclude — Files to exclude.

# Generating tsconfig.json

```
npx tsc --init
```

This creates a tsconfig.json with recommended settings.

Note: this command only work when tsc is installed globally/locally installed. If not installed, you can install it using `npm install -g typescript` or `npm install --save-dev typescript`.


Others ways to create tsconfig.json file:

| Command                          | Description                                                  |
| -------------------------------- | ------------------------------------------------------------ |
| `npx tsc --init`                 | Generates a default configuration file.                      |
| `npx tsc --init --target ES2022` | Generates a configuration with the ES2022 target.            |
| `npx tsc --init --strict`        | Generates a configuration with strict type-checking enabled. |



# How to Compile TypeScript

```
npx tsc
```
This command compiles all TypeScript files based on the tsconfig.json configuration.

Common TypeScript Commands

| Command                | Purpose                                               |
| ---------------------- | ----------------------------------------------------- |
| `npx tsc`              | Compiles TypeScript using `tsconfig.json`.            |
| `npx tsc src/index.ts` | Compiles a specific TypeScript file.                  |
| `npx tsc --watch`      | Automatically recompiles when files change.           |
| `npx tsc --noEmit`     | Checks for type errors without generating JavaScript. |
| `npx tsc --listFiles`  | Displays the files included in compilation.           |

Note: When you pass a filename directly, such as `npx tsc src/index.ts`, TypeScript does not use your `tsconfig.json` settings.