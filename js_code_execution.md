# How JavaScript Code Executes – Detailed Walkthrough

This guide describes **exactly** what happens when a JavaScript program runs, from the first line to completion, including browser and Node.js details.

---

## 1️⃣ Load & Parse

1. **Source Code Read**  
   - The JS engine (e.g., V8 in Chrome/Node) receives the script file as plain text.

2. **Lexical Analysis (Tokenizing)**  
   - Splits the code into tokens (keywords, identifiers, literals, operators).

3. **Parsing → Abstract Syntax Tree (AST)**  
   - Tokens are parsed into a tree structure that represents program logic.
   - Syntax errors (e.g., missing brackets) are caught here.

---

## 2️⃣ Compilation (JIT) — **Deep Dive**

Modern engines like **V8** use a **Just-In-Time (JIT) compilation pipeline**, combining interpretation and compilation for both **fast startup** and **high runtime performance**.

### 2.1 Ignition: Interpreter & Bytecode
- **Ignition** is V8’s interpreter.
- Takes the AST and produces **bytecode**, a compact instruction set specific to V8.
- Bytecode is executed immediately so scripts can start running quickly.
- Each JavaScript function has its own bytecode representation.

### 2.2 Hidden Classes & Inline Caching
To speed up property access:
- **Hidden Classes**:  
  - When you create an object, V8 assigns it an internal “shape” (hidden class).  
  - Adding or removing properties can cause *shape changes*, so consistent object structures improve performance.
- **Inline Caching**:  
  - V8 records where properties are found the first time.  
  - Subsequent lookups use the cached location, making repeated property access much faster.

### 2.3 Profiling “Hot” Code
- As the program runs, V8 monitors which functions execute frequently (“hot paths”).
- Profiling data includes types of variables, loop behavior, and function call counts.

### 2.4 How Hot Code Improves Performance
When V8 detects that a function or loop is **hot** (executed many times), it assumes types and object shapes are stable and applies aggressive optimizations:

#### **Type Specialization**
- **What it means**: V8 generates machine code tailored to the specific data types it has observed (e.g., numbers vs. strings).  
- **Why it helps**: If a function always receives numbers, V8 can use direct CPU arithmetic instructions instead of generic, slower JavaScript operations.
- **Example:**
  ```js
  function add(a, b) { return a + b; }

  // Called many times with numbers
  for (let i = 0; i < 1_000_000; i++) {
    add(2, 3);
  }
```
### Type Specialization (continued)
V8 notices that `a` and `b` are always numbers.

It compiles a specialized version of `add` that uses fast integer addition at the CPU level.

If later you call `add('2', '3')`, V8 must **de-optimize** back to a generic version because now types are inconsistent.

---

### Function Inlining
**What it means:**  
Small, frequently called functions are copied directly into the caller function’s machine code instead of making a function call each time.

**Why it helps:**  
Avoids the overhead of pushing/popping the call stack and passing arguments.

**Example:**
```js
function square(x) { return x * x; }

function sumOfSquares(a, b) {
  return square(a) + square(b);
}
```
### Unboxing & Constant Folding

#### Unboxing
JavaScript numbers are usually stored as 64-bit “boxed” objects that carry type info.

V8 can store them as raw CPU integers or floats (“unboxed”) when it sees stable numeric types.

**Benefit:** Arithmetic uses native CPU registers—much faster.

#### Constant Folding
V8 precomputes expressions whose values never change.

**Example:**
```js
const area = 3.14 * 10 * 10;
```

### Elimination of Type Checks

**What it means:**  
Once V8 is confident about the data type, it can skip the usual runtime checks.

**Why it helps:**  
Each JavaScript operation typically verifies types (e.g., “Are these both numbers?”).  
Removing these checks saves instructions and improves performance.

**Example:**
```js
function multiply(a, b) { return a * b; }

for (let i = 0; i < 1_000_000; i++) {
  multiply(4, 5);
}
```
Early executions might check: “Is `a` a number? Is `b` a number?”

After profiling shows they’re always numbers, V8 compiles a version that directly multiplies without any checks.

If at any time a different type appears (e.g., `multiply('4', 5)`),  
V8 **de-optimizes** and falls back to the slower, generic version with type checks.
## 2.5 TurboFan: Optimizing Compiler

When V8 detects **hot code**, it hands the bytecode plus profiling data to **TurboFan**, the optimizing compiler.

TurboFan converts the bytecode into **highly optimized machine code** using all the techniques above  
(e.g., type specialization, function inlining, unboxing, constant folding, and elimination of type checks).

---

## 2.6 De-optimization

If V8’s assumptions become invalid (for example, a variable changes type), it **de-optimizes**:

- Falls back to **bytecode execution**.
- Can **re-optimize** if patterns stabilize again.

---

### Key Benefits of this Pipeline
- **Fast Start**: Immediate interpretation via **Ignition**.
- **Peak Performance**: **TurboFan** machine code for hot paths.
- **Flexibility**: Can adapt optimizations at runtime.

---

## 3️⃣ Execution Contexts

Before running code, the engine creates **Execution Contexts**.

### a. Global Execution Context
Created once per program.

Sets up:
- **Memory (Variable Environment / Lexical Environment)** – stores variables and function declarations.
- **this binding** – `window` in browsers, `global` in Node.
- **Scope Chain** – links outer scopes for variable lookup.

### b. Function Execution Contexts
Every function call creates its own context with:
- Local variables/arguments
- Its own scope chain
- A reference to the parent context

These contexts are tracked in the **Call Stack (LIFO)**.

---

## 4️⃣ Call Stack & Synchronous Execution

The Call Stack executes code **line by line**.

- Each function invocation **pushes a frame**; once it returns, the frame is **popped**.
- Errors that aren’t caught bubble up the stack and can **terminate execution**.

---

## 5️⃣ Encountering Asynchronous Operations

When code hits an async operation such as:
- `setTimeout` / `setInterval`
- `fetch` / AJAX
- DOM events
- File I/O (Node.js)

the engine **does not block**:

**Browser Environment**
- Offloads work to **Web APIs** (Timer API, DOM, network layer).

**Node.js Environment**
- Uses **libuv**, a C library that provides:
  - A **thread pool** for file/network tasks.
  - An **event loop** implementation.

The V8 engine continues running subsequent **synchronous code**.

---

## 6️⃣ Queues: Macro-Tasks & Micro-Tasks

When async work finishes, its callback is queued:

### Macro-Task Queue
For tasks like:
- `setTimeout`, `setInterval`
- `setImmediate` (Node)
- I/O callbacks

### Micro-Task Queue
For:
- Promise callbacks (`.then`, `catch`, `finally`)
- `process.nextTick` (Node)

⚡ **Rule**: Micro-tasks are processed **before** the next macro-task.

---

## 7️⃣ The Event Loop (The Heartbeat)

The event loop (implemented by **libuv** in Node) orchestrates everything:

1. **Check Call Stack** – Is it empty?
2. **Process Micro-tasks** – Run all queued micro-tasks until empty.
3. **Process One Macro-task** – Move the oldest macro-task callback to the stack.
4. **Repeat**.

This cycle continues until both the **stack** and **queues** are empty.

---

## 8️⃣ Program Termination

When there are no more pending tasks, timers, or listeners, the **event loop exits**.

In **Node.js**, an active server or timer keeps the process alive.
