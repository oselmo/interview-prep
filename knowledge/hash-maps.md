# Hash Maps & Arrays

## Why Hash Maps

A hash map gives you O(1) average-case insert, delete, and lookup. The core trade-off: O(n) extra space in exchange for turning an O(n²) brute-force into O(n). Almost any problem that says "find a pair" or "count occurrences" benefits from a hash map.

---

## Pattern 1 — Frequency Count

Count how many times each element appears. Then answer questions about those counts.

```python
from collections import Counter

def word_frequencies(words):
    freq = Counter(words)           # Counter is a dict subclass
    return dict(freq)

# Manually (same thing):
def word_frequencies_manual(words):
    freq = {}
    for w in words:
        freq[w] = freq.get(w, 0) + 1
    return freq
```

**Common follow-ups:**
- Most frequent element: `max(freq, key=freq.get)`
- Top k frequent: use a heap or sort by value
- Anagram check: `Counter(s) == Counter(t)`

---

## Pattern 2 — Two Sum / Complement Lookup

Instead of checking every pair O(n²), store what you've seen and look up the complement in O(1).

```python
def two_sum(nums, target):
    seen = {}                       # value → index
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []
```

**The mental model:** At each element, ask "have I already seen what I need to pair with this?" If yes, done. If no, record this element for future elements to find.

**Variants:**
- Two Sum II (sorted array): use two pointers instead — no extra space
- Three Sum: sort + fix one element + two-pointer for the other two
- Subarray with sum K: prefix sum + hash map

---

## Pattern 3 — Prefix Sum + Hash Map

Track running sums. A subarray from index `i` to `j` has sum `prefix[j] - prefix[i-1]`. If you need subarrays that sum to `k`, look for earlier prefix sums equal to `current - k`.

```python
def subarray_sum_equals_k(nums, k):
    prefix_count = {0: 1}           # sum 0 seen once (empty prefix)
    running = 0
    count = 0
    for n in nums:
        running += n
        count += prefix_count.get(running - k, 0)
        prefix_count[running] = prefix_count.get(running, 0) + 1
    return count
```

---

## Pattern 4 — Grouping / Bucketing

Group elements by a computed key. The key is always some canonical form of the element.

```python
def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = tuple(sorted(s))      # canonical form: sorted chars
        groups.setdefault(key, []).append(s)
    return list(groups.values())

def group_by_field(records, field):
    groups = {}
    for r in records:
        key = r[field]
        groups.setdefault(key, []).append(r)
    return groups
```

---

## Pattern 5 — Sliding Window + Hash Map

Maintain a window of valid elements using a map to track counts inside the window. Expand right, shrink left when the constraint is violated.

```python
def longest_substring_without_repeating(s):
    last_seen = {}
    left = 0
    best = 0
    for right, c in enumerate(s):
        if c in last_seen and last_seen[c] >= left:
            left = last_seen[c] + 1   # shrink window past the duplicate
        last_seen[c] = right
        best = max(best, right - left + 1)
    return best

def min_window_substring(s, t):
    need = Counter(t)
    have = {}
    formed = 0
    required = len(need)
    left = 0
    best = (float('inf'), 0, 0)
    for right, c in enumerate(s):
        have[c] = have.get(c, 0) + 1
        if c in need and have[c] == need[c]:
            formed += 1
        while formed == required:
            if right - left + 1 < best[0]:
                best = (right - left + 1, left, right)
            lc = s[left]
            have[lc] -= 1
            if lc in need and have[lc] < need[lc]:
                formed -= 1
            left += 1
    return s[best[1]:best[2]+1] if best[0] != float('inf') else ''
```

---

## Python: `defaultdict` and `Counter`

```python
from collections import defaultdict, Counter

# defaultdict avoids KeyError — provides a default value on missing key
freq = defaultdict(int)     # missing key → 0
freq['a'] += 1

groups = defaultdict(list)  # missing key → []
groups['x'].append(1)

# Counter: dict subclass specialized for counting
c = Counter(['a','b','a','c','a'])  # Counter({'a':3, 'b':1, 'c':1})
c.most_common(2)                    # [('a', 3), ('b', 1)]
c['a'] -= 1                         # decrement; can go negative
```

---

## JavaScript: Map vs Object

```typescript
// Map: keys can be any type; preserves insertion order; has .size
const map = new Map<string, number>();
map.set('a', 1);
map.get('a');           // 1
map.has('b');           // false
map.delete('a');

// Set: unique values, O(1) lookup
const seen = new Set<number>();
seen.add(1);
seen.has(1);            // true

// Object as frequency map (string keys only)
const freq: Record<string, number> = {};
freq[word] = (freq[word] ?? 0) + 1;
```

**Use `Map` over plain objects when:** keys aren't strings, you need iteration order, or you're checking `.size` frequently.

---

## Complexity

| Operation | Hash Map avg | Hash Map worst | Sorted array |
|---|---|---|---|
| Insert | O(1) | O(n) collision | O(log n) |
| Lookup | O(1) | O(n) collision | O(log n) |
| Delete | O(1) | O(n) collision | O(n) |
| Min/Max | O(n) | O(n) | O(1) |

Worst case O(n) happens with hash collisions — rare with good hash functions, essentially never in interview inputs.

---

## Edge Cases / Gotchas

- **Empty input:** `freq.get(key, 0)` handles missing keys without KeyError. Use this instead of `freq[key]` when you're not sure the key exists.
- **Case sensitivity:** `s.lower()` before inserting if case doesn't matter.
- **Mutable keys:** Lists can't be dict keys in Python (not hashable). Convert to `tuple` first.
- **`defaultdict` hides bugs:** accessing a missing key silently creates it with the default. Can make debugging confusing. Use `.get()` or `in` checks when you need to distinguish "absent" from "zero."
- **Prefix sum initialization:** `prefix_count = {0: 1}` — don't forget the seed. Without it you miss subarrays that start at index 0.

---

## Key Problems to Know

| Problem | Pattern |
|---|---|
| Two Sum | Complement lookup |
| Group Anagrams | Group by sorted-key |
| Subarray Sum Equals K | Prefix sum + map |
| Longest Substring Without Repeating | Sliding window + map |
| Minimum Window Substring | Sliding window + two frequency maps |
| Top K Frequent Elements | Frequency count + heap |
| Valid Anagram | Counter comparison |
| Word Frequencies | Basic frequency count |
