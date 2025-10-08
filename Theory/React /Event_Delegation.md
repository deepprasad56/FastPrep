# React Event Handling — Key Takeaways

## 1. JSX Event Props (Declarative)

- **Definition:** Attach event handlers via JSX props, e.g., `onClick`, `onMouseDown`.
- **Example:**
```jsx
<button onClick={handleClick}>Click Me</button>
```
- **Characteristics:**
  - Declarative: "What should happen" rather than "how to attach."
  - Managed by React Synthetic Event System.
  - Automatic cleanup when component unmounts.
  - Efficient: One global listener per event type, regardless of element count.

- **Use Case:** UI interactions inside the React component tree.
- **Notes:**
  - React handles event delegation internally.
  - Works seamlessly with dynamically rendered components.

---

## 2. Imperative Event Listeners

- **Definition:** Manually attach event listeners using `addEventListener`.
- **Example:**
```jsx
useEffect(() => {
  const handleResize = () => console.log('resized');
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize); // cleanup
}, []);
```
- **Characteristics:**
  - Imperative: "Go and attach this listener to this DOM node."
  - React does **not** manage lifecycle or cleanup — developer responsibility.
  - Can cause memory leaks or multiple event triggers if not cleaned up.
  - Useful for `window`, `document`, third-party DOM libraries.

- **Use Case:** Global events, timers, sockets, or elements outside React tree.

---

## 3. Synthetic Events & Event Delegation

- React attaches **one global listener per event type** (on root container).
- Individual JSX props (`onClick`, `onMouseDown`) are routed through React’s synthetic system.
- Benefits:
  - No per-element DOM listeners.
  - Automatic cleanup.
  - Cross-browser consistency.
  - Works for dynamic elements like grids, lists.

---

## 4. useEffect Cleanup

- Required **only for custom/imperative side effects**:
  - `window` or `document` listeners
  - `setInterval`, `setTimeout`
  - WebSocket or API subscriptions
- Not required for JSX event props.
- Ensures no memory leaks and prevents multiple event triggers.

```jsx
useEffect(() => {
  const id = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(id); // cleanup
}, []);
```

---

## 5. Summary Table

| Feature | JSX Event Prop | Imperative Listener |
|---------|----------------|------------------|
| Style | Declarative | Imperative |
| Cleanup | Automatic | Manual via `useEffect` |
| Memory | Efficient (one listener) | Can leak if not removed |
| Use Case | Component UI events | Global events, timers, sockets |
| Example | `<div onMouseDown={...} />` | `window.addEventListener('resize', ...)` |

---

**Key Interview Points:**

- JSX props = React-managed, declarative, safe.
- Imperative listeners = developer-managed, manual cleanup needed.
- React’s synthetic events rely on **event delegation** (single listener at root).
- Always clean up manual listeners in `useEffect` to avoid leaks.
- Event delegation allows performant handling of large grids/lists.
