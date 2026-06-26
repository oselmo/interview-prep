# Dynamic Programming

## What Is DP, Really?

Dynamic programming is just **recursion with a memory**. The idea is simple: if you're solving the same subproblem multiple times, store the answer the first time and look it up every time after. That's it. The fancy name makes it sound harder than it is.

The reason DP feels hard is not the memoization part — it's figuring out *how to define the subproblem*. Once you have the right state definition and the right recurrence relation, the code almost writes itself.

---

## When to Use It

A problem is a DP candidate when it has two properties:

**1. Overlapping subproblems** — The same exact question comes up multiple times in different branches of the recursion tree. For example, computing `fib(5)` requires `fib(3)` and `fib(4)`. Computing `fib(4)` also requires `fib(3)`. Without memoization, you compute `fib(3)` twice (and `fib(2)` four times, etc.). DP fixes this by caching.

**2. Optimal substructure** — You can build the optimal answer to the big problem from optimal answers to smaller versions of the same problem. The best path from A to C through B is: best path from A to B + best path from B to C. You don't need to reconsider A→B once you've solved it.

**Trigger phrases in problem statements:**
- "minimum number of..." / "maximum number of..."
- "how many ways can you..." / "count all paths..."
- "longest subsequence/substring..."
- "can you partition / reach / achieve X?"
- "minimum cost to transform X into Y"

**Constraint signals:** `n ≤ 1000` or `amount ≤ 10000` are classic DP-sized inputs. Too big for O(2^n) brute force, but O(n²) or O(n × amount) is fine.

**The simplest test:** write the naive recursive solution. If you draw the recursion tree and see the same function call appearing in multiple branches, DP applies.

---

## The Two Approaches

### Top-Down (Memoization)

Write the recursive solution you'd naturally write, then add a cache. When the function is called, check the cache first. If the answer is there, return it immediately. Otherwise compute it, store it, return it.

This approach is usually easier to arrive at because it follows your natural recursive thinking. The downside is that Python's default recursion limit is 1000 frames — on large inputs this can cause a stack overflow.

```python
from functools import lru_cache

def coin_change(coins, amount):
    @lru_cache(maxsize=None)
    def dp(remaining):
        if remaining == 0: return 0          # base: no coins needed
        if remaining < 0: return float('inf') # base: went too far
        return 1 + min(dp(remaining - c) for c in coins)
    result = dp(amount)
    return result if result != float('inf') else -1
```

### Bottom-Up (Tabulation)

Instead of starting from the big problem and recursing down, start from the smallest subproblems and build up. Fill an array or table in order, so that when you need `dp[i]`, all the smaller values it depends on are already filled.

The advantage: no recursion, no stack overflow risk, and it's usually easier to spot space optimizations (if `dp[i]` only depends on `dp[i-1]`, you only need two variables, not a whole array).

```python
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0                               # base: 0 coins to make amount 0
    for a in range(1, amount + 1):
        for coin in coins:
            if coin <= a:
                dp[a] = min(dp[a], dp[a - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
```

**Rule of thumb:** Start top-down to work out the logic. Convert to bottom-up if you need better performance or to avoid stack overflow.

---

## How to Approach Any DP Problem (Step by Step)

This process works for every DP problem you'll encounter:

**Step 1 — Define the state.** Ask: what information do I need to fully describe a subproblem? The state is the set of parameters your `dp` function takes. For coin change: `dp(remaining)` — just how much amount is left. For knapsack: `dp(item_index, remaining_capacity)` — two things. Getting the state wrong means your recurrence will be wrong regardless of implementation.

**Step 2 — Write the recurrence.** How does `dp[state]` depend on smaller states? This is the "choose or don't choose" / "try all options" step. For coin change: try each coin, take the minimum. For knapsack: either skip the current item (same as without it) or include it (add its value, reduce capacity).

**Step 3 — Identify base cases.** Where does the recursion bottom out? What are the trivially known answers? For coin change: `dp[0] = 0` (zero coins needed for zero amount). For knapsack: `dp[anything][0] = 0` (no capacity, no value).

**Step 4 — Choose fill order (for bottom-up).** Dependencies tell you fill order. If `dp[i]` depends on `dp[i-1]`, fill left to right. If `dp[i][j]` depends on `dp[i-1][j]` and `dp[i][j-1]`, fill row by row.

