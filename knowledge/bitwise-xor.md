# Bitwise XOR

## What Is This Pattern / When Do You Recognize It?

XOR-based problems show up in a specific family: finding the one element in an array that doesn't have a pair, finding a missing number in a sequence, or doing in-place bit manipulation without extra space.

Reach for XOR when:
- Every element appears twice except one (or two)
- You need to find a missing number in range `[1, n]` without extra space
- The problem mentions O(1) space and the values are integers
- You see bit manipulation hints in the constraints (values are small, or the problem is about flipping/toggling bits)

## Why It Works (The Key Insight)

XOR has three properties that make it magic for these problems:

1. **Self-inverse**: `x ^ x = 0` — XOR a number with itself and you get zero. Pairs cancel out.
2. **Identity**: `x ^ 0 = x` — XOR with zero does nothing.
3. **Commutative and associative**: order doesn't matter. `a ^ b ^ a = b`.

These three properties together mean: if you XOR every element in an array where all values appear twice except one, all the pairs cancel to zero and you're left with the lone element. No sorting, no hashing, no extra space.

For missing number: XOR every index `0..n` with every element. Pairs (index `i` and value `i`) cancel; the unpaired index is the missing number.

## The Template

```python
# Single non-duplicate in array of pairs
def find_single(nums):
    result = 0
    for n in nums:
        result ^= n
    return result

# Missing number in [0, n]
def missing_number(nums):
    n = len(nums)
    result = n  # start with n so we XOR 0..n
    for i, num in enumerate(nums):
        result ^= i ^ num
    return result

# Two non-repeating numbers in array of pairs
def find_two_singles(nums):
    xor = 0
    for n in nums: xor ^= n        # xor = a ^ b (the two unique numbers)

    # Find any bit that differs between a and b
    # The rightmost set bit in xor is set in one but not the other
    diff_bit = xor & (-xor)        # isolates lowest set bit

    a, b = 0, 0
    for n in nums:
        if n & diff_bit:
            a ^= n  # group where this bit is set
        else:
            b ^= n  # group where this bit is not set
    return [a, b]

# Check if a number is a power of 2
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

# Count set bits (Brian Kernighan's algorithm)
def count_bits(n):
    count = 0
    while n:
        n &= n - 1  # clears the lowest set bit
        count += 1
    return count
```

## Classic Problems

- **Single Number** — Array where every element appears twice except one. XOR all elements; pairs cancel, lone element remains. O(n) time, O(1) space.

- **Missing Number** — Array of `n` distinct numbers in range `[0, n]` with one missing. XOR all indices `0..n` with all array values; paired values cancel, the unpaired index is the answer. (Alternatively: expected sum minus actual sum, but XOR works even when sum would overflow.)

- **Single Number III** — Array where every element appears twice except two. XOR all to get `a ^ b`, find a differing bit, partition elements into two groups by that bit, XOR each group separately to isolate `a` and `b`.

- **Reverse Bits / Number of 1 Bits** — Classic bit manipulation. Use `n & 1` to check the lowest bit, `n >> 1` to shift, or `n & (n-1)` to clear the lowest set bit in a counting loop.

## Edge Cases / Gotchas

- **Operator precedence** — XOR (`^`) has lower precedence than `==`, `+`, `-`, and comparisons. Always parenthesize: `if (a ^ b) == 0` not `if a ^ b == 0`. In Python `^` also appears as exponentiation in some contexts — it doesn't here, but don't confuse them in other languages.

- **XOR is not the same as OR** — `|` sets bits; `^` flips bits. Easy to mix up when writing fast.

- **Two singles: the diff_bit trick** — `xor & (-xor)` isolates the lowest set bit because `-xor` is the two's complement of `xor`. This works in Python because Python integers handle negative numbers correctly, but be aware of fixed-width integer behavior in C++/Java (use `xor & ~(xor - 1)` or just `xor & (-xor)` with care).

- **"Every element appears three times except one"** — XOR doesn't work here. You need a bit-counting approach: for each of the 32 bit positions, count how many numbers have that bit set. If `count % 3 != 0`, the single number has that bit set. This is a common trap designed to test whether you actually understand XOR or just memorized it.

- **Negative numbers** — XOR works on the bit representation, so it handles negatives correctly in two's complement. Be aware when dealing with signed vs. unsigned integers in statically typed languages.
