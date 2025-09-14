
## Episode 2

### What is a Server?
- A **server** is a remote computer located at a remote place.
- It listens for **requests** from clients and sends back **responses**.
- Example: Web servers, database servers, file servers.

---

### Is Node.js C++ Code?
- ✅ **Yes** → Node.js is a **C++ application** embedded with the **V8 JavaScript engine**.
- Reason: JavaScript engines (like V8) only execute JS code as per **ECMAScript standards**.  
- Node.js embeds V8 and extends its power with **system-level APIs**.

---

### Node.js "Superpowers"
- Browser provides Web APIs (like DOM, fetch, localStorage).  
- Similarly, Node.js provides **system-level APIs** such as:
  - File System API (`fs`)
  - Network API (`http`, `https`)
  - Database connectors
  - OS-level interaction (`os` module)
  - Timers (`setTimeout`, `setInterval`)

---

### Why is V8 Written in C++?
- **C++** is a low-level, compiled language → very close to machine code.  
- Advantages of C++ for V8:
  - 🚀 Super fast performance
  - 🛠️ Fine-grained memory management
  - ⚡ Efficient execution of dynamic languages like JavaScript
  - 🧩 Easy to interface with operating system and hardware
- Other engines also use C++ (SpiderMonkey, JavaScriptCore).

---

### Additional Points
- Node.js uses **libuv** (also in C++) for:
  - Event loop  
  - Asynchronous I/O  
  - Cross-platform support (Windows, Linux, macOS)  
- Node.js architecture = **V8 + libuv + C++ bindings + JS APIs**.  
- This allows JavaScript to run **outside the browser** with access to the **file system, network, and OS resources**.

---

✅ **Authenticity Check**
- V8 is indeed written in **C++** (with some parts in Assembly).  
- Node.js is written in **C++ + JavaScript**.  
- libuv (C library) handles async I/O operations.  
- Verified from official Node.js and V8 documentation.
****
