# Merge Intervals

## What Is This Pattern / When Do You Recognize It?

Any time a problem gives you a list of intervals (start, end pairs) and asks about overlap, merging, coverage gaps, or insertion — you're in merge intervals territory.

Trigger phrases: "merge all overlapping intervals," "find the minimum number of meeting rooms," "insert this interval into a sorted list," "find the total covered length." If intervals are involved and ordering matters, this pattern applies.

## Why It Works (The Key Insight)

Intervals are hard to reason about when they're scattered randomly. Sorting by start time imposes a linear order so that any interval that could overlap with interval `i` must come *immediately after* it in the sorted list — you never need to look back more than one step.

Once sorted, the logic reduces to a single comparison: does the next interval's start fall before or at the current interval's end? If yes, merge. If no, the current interval is finalized and you move on.

```
sorted by start:  [1,4]  [2,6]  [8,10]  [9,11]
                    ^------^              merge → [1,6]
                                 ^---------^    merge → [8,11]
result: [[1,6], [8,11]]
```

## The Template

```python
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        last_end = merged[-1][1]
        if start <= last_end:           # overlap condition
            merged[-1][1] = max(last_end, end)  # extend
        else:
            merged.append([start, end]) # no overlap, new interval

    return merged
```

**Insert Interval variant** — the list is already sorted; you need to insert one new interval and re-merge:

```python
def insert(intervals, new_interval):
    result = []
    i, n = 0, len(intervals)

    # Add all intervals that end before new_interval starts
    while i < n and intervals[i][1] < new_interval[0]:
        result.append(intervals[i])
        i += 1

    # Merge all overlapping intervals with new_interval
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1

    result.append(new_interval)

    # Add remaining intervals
    result.extend(intervals[i:])
    return result
```

## Classic Problems

- **Merge Intervals** — Given a list of intervals, merge all that overlap. Pure application of the sort-and-scan template above.

- **Insert Interval** — A sorted list of non-overlapping intervals; insert a new one and return the merged result. Use the three-phase approach: pass-through before, merge overlapping, pass-through after.

- **Non-overlapping Intervals** — Find the minimum number of intervals to *remove* so no two overlap. Greedy: sort by end time, keep intervals that don't conflict, count the rest. Related to the interval scheduling maximization problem.

- **Meeting Rooms II** — Given meeting time intervals, find the minimum number of conference rooms required. Use a min-heap of end times: if the next meeting starts after the earliest-ending room is free, reuse it; otherwise allocate a new room.

## Edge Cases / Gotchas

- **Overlap condition is `start2 <= end1`, not `<`** — Intervals that share exactly one point (e.g., [1,3] and [3,5]) are considered overlapping in most problems. Using strict less-than will silently miss these.

- **Always check if `intervals` is empty** before accessing `intervals[0]`.

- **When merging, take `max` of end times** — don't just use the new interval's end. A contained interval (e.g., [1,10] then [2,5]) would incorrectly shrink your merged end if you aren't careful.

- **Sort stability** — If two intervals have the same start, the order of their ends doesn't matter for correctness, but be aware it can affect intermediate state.

- **Meeting Rooms I vs. II** — Meeting Rooms I just asks if *any* overlap exists (check after sorting if `intervals[i][0] < intervals[i-1][1]`). Meeting Rooms II asks for the *count* of rooms needed. Don't conflate them.

- **Interval representation** — Some problems use inclusive ends, some exclusive. Clarify before coding; it affects the overlap check by ±1.
