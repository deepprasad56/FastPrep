# 🌟 Currying in JavaScript

Currying is a technique in functional programming where a function with multiple arguments is transformed into a sequence of functions, each taking **one argument at a time** (or partially applied).

---

## 🔹 1. Infinite Currying with Multiple Arguments

```js
function sum(...n) {
    let total;
    if (n.length > 1) {
        total = n.reduce((acc, val) => acc + val, 0);
    }

    return function inner(...n2) {
        if (n2.length == 0) return total;
        total += n2.reduce((acc, val) => acc + val, 0);
        return inner;
    };
}

console.log(
  "Infinite currying with multiple arguments",
  sum(10, 10)(10)(10)(10)(10, 10, 10, 10)()
);
```
## 🔹 2. Infinite Currying with Single Arguments

``` js
function ifsum(n) {
    let total = n;
    return function inner(n2) {
        if (!n2) {
            return total;
        }
        total += n2;
        return inner;
    };
}

console.log("Infinite currying with single arguments", ifsum(2)(3)());
```
## 🔹 3. Currying with Partial Application

```js
function greet(greet, name) {
    return `${greet} ${name}`;
}

let partial = greet.bind(null, "Hello");
console.log("Currying with partial application", partial("Deepak"));
```
Here bind returns a new function with prefilled parameters , and the incomplete parameters are filled at later point of time using the returned function from the bind.
