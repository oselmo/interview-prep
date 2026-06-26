# Monotonic Stack

## What Is This Pattern / When Do You Recognize It?

A monotonic stack is a stack that maintains its elements in sorted order (either always increasing from bottom to top, or always decreasing). When a new element violates the order, you pop until the invariant is restored — and crucially, each pop answers a pending question.

Reach for a monotonic stack when:
- The problem asks for each element's **next greater element**, **next smaller element**, **previous greater**, or **previous smaller**
- You need to find how far an element "dominates" in one direction
- The problem involves spans, widths, or ranges defined by boundary conditions (largest rectangle, trapping rain water)
- You see the phrase "find the nearest X to the left/right"

The signal: you're processing a sequence left-to-right and need some relationship between each element and its neighbors that a simple scan won't give in O(n).

## Why It Works (The Key Insight)

The stack holds elements that are **waiting for their answer**. When you pop an element, it's because the current element is the answer to its pending question.

For "next greater element": maintain a decreasing stack. When you see a new element that's greater than the stack's top, that new element is the first one greater than the top — pop the top and record the answer. Keep popping until the stack is empty or the top is greater.

Think of it like this: each element gets pushed once and popped once. That's O(n) total operations regardless of how many pops happen at any single step. This is the key reason monotonic stack problems are O(n) despite the nested-looking logic.

```
Array:  [2, 1, 5, 6, 2, 3]
Next greater for each element:

Process 2  → stack: [2]
Process 1  → 1 < 2, push → stack: [2, 1]
Process 5  → 5 > 1 → pop 1, answer[1] = 5
           → 5 > 2 → pop 2, answer[2] = 5
           → stack empty, push 5 → stack: [5]
Process 6  → 6 > 5 → pop 5, answer[5] = 6
           → push 6 → stack: [6]
Process 2  → 2 < 6, push → stack: [6, 2]
Process 3  → 3 > 2 → pop 2, answer[2] = 3
           → 3 < 6, push → stack: [6, 3]
Remaining: [6, 3] → no next greater → answer = -1
```

## The Template

```python
# Next Greater Element (monotonic decreasing stack)
def next_greater(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # stores indices

    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]  # current element is the answer for idx
        stack.append(i)

    return result  # remaining elements in stack have no next greater

# Next Smaller Element (monotonic increasing stack — flip the comparison)
def next_smaller(nums):
    n = len(nums)
    result = [-1] * n
    stack = []

    for i in range(n):
        while stack and nums[i] < nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)

    return result

# For "previous" greater/smaller: iterate right-to-left, or use the same
# stack approach reading from right to left.
```

For problems requiring both left and right boundaries (like largest rectangle), run the pattern twice — once forward, once backward.

## Classic Problems

- **Daily Temperatures** — For each day, how many days until a warmer temperature? Monotonic decreasing stack of indices. When you see a higher temperature, pop and record the gap (`i - idx`).

- **Next Greater Element I & II** — Find the next greater element for each in an array. For the circular version (II), iterate `2n` times using `i % n` to simulate wrapping, but only push during the first pass.

- **Largest Rectangle in Histogram** — For each bar, find how far left and right you can extend at that bar's height. Use two monotonic increasing stack passes to find the previous smaller and next smaller bar for each position. Width × height gives the area for each candidate rectangle.

- **Trapping Rain Water** — Water above each index equals `min(max_left, max_right) - height[i]`. Can be solved with precomputed prefix arrays or a two-pointer approach. The monotonic stack solution: when popping a "valley" element, calculate the water trapped between it and the new element using the height difference and the width.

## Edge Cases / Gotchas

- **Store indices, not values** — You almost always need the index to compute distances or widths, not just the value. Push `i`, look up `nums[i]` when needed.

- **Monotonic increasing vs. decreasing — don't mix them up:**
  - Decreasing stack (top is smallest) → pops when current > top → finds **next greater**
  - Increasing stack (top is largest) → pops when current < top → finds **next smaller**

- **Equal elements** — Decide whether your invariant is strict (`>`) or non-strict (`>=`). For "next greater or equal" use `>=` in the pop condition. For "strictly greater," use `>`. Getting this wrong by one gives wrong answers on inputs with duplicates.

- **Circular arrays** — Iterate `0..2n-1` with index `i % n`. Only push during the first `n` iterations to avoid double-counting, or push unconditionally but check your result array bounds.

- **Remaining elements in the stack** — After the loop, everything left in the stack has no next greater (or smaller) element. Their result should remain -1 (or whatever sentinel the problem uses). Don't forget to handle this — it's not an error, it's expected.

- **Largest rectangle: the boundary case** — When computing widths, an empty stack means the bar extends all the way to the left edge (width = current index). A common bug is forgetting this and computing an incorrect width.
