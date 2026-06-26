# K-Way Merge

## What Is This Pattern / When Do You Recognize It?

You have `k` sorted sequences (lists, arrays, streams) and need to combine them efficiently — either fully merging them into one sorted result, or picking the globally smallest/largest elements without merging everything.

Trigger phrases: "merge k sorted lists," "find the kth smallest element across k sorted arrays," "find the smallest range that covers at least one element from each of k lists." Basically: multiple sorted inputs, one coherent sorted output or ordered answer.

The brute-force is to dump everything into one array and sort it: O(N log N) where N is total elements. K-way merge with a heap does it in O(N log k) — a big win when k << N.

## Why It Works (The Key Insight)

At any point during the merge, you need the globally smallest remaining element. That element *must* be the front of one of the k lists (since each list is sorted). A min-heap lets you find and remove that minimum in O(log k) time and immediately insert the next candidate from the same list.

Think of it as a tournament: the heap is the bracket holding the current "frontrunners" from each list. Every time you pull the winner, you replace them with the next competitor from their list.

```
Lists:  [1,4,7]  [2,5,8]  [3,6,9]
Heap (initially): {1, 2, 3}

Pop 1 → push 4  → heap {2, 3, 4}
Pop 2 → push 5  → heap {3, 4, 5}
Pop 3 → push 6  → heap {4, 5, 6}
...
```

Each pop-and-push is O(log k). Total elements N → O(N log k).

## The Template

```python
import heapq

def merge_k_sorted_lists(lists):
    min_heap = []
    # Push (value, list_index, element_index) for each list's first element
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(min_heap, (lst[0], i, 0))

    result = []
    while min_heap:
        val, list_idx, elem_idx = heapq.heappop(min_heap)
        result.append(val)
        next_idx = elem_idx + 1
        if next_idx < len(lists[list_idx]):
            next_val = lists[list_idx][next_idx]
            heapq.heappush(min_heap, (next_val, list_idx, next_idx))

    return result

# For linked lists (LeetCode style):
def merge_k_lists(lists):
    min_heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(min_heap, (node.val, i, node))

    dummy = ListNode(0)
    curr = dummy
    while min_heap:
        val, i, node = heapq.heappop(min_heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(min_heap, (node.next.val, i, node.next))

    return dummy.next
```

Note: in Python, if two elements in the heap have the same value, it will try to compare the second element of the tuple (the list index). This is fine with integers but breaks with ListNode objects — include the index as the tiebreaker, which is why `(val, i, node)` works.

## Classic Problems

- **Merge K Sorted Lists** — Direct application of the template above with linked list nodes. Push each list's head; pop the min, advance that list, push the next node.

- **Kth Smallest Element in a Sorted Matrix** — An n×n matrix where each row and column is sorted. Treat each row as a sorted list. Push the first element of each row. Pop k times total; the kth pop is your answer. (Alternative: binary search on value.)

- **Find K Pairs with Smallest Sums** — Given two sorted arrays, find the k pairs (u, v) with the smallest `u + v`. Push `(nums1[0] + nums2[j], 0, j)` for all j initially (or just j=0 and expand carefully). Each pop generates the next candidate.

- **Smallest Range Covering Elements from K Lists** — Find the smallest window [a, b] such that at least one element from each of the k lists falls in [a, b]. Keep all lists' current pointers in a min-heap, track the current max. The range is [heap_min, current_max]. Advance the list with the current minimum element.

## Edge Cases / Gotchas

- **Empty lists** — Check before pushing to the heap. An empty list has no first element to push.

- **Heap comparison with non-comparable objects** — Python's heap compares tuples element by element. If two entries have the same value and the second element (like a ListNode) doesn't support `<`, you'll get a TypeError. Always include a unique tiebreaker (list index works perfectly).

- **O(N log k) vs. O(N log N)** — This matters most when k is small and N is large (e.g., k=10 lists with 1M elements each). When k ≈ N, the advantage disappears.

- **Kth smallest: don't merge everything** — If you only need the kth element, you can stop after k pops. You don't need to fully merge all lists.

- **Matrix variant: which rows to include** — For an n×n matrix, you could push n rows, but if k < n you're doing unnecessary work. Some solutions use a more targeted approach; know the simple version first, optimize if asked.
