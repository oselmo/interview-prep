# Greedy Algorithms

## What Makes a Problem "Greedy"

A greedy algorithm makes the locally optimal choice at each step, hoping this leads to a globally optimal solution. The key question is always: **can you prove that a local greedy choice never leads you to miss a better global answer?**

Two conditions typically justify a greedy approach:
- **Greedy choice property** — a globally optimal solution can always be reached by making locally optimal choices
- **Optimal substructure** — an optimal solution contains optimal solutions to subproblems

If you can't prove both, you likely need dynamic programming instead.

---

## Recognizing Greedy Problems

Ask yourself:
- Does sorting the input first reveal an obvious choice order?
- Can you make an irrevocable decision at each step without reconsidering?
- Is the "best local option" always the biggest/smallest/earliest/latest thing?

Common phrasings in problem statements:
> "minimum number of...", "maximum number of...", "fewest...", "most efficient..."

---

## Core Greedy Patterns

### 1. Interval Scheduling (sort by end time)
Pick the maximum number of non-overlapping intervals.
- Sort by **end time**
- Always pick the interval that ends earliest — leaves the most room for future intervals

```python
def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda x: x[1])  # sort by end time
    count = 0
    last_end = float('-inf')
    for start, end in intervals:
        if start >= last_end:       # no overlap — take it
            last_end = end
        else:                       # overlap — remove this interval
            count += 1
    return count
```

### 2. Load Balancing / Makespan (min-heap)
Assign tasks to machines to minimize max completion time.
- Sort tasks **largest first** (Longest Processing Time — LPT rule)
- Always assign the next task to the **least-loaded machine** (min-heap by current load)
- The heap size equals the number of machines

```python
import heapq

def min_makespan(tasks, num_machines):
    tasks.sort(reverse=True)            # LPT: largest task first
    loads = [0] * num_machines
    heapq.heapify(loads)                # min-heap by current load
    for task in tasks:
        least = heapq.heappop(loads)    # machine with least work
        heapq.heappush(loads, least + task)
    return max(loads)
```

### 3. Greedy Pairing (sort + two pointers)
Match elements to minimize/maximize a metric.
- Sort the array
- Pair the largest with the smallest (or some systematic pairing)
- Walk inward with two pointers

```python
def num_rescue_boats(people, limit):
    people.sort()
    lo, hi = 0, len(people) - 1
    boats = 0
    while lo <= hi:
        if people[lo] + people[hi] <= limit:
            lo += 1     # heaviest fits with lightest — pair them
        hi -= 1         # heaviest always takes a boat
        boats += 1
    return boats
```

### 4. Frequency / Priority Greedy (max-heap)
Process the most-frequent or highest-priority item at each step.
- Count frequencies
- Use a max-heap; always process the most frequent item next

```python
import heapq
from collections import Counter

def least_interval(tasks, n):
    freq = Counter(tasks)
    max_heap = [-f for f in freq.values()]  # max-heap via negation
    heapq.heapify(max_heap)
    time = 0
    while max_heap:
        cycle = []
        for _ in range(n + 1):          # each CPU cycle: n+1 slots
            if max_heap:
                cycle.append(heapq.heappop(max_heap))
        for f in cycle:
            if f + 1 < 0:               # f is negative; +1 means one fewer
                heapq.heappush(max_heap, f + 1)
        time += n + 1 if max_heap else len(cycle)
    return time
```

### 5. Prefix Greedy (scan left to right, track running max/min)
Determine reachability or coverage by maintaining a running bound.
- At each index, update a running variable (e.g., "farthest reachable index")
- Return early if the invariant breaks

```python
def can_jump(nums):
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:       # can't reach this index — stuck
            return False
        max_reach = max(max_reach, i + jump)
    return True

def jump_game_ii(nums):         # minimum jumps to reach end
    jumps = cur_end = farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:        # exhausted current jump range
            jumps += 1
            cur_end = farthest
    return jumps
```

---

## Complexity

| Pattern | Time | Space |
|---|---|---|
| Interval scheduling (sort by end) | O(n log n) sort | O(1) |
| Load balancing / makespan (min-heap) | O(n log k) — n tasks, k machines | O(k) heap |
| Greedy pairing (two pointers) | O(n log n) sort | O(1) |
| Frequency greedy (max-heap) | O(n log n) | O(n) heap |
| Prefix greedy (running max) | O(n) | O(1) |

---

## Common Pitfalls

- **Greedy fails when choices have dependencies**: if choosing item A affects whether item B is worth taking, you need DP.
- **Wrong sort order**: greedy often hinges on the exact sort key. "Sort by start time" vs "sort by end time" can be the difference between optimal and wrong.
- **Equal-priority ties**: be explicit about how you break ties — they can affect correctness.

---

## Key Problems to Know

| Problem | Greedy strategy |
|---|---|
| Activity Selection / Non-overlapping Intervals | Sort by end time, pick earliest ending |
| Meeting Rooms II | Sort by start; min-heap of end times |
| Task Scheduler (cooldown) | Frequency counting; schedule most frequent first |
| Makespan Minimization | LPT rule; min-heap of machine loads |
| Jump Game | Track max reachable index as you scan |
| Boats to Save People | Sort; two pointers, pair heaviest with lightest |
| Assign Cookies | Sort both; match smallest sufficient cookie to smallest child |

---

## When Greedy Fails → Use DP Instead

- **0/1 Knapsack**: taking one item prevents another; need to try all combinations
- **Weighted Interval Scheduling**: maximizing total profit (not just count) requires DP + binary search
- **Coin Change** (non-canonical coins): greedy picks largest coin first, but that can fail

The test: if removing an earlier choice could always lead to a better solution, greedy is not sufficient.
