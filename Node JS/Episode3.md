# Namaste Node JS  

## Episode 3

### Node REPL
- **REPL** → Read, Evaluate, Print, Loop  
- Used to run Node.js programs interactively  

### Global Object in Node.js
- In browsers → `window` is the global object  
- In Node.js → `global` is the global object  
  - Provides access to APIs like:
    - `setTimeout`
    - `setInterval`
- In Node.js, the value of `this` at the top level is `{}` (empty object)

### Standardization of Global Object
- In **2020**, `globalThis` was introduced in JavaScript  
- Purpose → Standardize access to the global object across environments:
  - Browser → `window`
  - Node.js → `global`
  - Web Workers → `self`
  - Unified keyword → `globalThis`
