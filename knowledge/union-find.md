# Union-Find (Disjoint Set Union)

## What Is This Pattern / When Do You Recognize It?

Union-Find tracks which elements belong to the same group (component) and supports two operations efficiently:
- **find(x)** — which group does x belong to? (returns a representative/"root")
- **union(x, y)** — merge the groups containing x and y

Reach for Union-Find when:
- The problem involves grouping elements into connected components dynamically
- You're processing edges one at a time and need to know if two nodes are already connected
- The problem asks "are these two things in the same group?" or "how many groups are there?"
- Keywords: "connected components," "accounts merge," "number of provinces," "redundant connection"

The key distinction from BFS/DFS: Union-Find handles *dynamic* connectivity (edges added over time) and answers connectivity queries in near-constant time. BFS/DFS handles static graphs and is better for finding *paths*, shortest routes, or traversal order.

## Why It Works (The Key Insight)

Each component is represented as a tree, with the root being the component's "representative." `find(x)` walks up to the root. `union(x, y)` merges two trees by making one root point to the other.

Naively, these trees can become chains (O(n) depth). Two optimizations keep it fast:

1. **Path compression** — When `find(x)` walks up to the root, flatten the tree by making every node on the path point directly to the root. Future finds on the same path are O(1).

2. **Union by rank** — When merging two trees, make the shorter tree's root point to the taller tree's root. This keeps trees shallow.

Together these give O(α(n)) per operation, where α is the inverse Ackermann function — effectively constant for any realistic input.

## The Template

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))  # each node is its own parent initially
        self.rank = [0] * n
        self.components = n           # track number of distinct components

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # already in same component
        # Union by rank: attach smaller tree under larger
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        self.components -= 1
        return True  # successfully merged

    def connected(self, x, y):
        return self.find(x) == self.find(y)

# Usage:
uf = UnionFind(n)
for u, v in edges:
    uf.union(u, v)
print(uf.components)  # number of connected components
```

### Functional (no class) — single self-contained function

Some interviewers or problems call for a plain function style instead of a class. Everything lives inside one function: `find` is nested (closes over `parent`), and the union loop runs inline:

```python
def union(n, edges):
    parent = list(range(n))
    rank = [0] * n
    components = n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])  # path compression
        return parent[x]

    for u, v in edges:
        pu, pv = find(u), find(v)
        if pu == pv:
            continue
        if rank[pu] < rank[pv]:
            pu, pv = pv, pu
        parent[pv] = pu
        if rank[pu] == rank[pv]:
            rank[pu] += 1
        components -= 1

    return components

# Usage:
print(union(5, [[0,1],[1,2],[3,4]]))  # 2 components
```

`find` closes over `parent` so no arguments need to be threaded through. Call `union(n, edges)` and get the component count back directly.

### n×n adjacency matrix input

When the input is a symmetric matrix instead of an edge list, iterate the upper triangle (skip `j <= i` since `matrix[i][j] === matrix[j][i]`):

```python
def union(matrix):
    n = len(matrix)
    parent = list(range(n))
    rank = [0] * n
    components = n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    for i in range(n):
        for j in range(i + 1, n):   # upper triangle only
            if matrix[i][j] == 1:
                pi, pj = find(i), find(j)
                if pi == pj:
                    continue
                if rank[pi] < rank[pj]:
                    pi, pj = pj, pi
                parent[pj] = pi
                if rank[pi] == rank[pj]:
                    rank[pi] += 1
                components -= 1

    return components

# Usage:
print(union([[1,1,0],[1,1,0],[0,0,1]]))  # 2
```

The only difference from the edge-list version is the nested loop — instead of `for u, v in edges`, you scan row `i`, column `j` and treat `matrix[i][j] == 1` as an edge. `j = i + 1` avoids processing each edge twice.

For problems with non-integer or non-contiguous identifiers, use a dict-based version:

```python
class UnionFind:
    def __init__(self):
        self.parent = {}

    def find(self, x):
        if x not in self.parent:
            self.parent[x] = x
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        self.parent[self.find(x)] = self.find(y)
```

## Classic Problems

- **Number of Provinces / Number of Connected Components** — Given an adjacency matrix or edge list, count connected components. Initialize one node per element, union each edge, return `components` counter.

- **Redundant Connection** — Given a tree with one extra edge added (creating a cycle), find that edge. Process edges one by one; the first edge where `union` returns `False` (both nodes already connected) is the redundant one.

- **Accounts Merge** — Given a list of accounts (name + emails), merge accounts that share at least one email. Map each email to a Union-Find node, union emails within the same account, then group by component root.

- **Number of Islands** — Can be solved with Union-Find (union adjacent land cells) instead of DFS. Not the most natural approach, but good practice. Count components, subtract merges.

## Edge Cases / Gotchas

- **When NOT to use Union-Find:**
  - **Directed graphs** — Union-Find is inherently undirected. For directed connectivity (topological sort, strongly connected components), use DFS-based algorithms (Kahn's, Tarjan's, Kosaraju's).
  - **Finding actual paths** — Union-Find tells you *if* two nodes are connected, not *how*. For the path itself, use BFS/DFS.
  - **Ordered sets or rankings** — Union-Find groups but doesn't order within groups.

- **Iterative path compression** — The recursive `find` above can hit Python's recursion limit on degenerate inputs. Use iterative path compression for safety:
  ```python
  def find(self, x):
      root = x
      while self.parent[root] != root:
          root = self.parent[root]
      while self.parent[x] != root:  # path compression pass
          self.parent[x], x = root, self.parent[x]
      return root
  ```

- **Node indexing** — Make sure your node indices match. If the problem uses 1-indexed nodes, initialize with `n + 1` nodes or subtract 1 consistently.

- **Component counter** — Track `components` in the constructor, decrement on successful union. Don't recount by scanning `parent` (expensive and error-prone).

- **String keys in accounts merge** — Use the dict-based UnionFind when node identifiers are strings (emails). Don't try to map strings to integers unless it's clearly cleaner.