**Step 5 — Optimize space if needed.** If `dp[i]` only depends on `dp[i-1]`, shrink to two variables. If a 2D table only looks at the previous row, shrink to two 1D arrays.

---

## Pattern 1 — Linear DP

**What it is:** State is a single index. Each answer depends on a few previous answers. The simplest form of DP.

**The mental model:** You're walking through a sequence. At each position, your decision only depends on the last 1-2 positions, not the whole history.

**Climbing Stairs:** To reach step `n`, you came from step `n-1` (took 1 step) or step `n-2` (took 2 steps). So `dp[n] = dp[n-1] + dp[n-2]`. This is exactly Fibonacci.

**House Robber:** You can't rob adjacent houses. At house `i`, either skip it (best you had at `i-1`) or rob it (add its value to the best you had at `i-2`). So `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.

```python
# Climbing Stairs — O(n) time, O(1) space
def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(n - 2):
        a, b = b, a + b
    return b

# House Robber — O(n) time, O(1) space
def rob(nums):
    prev2, prev1 = 0, 0
    for num in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + num)
    return prev1

# Jump Game II — minimum jumps to reach end
def jump(nums):
    jumps = cur_end = farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:        # exhausted current jump's reach
            jumps += 1
            cur_end = farthest
    return jumps
```

---

## Pattern 2 — 0/1 Knapsack

**What it is:** You have items, each with a weight and value. You have a capacity. Maximize value without exceeding capacity. Each item is used at most once.

**The mental model:** For each item, you face a binary choice: include it or skip it. If you include it, you reduce your remaining capacity and gain its value. If you skip it, nothing changes. You want the best choice across all items.

**The key trick — reverse loop:** When you iterate `w` from high to low (reverse), each item is only "available" once per pass. If you iterated forward, you could "pick up" the same item multiple times (that would be unbounded knapsack).

**Why reverse loop prevents reuse:**
```
Suppose item has weight=2, capacity=6.
Forward (WRONG for 0/1): dp[2] updates first, then dp[4] sees updated dp[2] and can add item again.
Reverse (RIGHT for 0/1): dp[6] updates first using old dp[4], then dp[4] updates using old dp[2]. No item appears twice.
```

```python
# 0/1 Knapsack — O(n × W) time, O(W) space
def knapsack_01(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for i in range(len(weights)):
        for w in range(capacity, weights[i] - 1, -1):  # REVERSE
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[capacity]

# Subset Sum — can we reach exactly target?
def can_reach_sum(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True                            # can always make sum 0 (take nothing)
    for n in nums:
        for t in range(target, n - 1, -1):  # REVERSE
            dp[t] = dp[t] or dp[t - n]
    return dp[target]

# Partition Equal Subset Sum (LC 416)
def can_partition(nums):
    total = sum(nums)
    if total % 2: return False              # odd total can't split evenly
    return can_reach_sum(nums, total // 2)
```

**Knapsack table walkthrough:**
```
Items: weight=[1,3,4], value=[1,4,5], capacity=4

dp starts: [0, 0, 0, 0, 0]   (index = remaining capacity)

After item 1 (w=1, v=1):
  dp = [0, 1, 1, 1, 1]       (capacity 1+ can hold item 1)

After item 2 (w=3, v=4):
  dp = [0, 1, 1, 4, 5]       (capacity 3 = item2 alone=4, capacity 4 = items 1+2=5)

After item 3 (w=4, v=5):
  dp = [0, 1, 1, 4, 5]       (item3 at cap4 = 5, but items 1+2 = 5 too, tie)

Answer: dp[4] = 5
```

---

## Pattern 3 — Unbounded Knapsack

**What it is:** Same as 0/1 knapsack but items can be reused any number of times. The only code change: iterate the inner loop forward instead of reverse.

**Why forward loop allows reuse:** When you process capacity `w` forward, `dp[w - coin]` has already been updated in this same pass — meaning it already accounts for using the current coin. So you can use the same coin again.

**Coin change is the canonical example.** You have coin denominations. What's the fewest coins to make `amount`? Coins can be reused — it's unbounded.

```python
# Coin Change — fewest coins (unbounded knapsack, minimize)
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0                               # 0 coins needed to make amount 0
    for coin in coins:
        for a in range(coin, amount + 1):   # FORWARD — reuse allowed
            dp[a] = min(dp[a], dp[a - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

# Coin Change II — number of ways (unbounded knapsack, count)
def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1                               # one way to make 0: use no coins
    for coin in coins:
        for a in range(coin, amount + 1):   # FORWARD
            dp[a] += dp[a - coin]
    return dp[amount]
```

