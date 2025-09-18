# Episode 5: Module Wrapping in Node.js

## Why can’t we access variables and functions directly across modules?
- In Node.js, when we `require()` a file, Node **wraps that module inside a function**.
- This is done to avoid leaking variables/functions into the global scope.
- The only way to share them is via **`module.exports`**.
- The wrapper function is nothing but an **IIFE (Immediately Invoked Function Expression)**.

---

## What happens when we `require()` a module?
1. **Path Resolution** – Node resolves the absolute path of the module.
2. **Load File Content** – Reads the file contents.
3. **Wrap Inside IIFE** – Node wraps the file in a function like:
   ```js
   (function (exports, require, module, __filename, __dirname) {
     // Module code actually lives here
   });
