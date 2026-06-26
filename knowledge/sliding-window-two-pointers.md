# Sliding Window & Two Pointers

## The Core Idea

Both patterns avoid nested loops (O(n²)) by maintaining a "window" or pair of indices that move through the array in a coordinated way — achieving O(n).

---

## Two Pointers

Two pointers works when the array is **sorted** (or when direction of pointer movement is determined by a clear condition).

**Pattern:**
```
left = 0, right = n - 1
while left < right:
    if condition(arr[left], arr[right]):
        process pair, move both inward
    else:
        move one pointer (the one that makes the condition better)
```

**When to use:**
- Finding pairs that sum to a target (sorted array)
- Partitioning (e.g., move all 0s to front)
- Removing duplicates in-place
- Merging two sorted arrays
- Boats / pairing problems

**Key insight:** because the array is sorted, moving the left pointer right increases the sum, moving the right pointer left decreases it. This guarantees you won't miss any valid pairs.

---

## Sliding Window

Sliding window works on **contiguous subarrays or substrings**. The window expands to the right and contracts from the left based on a validity condition.

### Fixed-size window
Window size k is given. Slide it across: add the new right element, remove the leftmost element.
```
for i in range(k, n):
    window_sum += arr[i]
    window_sum -= arr[i - k]
    result = max(result, window_sum)
```

### Variable-size window
The window grows to the right (expand) and shrinks from the left (contract) to maintain a valid state.

**Template:**
```
left = 0
for right in range(n):
    # Expand: add arr[right] to window state
    
    while window is invalid:
        # Contract: remove arr[left] from window state
        left += 1
    
    # Window [left..right] is valid — update answer
    result = max(result, right - left + 1)
```

**When to use:**
- Longest substring with at most k distinct characters
- Longest substring without repeating characters
- Minimum window substring
- Maximum sum subarray of size k

---

## Distinguishing the Two

| Situation | Pattern |
|---|---|
| Sorted array, working with pairs | Two Pointers |
| Contiguous subarray/substring | Sliding Window |
| Order matters, can't sort | Sliding Window |
| Order doesn't matter, need pairs | Two Pointers |

---

## Sliding Window State

The "state" you track inside the window depends on the problem:
- **Character frequency map** → for substring uniqueness/coverage problems
- **Running sum** → for subarray sum problems
- **Count of satisfying elements** → for count-based constraints

The window is "valid" when its state satisfies the problem constraint. You contract (left++) when it doesn't.

---

## Common Problems

| Problem | Type | Key state |
|---|---|---|
| Longest Substring Without Repeating Chars | Variable window | char → last index map |
| Minimum Window Substring | Variable window | char frequency map |
| Max Consecutive Ones III | Variable window | count of 0s flipped |
| Longest Subarray with Sum ≤ k | Variable window | running sum |
| Two Sum (sorted) | Two pointers | sum comparison |
| Boats to Save People | Two pointers | weight sum ≤ limit |
| Container With Most Water | Two pointers | min height × distance |

---

## Pitfalls

- **Shrinking the wrong end**: you always move `left` forward (not right) when contracting
- **Off-by-one in window size**: `right - left + 1` for inclusive bounds
- **Not handling the last window**: in some formulations you need to process the final window after the loop
