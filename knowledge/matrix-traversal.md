# Matrix Traversal (Islands Pattern)

## What Is This Pattern / When Do You Recognize It?

A 2D grid is just a graph in disguise. Each cell is a node; adjacent cells (up, down, left, right — sometimes diagonal) are edges. Matrix traversal problems ask you to explore connected regions, count them, measure them, or reason about what can "flow" between them.

Reach for this pattern when:
- The grid has cells of different types (land/water, 0/1, visited/unvisited) and you need to count or measure contiguous regions
- The problem involves something "spreading" (flood fill, infection, fire)
- Multiple starting points all need to be explored simultaneously (multi-source BFS)
- You need to find what's reachable from the border vs. the interior
- Keywords: "number of islands," "max area," "surrounded regions," "Pacific Atlantic water flow," "walls and gates"

## Why It Works (The Key Insight)

Treating the matrix as a graph means BFS gives you shortest paths (in hops) and DFS gives you full region exploration. The two key techniques:

**Islands DFS/BFS:** Scan every cell. When you hit an unvisited land cell, you've found a new island. Launch a DFS/BFS from it to visit every connected land cell — marking each as visited so you never count it again. The number of times you launch a new DFS equals the number of islands.

**Multi-source BFS:** When you have multiple starting points that are logically equivalent (e.g., all cells adjacent to an ocean, all rotten oranges), don't BFS from each one separately. Push *all of them into the queue at once* at time step 0. The BFS naturally propagates outward in parallel, and the distance recorded at each cell is the minimum distance to any source.

## The Template

```python
# Direction vectors: up, down, left, right
DIRS = [(-1,0),(1,0),(0,-1),(0,1)]

def in_bounds(r, c, rows, cols):
    return 0 <= r < rows and 0 <= c < cols

# DFS Islands pattern
def num_islands(grid):
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if not in_bounds(r, c, rows, cols) or grid[r][c] != '1':
            return
        grid[r][c] = '2'  # mark visited in-place (or use a visited set)
        for dr, dc in DIRS:
            dfs(r + dr, c + dc)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1

    return count

# BFS Islands (avoid recursion depth issues on large grids)
from collections import deque

def num_islands_bfs(grid):
    rows, cols = len(grid), len(grid[0])
    count = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                queue = deque([(r, c)])
                grid[r][c] = '2'
                while queue:
                    cr, cc = queue.popleft()
                    for dr, dc in DIRS:
                        nr, nc = cr + dr, cc + dc
                        if in_bounds(nr, nc, rows, cols) and grid[nr][nc] == '1':
                            grid[nr][nc] = '2'
                            queue.append((nr, nc))

    return count

# Multi-source BFS (e.g., Walls and Gates, Rotting Oranges)
def multi_source_bfs(grid, sources):
    rows, cols = len(grid), len(grid[0])
    queue = deque(sources)  # all sources at time 0
    dist = {s: 0 for s in sources}

    while queue:
        r, c = queue.popleft()
        for dr, dc in DIRS:
            nr, nc = r + dr, c + dc
            if in_bounds(nr, nc, rows, cols) and (nr, nc) not in dist:
                # additional condition: cell must be reachable
                dist[(nr, nc)] = dist[(r, c)] + 1
                queue.append((nr, nc))

    return dist
```

## Classic Problems

- **Number of Islands** — Count connected regions of '1's in a binary grid. The canonical islands DFS/BFS problem. In-place marking with '2' avoids a separate visited set.

- **Max Area of Island** — Instead of counting islands, return the size of the largest one. DFS returns an area count (1 + sum of neighbor DFS returns) instead of void.

- **Surrounded Regions** — Any 'O' not connected to a border 'O' should be flipped to 'X'. Key insight: instead of finding surrounded regions directly, find the *safe* ones. DFS/BFS from every border 'O', mark them safe ('S'), then flip remaining 'O' to 'X' and 'S' back to 'O'.

- **Pacific Atlantic Water Flow** — Find cells from which water can flow to *both* oceans. Multi-source BFS from each ocean's border simultaneously, building two reachability sets. The answer is their intersection.

- **Rotting Oranges** — Each minute, a rotten orange infects all adjacent fresh ones. Find total time to rot all oranges. Multi-source BFS from all initially-rotten oranges. The answer is the maximum distance in the BFS dist map, or -1 if any fresh orange is unreachable.

## Edge Cases / Gotchas

- **Mark before enqueuing, not after dequeuing** — In BFS, add the visited marker when you push to the queue, not when you pop. If you wait until pop, multiple queue entries for the same cell can accumulate, causing incorrect counts or infinite loops.

- **In-place vs. separate visited set** — Modifying the grid in-place is fine if the problem allows mutation. If you need to restore the grid (or if it's read-only), use a `set` of visited (r, c) tuples. The sentinel value '2' is common but clarify with your interviewer.

- **Diagonal neighbors** — Most island problems use 4-directional connectivity (up/down/left/right). Some use 8-directional. Clarify before coding and adjust `DIRS` accordingly.

- **Multi-source BFS: push ALL sources first** — A common mistake is running separate BFS from each source. That gives you min-distance from the *nearest single source*, not the *globally correct* min-distance accounting for all sources at once. Push everything into the initial queue before the loop starts.

- **Surrounded regions: border connectivity** — Start DFS/BFS from every cell on the four borders, not just corners. Every border cell that's 'O' is a potential entry point for an unsurrounded region.

- **Recursion depth on large grids** — DFS on a 300×300 grid of all land cells hits 90,000 recursive calls. Python's default limit is 1,000. Either use iterative DFS (explicit stack), BFS, or increase the limit with `sys.setrecursionlimit`. Mention this in an interview.

- **dx/dy array** — Get in the habit of using `DIRS = [(-1,0),(1,0),(0,-1),(0,1)]` rather than writing four explicit if-blocks. It's shorter, less error-prone, and easy to extend to 8 directions by appending diagonals.
