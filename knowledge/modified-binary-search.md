# Modified Binary Search

## What Is This Pattern / When Do You Recognize It?

Classic binary search finds a target in a sorted array in O(log n). Modified binary search extends this idea to problems where the array isn't perfectly sorted (rotated arrays, mountain arrays) or where you're not searching the array directly but searching an *answer space*.

Reach for modified binary search when:
- The input is sorted but with a twist (rotated, nearly sorted, 2D matrix)
- You need the first or last position of a target (not just any position)
- The problem says "minimize the maximum" or "find the smallest X that satisfies condition Y" — this screams binary search on the answer space
- The brute force is O(n) and you sense an O(log n) is possible

## Why It Works (The Key Insight)

Binary search works on any *monotone* property — any condition that is false for a contiguous range of values and true for the rest (or vice versa). You don't need a fully sorted array; you need a way to eliminate half the search space at each step.

For rotated arrays: even though the whole array isn't sorted, **one of the two halves always is**. That's the key. Determine which half is sorted, check if your target falls in that half, and eliminate the other half.

For answer-space search: instead of searching the array, you binary search over possible answers (e.g., search over "capacity" values from 1 to max). For each candidate answer, check feasibility in O(n). Total: O(n log n) instead of O(n^2) brute force.

## The Template

```python
# Standard binary search skeleton — all variants start here
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2  # avoids overflow vs (lo+hi)//2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# Rotated sorted array
def search_rotated(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid
        # Left half is sorted
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1

# First position of target (leftmost)
def find_first(arr, target):
    lo, hi, result = 0, len(arr) - 1, -1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target:
            result = mid
            hi = mid - 1  # keep looking left
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return result

# Answer-space binary search template
def binary_search_on_answer(lo, hi, feasible):
    result = hi
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if feasible(mid):
            result = mid
            hi = mid - 1  # try smaller
        else:
            lo = mid + 1
    return result
```

## Classic Problems

- **Search in Rotated Sorted Array** — A sorted array was rotated at some pivot; find target. The key move: determine which half is sorted by comparing `nums[lo]` and `nums[mid]`, then check if target is in the sorted half.

- **Find First and Last Position of Element** — Run find_first and find_last (mirror of find_first but keep looking right). Two binary searches, still O(log n).

- **Search a 2D Matrix** — A matrix where each row is sorted and the first element of each row is greater than the last of the previous row. Treat it as a flattened sorted array: `row = mid // cols`, `col = mid % cols`.

- **Koko Eating Bananas / Capacity to Ship Packages** — Binary search on the answer (eating speed or ship capacity). `lo = 1`, `hi = max(piles)`. For each candidate, check if the condition is achievable in the given time. Classic answer-space search.

## Complexity

| Variant | Time | Space |
|---|---|---|
| Standard binary search | O(log n) | O(1) |
| Rotated array search | O(log n) | O(1) |
| First / last position | O(log n) | O(1) |
| 2D matrix search | O(log(m × n)) | O(1) |
| Answer-space search | O(n log n) — O(log(hi-lo)) iterations × O(n) feasibility check | O(1) or O(n) depending on feasibility fn |
| With duplicates (rotated) | O(n) worst case | O(1) |

## Edge Cases / Gotchas

- **`lo + (hi - lo) // 2` not `(lo + hi) // 2`** — In Python overflow isn't an issue, but this habit matters in Java/C++. Write it correctly anyway.

- **`<=` in `while lo <= hi`** — Using `<` causes the loop to exit one step too early, missing the case where `lo == hi` (a valid single-element range).

- **Rotated array with duplicates** — When `nums[lo] == nums[mid]`, you can't determine which half is sorted. Fall back to `lo += 1` to shrink the window. This degrades to O(n) worst case.

- **Off-by-one in finding first/last** — After finding a match, move `hi = mid - 1` (for first) or `lo = mid + 1` (for last). Forgetting to record `result = mid` before moving is a common bug.

- **Answer-space: set lo and hi correctly** — Think carefully about the minimum and maximum possible answers. An off-by-one on `hi` can exclude the correct answer from your search space.

- **Feasibility function must be monotone** — If `feasible(x)` is true, then `feasible(x+1)` must also be true (or false, depending on direction). If the property isn't monotone, binary search doesn't apply.
