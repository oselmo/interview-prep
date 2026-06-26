# Trie (Prefix Tree)

## What Is This Pattern / When Do You Recognize It?

A trie is a tree where each node represents a single character, and paths from root to nodes spell out strings. The root represents the empty string. Every word you insert shares nodes with other words that share its prefix.

Reach for a trie when:
- You need fast prefix lookups (autocomplete, "does any word start with X?")
- You're searching for multiple words in a grid simultaneously
- The problem involves finding the longest common prefix across many strings
- You're replacing words in a sentence with their shortest "root" from a dictionary

The giveaway: the problem involves a *set of strings* and queries about prefixes, not just exact matches. A hash set handles exact matches in O(1); a trie handles prefix queries in O(L) where L is the length of the prefix.

## Why It Works (The Key Insight)

A trie exploits the fact that strings sharing a prefix also share storage. Instead of storing each word independently, words branch off from the last character they have in common. This makes prefix queries O(L) — you just walk down the tree following each character, and you know immediately when a prefix doesn't exist (no child node for that character).

Compared to a hash set, you lose O(1) exact-match lookup but gain:
- Prefix existence check in O(L)
- All words with a given prefix (subtree enumeration)
- Ordered iteration over all stored words
- Simultaneous multi-word search in grids

## The Template

```python
class TrieNode:
    def __init__(self):
        self.children = {}      # char → TrieNode
        self.is_end = False     # marks end of a valid word

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_end  # must be end of a complete word

    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True  # no need to check is_end — any prefix counts
```

For word search in a grid, attach the word to the terminal node so you can retrieve it without extra tracking:

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None  # stores the complete word at end nodes

# DFS from each cell, walk the trie simultaneously:
def find_words(board, words):
    trie = Trie()
    for word in words: trie.insert(word)

    result = set()
    rows, cols = len(board), len(board[0])

    def dfs(node, r, c):
        ch = board[r][c]
        if ch not in node.children:
            return
        next_node = node.children[ch]
        if next_node.word:
            result.add(next_node.word)
        board[r][c] = '#'  # mark visited
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':
                dfs(next_node, nr, nc)
        board[r][c] = ch  # restore

    for r in range(rows):
        for c in range(cols):
            dfs(trie.root, r, c)
    return list(result)
```

## Classic Problems

- **Implement Trie (Prefix Tree)** — Build insert, search, and startsWith. The direct implementation of the template above. Interviewers sometimes ask for an array-based node (`children = [None] * 26`) instead of a dict — know both.

- **Word Search II** — Find all words from a dictionary that exist in a 2D grid of characters. Naive approach: run Word Search I for each word — O(W × M × N × 4^L). With a trie: build a trie of all words, run a single DFS from each cell and walk the trie simultaneously — O(M × N × 4^L) regardless of dictionary size.

- **Replace Words** — Given a list of root words and a sentence, replace every word in the sentence with its shortest matching root from the list. Build a trie of roots; for each word in the sentence, walk the trie until you hit an `is_end` node (the shortest root) or exhaust the trie.

- **Longest Common Prefix** — Find the longest prefix shared by all strings in an array. Insert all strings into a trie; walk from root following single-child nodes until you reach a fork or an `is_end` marker.

## Edge Cases / Gotchas

- **`search` vs. `starts_with`** — The only difference: `search` checks `node.is_end`, `starts_with` does not. Forgetting `is_end` in `search` will return true for prefixes that aren't complete words (e.g., searching for "app" would incorrectly match "apple").

- **Array vs. dict children** — `children = [None] * 26` (for lowercase a-z) is faster and uses fixed space. `children = {}` is more general but slightly slower. In interviews, dict is usually fine unless performance is a bottleneck.

- **Pruning in Word Search II** — After finding a word, set `next_node.word = None` to avoid adding it to results multiple times. You can also prune leaf nodes from the trie after finding their word to skip dead branches in future DFS calls.

- **Empty string** — Inserting an empty string sets `root.is_end = True`. Searching for an empty string returns True. Make sure this behavior matches what the problem expects.

- **Memory** — A trie for 10,000 words each of length 10 could have up to 100,000 nodes. Each node has up to 26 child pointers. For a very large dictionary, memory usage matters. Compressed tries (radix trees) address this but are complex to implement in an interview.
