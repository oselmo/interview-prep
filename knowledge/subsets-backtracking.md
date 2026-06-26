# Subsets & Backtracking

## What Is This Pattern / When Do You Recognize It?

Any problem that asks you to enumerate *all* valid configurations — every subset, every permutation, every combination, every valid board state — is a backtracking problem. The keyword is "all": all subsets, all paths, all arrangements, all solutions.

The shape of these problems: you're building something incrementally (a path, a board, a sequence), and at each step you have a set of choices. Some choices lead to dead ends; you abandon those and try the next option.

If the problem only asks for a *count* or a single *optimal* answer, consider DP or greedy first. If it asks for all possibilities, backtracking is almost always correct.

## Why It Works (The Key Insight)

Backtracking is structured exhaustive search on a decision tree. Each node in the tree represents a partial solution; each edge is a choice. You go deep (DFS), and when you reach a complete solution or a dead end, you *undo* the last choice and try the next branch.

The "undo" step is what makes it backtracking rather than plain recursion: after the recursive call returns, you pop the last element from your current path. This restores the state so the next branch sees a clean slate. Without this, paths bleed into each other.

The power of backtracking comes from **pruning**: if you can detect early that a partial solution can never lead to a valid complete solution, you skip the entire subtree beneath it. This is what separates an efficient backtracking solution from a brute-force one.

## The Template

```python
def backtrack(start, current_path, result, candidates):
    # Base case: record a complete solution
    result.append(list(current_path))  # snapshot — don't append the reference

    for i in range(start, len(candidates)):
        # --- Pruning goes here ---
        # e.g., if candidates[i] > remaining_target: break

        current_path.append(candidates[i])        # make a choice
        backtrack(i + 1, current_path, result, candidates)  # recurse
        current_path.pop()                        # undo the choice

# Subsets (no duplicates in input):
def subsets(nums):
    result = []
    backtrack(0, [], result, nums)
    return result

# Permutations:
def permutations(nums):
    result = []
    def bt(path, used):
        if len(path) == len(nums):
            result.append(list(path))
            return
        for i in range(len(nums)):
            if used[i]: continue
            used[i] = True
            path.append(nums[i])
            bt(path, used)
            path.pop()
            used[i] = False
    bt([], [False] * len(nums))
    return result
```

For **combinations** with a target sum, pass the remaining target and prune when a candidate exceeds it:

```python
def combination_sum(candidates, target):
    candidates.sort()  # sort enables early break
    result = []
    def bt(start, path, remaining):
        if remaining == 0:
            result.append(list(path))
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                break  # pruning: no point continuing
            path.append(candidates[i])
            bt(i, path, remaining - candidates[i])  # i, not i+1 = allow reuse
            path.pop()
    bt(0, [], target)
    return result
```

## Classic Problems

- **Subsets / Subsets II (with duplicates)** — Generate all subsets of an array. Without duplicates: the template above. With duplicates: sort first, then skip `candidates[i] == candidates[i-1]` when `i > start` to avoid duplicate subsets.

- **Permutations / Permutations II** — All orderings of an array. Use a `used[]` boolean array. For duplicates: sort, skip if `used[i-1]` is false and `nums[i] == nums[i-1]`.

- **N-Queens** — Place N queens on an N×N board so none attack each other. At each row, try each column; prune if any previously placed queen shares a column, diagonal, or anti-diagonal. Classic pruning showcase.

- **Word Search** — Find if a word exists in a 2D grid following adjacent cells. DFS/backtracking from each cell; mark visited in-place (replace with a sentinel), then restore after recursion.

## Edge Cases / Gotchas

- **Always snapshot the path** — `result.append(current_path)` appends a *reference*. By the time you're done, `current_path` is empty. Use `result.append(list(current_path))` or `result.append(current_path[:])`.

- **Duplicates in input** — Sort the input first. Then within the loop, skip `if i > start and nums[i] == nums[i-1]: continue`. The `i > start` check is critical: it allows the first occurrence to be used but skips subsequent identical choices at the same level.

- **Combinations vs. permutations** — Combinations pass `i + 1` as the next start (no reuse, no revisiting earlier elements). Permutations use a `used[]` array and always start from 0. Combination sum (with reuse) passes `i` instead of `i + 1`.

- **Pruning requires sorted input** — The `break` optimization (stop when `candidates[i] > remaining`) only works if candidates are sorted. Always sort when you plan to prune on value.

- **Stack depth** — Backtracking can go O(n) levels deep. For n > a few thousand, Python's default recursion limit may be an issue. Mention this in an interview, even if you don't hit it.