**Why `dp[0] = 1` for counting vs `dp[0] = 0` for minimizing:**
Counting problems ask "how many ways." There is exactly 1 way to make amount 0: use nothing. That's your seed. Every other amount's count is built by summing all the ways you could have gotten there.
Minimizing problems ask "fewest operations." Zero operations needed for amount 0. Initialize everything else to infinity — meaning "haven't found a path yet."

---

## Pattern 4 — Two-Sequence DP (LCS Family)

**What it is:** You have two sequences and you're comparing them. State is a 2D position: `dp[i][j]` means "the answer for the first `i` characters of sequence 1 and the first `j` characters of sequence 2."

**The mental model:** You build a grid where each cell `[i][j]` answers the question for prefixes of both strings. The answer at each cell depends on whether the current characters match, and on the three adjacent cells (above, left, diagonal).

**LCS recurrence logic:** At position `[i][j]`:
- If `s1[i] == s2[j]`: these characters contribute to the common subsequence. Add 1 to whatever we had without them: `dp[i-1][j-1] + 1`.
- If they don't match: we can skip the current char from either sequence. Take the better option: `max(dp[i-1][j], dp[i][j-1])`.

**Edit distance recurrence logic:** At position `[i][j]`:
- If `word1[i] == word2[j]`: no operation needed. Same as `dp[i-1][j-1]`.
- If they differ: we pick the cheapest of three operations: delete (`dp[i-1][j] + 1`), insert (`dp[i][j-1] + 1`), or replace (`dp[i-1][j-1] + 1`).

```python
# Longest Common Subsequence — O(m×n) time, O(m×n) space
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

# Edit Distance (Levenshtein) — O(m×n) time
def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i    # delete i chars from word1
    for j in range(n + 1): dp[0][j] = j    # insert j chars to reach word2
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j],    # delete from word1
                                   dp[i][j-1],    # insert into word1
                                   dp[i-1][j-1])  # replace
    return dp[m][n]
```

**LCS table for "ABCBDAB" vs "BDCAB":**
```
      ""  B  D  C  A  B
  ""   0  0  0  0  0  0
  A    0  0  0  0  1  1
  B    0  1  1  1  1  2
  C    0  1  1  2  2  2
  B    0  1  1  2  2  3
  D    0  1  2  2  2  3
  A    0  1  2  2  3  3
  B    0  1  2  2  3  4   ← LCS length = 4 ("BCAB" or "BDAB")
```

---

## Pattern 5 — Interval DP

**What it is:** The subproblem is a *range* of indices `[i..j]`. You answer the question for every possible subarray, building from short ranges to the full range. The fill order is always: shorter intervals first.

**The mental model:** For each interval, you pick some "split point" `k` in the middle, solve the two halves, and combine. The challenge is figuring out what "split point" means for your specific problem.

**Longest Palindromic Subsequence:** For a substring `s[i..j]`:
- If the endpoints match (`s[i] == s[j]`), they can both be part of the palindrome: `dp[i][j] = dp[i+1][j-1] + 2`.
- If they don't match, skip one end or the other: `dp[i][j] = max(dp[i+1][j], dp[i][j-1])`.
- Fill by increasing length so that when you compute `dp[i][j]`, `dp[i+1][j-1]` is already known.

```python
# Longest Palindromic Subsequence — O(n²) time, O(n²) space
def longest_palindrome_subseq(s):
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    for i in range(n):
        dp[i][i] = 1                        # every single char is a palindrome

    for length in range(2, n + 1):          # fill shortest intervals first
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = (dp[i+1][j-1] if length > 2 else 0) + 2
            else:
                dp[i][j] = max(dp[i+1][j], dp[i][j-1])
    return dp[0][n-1]
```

---

## Pattern 6 — Longest Increasing Subsequence

**What it is:** Find the length of the longest strictly increasing subsequence in an array. Elements don't have to be contiguous.

**The O(n²) approach:** `dp[i]` = length of LIS ending at index `i`. For each `i`, look back at every `j < i` where `nums[j] < nums[i]` and extend the best LIS that ended there.

