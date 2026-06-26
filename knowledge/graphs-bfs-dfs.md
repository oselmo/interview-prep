# Graphs: BFS and DFS

## What is a Graph?

A graph is a collection of **nodes** (vertices) connected by **edges**. Unlike trees, graphs can have cycles and multiple paths between nodes.

```
    A ── B
    │    │
    C ── D ── E
```

---

## Graph Representations

**Adjacency List** (most common for interviews):
```python
graph = { 'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': [] }
```
Space: O(V + E). Fast neighbor lookup.

**Adjacency Matrix**: `matrix[i][j] = 1` if edge exists.
Space: O(V²). Fast edge existence check, wasteful for sparse graphs.

**Implicit graphs** (grids): neighbors are the 4 (or 8) adjacent cells. No explicit data structure — just (row, col) coordinates.

---

## BFS — Breadth-First Search

**Uses a queue.** Explores all neighbors at the current distance before going deeper. Ripples outward like a stone dropped in water.

### Visual — BFS Order on a Graph

```
Start at A. BFS explores level by level:

Graph:         BFS Queue State:
    A          Step 1: [A]         → visit A, enqueue B, C
   / \         Step 2: [B, C]      → visit B, enqueue D
  B   C        Step 3: [C, D]      → visit C, enqueue E
  |   |        Step 4: [D, E]      → visit D
  D   E        Step 5: [E]         → visit E
               
Visit order:  A → B → C → D → E
              (level 0) (level 1) (level 2)
```

### Visual — BFS on a Grid

```
Find shortest path from S to E (. = open, # = wall):

  . . . # .
  S . # . .
  . . . . E
  . # # # .

BFS expands outward from S:

  3 2 1 # .        Numbers = distance from S
  0 1 # 4 5        S=0, each step +1
  1 2 3 4 5←E      Shortest path = 5 steps
  2 # # # .
```

```python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    
    while queue:
        node = queue.popleft()
        process(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

**When to use BFS:**
- Shortest path in an **unweighted** graph (BFS guarantees shortest by level)
- Level-by-level processing (tree level order, rotting oranges)
- "Minimum steps / moves" problems

---

## DFS — Depth-First Search

**Uses a stack** (or recursion). Goes as deep as possible down one path before backtracking and trying another.

### Visual — DFS Order on a Graph

```
Start at A. DFS dives deep before backtracking:

Graph:         DFS Call Stack:
    A          Call dfs(A) → push A
   / \         Call dfs(B) → push B
  B   C        Call dfs(D) → push D, no unvisited neighbors → backtrack
  |   |        Back to B, no more neighbors → backtrack
  D   E        Back to A, Call dfs(C) → push C
               Call dfs(E) → push E

Visit order:  A → B → D → C → E
              (went deep left first, then backtracked to right)
```

### Visual — DFS on a Grid (Islands)

```
Mark each connected land cell ('1') as visited:

Grid:              DFS from (0,0):
1 1 0 0            (0,0)→(0,1)→(1,1)→(1,0) [island 1 done]
1 1 0 0            
0 0 1 0            DFS from (2,2):
0 0 0 1            (2,2) [island 2]
                   
                   DFS from (3,3):
                   (3,3) [island 3]

Number of islands = 3
```

```python
def dfs(graph, node, visited=None):
    if visited is None: visited = set()
    visited.add(node)
    process(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
```

**When to use DFS:**
- Detecting cycles
- Topological sort
- Connected components
- Path existence (does any path from A → B exist?)
- Backtracking / exploring all possibilities

---

## Grid Problems (Islands Pattern)

Grids are implicit graphs — no adjacency list needed. A cell's neighbors are up/down/left/right.

```
Direction vectors — the standard trick:

     (-1, 0)
        ↑
(0,-1) ← [r,c] → (0,+1)
        ↓
     (+1, 0)
```

```python
DIRECTIONS = [(0,1),(0,-1),(1,0),(-1,0)]

def dfs(grid, r, c):
    if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]):
        return
    if grid[r][c] != '1':
        return
    grid[r][c] = '0'  # mark visited in-place
    for dr, dc in DIRECTIONS:
        dfs(grid, r + dr, c + dc)
```

### Multi-Source BFS

Push **all** starting sources into the queue at once before beginning. Useful when you want the minimum distance from any source.

```
Rotting oranges: 2=rotten, 1=fresh, 0=empty

Initial grid:       After 1 min:        After 2 min:
2 1 1               2 2 1               2 2 2
1 1 0               2 1 0               2 2 0
0 1 1               0 1 1               0 2 1

Start BFS with ALL rotten cells (2s) in the queue simultaneously.
Each step spreads rot to adjacent fresh cells.
```

---

## Cycle Detection

### Undirected Graph
Track the parent node. If you visit an already-visited node that isn't your direct parent → cycle.

```
  A - B - C
      |   |
      D - E    ← B→D→E→C→B = cycle!
```

### Directed Graph
Use three colors — unvisited, in-progress (grey), done (black).

```
  A → B → C       A → B → C
          ↓               ↓
          D               D → B   ← back edge = cycle!
          
  No cycle (DAG)   Cycle detected
```

If DFS reaches a **grey (in-progress)** node → cycle exists.

---

## Topological Sort

Used for dependency ordering. Only valid for **DAGs** (directed acyclic graphs).

```
Course prerequisites:

  Math ──→ Physics ──→ Engineering
              ↑
  CS ─────────┘

Topological order: Math → CS → Physics → Engineering
                   (all prerequisites come before their dependents)
```

**Kahn's Algorithm (BFS):**
1. Compute in-degree for each node
2. Start BFS with all nodes that have in-degree 0 (no prerequisites)
3. When processing a node, decrement neighbors' in-degrees
4. When a neighbor's in-degree hits 0, add to queue
5. If the processed count < total nodes → cycle exists

```
In-degrees:  Math=0, CS=0, Physics=2, Engineering=1

Queue: [Math, CS]
Process Math → Physics in-degree: 2→1
Process CS   → Physics in-degree: 1→0 → add to queue
Queue: [Physics]
Process Physics → Engineering in-degree: 1→0 → add
Queue: [Engineering]
Process Engineering → done
```

---

## BFS vs DFS — When to Pick Which

```
┌─────────────────────────────┬─────────────────────────────┐
│           BFS               │            DFS              │
├─────────────────────────────┼─────────────────────────────┤
│ Shortest path (unweighted)  │ Cycle detection             │
│ Level-order traversal       │ Topological sort            │
│ Minimum steps/moves         │ Connected components        │
│ Closest neighbor            │ Path existence              │
│ Multi-source spread         │ Backtracking / all paths    │
│ Queue (FIFO)                │ Stack / recursion (LIFO)    │
└─────────────────────────────┴─────────────────────────────┘
```

## Key Complexity

| | BFS | DFS |
|---|---|---|
| Time | O(V + E) | O(V + E) |
| Space | O(V) — queue | O(V) — stack/recursion |
| Shortest path? | Yes (unweighted) | Not guaranteed |

---

## Common Problems

| Problem | Approach |
|---|---|
| Number of Islands | DFS/BFS flood fill |
| Clone Graph | BFS with node map |
| Course Schedule | Topological sort / cycle detection |
| Word Ladder | BFS (shortest transformation) |
| Rotting Oranges | Multi-source BFS |
| Walls and Gates | Multi-source BFS |
| Pacific Atlantic Water Flow | Multi-source DFS from each coast |
| Longest Path in DAG | Topological sort + DP |
