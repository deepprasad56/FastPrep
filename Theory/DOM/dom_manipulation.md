#📘DOM Manipulation in JavaScript

---

## 🏗️ Create Element
**Definition:** Used to create new DOM nodes dynamically.

```js
// Create a <p> element
const p = document.createElement('p');

// Add text to <p>
p.innerText = 'hello';

// Append to body
document.body.appendChild(p);
```

## 📍 Insert Elements in DOM

### Insert Before
**Definition:** Used to insert a new element **before** a reference element inside the same parent.

```js
const parent = document.querySelector('#container');
const span = document.createElement('span');
span.innerText = 'Inserted Before P';

const p = document.querySelector('p');

// Insert span before <p>
parent.insertBefore(span, p);
```

## 📍 Insert After in DOM

**Definition:**  
JavaScript does not provide a direct `insertAfter()` method.  
We achieve it by combining `insertBefore()` with `nextSibling`.

---

### 📂 Example:
```js
const parent = document.querySelector('#container');
const span = document.createElement('span');
span.innerText = 'Inserted After P';

const p = document.querySelector('p');

// Insert span after <p>
parent.insertBefore(span, p.nextSibling);
```

## ✏️ Modifying Content in DOM

---

### 📌 innerHTML
**Definition:**  
- Gets or sets the HTML markup inside an element.  
- Parses and renders HTML tags.  

```js
const div = document.querySelector('#box');
div.innerHTML = "<b>Hello World</b>";  // Renders bold text
```
## ✏️ innerText in JavaScript

**Definition:**  
- `innerText` gets or sets the **visible text** content of an element.  
- Ignores hidden elements (`display: none`) and considers CSS visibility.  
- Reflects what the user actually sees on the page.

---

### 📂 Example:

```js
const div = document.querySelector('#box');

// Set visible text
div.innerText = "Hello World";

// Get visible text
console.log(div.innerText);  // Prints only visible text
```
## ✏️ textContent in JavaScript

**Definition:**  
- `textContent` gets or sets **all text** inside an element, including hidden elements.  
- Does **not parse HTML tags**; treats everything as plain text.  
- Faster than `innerText` because it does not check CSS visibility.  

---

### 📂 Example:

```js
const div = document.querySelector('#box');

// Set text content
div.textContent = "Hello World <b>bold?</b>";

// Get text content
console.log(div.textContent);  // Prints: Hello World <b>bold?</b>
```


## ✏️ innerHTML vs innerText

**Definitions & Differences:**

| Property      | How It Works                             | Notes / Security Risk                        |
|---------------|----------------------------------------|---------------------------------------------|
| `innerHTML`   | Treated as **HTML**; parses HTML tags.  | ⚠️ Security risk: XSS attacks possible if input is not sanitized. A hacker can inject malicious scripts. |
| `innerText`   | Treated as **plain text**; ignores HTML tags. | Safe from HTML injection. Only visible text is returned. |

---

### 🔐 Security Tip for innerHTML
- Always **sanitize untrusted input** before inserting with `innerHTML`.  
- Use libraries like **DOMPurify** to remove potentially dangerous scripts:  

```js
const cleanHTML = DOMPurify.sanitize(userInput);
div.innerHTML = cleanHTML;
```




## 🗑️ Removing Elements in DOM

**Definition:**  
Elements can be removed from the DOM either directly or via their parent.

---

### 📂 Examples:

```js
const elem = document.querySelector('#removeMe');

// Modern way (direct removal)
elem.remove();

// Old-school way (via parent)
elem.parentElement.removeChild(elem);
```


## 🔑 Working with Attributes in DOM

**Definition:**  
You can read, write, check, and remove attributes of an HTML element using built-in methods.

---

### 📂 Examples:

```js
const img = document.querySelector('img');

// Read an attribute
console.log(img.getAttribute('src'));  // Returns current src

// Write / set an attribute
img.setAttribute('src', 'banner.jpg'); // Updates src

// Remove an attribute
img.removeAttribute('height');         // Removes height

// Check if attribute exists
console.log(img.hasAttribute('src'));  // true or false
```



## 🌳 Traversing the DOM

**Definition:**  
Traversing the DOM means navigating between parent, child, and sibling elements in the DOM tree.

---

### 📂 Examples:

```js
const elem = document.querySelector('#child');

// Access parents
console.log(elem.parentElement);            // Immediate parent
console.log(elem.parentElement.parentElement); // Grandparent

// Access children
console.log(elem.children);                 // All child elements
console.log(elem.firstElementChild);        // First child element

// Access siblings
console.log(elem.previousElementSibling);  // Previous sibling
console.log(elem.nextElementSibling);      // Next sibling
```



## 🎨 Manipulating Styles and Classes

---

### Manipulating Styles

**Definition:**  
You can dynamically change the CSS styles of an element using the `style` property.

```js
const box = document.querySelector('#box');

// Change individual CSS properties
box.style.color = 'red';
box.style.backgroundColor = 'yellow';
box.style.border = '1px solid black';
```

## 🏷️ Working with classList in JavaScript

**Definition:**  
`classList` provides an easy way to **access, add, remove, toggle, and check classes** on an element.

---

### 📂 Examples:

```js
const elem = document.querySelector('#box');

// Access class list
console.log(elem.classList);

// Add a class
elem.classList.add('active');

// Remove a class
elem.classList.remove('hidden');

// Replace a class
elem.classList.replace('old-class', 'new-class');

// Check if element has a class
console.log(elem.classList.contains('active')); // true or false

// Toggle a class (adds if missing, removes if present)
elem.classList.toggle('selected');
```
