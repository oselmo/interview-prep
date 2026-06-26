# Linked Lists & Heaps (Priority Queues)

## Linked Lists

### Core Structure

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

Access by index is O(n) — there's no random access. All the efficiency comes from O(1) insert/delete **when you already have a pointer** to the node.

### Common Patterns

**Two pointers (fast & slow):**
- Detect a cycle: slow moves 1 step, fast moves 2. If they meet → cycle.
- Find middle: when fast reaches end, slow is at middle.
- Find kth from end: advance fast by k steps first, then move both until fast reaches end.

**Reversing:**
Iterative (O(1) space): track `prev`, `curr`, `next`. At each step: save `next`, flip `curr.next = prev`, advance all three.

**Dummy head node:**
Avoids special-casing the head. Create `dummy = ListNode(0); dummy.next = head`. Return `dummy.next` at the end. Useful for: merge, insert, remove operations.

**Merging two sorted lists:**
Compare heads, take the smaller, recurse/iterate. O(m+n) time.

### Why LRU Cache Uses a Doubly Linked List

A hash map gives O(1) lookup by key. But to evict the LRU item, you need O(1) removal of an arbitrary node. A doubly linked list (with a pointer stored in the hash map) enables O(1) removal. The list maintains access order; the map gives fast key lookup.

---

## Heaps (Priority Queues)

### What a Heap Is

A **heap** is a complete binary tree stored as an array where the parent is always smaller (min-heap) or larger (max-heap) than its children.

- **Min-heap**: root is the minimum element. `heap[0]` = minimum.
- **Max-heap**: root is the maximum element.

**Core operations:**
- `push(x)`: add x, bubble up. O(log n)
- `pop()`: remove root (min/max), replace with last element, bubble down. O(log n)
- `peek()`: view root without removing. O(1)
- Build heap from array: O(n) (heapify)

### Python heapq

Python's `heapq` module is a **min-heap** only.

```python
import heapq

heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 2)
heapq.heappush(heap, 8)

smallest = heapq.heappop(heap)  # 2
```

For a max-heap: negate values: `heappush(heap, -x)`, `val = -heappop(heap)`.

For custom objects: push tuples `(priority, item)` — heapq compares by first element.

### When to Use a Heap

The heap is the right tool when you repeatedly need the minimum or maximum of a dynamically changing set.

**Pattern recognition:**
- "Top K largest/smallest" → heap of size k
- "Merge k sorted lists/arrays" → min-heap of (value, list_index)
- "Minimum cost to connect all points" → Prim's algorithm (min-heap)
- "Schedule tasks on the least-loaded machine" → min-heap of (current_load, machine_id)
- "Reorganize string / task scheduler" → max-heap of frequencies

### Heap vs Sorting

Sorting gives you everything in order at once — O(n log n) but all upfront.

A heap gives you the next min/max on demand — O(log n) per extraction. Better when:
- You don't need everything sorted, just the top k
- The dataset is dynamic (items are added/removed)
- You want to process items one at a time in priority order

### Two-Heap Pattern

Used for problems where you need the median of a stream, or to split data into two halves.

- **Max-heap** for the lower half (gives you the max of the lower half)
- **Min-heap** for the upper half (gives you the min of the upper half)
- Keep them balanced (sizes differ by at most 1)
- Median = average of both tops (even) or top of larger heap (odd)

### Common Problems

| Problem | Heap type | How |
|---|---|---|
| Top K Frequent Elements | Min-heap size k | Push (count, num); pop when size > k |
| Merge K Sorted Lists | Min-heap | Push (value, list_idx, node) |
| Find Median from Data Stream | Two heaps | Max-heap lower half, min-heap upper |
| Task Scheduler | Max-heap | Process most-frequent task first |
| Meeting Rooms II | Min-heap | Track earliest room-free time |
| Kth Largest Element | Min-heap size k | Keep k largest seen so far |

---

## Stacks & Queues

### Stack

LIFO — Last In, First Out. Push onto the top, pop from the top.

```python
stack = []
stack.append(1)     # push
stack.append(2)
top = stack[-1]     # peek without popping
val = stack.pop()   # pop → 2
```

**Classic stack problems:** valid parentheses, daily temperatures, largest rectangle in histogram, evaluate RPN expressions.

### Min Stack (Stack with O(1) getMin)

The trick: maintain a **parallel stack of minimums**. Every time you push, also push the current minimum (either the new value or the prior min, whichever is smaller). When you pop, pop from both stacks.

```python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        current_min = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(current_min)

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()    # always in sync with main stack

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.min_stack[-1]   # O(1)
```

**Why it works:** `min_stack[i]` is the minimum of all elements in `stack[0..i]`. When you pop, the new minimum is exactly `min_stack[i-1]` — no recomputation needed.

### Queue

FIFO — First In, First Out. Enqueue at the back, dequeue from the front.

```python
from collections import deque

q = deque()
q.append(1)         # enqueue
q.append(2)
front = q[0]        # peek
val = q.popleft()   # dequeue → 1
```

**Use `deque` not `list`:** `list.pop(0)` is O(n) because it shifts all elements. `deque.popleft()` is O(1).

### Monotonic Stack

A stack where elements are kept in monotonically increasing or decreasing order. When a new element violates the order, pop until the invariant is restored.

```python
def daily_temperatures(temps):
    stack = []      # indices; values decrease going down the stack
    result = [0] * len(temps)
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            idx = stack.pop()
            result[idx] = i - idx
        stack.append(i)
    return result
```

### Complexity Summary

| Structure | Push/Enqueue | Pop/Dequeue | Peek | getMin |
|---|---|---|---|---|
| Stack (list) | O(1) | O(1) | O(1) | O(n) naive |
| Min Stack | O(1) | O(1) | O(1) | O(1) |
| Queue (deque) | O(1) | O(1) | O(1) | — |
