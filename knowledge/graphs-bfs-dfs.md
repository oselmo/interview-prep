# Graphs: BFS and DFS

## What is a Graph?

A graph is a collection of **nodes** (vertices) connected by **edges**. Unlike trees, graphs can have cycles, disconnected components, and multiple paths between nodes.

```
Undirected graph:        Directed graph (digraph):

    A ── B                   A ──→ B
    │    │                   │     │
    C ── D ── E              ↓     ↓
                             C     D ──→ E

Edges go both ways.      Edges go one way only.
```

**Key terms:**
- **Path**: sequence of nodes connected by edges
- **Cycle**: path that starts and ends at the same node
- **DAG**: Directed Acyclic Graph — directed, no cycles
- **Connected**: every node reachable from every other (undirected)
- **Strongly connected**: every node reachable from every other via directed edges
- **In-degree**: number of edges coming INTO a node (directed graphs)
- **Out-degree**: number of edges going OUT of a node

---

## Graph Representations

### Adjacency List (most common for interviews)

```
Graph:  0──1──3
        │  │
        2──┘

adjacency list:
  0: [1, 2]
  1: [0, 2, 3]
  2: [0, 1]
  3: [1]
```

```python
# Dict form (named nodes)
graph = { 'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': [] }

# Array form (numbered nodes 0..n-1)
graph = [[1,2], [0,2,3], [0,1], [1]]   # graph[i] = neighbors of i

# Build from edge list
def build_adj(n, edges, directed=False):
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        if not directed:
            adj[v].append(u)
    return adj
```

Space: **O(V + E)** — only stores actual edges. Fast neighbor iteration.

### Adjacency Matrix

```
Graph:  0──1──2      Matrix:
                       0  1  2
                     0[0, 1, 0]
                     1[1, 0, 1]
                     2[0, 1, 0]

matrix[i][j] = 1 means edge i→j exists
```

Space: **O(V²)** — stores all possible pairs. Fast O(1) edge-existence check, but wasteful for sparse graphs. Rarely used in interviews.

### Implicit Graph (Grid)

No data structure at all — neighbors are adjacent cells.

```
Grid as implicit graph:

  S . . #        Each '.' or 'S'/'E' cell is a node.
  . # . .        Edges connect horizontally/vertically
  . . . E        adjacent non-wall cells.
  # . # .
```

---

## BFS — Breadth-First Search

**Uses a queue (FIFO).** Explores all neighbors at distance 1, then distance 2, then distance 3… Ripples outward like a stone in water.

### Visual — BFS Level by Level

```
Graph:                    BFS from node 0:

       0                  Level 0:  [0]
      / \                 Level 1:  [1, 2]
     1   2                Level 2:  [3, 4, 5]
    / \   \               Level 3:  [6]
   3   4   5
        \
         6

Queue evolution:
  Start:       [0]
  Pop 0, add 1,2: [1, 2]
  Pop 1, add 3,4: [2, 3, 4]
  Pop 2, add 5:   [3, 4, 5]
  Pop 3:          [4, 5]
  Pop 4, add 6:   [5, 6]
  Pop 5:          [6]
  Pop 6:          [] ← done

Visit order: 0 → 1 → 2 → 3 → 4 → 5 → 6
             (all nodes at distance d before any at distance d+1)
```

### Visual — BFS Shortest Path on a Grid

```
Find shortest path from S to E  (# = wall)

  S . . # .
  . . # . .
  . . . . E
  . # # # .

BFS expands outward, distance from S:

  0 1 2 # .
  1 2 # 5 6
  2 3 4 5 6←E   ← shortest path length = 6
  3 # # # .

How to reconstruct path: track 'parent' for each cell.
When you reach E, walk backwards through parents.

  S → → ↓
        ↓ → → E
```

```python
from collections import deque

def bfs_shortest_path(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    queue = deque([(start, 0)])          # (position, distance)
    visited = {start}
    dirs = [(0,1),(0,-1),(1,0),(-1,0)]

    while queue:
        (r, c), dist = queue.popleft()
        if (r, c) == end:
            return dist
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols \
               and grid[nr][nc] != '#' \
               and (nr, nc) not in visited:
                visited.add((nr, nc))
                queue.append(((nr, nc), dist + 1))
    return -1  # no path
```

