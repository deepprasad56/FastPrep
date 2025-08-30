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


## 📌 Question: What is the purpose of the `data-` attribute in HTML?

### ✅ Answer:
The **`data-` attributes** in HTML allow you to store **custom data** on any HTML element.  
They are mainly used to pass extra information to **JavaScript** without affecting the DOM or CSS.

---

### 🔑 Key Points to Remember:
- Syntax: `data-*` (e.g., `data-id="123"`)  
- Accessible in JavaScript via:
  - `element.dataset` object (camelCase keys)  
- Useful for:
  - Storing configuration or state per element  
  - Passing data to event handlers  
  - Avoiding inline JavaScript or extra hidden inputs

---

### 🧠 Revision Pattern:
- **Think:** "Do I need to store extra info on an element for JS?"  
  - **Yes** → use `data-*` attributes  
- **Access in JS:** `element.dataset.keyName`  

---

### 📂 Example Code:

```html
<button id="btn" data-user-id="42" data-role="admin">Click Me</button>

<script>
const btn = document.querySelector("#btn");

// Access custom data
console.log(btn.dataset.userId); // "42"
console.log(btn.dataset.role);   // "admin"

// Use in event handler
btn.addEventListener("click", () => {
  alert(`User ID: ${btn.dataset.userId}, Role: ${btn.dataset.role}`);
});
</script>
```
## 📌 Question: What is the difference between `innerHTML` and `textContent` in JavaScript?

### ✅ Answer:
Both `innerHTML` and `textContent` are used to get or set the content of an HTML element, but they behave differently:

- **`innerHTML`**  
  - Returns or sets the **HTML markup** inside an element.  
  - Can include **HTML tags**, which will be parsed by the browser.  
  - Modifying it **replaces the element’s child nodes**.

- **`textContent`**  
  - Returns or sets **plain text** inside an element.  
  - Ignores any HTML tags and treats them as text.  
  - Safer if you want to **avoid rendering HTML** or XSS injection.

---

### 🔑 Key Points to Remember:
- `innerHTML` → parses HTML, can render tags.  
- `textContent` → plain text, no HTML parsing.  
- `textContent` is **faster** when only text is needed.  
- Use `innerHTML` carefully to avoid **security risks**.

---

### 🧠 Revision Pattern:
- **Think:** "Do I want HTML to render?" → use `innerHTML`  
- **Think:** "Do I want plain text only?" → use `textContent`  
- **Performance & security:** prefer `textContent` when possible

---

### 📂 Example Code:

```html
<div id="example"><strong>Hello</strong> World!</div>

<script>
const div = document.querySelector("#example");

console.log(div.innerHTML);  // "<strong>Hello</strong> World!"
console.log(div.textContent); // "Hello World!"

// Modify content
div.innerHTML = "<em>New Content</em>"; // renders as italic text
div.textContent = "<em>Safe Text</em>"; // displays "<em>Safe Text</em>" literally
</script>
```

## 📌 Question: How do you select elements with Vanilla JavaScript?

### ✅ Answer:
In Vanilla JavaScript, you can select elements in several ways depending on **ID, class, tag, or CSS selectors**:

1. **By ID** – `document.getElementById("id")`  
2. **By Class Name** – `document.getElementsByClassName("class")`  
3. **By Tag Name** – `document.getElementsByTagName("tag")`  
4. **Query Selector** – `document.querySelector("selector")` (first match)  
5. **Query Selector All** – `document.querySelectorAll("selector")` (all matches)

---

### 🔑 Key Points to Remember:
- `getElementById` → returns a **single element**.  
- `getElementsByClassName` & `getElementsByTagName` → **live HTMLCollection**.  
- `querySelectorAll` → returns a **static NodeList**, supports **CSS selectors**.  
- `querySelector` → great for targeting **complex selectors** easily.

---

### 🧠 Revision Pattern:
- **Think:** "Single element or multiple?" → choose method  
- **Think:** "Do I need CSS selector flexibility?" → use `querySelector`/`querySelectorAll`  
- Live vs static collections → affects loops if DOM changes

---

### 📂 Example Code:

```js
// By ID
const header = document.getElementById("header");
console.log(header);

// By Class Name
const items = document.getElementsByClassName("item");
console.log(items); // HTMLCollection

// By Tag Name
const divs = document.getElementsByTagName("div");
console.log(divs); // HTMLCollection

// Query Selector (first match)
const firstItem = document.querySelector(".item");
console.log(firstItem);

// Query Selector All (all matches)
const allItems = document.querySelectorAll(".item");
console.log(allItems); // NodeList

// Loop through NodeList
allItems.forEach(item => console.log(item.textContent));
```






