# Topological Sort

## What Is This Pattern / When Do You Recognize It?

Topological sort produces a linear ordering of nodes in a **directed acyclic graph (DAG)** such that for every edge `u → v`, node `u` comes before node `v` in the ordering.

The real-world framing is always about **dependencies**: A must happen before B, which must happen before C. Given a list of such dependency pairs, determine a valid execution order — or determine that no such order exists (cycle detected).

Trigger phrases: "course prerequisites," "build order," "task scheduling with dependencies," "find a valid ordering," "detect if circular dependency exists," "alien dictionary" (infer character ordering from sorted words).

Key constraint: the graph must be a DAG. If there's a cycle, no valid topological order exists.

## Why It Works (The Key Insight)

**Kahn's Algorithm (BFS-based):** A node with zero incoming edges (in-degree 0) has no prerequisites — it can always be processed first. Process it, then remove its outgoing edges, which may reduce other nodes' in-degrees to zero. Repeat. If you process all nodes, you have a valid topological order. If you get stuck with remaining nodes, there's a cycle.

**DFS-based (reverse postorder):** Visit all neighbors first (go as deep as possible), then add the current node to a stack. The reverse of the finishing order is a valid topological sort. A cycle is detected if you encounter a node that's currently in the recursion stack ("gray" node).

Kahn's is usually easier to implement correctly and naturally supports cycle detection via the count of processed nodes.

## The Template

```python
from collections import deque, defaultdict

def topological_sort_kahn(num_nodes, prerequisites):
    # Build adjacency list and in-degree count
    graph = defaultdict(list)
    in_degree = [0] * num_nodes

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1

    # Start with all nodes that have no prerequisites
    queue = deque([i for i in range(num_nodes) if in_degree[i] == 0])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If order contains all nodes, no cycle exists
    return order if len(order) == num_nodes else []  # [] = cycle detected

# DFS-based topological sort
def topological_sort_dfs(num_nodes, prerequisites):
    graph = defaultdict(list)
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    UNVISITED, VISITING, VISITED = 0, 1, 2
    state = [UNVISITED] * num_nodes
    order = []
    has_cycle = [False]

    def dfs(node):
        if has_cycle[0]: return
        state[node] = VISITING
        for neighbor in graph[node]:
            if state[neighbor] == VISITING:
                has_cycle[0] = True
                return
            if state[neighbor] == UNVISITED:
                dfs(neighbor)
        state[node] = VISITED
        order.append(node)  # postorder

    for i in range(num_nodes):
        if state[i] == UNVISITED:
            dfs(i)

    return [] if has_cycle[0] else order[::-1]  # reverse of postorder
```

## Classic Problems

- **Course Schedule I & II** — Given `n` courses and prerequisite pairs `[a, b]` meaning "take b before a," determine if you can finish all courses (I) or return a valid course order (II). Kahn's algorithm directly: build the graph, detect cycles via node count, collect the BFS order.

- **Alien Dictionary** — Given a sorted list of words in an unknown alphabet, determine the character ordering. Compare adjacent words character by character to extract ordering constraints (edges), then run topological sort. Tricky edge case: if a longer word appears before its prefix, the ordering is invalid.

- **Parallel Courses / Task Scheduling** — Given tasks with prerequisites and durations, find the minimum time to complete all tasks (tasks without conflicts run in parallel). Augment Kahn's with a time/level tracker — each "wave" of the BFS processes tasks that can run concurrently.

## Edge Cases / Gotchas

- **Cycle detection via count** — In Kahn's, after the BFS loop, check `len(order) == num_nodes`. If they differ, there's a cycle. This is cleaner and less error-prone than tracking visited states manually.

- **Multiple valid orderings** — Topological sort is not unique. Many problems accept any valid order. If a specific order is needed (e.g., lexicographically smallest), use a min-heap instead of a regular queue in Kahn's.

- **Disconnected graphs** — Make sure to initialize the queue with *all* nodes of in-degree 0, not just the first one. Disconnected components need separate entry points.

- **Self-loops** — A node with an edge to itself always has in-degree ≥ 1. It can never reach in-degree 0 in Kahn's, so it will be correctly excluded from the output (cycle detected).

- **Building the graph direction** — The edge `prerequisite → course` (not course → prerequisite) is what lets you "unlock" courses in Kahn's. Getting the edge direction backwards is the most common implementation bug.

- **DFS: gray/white/black vs. visited/not-visited** — A simple boolean visited set cannot detect cycles in directed graphs. You need three states: unvisited, currently-in-stack (gray), and fully-processed (black). Only a gray → gray back edge indicates a cycle.
