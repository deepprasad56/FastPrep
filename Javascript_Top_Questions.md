<h1>Javascript DOM Top Questions</h1>

## 📌 Question: What is Event Delegation in JavaScript?



### ✅ Answer:
**Event Delegation** is a technique where instead of attaching event listeners to multiple child elements,  
we attach a **single event listener to their parent element**.  
When an event bubbles up from a child, we check the `event.target` to determine which child triggered it.  
This makes event handling more **efficient**.

---

### 🔑 Key Points to Remember:
1. **Event Phases:**
   - **Capturing phase:** Event travels from the root → down to the target element.  
   - **Target phase:** Event arrives at the element that triggered it.  
   - **Bubbling phase:** Event bubbles back up the DOM tree.  

   👉 Flow = **TopDown → Target → BottomUp**  
   👉 By default, JavaScript event handling works in the **bubbling phase**.

2. **Why Event Delegation?**
   - Avoids attaching separate listeners to each child element.
   - Saves **memory & performance** (especially for dynamic lists).
   - Makes it easy to handle **dynamically added elements**.

---

### 🧠 Revision Pattern:
- **Think:** "Do I need a listener on every child?"  
- **Answer:** "No → I can use **event delegation** by listening on the parent."  
- **How?** `parent.addEventListener("event", e => check e.target)`  

---

### 📂 Example Code:

```js
// Instead of attaching to every <li>, attach to <ul>
const list = document.querySelector("ul");

list.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log(`You clicked on: ${event.target.innerText}`);
  }
});

```

 ## 📌 Question: What is the purpose of the `addEventListener` method?

### ✅ Answer:
The `addEventListener` method in JavaScript is used to **attach a function (event handler) to a DOM element** so that it runs whenever a specific event occurs.

---

### 🔑 Key Points to Remember:
- Attach events to DOM elements (like click, input, scroll).
- Can attach **multiple event handlers** for the same event.
- Supports **capturing vs bubbling phase** with the third argument.
- You can **remove listeners** later using `removeEventListener`.
- Better than `onclick` because it separates JavaScript from HTML.

---

### 🧠 Revision Pattern:
- **Think:** "When should my code run?" → On an **event**.  
- **Do:** `element.addEventListener("event", handler)`  
- **Extra:** Multiple handlers? Yes. Remove later? Yes. Capturing or bubbling? Yes.  

---

### 📂 Example Code:

```js
const button = document.querySelector("button");

// Add an event listener
button.addEventListener("click", () => {
  alert("Button clicked!");
});

// Add multiple listeners to the same event
button.addEventListener("click", () => console.log("First handler"));
button.addEventListener("click", () => console.log("Second handler"));

// Remove a listener
function logClick() {
  console.log("Clicked!");
}
button.addEventListener("click", logClick);
button.removeEventListener("click", logClick);

```

## 📌 Question: What is Event Propagation in JavaScript?

### ✅ Answer:
**Event Propagation** is the process by which an event moves through the **DOM tree**.  
It defines the order in which **event handlers are triggered** when an event occurs on a nested element.  

There are **three phases**:  

1. **Capturing Phase (trickle down)** – The event starts from the root of the DOM and travels **down to the target element**.  
2. **Target Phase** – The event reaches the **actual element** that triggered it.  
3. **Bubbling Phase (bubble up)** – The event travels **up from the target element to the root**, triggering any handlers along the way.

---

### 🔑 Key Points to Remember:
- By default, event listeners listen in the **bubbling phase**.  
- You can listen in the **capturing phase** by passing `{ capture: true }` in `addEventListener`.  
- Event propagation allows **parent elements to react to child events** (used in event delegation).  
- You can stop propagation using `event.stopPropagation()` to **prevent further bubbling or capturing**.

---

### 🧠 Revision Pattern:
- **Think:** "Do I want the parent to handle child events?" → propagation/bubbling  
- **Think:** "Do I want to intercept before target?" → use capturing phase  
- **Need to stop event reaching parent?** → `event.stopPropagation()`

---

### 📂 Example Code:

```js
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

// Capturing phase
parent.addEventListener("click", () => console.log("Parent clicked (capturing)"), true);

// Bubbling phase
parent.addEventListener("click", () => console.log("Parent clicked (bubbling)"));

child.addEventListener("click", (e) => {
  console.log("Child clicked");
  // Stop further propagation
  // e.stopPropagation();
});


```






