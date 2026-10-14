"use strict";
/*
 Types are used to control how to include type of packages for example.
"node" → automatically includes global type declarations from @types/node.
"types": [] → automatically includes no @types/* packages for their global declarations.
"types": ["node", "jest"] → automatically includes global declarations from @types/node and @types/jest.
*/
Object.defineProperty(exports, "__esModule", { value: true });
/*
  1. GLOBAL DECLARATIONS

  console is a global object.
  It can be declared by TypeScript's DOM library or Node.js types.

  process is a Node.js global object.
  Its type definitions are provided by @types/node.
*/
console.log(process.version); // Node.js API: displays the Node.js version
/*
  2. TYPESCRIPT BUILT-IN TYPE + LOCAL DECLARATION

  const text declares a local variable.
  string is a TypeScript built-in primitive type.
  You do not need @types/node to use string.
*/
const text = `
Hello World!
TypeScript makes JavaScript development safer.
`;
/*
  3. NODE.JS BUILT-IN CLASS AND API

  Buffer is a Node.js global class.
  @types/node provides its type definitions.

  Buffer.from() creates a buffer from the supplied string.
  hello is a local variable.
*/
const hello = Buffer.from(text);
console.log(hello.toString()); // Converts the buffer back to a string
/*
  5. LOCAL VARIABLE USING A NAMESPACE TYPE

  userDetails is a local variable.
  Test.Name refers to the Name interface inside Test.
*/
const userDetails = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};
console.log(userDetails);
/*
  6. NODE.JS NAMESPACE

  NodeJS is a namespace declared by @types/node.
  Platform is a type inside that namespace.

  process.platform returns the current operating system platform.
*/
const platform = process.platform;
console.log(platform);
