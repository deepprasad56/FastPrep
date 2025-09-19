# Episode 6 

## 1️⃣ JavaScript Runtime Model
- **Single-threaded & Synchronous by default**  
  JavaScript executes code line-by-line in a **single call stack**.  
  Only one piece of code runs at a time.

- **Thread**  
  A *thread* is essentially a container that executes a process’s instructions.  
  JS uses **one main thread** to run all user code.

## 2️⃣ Asynchronous Code
- **Definition**  
  Asynchronous (async) code performs tasks that may take time (e.g., network calls, timers, file I/O) **without blocking** the main thread.
- This allows the engine to continue running subsequent instructions while waiting for the async task to finish.

## 3️⃣ The Need for “Superpowers”
- The **V8 engine** (responsible for parsing, compiling, and executing JS) alone cannot handle I/O, timers, or network requests.
- For these tasks, the runtime provides extra components:
  - **Browsers** → Web APIs (e.g., `setTimeout`, `fetch`, DOM events)
  - **Node.js** → **libuv**

## 4️⃣ libuv
- **libuv** is a C-based library that gives Node.js its asynchronous capabilities.
- Handles:
  - File system operations  
  - TCP/UDP networking  
  - Timers  
  - DNS lookups  
  - Child processes
- Provides a **thread pool** for heavy or blocking tasks.

## 5️⃣ Event Loop
- The **event loop** is the heart of JavaScript’s concurrency model.
- Continuously checks:
  1. **Call Stack** – Is the stack empty?  
  2. **Callback/Task Queues** – Are there callbacks ready to run?
- When the stack is clear, it pushes the next callback from the queue onto the stack for execution.

### Key Queues
- **Macro-task Queue**: `setTimeout`, `setInterval`, `setImmediate`, I/O callbacks.
- **Micro-task Queue**: Promises, `process.nextTick` (Node).  
  > Micro-tasks always run **before** the next macro-task.

## 6️⃣ Flow Summary
1. JS executes sync code in the **Call Stack**.
2. Async tasks are **offloaded** to Web APIs (browser) or **libuv** (Node).
3. When tasks complete, their callbacks move to the appropriate queue.
4. Event loop moves them back to the Call Stack when it’s free.



