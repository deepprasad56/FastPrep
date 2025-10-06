# Compound Component Pattern in React

## 1. Introduction
The **Compound Component Pattern** is a React design pattern that allows multiple components to work together, giving developers a flexible and declarative API.  
It enables parent and child components to share implicit state without prop-drilling.

---

## 2. What is the Compound Pattern?
- A **Compound Component** is a group of components that are designed to be used together.  
- The parent manages the state and behavior.  
- Children consume context or shared logic to interact with the parent.  
- Provides a **clean, declarative API** for building reusable UI components.

---

## 3. Real-World Analogy
Think of `<select>` and `<option>` in HTML:  
```html
<select>
  <option value="1">One</option>
  <option value="2">Two</option>
</select>
```
The `<select>` (parent) manages state, and `<option>` (children) interact seamlessly with it.

---

## 4. Basic Example
```jsx
import React, { createContext, useContext, useState } from "react";

const TabsContext = createContext();

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ index, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = index === activeTab;
  return (
    <button
      className={isActive ? "tab active" : "tab"}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  const { activeTab } = useContext(TabsContext);
  return <div className="tab-panels">{children[activeTab]}</div>;
}

function TabPanel({ children }) {
  return <div className="tab-panel">{children}</div>;
}

// Usage
export default function App() {
  return (
    <Tabs>
      <TabList>
        <Tab index={0}>Home</Tab>
        <Tab index={1}>Profile</Tab>
        <Tab index={2}>Settings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>🏠 Welcome to Home</TabPanel>
        <TabPanel>👤 Profile Info</TabPanel>
        <TabPanel>⚙️ Settings</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
```

---

## 5. Characteristics
- State lives in the **parent**.  
- Children components communicate via **React Context** or props.  
- Encourages **composition over configuration**.  
- Clean API: `<Tabs><TabList>...</TabList></Tabs>` instead of passing multiple props.

---

## 6. Pros & Cons

### Pros
- ✅ Cleaner, declarative API.  
- ✅ Encourages reusability & separation of concerns.  
- ✅ Easier to extend (add/remove children).  
- ✅ Removes prop-drilling with context.

### Cons
- ❌ Requires more setup (context, composition).  
- ❌ More abstract → steeper learning curve for beginners.  
- ❌ Might overcomplicate simple components.

---

## 7. When to Use Compound Components?
| Scenario                           | Use Compound Pattern? |
|-----------------------------------|------------------------|
| Tabs, Accordions, Carousels        | ✅ Yes |
| Form builder with dynamic fields   | ✅ Yes |
| Simple button or input component   | ❌ No |
| When children need shared state    | ✅ Yes |

---

## 8. Industry Best Practices
1. Use **Context API** for communication between parent and children.  
2. Expose children as **static properties** of parent for discoverability:  
   ```jsx
   Tabs.List = TabList;
   Tabs.Panel = TabPanel;
   ```
3. Keep children **dumb** (only presentation) while parent handles logic.  
4. Provide sensible defaults but allow overrides.

---

## 9. Static Property Example (Clean API)
```jsx
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Tab index={0}>Home</Tabs.Tab>
    <Tabs.Tab index={1}>About</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel>Home Content</Tabs.Panel>
    <Tabs.Panel>About Content</Tabs.Panel>
  </Tabs.Panels>
</Tabs>
```

---

## 10. Interview-Level Summary
- **Compound Component Pattern** → Parent manages state, children consume it.  
- **Solves**: prop-drilling & complex configs.  
- **Best for**: Tabs, Accordions, Carousels, Dropdowns.  
- **Industry practice**: Use context + composition + static properties for maintainable APIs.

---
