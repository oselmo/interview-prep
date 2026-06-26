# Fast & Slow Pointers (Floyd's Cycle Detection)

## What Is This Pattern / When Do You Recognize It?

You have a sequence — usually a linked list — and you need to detect a cycle, find the middle, or check structural symmetry without using extra space. The moment you see "linked list + cycle" or "find middle in one pass" or "palindrome check in O(1) space," reach for fast and slow pointers.

The setup is always the same: two pointers start at (or near) the same position, but one moves faster than the other. Typically slow moves one step at a time, fast moves two.

## Why It Works (The Key Insight)

If there's a cycle, think of it like two runners on a circular track. The fast runner will eventually lap the slow one — they *must* meet inside the cycle. If there's no cycle, the fast pointer reaches the end (null) and you're done.

For finding the middle: by the time fast reaches the end of a list of length n, slow has traveled n/2 steps — exactly the middle. No counting required.

For palindrome detection: find the middle, reverse the second half in place, compare both halves. Restore if needed.

## The Template

```python
def has_cycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

def find_middle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # slow is now at the middle

def find_cycle_start(head):
    slow, fast = head, head
    # Phase 1: detect collision point
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return None  # no cycle

    # Phase 2: find entry point
    # Reset one pointer to head; move both one step at a time
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    return slow  # cycle start
```

The cycle start detection works because of a mathematical property: the distance from head to cycle entry equals the distance from the collision point to cycle entry (measured going forward in the cycle). It looks like magic but falls out of the algebra cleanly.

## Classic Problems

- **Linked List Cycle / Cycle II** — Detect whether a cycle exists; then find the node where the cycle begins. The two-phase approach above handles both.

- **Middle of the Linked List** — Return the middle node. If even length, return the second middle. The standard fast/slow template gives you this directly.

- **Palindrome Linked List** — Check if a linked list reads the same forwards and backwards in O(n) time and O(1) space. Find middle with fast/slow, reverse the second half, compare node by node.

- **Happy Number** — Repeatedly sum the squares of digits. Does the sequence cycle back to a non-1 number? Model the sequence as a linked list and apply cycle detection with fast/slow on the computed values.

## Edge Cases / Gotchas

- **Empty list or single node** — Always check `head` and `head.next` before starting. Your while condition `while fast and fast.next` handles this naturally.
- **Even vs. odd length for "find middle"** — With the standard template, even-length lists return the *second* middle. If a problem wants the first middle, stop when `fast.next` is null instead of `fast`.
- **Don't move fast before checking** — The check `if slow == fast` must come *after* both pointers move, not before (they both start at head, so they'd immediately "collide").
- **Palindrome: restore the list** — If the problem says don't modify the input, reverse the second half back after your comparison.
- **Cycle start math** — Don't try to re-derive it under pressure. Just memorize: after collision, reset one pointer to head, move both at speed 1, they meet at the cycle entry.
