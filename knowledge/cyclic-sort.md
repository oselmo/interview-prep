# Cyclic Sort

## What Is This Pattern / When Do You Recognize It?

The pattern applies when you have an array of `n` integers where every value is in a known, bounded range — typically `[1, n]` or `[0, n-1]` — and the problem asks you to find missing numbers, duplicate numbers, or the smallest missing positive, ideally in O(n) time and O(1) space.

The giveaway: the problem involves numbers in a contiguous range and the array length is directly related to that range. If you see those two things together, cyclic sort is almost certainly the intended approach.

## Why It Works (The Key Insight)

If values are in `[1, n]` and the array has `n` slots, each value has a "home" index: the number `v` belongs at index `v - 1`. This is a bijection — one value maps to exactly one index.

Cyclic sort exploits this: iterate through the array and, for each element, if it's not already at its home index, *swap it there*. Because every swap places at least one element in its correct position, the total number of swaps is bounded by O(n) — you can't swap the same element home twice.

After the sort, a single linear scan tells you everything: any index `i` where `nums[i] != i + 1` is either missing a value or holding a duplicate.

## The Template

```python
def cyclic_sort(nums):
    i = 0
    while i < len(nums):
        # Where does nums[i] belong?
        correct = nums[i] - 1  # for range [1, n]
        if nums[i] != nums[correct]:
            nums[i], nums[correct] = nums[correct], nums[i]  # swap to home
        else:
            i += 1  # already in place (or duplicate — don't infinite loop)
    return nums

# After sorting, scan for anomalies:
def find_missing(nums):
    cyclic_sort(nums)
    for i, val in enumerate(nums):
        if val != i + 1:
            return i + 1
    return len(nums) + 1  # all 1..n present, missing is n+1
```

For range `[0, n-1]`, the home index for value `v` is just `v` (not `v - 1`).

For duplicates: after sorting, any index where `nums[i] - 1 != i` is occupied by a duplicate of whatever belongs there.

```python
def find_duplicate(nums):
    i = 0
    while i < len(nums):
        correct = nums[i] - 1
        if nums[i] != nums[correct]:
            nums[i], nums[correct] = nums[correct], nums[i]
        else:
            i += 1

    for i, val in enumerate(nums):
        if val != i + 1:
            return val  # this value appears here AND at its home index
    return -1
```

## Classic Problems

- **Find the Missing Number** — Array of `n` integers in range `[0, n]` with one missing. Cyclic sort (range `[0, n-1]` variant), then scan for the first out-of-place index. Alternatively solvable with XOR or sum formula, but cyclic sort generalizes to harder variants.

- **Find All Missing Numbers** — Array of `n` integers in `[1, n]`, multiple values may be missing. After cyclic sort, collect every index `i` where `nums[i] != i + 1`.

- **Find the Duplicate Number** — Array of `n+1` integers in `[1, n]`, exactly one duplicate. Cyclic sort, then scan for the impostor. (Floyd's cycle detection also works here if you model it as a linked list.)

- **Find All Duplicates in an Array** — Each integer in `[1, n]` appears once or twice. After cyclic sort, every index where `nums[i] != i + 1` reveals a duplicate.

## Edge Cases / Gotchas

- **Infinite loop on duplicates** — If `nums[i] == nums[correct]` and they're not both in the right place, swapping them does nothing and you'll loop forever. The fix: check `nums[i] != nums[correct]` *before* swapping; if they're equal, just advance `i`.

- **Range matters** — The home index formula changes with the range. `[1, n]` → home is `nums[i] - 1`. `[0, n-1]` → home is `nums[i]`. Getting this wrong is the most common bug.

- **Don't use this for arbitrary value ranges** — If values aren't in a tight range matching the array length, there's no meaningful "home" index and the pattern breaks down.

- **Multiple missing / multiple duplicates** — The scan at the end needs to collect *all* anomalies, not just return on the first one. Use an accumulator list, not an early return.

- **Smallest missing positive** — This is a cyclic sort problem in disguise. Ignore values outside `[1, n]`, sort the rest, scan. The first gap is your answer.