### BFS Template (General Graph)

```python
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])

    while queue:
        node = queue.popleft()
        # ── process node here ──
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)    # add when ENQUEUING, not when popping
                queue.append(neighbor)   # (prevents duplicates in queue)
```

**Critical detail:** mark visited when you **enqueue**, not when you **dequeue**. Marking at dequeue time allows the same node to be added to the queue multiple times before it's processed.

**When to use BFS:**
- Shortest path in an **unweighted** graph (BFS guarantees minimum by level)
- Level-by-level processing (tree level order, rotting oranges)
- "Minimum steps / moves" problems
- Closest reachable neighbor

---

## DFS — Depth-First Search

**Uses a stack (or recursion).** Goes as deep as possible down one path, backtracks, then tries the next branch.

### Visual — DFS Call Stack

```
Graph:                    DFS from node A (recursive):

    A                     dfs(A)
   / \                    ├── dfs(B)
  B   C                   │   ├── dfs(D)  → leaf, backtrack
  |   |                   │   └── backtrack to A
  D   E                   └── dfs(C)
                              └── dfs(E)  → leaf, done

Call stack at deepest point:
  ┌───────┐
  │ dfs(D)│  ← top (deepest)
  │ dfs(B)│
  │ dfs(A)│  ← bottom (start)
  └───────┘

Visit order: A → B → D → C → E
             (fully explores left subtree before right)
```

### Visual — DFS on a Grid (Flood Fill / Islands)

```
Find number of islands (connected groups of '1'):

  1 1 0 0 0        DFS from (0,0): visits (0,0)→(0,1)→(1,0)→(1,1)
  1 1 0 0 0                        marks them all '0'
  0 0 1 0 0
  0 0 0 1 1        DFS from (2,2): visits (2,2) → mark '0'

After all DFS calls:             DFS from (3,3): visits (3,3)→(3,4)→(4,3)...
  0 0 0 0 0                      mark '0'
  0 0 0 0 0        wait — standard example has 3 islands
  0 0 0 0 0        Result = 3 islands
  0 0 0 0 0

DFS "paints" each island a single color, then moves on.
```

```python
DIRS = [(0,1),(0,-1),(1,0),(-1,0)]

def dfs_grid(grid, r, c):
    if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]):
        return
    if grid[r][c] != '1':
        return
    grid[r][c] = '0'              # mark visited in-place
    for dr, dc in DIRS:
        dfs_grid(grid, r + dr, c + dc)

def num_islands(grid):
    count = 0
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '1':
                dfs_grid(grid, r, c)
                count += 1
    return count
```

### DFS Template (General Graph)

```python
def dfs(graph, start):
    visited = set()

    def _dfs(node):
        visited.add(node)
        # ── process node here ──
        for neighbor in graph[node]:
            if neighbor not in visited:
                _dfs(neighbor)

    _dfs(start)

# Iterative DFS (when recursion depth is a concern):
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        # ── process node here ──
        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append(neighbor)
```

**When to use DFS:**
- Cycle detection
- Topological sort
- Connected components
- All paths / backtracking
- Determining if any path A→B exists

---

## Grid Problems — The Direction Vector Trick

```
Standard 4-directional movement:

         (r-1, c)
              ↑
  (r, c-1) ← [r,c] → (r, c+1)
              ↓
         (r+1, c)

DIRS = [(-1,0), (1,0), (0,-1), (0,1)]
       up      down   left    right
```

```
8-directional (includes diagonals):

  (-1,-1) (-1,0) (-1,+1)
   (0,-1)  [r,c]  (0,+1)
  (+1,-1) (+1,0) (+1,+1)

DIRS_8 = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
```

**Always check bounds before accessing the cell:**
```python
def in_bounds(grid, r, c):
    return 0 <= r < len(grid) and 0 <= c < len(grid[0])
```

