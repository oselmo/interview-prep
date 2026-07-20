# Closures, Debounce & Throttle

## What Is a Closure?

A closure is a function that **remembers the variables from the scope where it was defined**, even after that outer scope has finished executing. In JavaScript, every function forms a closure over its enclosing scope.

```javascript
function makeCounter() {
  let count = 0;           // lives in makeCounter's scope
  return function() {
    count++;               // inner function closes over `count`
    return count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
// `count` is still alive because the returned function holds a reference to it
```

The key insight: when `makeCounter` returns, its local variable `count` is NOT garbage-collected because the returned function still references it. The inner function + its captured environment together form the closure.

### Why Closures Matter

Closures are the mechanism behind:
- **Private state** — variables in the outer scope are inaccessible from outside but visible to inner functions
- **Factory functions** — create multiple independent instances that each have their own captured state
- **Callbacks and event handlers** — a callback defined inside a loop captures the loop variable (careful with `var` vs `let`)
- **Debounce and throttle** — the timer ID lives in the closure, shared between each call to the wrapper

### Common Gotcha: `var` in Loops

```javascript
// Bug: all timeouts print 3, because var is function-scoped and mutated
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // prints 3, 3, 3
}

// Fix: use let (block-scoped — each iteration has its own i)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // prints 0, 1, 2
}
```

---

## What Is Debounce?

Debounce ensures a function only fires **after a quiet period** — it resets the timer every time it is called, so the real call only happens once the caller stops triggering it for N milliseconds.

**Mental model:** imagine typing in a search box. You don't want to fire an API call on every keystroke. You want to wait until the user pauses for 300 ms, then fire once.

```
calls:  ----k--k--k------k----k---------[fires here]
         each keystroke resets the timer ↑
```

### Implementation

```javascript
function debounce(fn, delay) {
  let timerId = null;          // captured in the closure

  return function(...args) {
    clearTimeout(timerId);     // cancel any pending call
    timerId = setTimeout(() => {
      fn(...args);             // fire after quiet period
    }, delay);
  };
}

const search = debounce((query) => fetchResults(query), 300);
inputEl.addEventListener('input', (e) => search(e.target.value));
```

Step by step for input "hi" typed quickly:
1. User types `h` → `clearTimeout(null)` (no-op), starts timer T1 (300 ms)
2. User types `i` (200 ms later) → `clearTimeout(T1)` cancels it, starts timer T2
3. User stops → T2 fires after 300 ms → `fetchResults("hi")` called once

The closure keeps `timerId` alive between calls. Each call to the returned function reads and writes the same `timerId` variable.

---

## What Is Throttle?

Throttle ensures a function fires **at most once per N milliseconds**, regardless of how many times it is called. Unlike debounce, it does not reset on each call — it guarantees regular execution during a burst.

**Mental model:** a resize handler that updates a layout. You want it to run at most every 100 ms even if resize events fire 60 times per second.

```
calls:  ----r-r-r-r-r-r-r-r-r-r-------
fires:  ----r-----------r-----------r--
         (once per N ms)
```

### Implementation

```javascript
function throttle(fn, limit) {
  let lastCall = 0;

  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}
```

---

## Debounce vs Throttle — When to Use Which

| Situation | Use |
|---|---|
| Search box / autocomplete | **Debounce** — wait for the user to pause |
| Form validation on input | **Debounce** — validate after typing stops |
| Window resize handler | **Throttle** — update layout at a steady rate |
| Scroll-based animations | **Throttle** — fire at regular intervals during scroll |
| Button to prevent double-submit | **Debounce** (or disable the button) |
| Rate-limiting API calls during drag | **Throttle** — steady cadence, not waiting for stop |

---

## Edge Cases & Gotchas

- **`this` binding** — if the wrapped function uses `this`, use `fn.apply(this, args)` inside the closure instead of `fn(...args)`, or use an arrow function carefully. Arrow functions inherit `this` from their enclosing scope, which may or may not be what you want.

- **Immediate / leading-edge debounce** — sometimes you want to fire on the *first* call, then ignore subsequent ones during the quiet period. Add a `leading` flag: call `fn` immediately if `timerId` is null, then set the timer to clear `timerId` after the delay.

- **Cleanup on unmount** — in React, call `clearTimeout(timerId)` in the cleanup function of `useEffect`, otherwise the callback fires after the component unmounts and tries to update state.

- **Return value** — the simple debounce above drops return values (the real call is async via `setTimeout`). If you need the result, use a Promise or callback pattern.

- **Arguments** — debounce always uses the args from the *last* call (because earlier timers were cancelled). Throttle uses the args from the *first* call in each window (because subsequent calls are ignored). Make sure this matches your use case.