**The O(n log n) insight:** Maintain a `tails` array where `tails[k]` is the smallest possible tail value of any increasing subsequence of length `k+1`. Binary search to find where the current element fits. This is called patience sorting.

```python
# O(n²) — easier to understand
def lis_n2(nums):
    n = len(nums)
    dp = [1] * n    # each element alone is a subsequence of length 1
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

# O(n log n) — patience sorting
import bisect
def lis_nlogn(nums):
    tails = []
    for n in nums:
        pos = bisect.bisect_left(tails, n)
        if pos == len(tails):
            tails.append(n)     # new longest subsequence
        else:
            tails[pos] = n      # keep tail as small as possible
    return len(tails)
```

**LIS walkthrough:**
```
nums =  [10,  9,  2,  5,  3,  7, 101,  18]
dp   =  [ 1,  1,  1,  2,  2,  3,   4,   4]

At index 5 (value 7):
  Look back: 2 < 7 (dp[2]=1), 5 < 7 (dp[3]=2), 3 < 7 (dp[4]=2)
  Best prior: dp[3] or dp[4] = 2
  dp[5] = 2 + 1 = 3   → "2 → 5 → 7" or "2 → 3 → 7"

LIS length = 4   (e.g., 2 → 3 → 7 → 18)
```

---

## Complexity

| Pattern | Time | Space | Optimized Space |
|---|---|---|---|
| Linear (Fibonacci, Stairs, Robber) | O(n) | O(n) | O(1) |
| 0/1 Knapsack | O(n × W) | O(n × W) | O(W) |
| Unbounded Knapsack | O(n × W) | O(W) | O(W) |
| Two-Sequence (LCS, Edit Distance) | O(m × n) | O(m × n) | O(min(m,n)) |
| Interval DP | O(n³) | O(n²) | — |
| LIS O(n²) | O(n²) | O(n) | — |
| LIS O(n log n) | O(n log n) | O(n) | — |

---

## Edge Cases / Gotchas

**State definition is everything.** Don't start coding until you can answer: "What does `dp[i]` (or `dp[i][j]`) mean in plain English?" If you can't state it clearly, your recurrence will be wrong.

**0/1 vs. unbounded is just loop direction.** Reverse inner loop = each item used at most once. Forward inner loop = items can be reused. This is the most common source of subtle bugs.

**"Number of ways" vs. "min/max" changes initialization.** Counting: `dp[0] = 1` (one way to do nothing), use addition. Optimizing: `dp[0] = 0`, everything else `inf` or `0` depending on direction, use min/max. Mixing these up gives wrong answers that can look plausible.

**Fill order matters for 2D DP.** For LCS, fill row by row. For interval DP, fill by increasing interval length. Draw the table, draw arrows showing which cells each cell depends on, then decide.

**Memoization needs hashable keys.** `lru_cache` can't cache lists. Convert `list` arguments to `tuple` before passing them as parameters.

**Always handle the "impossible" case.** If `dp[target]` is still `inf` after filling, the answer is -1 or "not possible." Never return `inf`.

**Space optimization pattern:** Before optimizing, draw the dependency arrows. If `dp[i]` only uses `dp[i-1]`, you need 2 variables. If a 2D table only reads from the previous row, use two 1D arrays and swap them.

---

## Problem → Pattern Quick Reference

| Problem | Pattern | The key state |
|---|---|---|
| Climbing Stairs | Linear | `dp[i]` = ways to reach step i |
| House Robber | Linear | `dp[i]` = max loot up to house i |
| Coin Change (fewest) | Unbounded knapsack | `dp[a]` = fewest coins for amount a |
| Coin Change II (ways) | Unbounded knapsack | `dp[a]` = number of ways to make a |
| 0/1 Knapsack | 0/1 knapsack | `dp[w]` = max value with capacity w |
| Subset Sum | 0/1 knapsack | `dp[t]` = can we reach sum t |
| Partition Equal Subset | 0/1 knapsack | Subset sum with target = total/2 |
| LCS | Two-sequence | `dp[i][j]` = LCS of prefixes of length i, j |
| Edit Distance | Two-sequence | `dp[i][j]` = edits to transform prefixes |
| Longest Palindromic Subseq | Interval DP | `dp[i][j]` = LPS of s[i..j] |
| LIS | LIS-specific | `dp[i]` = LIS length ending at i |
| Word Break | Linear + set | `dp[i]` = can we break s[0..i] |
