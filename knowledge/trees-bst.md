# Trees and Binary Search Trees (BST)

## Tree Vocabulary

- **Root**: the top node (no parent)
- **Leaf**: a node with no children
- **Height**: longest path from root to a leaf
- **Depth**: distance from root to a node
- **Balanced tree**: height is O(log n) — guarantees efficient operations

---

## Binary Tree Traversals

All traversals are O(n) time, O(h) space (h = height, worst case O(n) for skewed tree).

### DFS (Depth-First)

```
Pre-order:   root → left → right   (useful for copying/serializing a tree)
In-order:    left → root → right   (gives sorted output for a BST)
Post-order:  left → right → root   (useful for deletion, evaluating expressions)
```

### BFS (Breadth-First / Level Order)

Use a **queue**. Process all nodes at depth d before depth d+1.

```
queue = [root]
while queue not empty:
    node = queue.pop_front()
    process(node)
    if node.left:  queue.push(node.left)
    if node.right: queue.push(node.right)
```

To group by level: record `queue.length` at the start of each iteration — that's how many nodes are on the current level.

---

## Binary Search Tree (BST) Properties

A BST satisfies: **left subtree values < node.val < right subtree values** (at every node).

This means:
- **In-order traversal yields sorted output** — if your traversal doesn't produce sorted output, it's not a valid BST
- **Search, insert, delete are O(h)**: O(log n) for balanced, O(n) worst case for skewed

### BST Operations

**Search:** compare target with current node → go left if smaller, right if larger.

**Insert:** search for where the value would be; insert as a new leaf.

**Delete:**
- Leaf node → just remove
- One child → replace with that child
- Two children → replace with in-order successor (leftmost node in right subtree)

---

## Lowest Common Ancestor (LCA)

**General binary tree (no BST property):** track paths from root to each node, find where paths diverge. O(n).

**BST:** use the BST property directly.
- If both p and q < current → LCA is in left subtree
- If both p and q > current → LCA is in right subtree
- Otherwise → current node is the LCA (they split here, or one equals current)

This gives O(h) time, O(1) space iteratively.

---

## Key Patterns

### Recursive tree problems
Most tree problems have a natural recursive structure: solve for left subtree, solve for right subtree, combine.

Ask: what does this function return? (a value, a boolean, a node?)
Ask: what is the base case? (null node returns what?)

### Height / balance checking
```
height(node) = 1 + max(height(left), height(right))
```
Balanced: abs(height(left) - height(right)) ≤ 1 at every node.

### Diameter
The longest path between any two nodes. At each node, it's: `left_height + right_height`. Take the max across all nodes.

---

## Common Interview Problems

| Problem | Key insight |
|---|---|
| Level Order Traversal | BFS with queue, track level size |
| Invert Binary Tree | Swap left/right at each node (recursively) |
| Max Depth | Recursive: 1 + max(depth(left), depth(right)) |
| Validate BST | Pass min/max bounds down the recursion |
| LCA of BST | Use BST property, O(h) iteratively |
| Kth Smallest in BST | In-order traversal (gives sorted order) |
| Serialize / Deserialize Tree | Pre-order DFS with null markers |

---

## Complexity Summary

| Operation | Balanced BST | Skewed BST |
|---|---|---|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Traversal | O(n) | O(n) |