---

## Multi-Source BFS

When multiple cells start spreading simultaneously, seed the queue with **all sources at time=0** before beginning BFS.

```
Rotting oranges: 2=rotten, 1=fresh, 0=empty

Initial:     t=0          t=1          t=2          t=3
2 1 1 1      2 1 1 1      2 2 1 1      2 2 2 1      2 2 2 2
0 1 1 1  →   0 2 1 1  →   0 2 2 1  →   0 2 2 2  →   answer = 3
1 1 1 1      1 1 2 1      1 2 2 2      2 2 2 2
             ↑                ↑
        all 2s spread    all 2s spread again
        at once

WRONG approach: BFS from each rotten orange separately.
               That gives the wrong time (serial, not parallel).
RIGHT approach: enqueue ALL rotten oranges at the same time=0.
               BFS levels naturally count elapsed minutes.
```

```python
from collections import deque

def oranges_rotting(grid):
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c, 0))   # seed ALL rotten cells at t=0
            elif grid[r][c] == 1:
                fresh += 1

    if fresh == 0: return 0

    dirs = [(0,1),(0,-1),(1,0),(-1,0)]
    elapsed = 0

    while queue:
        r, c, t = queue.popleft()
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                elapsed = t + 1
                queue.append((nr, nc, t + 1))

    return elapsed if fresh == 0 else -1
```

---

## Cycle Detection

### Undirected Graph — DFS with Parent

```
Graph:     A ── B ── C
                │    │
                D ── E   ← back edge C→B = cycle!

DFS from A: visit A (parent=None)
  → visit B (parent=A)
    → visit C (parent=B)
      → visit E (parent=C)
        → visit D (parent=E)
          → see B (visited, not parent of D) ← CYCLE!
```

```python
def has_cycle_undirected(n, edges):
    adj = build_adj(n, edges)
    visited = set()

    def dfs(node, parent):
        visited.add(node)
        for neighbor in adj[node]:
            if neighbor not in visited:
                if dfs(neighbor, node): return True
            elif neighbor != parent:    # visited AND not my parent = back edge = cycle
                return True
        return False

    return any(dfs(i, -1) for i in range(n) if i not in visited)
```

### Directed Graph — 3-Color DFS

```
State:   0 = WHITE (unvisited)
         1 = GRAY  (in current DFS path — "on the stack")
         2 = BLACK (fully explored — all descendants done)

No cycle:                  Cycle:

  A → B → C                A → B → C
           ↓                        ↓
           D                        D → B   ← B is GRAY = back edge!

  When we finish C:         When D sees B:
  C=BLACK, D=BLACK          B is GRAY (still on stack)
  B=BLACK, A=BLACK          → cycle detected!
```

```python
def has_cycle_directed(n, edges):
    adj = build_adj(n, edges, directed=True)
    state = [0] * n   # 0=white, 1=gray, 2=black

    def dfs(node):
        state[node] = 1                    # mark GRAY (entering)
        for neighbor in adj[node]:
            if state[neighbor] == 1:       # back edge → cycle
                return True
            if state[neighbor] == 0 and dfs(neighbor):
                return True
        state[node] = 2                    # mark BLACK (done)
        return False

    return any(dfs(i) for i in range(n) if state[i] == 0)
```

