# Episode 4: Modules in Node.js

## CommonJS (CJS) Modules
- In Node.js, we may have different JS files, and these files are known as **modules**.
- To use a module in another file, we use the **`require()`** function.
- The code in the required file runs first, in the order they are called.
- We **cannot directly access methods or properties** of a module just by requiring it.
- Modules protect their variables and methods by **not leaking them** into the global scope.
- To share values between files, we use **`module.exports`** and **`require()`**.
- To export multiple values, wrap them inside `{ }`.
- This system is called **CommonJS (CJS)** modules.

### Characteristics of CommonJS
- **Synchronous** loading.
- Default in Node.js (if no configuration).
- Runs in **non-strict mode**.
- Older way of managing modules.

---

## ES Modules (ESM / `.mjs`)
- ES Modules are the **new standard**.
- To enable them in Node.js, specify in `package.json`:
  ```json
  {
    "type": "module"
  }
