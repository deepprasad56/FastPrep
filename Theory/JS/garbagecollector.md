# 🗑️ Garbage Collection in JavaScript

JavaScript manages memory **automatically** using a garbage collector.  
Developers do not manually allocate and free memory — instead, the garbage collector decides when objects are no longer needed and reclaims the memory.

---

## 🔹 Concept of Reachability

Garbage collection in JavaScript is based on the idea of **reachability**.  

- **Reachable values** are values that are accessible or usable by the program in some way.  
- If a value is reachable, it must remain in memory.  
- If it becomes unreachable, it is eligible for garbage collection.

**Examples of roots (always reachable):**
- Global variables
- Local variables and parameters in the current function call
- Objects that are referenced from roots

---

## 🔹 How to Make a Variable Unreachable

If we remove all references to an object, it becomes unreachable.

```js
let A = { name: "John", age: 22 };

// Now A references the object
```
A = null; // reference lost, object becomes unreachable
Here, the { name: "John", age: 22 } object no longer has any references → it will be picked up by the garbage collector.

### 🔹 Multiple References

If more than one variable refers to the same object, removing one reference is not enough.

```js
let user = { name: "John", age: 22 };
let admin = user;

user = null; // remove one reference

console.log(admin.name); // "John"
```
The object is still reachable through admin, so it will not be collected.

### 🔹 Interlinked Objects

Objects can reference each other (cyclic references). Outgoing references don’t prevent collection if there are no incoming references from a root.

```js
function marry(man, woman) {
  man.wife = woman;
  woman.husband = man;

  return { father: man, mother: woman };
}

let family = marry({ name: "John" }, { name: "Ann" });

// remove references
delete family.father;
delete family.mother.husband;

// John has no incoming references anymore → garbage collector can collect John
```

### 🔹 Unreachable Islands

Sometimes whole groups of interconnected objects can become unreachable if the root reference is removed.
```js
let family = {
  father: { name: "John" },
  mother: { name: "Ann" }
};

// Remove root reference
family = null;

// Entire "family" object and nested objects become unreachable
// This forms an "unreachable island"
```

Even though father and mother reference each other, if the family root is gone, the whole group is unreachable and eligible for garbage collection.

### 🔹 Internal Algorithm: Mark-and-Sweep

JavaScript engines typically use the mark-and-sweep algorithm.

Mark Phase

Start from roots (e.g., global variables).

Traverse references, marking every object that is reachable.

Sweep Phase

Any object not marked is considered unreachable and is deleted from memory.

This ensures only reachable objects remain in memory.


### 🔹 Optimizations in Modern Garbage Collection

Generational Collection

Objects are split into new and old.

Many objects die young (e.g., temporary variables), so the GC checks new objects frequently.

Long-lived objects are moved to the old generation and checked less often.

Incremental Collection

Instead of scanning the whole memory in one go (which could cause noticeable pauses), GC splits the work into smaller chunks.

Runs multiple small collections to avoid blocking the main program.

Idle-Time Collection

GC tries to run when the CPU is idle to minimize performance impact.

Example: between animation frames or when no active tasks are running.

### 🔑 Summary

Garbage collection in JS is automatic.

It is based on reachability, not reference count.

Removing all references makes objects eligible for GC.

Interlinked objects can still be collected if no root references point to them.

The mark-and-sweep algorithm is the primary strategy.

Modern engines use optimizations (generational, incremental, idle-time) to make GC efficient and smooth.