**Key insight:** A GRAY node is currently on the DFS call stack (we haven't finished it yet). Seeing a GRAY neighbor means we found a path back to an ancestor = cycle. A BLACK node is completely done — seeing it is safe (cross edge, not a cycle).

---

## Topological Sort

Only valid on **DAGs** (directed acyclic graphs). Produces an ordering where every edge u→v has u before v in the output.

```
Dependency graph:

  cook ──→ eat ──→ wash_dishes
  buy_food ──→ cook
  boil_water ──→ cook

Valid topological orders:
  buy_food → boil_water → cook → eat → wash_dishes
  boil_water → buy_food → cook → eat → wash_dishes

All prerequisites appear before their dependents.
```

### Kahn's Algorithm (BFS — iterative, preferred for interviews)

```
In-degree = number of incoming edges (prerequisites)

Graph:  0 → 2 → 3        In-degrees:  0:0  1:0  2:1  3:2
        1 → 2                          (0 and 1 have no prerequisites)
        1 → 3

Step-by-step:
  Queue: [0, 1]        (in-degree 0)
  Pop 0 → result=[0]   decrement 2's in-degree: 2→1→0? no, 1→1
  Pop 1 → result=[0,1] decrement 2's in-degree: 1→0 → enqueue 2
                        decrement 3's in-degree: 2→1
  Pop 2 → result=[0,1,2] decrement 3's in-degree: 1→0 → enqueue 3
  Pop 3 → result=[0,1,2,3] ← done!

If result.length < n → cycle exists (some nodes never reached in-degree 0)
```

```python
from collections import deque

def topological_sort(n, edges):
    adj = [[] for _ in range(n)]
    in_degree = [0] * n

    for u, v in edges:          # u must come before v
        adj[u].append(v)
        in_degree[v] += 1

    queue = deque(i for i in range(n) if in_degree[i] == 0)
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return order if len(order) == n else []  # [] = cycle detected
```

### DFS Topological Sort (post-order)

```
DFS post-order = reverse topological order.
A node is added to the result AFTER all its descendants are done.

DFS from 0:
  → 0 calls 2
    → 2 calls 3
      → 3 has no neighbors: add 3 to stack
    → back to 2: add 2 to stack
  → back to 0: add 0 to stack
DFS from 1:
  → 1 calls 2 (visited), 3 (visited): add 1 to stack

Stack (top→bottom):  1, 0, 2, 3
Reverse:             3, 2, 0, 1  ← one valid topological order
```

---

## Array-Based Graph Input Forms

Most interview problems give the graph as raw arrays, not Node objects.

```
Form 1 — Edge list:
  edges = [[0,1],[1,2],[2,0]]
  Read as: 0─1, 1─2, 2─0
  First step: build your own adjacency list

Form 2 — Already an adjacency list:
  graph = [[1,2],[0,2,3],[0,1],[1]]
  Read as: graph[i] = neighbors of node i
  No building step needed

Form 3 — 2D grid:
  grid = [["1","1","0"],["0","1","0"]]
  Neighbors are (r±1, c) and (r, c±1)
  Use direction vectors, no adjacency list needed

Form 4 — Prerequisites list (directed):
  prereqs = [[1,0],[2,1]]  means 0→1, 1→2
  prereqs[i] = [a, b]  means b must come before a
  Build directed adj: adj[b].append(a)  or  adj[a].append(b) + in_degree[a]++
```

### Full BFS Template (edge list → adj list → BFS)

```python
from collections import deque

def solve(n, edges):
    # Step 1: build
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)   # omit for directed

    # Step 2: BFS
    visited = set()
    queue = deque()

    for start in range(n):                 # handle disconnected components
        if start in visited: continue
        visited.add(start)
        queue.append(start)

        while queue:
            node = queue.popleft()
            for nb in adj[node]:
                if nb not in visited:
                    visited.add(nb)
                    queue.append(nb)
```

### DFS with Backtracking (find ALL paths)

```python
def all_paths(graph, target):     # graph[i] already adjacency list
    results = []

    def dfs(node, path):
        if node == target:
            results.append(list(path))   # copy — don't store reference
            return
        for nb in graph[node]:
            path.append(nb)
            dfs(nb, path)
            path.pop()                   # backtrack

    dfs(0, [0])
    return results
```

```
Trace for graph = [[1,2],[3],[3],[]], target = 3:

  dfs(0, [0])
  ├── path.append(1) → dfs(1, [0,1])
  │   └── path.append(3) → dfs(3, [0,1,3]) ← HIT TARGET, save [0,1,3]
  │       path.pop() → back to [0,1]
  │   path.pop() → back to [0]
  └── path.append(2) → dfs(2, [0,2])
      └── path.append(3) → dfs(3, [0,2,3]) ← HIT TARGET, save [0,2,3]
          path.pop() → back to [0,2]
      path.pop() → back to [0]

Result: [[0,1,3], [0,2,3]]
```

---

## BFS vs DFS — Decision Guide

```
┌──────────────────────────────────┬──────────────────────────────────┐
│              BFS                 │              DFS                 │
├──────────────────────────────────┼──────────────────────────────────┤
│ ✓ Shortest path (unweighted)     │ ✓ Cycle detection                │
│ ✓ Level-order / by distance      │ ✓ Topological sort               │
│ ✓ Minimum moves / steps          │ ✓ All paths (backtracking)        │
│ ✓ Multi-source spread            │ ✓ Connected components           │
│ ✓ Closest reachable node         │ ✓ Path existence (any path)      │
│                                  │ ✓ Detecting back edges           │
│ Data structure: QUEUE (deque)    │ Data structure: STACK / recursion│
│ Memory: O(V) — worst case queue  │ Memory: O(depth) — call stack    │
│         fills with all nodes     │         can be O(V) worst case   │
└──────────────────────────────────┴──────────────────────────────────┘

The golden rule:
  Need SHORTEST path?        → BFS
  Need to EXPLORE ALL paths? → DFS
  Need ORDERING / no cycle?  → DFS (topological sort)
  Don't care which, just need reachability? → either works
```

---

## Complexity Reference

| Algorithm | Time | Space | Notes |
|---|---|---|---|
| BFS | O(V + E) | O(V) | Queue holds at most all nodes |
| DFS | O(V + E) | O(V) | Stack/recursion depth bounded by V |
| Topological sort (Kahn's) | O(V + E) | O(V) | Same as BFS |
| Topological sort (DFS) | O(V + E) | O(V) | Same as DFS |
| Build adj list from edges | O(E) | O(V + E) | One pass through edges |

V = vertices (nodes), E = edges

---

## Common Mistakes

```
❌ Marking visited at DEQUEUE (causes duplicate processing):
   queue = deque([start])           ← start NOT in visited yet
   while queue:
     node = queue.popleft()
     visited.add(node)              ← too late: duplicates already in queue
     ...

✓ Mark visited at ENQUEUE:
   visited = {start}
   queue = deque([start])
   while queue:
     node = queue.popleft()
     ...

❌ DFS cycle detection: using a single visited set for directed graphs
   (cross edges look like back edges — gives false positives)

✓ Use 3-color state for directed cycle detection (white/gray/black)

❌ Undirected DFS cycle: counting edge back to parent as a cycle
   (every undirected edge looks like a back edge without parent tracking)

✓ Pass parent into DFS and skip the parent node when checking neighbors

❌ Grid bounds check AFTER accessing grid[nr][nc]:
   grid[nr][nc]  ← IndexError if out of bounds

✓ Always check in_bounds(nr, nc) BEFORE accessing grid[nr][nc]
```

---

## Common Problems Reference

| Problem | Pattern | Input form | Key insight |
|---|---|---|---|
| Valid Path in Graph | BFS or DFS | Edge list → build adj | Basic reachability |
| All Paths Source→Target | DFS + backtrack | `graph[i]` already adj list | Collect paths at target |
| Course Schedule | Directed cycle detection | Edge list → directed adj | Topo sort: return false if cycle |
| Course Schedule II | Topological sort | Edge list → directed adj | Return the actual order |
| Number of Islands | DFS flood fill | Grid | Count how many floods it takes |
| Rotting Oranges | Multi-source BFS | Grid | Seed ALL rotten cells at t=0 |
| Redundant Connection | Union Find | Edge list | First edge where find(u)==find(v) |
| Alien Dictionary | Topological sort | Sorted word list | Compare adjacent words → char order |
| Word Ladder | BFS shortest path | Implicit (word→neighbors) | Level = num transformations |
| Pacific Atlantic | Multi-source DFS | Grid | DFS inward from each coast; intersect |
| Clone Graph | BFS + hash map | Node objects | Map old→new node, BFS to clone edges |
