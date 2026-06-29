export const QUESTIONS = [

  // ─── CODING STARTERS (one per pattern, teacher mode) ─────────────────────

  {
    id: 'starter-hashmaps',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Hash Maps & Arrays',
    teacherMode: true,
    functionName: 'mostFrequent',
    testCases: [
      { desc: 'basic case',                  args: [['apple','banana','apple','cherry','banana','apple']], expected: 'apple' },
      { desc: 'single element',              args: [['x']],                                               expected: 'x' },
      { desc: 'all different — first wins',  args: [['a','b','c']],                                       expected: 'a' },
      { desc: 'tie — first in array wins',   args: [['dog','cat','dog','cat']],                           expected: 'dog' },
      { desc: 'numbers as strings',          args: [['1','2','1','3','2','1']],                           expected: '1' },
    ],
    followUpQuestions: [
      "Walk me through how your frequency counting works — why a Map?",
      "If two words tie for most frequent, what does your function return?",
      "Could you avoid the Map entirely? What would that cost you?",
    ],
    title: 'Starter: Count Word Frequencies',
    prompt: `Given an array of words, return a Map (or object) where each key is a word and each value is how many times it appears. Then write a second function that returns the most frequently occurring word.

Example:
  words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
  frequencies → { apple: 3, banana: 2, cherry: 1 }
  mostFrequent → "apple"

This is the foundational hash map pattern. Almost every "top K", "group by", or "find duplicate" problem starts here.

Questions to think about:
  - What time and space complexity does your solution have?
  - What if there's a tie for most frequent? How do you handle it?
  - What built-in data structure makes this simplest in your language?`,
    hints: [
      'Use a Map (JS) or dict (Python) or Record<string,number> (TS) — all give O(1) insert and lookup.',
      'For most frequent: iterate the map entries and track the max as you go. One pass, O(n).',
      'Tie-breaking: "return any one of them" is a valid answer unless the problem specifies otherwise.',
    ],
    tags: ['hash maps', 'arrays', 'counting'],
    starterCode: {
      js: `function countFrequencies(words) {
  // return a Map of { word -> count }
}

function mostFrequent(words) {
  // return the word that appears most often
}

const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];
console.log(countFrequencies(words));  // Map { apple: 3, banana: 2, cherry: 1 }
console.log(mostFrequent(words));      // "apple"
console.log(mostFrequent(["a","b"]));  // "a" or "b" (tie)
`,
      python: `def count_frequencies(words):
    # return a dict of { word: count }
    pass

def most_frequent(words):
    # return the word that appears most often
    pass

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
print(count_frequencies(words))  # {'apple': 3, 'banana': 2, 'cherry': 1}
print(most_frequent(words))      # "apple"
`,
      typescript: `function countFrequencies(words: string[]): Map<string, number> {
  // return a Map of { word -> count }
  return new Map();
}

function mostFrequent(words: string[]): string {
  // return the word that appears most often
  return '';
}

const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];
console.log(countFrequencies(words));  // Map { apple: 3, banana: 2, cherry: 1 }
console.log(mostFrequent(words));      // "apple"
`,
    },
  },

  {
    id: 'starter-sliding-window',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Sliding Window',
    teacherMode: true,
    functionName: 'maxSumSubarray',
    testCases: [
      { desc: 'basic case',              args: [[2,1,5,1,3,2], 3],   expected: 9 },
      { desc: 'k equals array length',   args: [[1,2,3,4], 4],       expected: 10 },
      { desc: 'all negative numbers',    args: [[-1,-2,-3,-4], 2],   expected: -3 },
      { desc: 'k = 1',                   args: [[5,1,8,3], 1],       expected: 8 },
      { desc: 'window at end',           args: [[1,2,3,10,11], 2],   expected: 21 },
    ],
    followUpQuestions: [
      "Why does a sliding window beat the brute force here?",
      "When does a fixed-size window not work — what would make you switch to a dynamic one?",
      "What exactly moves and what stays as the window slides?",
    ],
    title: 'Starter: Maximum Sum Subarray of Size K',
    prompt: `Given an array of integers and a number K, find the maximum sum of any contiguous subarray of size exactly K.

Example:
  nums = [2, 1, 5, 1, 3, 2], k = 3  →  9   (subarray [5, 1, 3])
  nums = [2, 3, 4, 1, 5],    k = 2  →  7   (subarray [3, 4])

This is the fixed-size sliding window pattern — the simplest version before variable-size windows.

The key insight: instead of re-summing K elements from scratch each time (O(n×k)), slide the window by subtracting the element that left and adding the element that entered. O(n).

Work through it with the first example on paper before coding.`,
    hints: [
      'Compute the sum of the first K elements. That\'s your initial window.',
      'For each new position: windowSum = windowSum - nums[i - k] + nums[i]. One subtraction, one addition.',
      'Track the maximum windowSum seen so far. Return it at the end.',
    ],
    tags: ['sliding window', 'arrays'],
    starterCode: {
      js: `function maxSumSubarray(nums, k) {
  // your solution — O(n), not O(n*k)
}

console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3));  // 9
console.log(maxSumSubarray([2, 3, 4, 1, 5], 2));      // 7
console.log(maxSumSubarray([1, 1, 1, 1, 1], 3));      // 3
`,
      python: `def max_sum_subarray(nums, k):
    # your solution — O(n), not O(n*k)
    pass

print(max_sum_subarray([2, 1, 5, 1, 3, 2], 3))  # 9
print(max_sum_subarray([2, 3, 4, 1, 5], 2))      # 7
`,
      typescript: `function maxSumSubarray(nums: number[], k: number): number {
  // your solution — O(n), not O(n*k)
  return 0;
}

console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3));  // 9
console.log(maxSumSubarray([2, 3, 4, 1, 5], 2));      // 7
`,
    },
  },

  {
    id: 'starter-two-pointers',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Two Pointers',
    teacherMode: true,
    functionName: 'hasPairSum',
    testCases: [
      { desc: 'basic — pair exists',      args: [[1,2,3,4,6], 6],    expected: true },
      { desc: 'no pair',                  args: [[1,2,3,4,5], 20],   expected: false },
      { desc: 'target is sum of ends',    args: [[1,5,7,10], 11],    expected: true },
      { desc: 'two elements — match',     args: [[3,7], 10],         expected: true },
      { desc: 'two elements — no match',  args: [[3,7], 5],          expected: false },
      { desc: 'negative numbers',         args: [[-5,-2,0,3,8], 1],  expected: true },
      { desc: 'no duplicate index use',   args: [[4,6], 8],          expected: false },
    ],
    followUpQuestions: [
      "Why does this only work on a sorted array — what breaks on an unsorted one?",
      "How does the two-pointer approach improve on a nested loop?",
      "If the problem asked for all pairs with that sum, not just one, how would you adjust?",
    ],
    title: 'Starter: Pair Sum in Sorted Array',
    prompt: `Given a sorted array of integers and a target value, return true if any two distinct elements sum to the target. Return false otherwise.

Example:
  [1, 2, 4, 6, 8, 9], target = 10  →  true   (1+9 or 2+8)
  [1, 2, 4, 6, 8, 9], target = 3   →  false
  [1, 3, 5, 7],       target = 6   →  true    (1+5)

This is the two-pointer pattern on a sorted array. The sorted order lets you reason about which pointer to move.

Think through: if the sum is too big, which pointer should move? If too small?
Then: why does this guarantee you never miss a valid pair?`,
    hints: [
      'Start with left = 0 and right = last index. Compute sum = arr[left] + arr[right].',
      'If sum > target: move right inward (right--). If sum < target: move left inward (left++). If equal: return true.',
      'Why it works: the array is sorted, so moving left right increases the sum, moving right left decreases it. You cover all possibilities.',
    ],
    tags: ['two pointers', 'arrays', 'sorting'],
    starterCode: {
      js: `function hasPairSum(nums, target) {
  // use two pointers — O(n) time, O(1) space
}

console.log(hasPairSum([1, 2, 4, 6, 8, 9], 10));  // true
console.log(hasPairSum([1, 2, 4, 6, 8, 9], 3));   // false
console.log(hasPairSum([1, 3, 5, 7], 6));          // true
console.log(hasPairSum([1, 2], 3));                // true
`,
      python: `def has_pair_sum(nums, target):
    # use two pointers — O(n) time, O(1) space
    pass

print(has_pair_sum([1, 2, 4, 6, 8, 9], 10))  # True
print(has_pair_sum([1, 2, 4, 6, 8, 9], 3))   # False
print(has_pair_sum([1, 3, 5, 7], 6))          # True
`,
      typescript: `function hasPairSum(nums: number[], target: number): boolean {
  // use two pointers — O(n) time, O(1) space
  return false;
}

console.log(hasPairSum([1, 2, 4, 6, 8, 9], 10));  // true
console.log(hasPairSum([1, 2, 4, 6, 8, 9], 3));   // false
`,
    },
  },

  {
    id: 'starter-linked-list',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Linked Lists',
    teacherMode: true,
    functionName: 'middleNode',
    linkedListTest: true,
    testCases: [
      { desc: 'odd length — middle is index 2',   args: [[1,2,3,4,5]],   expected: 3 },
      { desc: 'even length — second middle',       args: [[1,2,3,4,5,6]], expected: 4 },
      { desc: 'two nodes',                         args: [[1,2]],         expected: 2 },
      { desc: 'single node',                       args: [[1]],           expected: 1 },
      { desc: 'four nodes',                        args: [[1,2,3,4]],     expected: 3 },
    ],
    followUpQuestions: [
      "You can't use an index here like you would with an array — why not?",
      "What makes the fast pointer land at or past the end exactly when slow is at the middle?",
      "Does your answer differ for odd vs even length lists, and is that acceptable?",
    ],
    title: 'Starter: Find the Middle of a Linked List',
    prompt: `Given the head of a singly linked list, return the middle node. If the list has an even number of nodes, return the second middle.

Example:
  1 → 2 → 3 → 4 → 5        →  node 3
  1 → 2 → 3 → 4 → 5 → 6   →  node 4

Naive approach: count nodes, then walk to n/2. That takes two passes.
Can you do it in one pass without knowing the length in advance?

This introduces the fast/slow pointer technique — a pattern used in detecting cycles, finding the kth-from-end node, and many other linked list problems.`,
    hints: [
      'Use two pointers: slow moves 1 step at a time, fast moves 2 steps at a time.',
      'When fast reaches the end of the list, slow is exactly at the middle.',
      'Why: fast travels twice as far as slow, so when fast has gone n steps, slow has gone n/2.',
    ],
    tags: ['linked lists', 'fast/slow pointers'],
    starterCode: {
      js: `class ListNode {
  constructor(val, next = null) { this.val = val; this.next = next; }
}

function middleNode(head) {
  // use fast/slow pointers — one pass, O(1) space
}

function fromArray(arr) {
  let h = null;
  for (let i = arr.length - 1; i >= 0; i--) h = new ListNode(arr[i], h);
  return h;
}
function toVal(node) { return node?.val; }

console.log(toVal(middleNode(fromArray([1,2,3,4,5]))));    // 3
console.log(toVal(middleNode(fromArray([1,2,3,4,5,6])))); // 4
`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val; self.next = next

def middle_node(head):
    # use fast/slow pointers — one pass, O(1) space
    pass

def from_array(arr):
    h = None
    for v in reversed(arr): h = ListNode(v, h)
    return h

print(middle_node(from_array([1,2,3,4,5])).val)    # 3
print(middle_node(from_array([1,2,3,4,5,6])).val)  # 4
`,
      typescript: `class ListNode {
  val: number; next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val; this.next = next;
  }
}

function middleNode(head: ListNode | null): ListNode | null {
  // use fast/slow pointers — one pass, O(1) space
  return null;
}

function fromArray(arr: number[]): ListNode | null {
  let h: ListNode | null = null;
  for (let i = arr.length - 1; i >= 0; i--) h = new ListNode(arr[i], h);
  return h;
}

console.log(middleNode(fromArray([1,2,3,4,5]))?.val);    // 3
console.log(middleNode(fromArray([1,2,3,4,5,6]))?.val);  // 4
`,
    },
  },

  {
    id: 'starter-bfs-dfs',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'BFS / DFS',
    teacherMode: true,
    functionName: 'floodFill',
    testCases: [
      { desc: 'basic fill',       args: [[[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2], expected: [[2,2,2],[2,2,0],[2,0,1]] },
      { desc: 'same-color no-op', args: [[[0,0,0],[0,1,1]], 1, 1, 1],         expected: [[0,0,0],[0,1,1]] },
      { desc: 'single cell',      args: [[[1]], 0, 0, 5],                      expected: [[5]] },
      { desc: 'corner isolated',  args: [[[1,0,1],[0,0,0],[1,0,1]], 0, 0, 3], expected: [[3,0,1],[0,0,0],[1,0,1]] },
      { desc: 'full grid fill',   args: [[[1,1],[1,1]], 0, 0, 9],              expected: [[9,9],[9,9]] },
    ],
    followUpQuestions: [
      "Why do you need to mark cells visited before you recurse?",
      "If you used BFS instead of DFS here, would you get the same result?",
      "How would you extend this to also return the number of cells you changed?",
    ],
    title: 'Starter: Flood Fill',
    prompt: `You have a 2D grid of integers representing pixel colors. Starting from cell (row, col), change the color of that cell and all connected cells with the same original color to a new color. Connectivity is 4-directional (up/down/left/right).

Example:
  grid = [[1,1,1],    start=(1,1), newColor=2
          [1,1,0],
          [1,0,1]]

  result: [[2,2,2],
           [2,2,0],
           [2,0,1]]

This is the foundation of the Number of Islands pattern. The technique is "flood fill" — visit a cell, mark it, then visit its neighbors.

Work through it with DFS (recursion) first, then try BFS (queue) as a second implementation.`,
    hints: [
      'Base cases: out of bounds, already the new color, or not the original color → return without doing anything.',
      'DFS: change the cell color, then recursively call on all 4 neighbors.',
      'BFS: use a queue. Enqueue the start cell. While the queue is non-empty: dequeue a cell, color it, enqueue uncolored neighbors.',
    ],
    tags: ['BFS', 'DFS', 'grid', 'recursion'],
    starterCode: {
      js: `function floodFill(grid, row, col, newColor) {
  // implement with DFS (recursion)
  // return the modified grid
}

const grid = [[1,1,1],[1,1,0],[1,0,1]];
console.log(floodFill(grid, 1, 1, 2));
// [[2,2,2],[2,2,0],[2,0,1]]

const grid2 = [[0,0,0],[0,1,1]];
console.log(floodFill(grid2, 1, 1, 1));
// [[0,0,0],[0,1,1]]  (already the new color — no change)
`,
      python: `def flood_fill(grid, row, col, new_color):
    # implement with DFS (recursion)
    # return the modified grid
    pass

grid = [[1,1,1],[1,1,0],[1,0,1]]
print(flood_fill(grid, 1, 1, 2))
# [[2,2,2],[2,2,0],[2,0,1]]
`,
      typescript: `function floodFill(grid: number[][], row: number, col: number, newColor: number): number[][] {
  // implement with DFS (recursion)
  return grid;
}

const grid = [[1,1,1],[1,1,0],[1,0,1]];
console.log(floodFill(grid, 1, 1, 2));
// [[2,2,2],[2,2,0],[2,0,1]]
`,
    },
  },

  {
    id: 'starter-graph-array',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'BFS / DFS',
    teacherMode: true,
    title: 'Starter: Graph Traversal with Adjacency List (Array)',
    functionName: 'validPath',
    testCases: [
      { desc: 'path exists',          args: [3, [[0,1],[1,2],[2,0]], 0, 2],      expected: true },
      { desc: 'no path (disconnected)', args: [6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5], expected: false },
      { desc: 'source equals dest',   args: [1, [], 0, 0],                       expected: true },
      { desc: 'direct edge',          args: [3, [[0,1],[2,1]], 0, 2],            expected: true },
      { desc: 'no edges',             args: [4, [], 0, 3],                       expected: false },
    ],
    prompt: `Given n nodes (labeled 0 to n-1) and a list of undirected edges, determine if there is a valid path from source to destination.

Example:
  n=3, edges=[[0,1],[1,2],[2,0]], source=0, destination=2  →  true
  n=6, edges=[[0,1],[0,2],[3,5],[5,4],[4,3]], source=0, destination=5  →  false

The graph is given as an edge list — your first step is to build an adjacency list from it.

Questions to think about:
  - How do you convert the edge list into a structure you can traverse?
  - How do you avoid revisiting nodes (infinite loops on cycles)?
  - Would you use BFS or DFS here — does it matter?`,
    hints: [
      'Build adjacency list first: for each [u,v] in edges, add v to adj[u] and u to adj[v] (undirected).',
      'BFS: queue starts with source. Pop a node, if it\'s destination return true, else enqueue unvisited neighbors.',
      'Track visited with a Set — add a node when you enqueue/visit it, not when you process it.',
    ],
    tags: ['BFS', 'DFS', 'graphs', 'adjacency list', 'array graph'],
    starterCode: {
      js: `function validPath(n, edges, source, destination) {
  // Step 1: build adjacency list
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  // Step 2: BFS / DFS from source
  const visited = new Set();
  const queue = [source]; // or use a stack for DFS
  visited.add(source);

  while (queue.length) {
    const node = queue.shift();
    if (node === destination) return true;
    for (const neighbor of adj[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return false;
}

console.log(validPath(3, [[0,1],[1,2],[2,0]], 0, 2)); // true
console.log(validPath(6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5)); // false
`,
      typescript: `function validPath(n: number, edges: number[][], source: number, destination: number): boolean {

}

console.log(validPath(3, [[0,1],[1,2],[2,0]], 0, 2)); // true
console.log(validPath(6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5)); // false
`,
      python: `from collections import deque

def valid_path(n, edges, source, destination):
    pass

print(valid_path(3, [[0,1],[1,2],[2,0]], 0, 2))  # True
print(valid_path(6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5))  # False
`,
    },
  },

  {
    id: 'starter-cycle-detect',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'BFS / DFS',
    teacherMode: true,
    title: 'Starter: Detect a Cycle in a Directed Graph',
    functionName: 'hasCycle',
    testCases: [
      { desc: 'simple cycle A→B→C→A',         args: [3, [[0,1],[1,2],[2,0]]],              expected: true  },
      { desc: 'no cycle — linear chain',        args: [3, [[0,1],[1,2]]],                    expected: false },
      { desc: 'no cycle — disconnected',        args: [4, [[0,1],[2,3]]],                    expected: false },
      { desc: 'self-loop',                      args: [2, [[0,0],[0,1]]],                    expected: true  },
      { desc: 'cycle in subgraph only',         args: [5, [[0,1],[1,2],[2,3],[3,1],[0,4]]], expected: true  },
      { desc: 'DAG — no cycle',                 args: [4, [[0,1],[0,2],[1,3],[2,3]]],        expected: false },
    ],
    prompt: `Given n nodes (labeled 0 to n-1) and a list of directed edges, return true if the graph contains a cycle, false otherwise.

Example:
  n=3, edges=[[0,1],[1,2],[2,0]]  →  true   (0→1→2→0)
  n=3, edges=[[0,1],[1,2]]        →  false  (no way back)
  n=4, edges=[[0,1],[0,2],[1,3],[2,3]]  →  false  (DAG — a→b and a→c both go to d, but no cycle)

The graph is directed — edge [u,v] means u→v only. A cycle exists when you can follow directed edges and return to a node you've already visited on the CURRENT path (not just any visited node).

Questions to think about:
  - Why can't you just track "visited" with a simple boolean? What case does that miss?
  - What extra state do you need to tell the difference between a back edge (cycle) and a cross edge (no cycle)?
  - Where in the DFS do you "unmark" a node, and why?`,
    hints: [
      'You need 3 states per node — unvisited (0), in current path (1), fully done (2). A cycle is detected when you reach a node with state 1.',
      'DFS: mark node as in-progress (1) when you enter, mark as done (2) when you finish ALL its neighbors. Only state 1 means "back edge = cycle".',
      'After recursing into all neighbors of a node with no cycle found, set its state to 2 (done). This is the key: un-marking from the current path lets other branches reuse the same nodes safely.',
    ],
    tags: ['DFS', 'cycle detection', 'directed graph', 'adjacency list', 'graphs'],
    starterCode: {
      js: `function hasCycle(n, edges) {
    // Build directed adjacency list
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
    }

    // 0 = unvisited, 1 = in current DFS path, 2 = fully explored
    const state = new Array(n).fill(0);

    function dfs(node) {
        state[node] = 1; // mark as in-progress
        for (const neighbor of adj[node]) {
            if (state[neighbor] === 1) return true;  // back edge → cycle
            if (state[neighbor] === 0 && dfs(neighbor)) return true;
        }
        state[node] = 2; // mark as done
        return false;
    }

    for (let i = 0; i < n; i++) {
        if (state[i] === 0 && dfs(i)) return true;
    }
    return false;
}

console.log(hasCycle(3, [[0,1],[1,2],[2,0]])); // true
console.log(hasCycle(3, [[0,1],[1,2]]));        // false
`,
      typescript: `function hasCycle(n: number, edges: number[][]): boolean {

}

console.log(hasCycle(3, [[0,1],[1,2],[2,0]])); // true
console.log(hasCycle(3, [[0,1],[1,2]]));        // false
`,
      python: `def has_cycle(n, edges):
    pass

print(has_cycle(3, [[0,1],[1,2],[2,0]]))  # True
print(has_cycle(3, [[0,1],[1,2]]))         # False
`,
    },
  },

  {
    id: 'starter-trees',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Trees',
    teacherMode: true,
    functionName: 'maxDepth',
    treeTest: true,
    testCases: [
      { desc: 'example tree — depth 3',   args: [[3,9,20,null,null,15,7]], expected: 3 },
      { desc: 'null tree',                 args: [[]],                      expected: 0 },
      { desc: 'single node',               args: [[1]],                     expected: 1 },
      { desc: 'right-skewed — depth 3',   args: [[1,null,2,null,3]],        expected: 3 },
      { desc: 'perfect tree — depth 3',   args: [[1,2,3,4,5,6,7]],          expected: 3 },
    ],
    followUpQuestions: [
      "What does your base case return, and why?",
      "How does the depth of a node relate to the depth of its two children?",
      "What's the space complexity — and how does a balanced tree differ from a skewed one?",
    ],
    title: 'Starter: Maximum Depth of a Binary Tree',
    prompt: `Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from the root to a leaf.

Example:
      3
     / \\
    9  20
      /  \\
     15   7

  Depth = 3

This is the first tree problem you should master. It introduces the two things that almost all tree problems share:
  1. A recursive structure (left subtree, right subtree, combine)
  2. A clear base case (what does an empty tree return?)

Once you can write this in under 3 lines, you'll find that many harder tree problems use the same skeleton.`,
    hints: [
      'Base case: if root is null, depth is 0.',
      'Recursive case: 1 + max(depth(root.left), depth(root.right)).',
      'That\'s the whole solution. The key is recognizing that the depth of a tree = 1 (the root) + the depth of the deeper subtree.',
    ],
    tags: ['trees', 'recursion', 'DFS'],
    starterCode: {
      js: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function maxDepth(root) {
  // base case + recursive case — can be written in 1-3 lines
}

// Build the example tree
const root = new TreeNode(3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(maxDepth(root));         // 3
console.log(maxDepth(new TreeNode(1)));  // 1
console.log(maxDepth(null));         // 0
`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def max_depth(root):
    # base case + recursive case — can be written in 1-2 lines
    pass

root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(max_depth(root))          # 3
print(max_depth(TreeNode(1)))   # 1
print(max_depth(None))          # 0
`,
      typescript: `class TreeNode {
  val: number; left: TreeNode | null; right: TreeNode | null;
  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function maxDepth(root: TreeNode | null): number {
  // base case + recursive case
  return 0;
}

const root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.log(maxDepth(root));  // 3
console.log(maxDepth(null));  // 0
`,
    },
  },

  {
    id: 'starter-binary-search',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Binary Search',
    teacherMode: true,
    functionName: 'searchInsert',
    testCases: [
      { desc: 'target present — middle',  args: [[1,3,5,6], 5],  expected: 2 },
      { desc: 'target present — start',   args: [[1,3,5,6], 1],  expected: 0 },
      { desc: 'target present — end',     args: [[1,3,5,6], 6],  expected: 3 },
      { desc: 'insert at beginning',      args: [[1,3,5,6], 0],  expected: 0 },
      { desc: 'insert at end',            args: [[1,3,5,6], 7],  expected: 4 },
      { desc: 'insert in middle',         args: [[1,3,5,6], 2],  expected: 1 },
      { desc: 'single element — match',   args: [[5], 5],        expected: 0 },
      { desc: 'single element — insert',  args: [[5], 3],        expected: 0 },
    ],
    followUpQuestions: [
      "Why `lo + Math.floor((hi - lo) / 2)` instead of just `(lo + hi) / 2`?",
      "When the loop exits, what's true about `lo` — and why does that make it the insert position?",
      "How would you adapt this if there were duplicate values and you wanted the first occurrence?",
    ],
    title: 'Starter: Search Insert Position',
    prompt: `Given a sorted array and a target, return the index of the target if it exists, or the index where it would be inserted to keep the array sorted.

Example:
  [1, 3, 5, 6], target = 5  →  2   (found at index 2)
  [1, 3, 5, 6], target = 2  →  1   (would insert between 1 and 3)
  [1, 3, 5, 6], target = 7  →  4   (would append at end)
  [1, 3, 5, 6], target = 0  →  0   (would prepend)

This is binary search with one extra observation: when the loop ends, the left pointer is always at the correct insertion position.

Make sure you understand WHY the left pointer ends up in the right place — that understanding transfers to dozens of harder binary search problems.`,
    hints: [
      'Standard binary search: lo=0, hi=n-1. mid = lo + (hi-lo)//2. If nums[mid] == target, return mid.',
      'If target < nums[mid]: hi = mid - 1. If target > nums[mid]: lo = mid + 1.',
      'When the loop exits (lo > hi), lo is where the target would be inserted. Return lo.',
    ],
    tags: ['binary search', 'arrays'],
    starterCode: {
      js: `function searchInsert(nums, target) {
  // binary search — O(log n)
  // return index if found, insertion point if not
}

console.log(searchInsert([1,3,5,6], 5));  // 2
console.log(searchInsert([1,3,5,6], 2));  // 1
console.log(searchInsert([1,3,5,6], 7));  // 4
console.log(searchInsert([1,3,5,6], 0));  // 0
`,
      python: `def search_insert(nums, target):
    # binary search — O(log n)
    pass

print(search_insert([1,3,5,6], 5))  # 2
print(search_insert([1,3,5,6], 2))  # 1
print(search_insert([1,3,5,6], 7))  # 4
print(search_insert([1,3,5,6], 0))  # 0
`,
      typescript: `function searchInsert(nums: number[], target: number): number {
  // binary search — O(log n)
  return 0;
}

console.log(searchInsert([1,3,5,6], 5));  // 2
console.log(searchInsert([1,3,5,6], 2));  // 1
`,
    },
  },

  {
    id: 'starter-greedy-heap',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Greedy & Scheduling',
    teacherMode: true,
    functionName: 'minTime',
    testCases: [
      { desc: 'balanced split',             args: [1, [3,3,3,3]],         expected: 7 },
      { desc: 'equal start, even tasks',    args: [0, [4,4,4,4]],         expected: 8 },
      { desc: 'B starts too late — all to A', args: [10, [1,1,1,1]],     expected: 4 },
      { desc: 'equal start, equal tasks',   args: [0, [1,1,1,1]],         expected: 2 },
      { desc: 'big task to A, small to B',  args: [2, [8,1,1,1]],         expected: 8 },
      { desc: 'uneven — split saves time',  args: [0, [5,1,1,1]],         expected: 5 },
    ],
    followUpQuestions: [
      "Why is always picking the least-loaded processor the right greedy choice here?",
      "What data structure tracks the least-loaded processor efficiently?",
      "What changes if processors could each handle different numbers of tasks?",
    ],
    title: 'Starter: Assign Tasks to 2 Processors',
    prompt: `You have exactly 2 processors. Processor A starts immediately (delay = 0). Processor B starts after a delay of D seconds. You have a list of task durations. Assign all tasks so that each processor handles some tasks, and minimize the time until all tasks are done.

Each processor runs its assigned tasks sequentially. Total time = max(finishA, finishB).

Example:
  delay = 5, tasks = [8, 3, 6, 2, 7, 1, 4, 5]
  One assignment: A gets [8,3,6,2], B gets [7,1,4,5] → A finishes at 19, B finishes at 5+17=22
  Better:         A gets [8,7,6,5], B gets [3,2,1,4] → A finishes at 26, B finishes at 5+10=15 → max=26
  Best:           A gets [8,7,3,2], B gets [6,5,4,1] → A=20, B=5+16=21 → max=21 ... keep trying

This is a simplified 2-processor version of the hard scheduling problem. Use it to understand the greedy insight before tackling the n-processor version.

What general principle tells you how to pair tasks with processors?`,
    hints: [
      'Key insight: give more work to the processor that starts sooner (lower delay). Processor A has no delay, so it can absorb more total work.',
      'Greedy: sort tasks largest first. Use a simple loop: assign each task to whichever processor has the smaller current finish time.',
      'This is a simplified version of the LPT (Longest Processing Time) rule. For 2 processors it\'s easy to implement without a heap.',
    ],
    tags: ['greedy', 'scheduling', 'arrays'],
    starterCode: {
      js: `function minTime(delay, tasks) {
  // delay: number — when processor B starts (A starts at 0)
  // tasks: number[] — durations of all tasks
  // return: minimum total time (when last task finishes)
}

console.log(minTime(5, [8, 3, 6, 2, 7, 1, 4, 5]));  // find the minimum
console.log(minTime(0, [1, 1, 1, 1]));               // 2 (equal split)
console.log(minTime(10, [1, 1, 1, 1]));              // 4 (all go to A — B starts too late)
`,
      python: `def min_time(delay, tasks):
    # delay: int — when processor B starts (A starts at 0)
    # tasks: list of int — durations
    # return: minimum total time
    pass

print(min_time(5, [8, 3, 6, 2, 7, 1, 4, 5]))  # find the minimum
print(min_time(0, [1, 1, 1, 1]))               # 2
print(min_time(10, [1, 1, 1, 1]))              # 4
`,
      typescript: `function minTime(delay: number, tasks: number[]): number {
  // delay: when processor B starts (A starts at 0)
  // return: minimum total time
  return 0;
}

console.log(minTime(5, [8, 3, 6, 2, 7, 1, 4, 5]));
console.log(minTime(0, [1, 1, 1, 1]));   // 2
`,
    },
  },

  {
    id: 'starter-dp',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Dynamic Programming',
    teacherMode: true,
    functionNames: ['climbNaive', 'climbMemo', 'climbDP'],
    functionName: 'climbDP',
    testCases: [
      { desc: '1 stair',        args: [1],  expected: 1 },
      { desc: '2 stairs',       args: [2],  expected: 2 },
      { desc: '3 stairs',       args: [3],  expected: 3 },
      { desc: '4 stairs',       args: [4],  expected: 5 },
      { desc: '5 stairs',       args: [5],  expected: 8 },
      { desc: '10 stairs',      args: [10], expected: 89 },
    ],
    followUpQuestions: [
      "What's the recurrence relation — how does f(n) depend on smaller values?",
      "Did you go top-down or bottom-up, and why?",
      "Can you get the space down to O(1)? What's the insight that allows it?",
    ],
    title: 'Starter: Climbing Stairs',
    prompt: `You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. How many distinct ways can you reach the top?

Example:
  n = 2  →  2   (1+1, or 2)
  n = 3  →  3   (1+1+1, 1+2, 2+1)
  n = 5  →  8

This is the "Hello World" of dynamic programming. It teaches the two core DP concepts:
  1. Overlapping subproblems — ways(n) depends on ways(n-1) and ways(n-2)
  2. Optimal substructure — the answer for n builds on answers for smaller n

Implement it three ways:
  1. Naive recursion (to see the repeated work)
  2. Memoization (top-down DP — add a cache to recursion)
  3. Bottom-up DP (fill a table from base cases up to n)`,
    hints: [
      'Observation: to reach step n, you either came from step n-1 (took 1 step) or step n-2 (took 2 steps). So ways(n) = ways(n-1) + ways(n-2).',
      'Base cases: ways(1) = 1, ways(2) = 2. This is the Fibonacci sequence!',
      'Bottom-up: dp[i] = dp[i-1] + dp[i-2]. You only need the last two values, so you can do it in O(1) space.',
    ],
    tags: ['dynamic programming', 'recursion', 'memoization'],
    starterCode: {
      js: `// Version 1: naive recursion (see the repeated work — exponential time)
function climbNaive(n) {
}

// Version 2: memoization (top-down DP)
function climbMemo(n, memo = {}) {
}

// Version 3: bottom-up DP (iterative)
function climbDP(n) {
}

console.log(climbDP(2));  // 2
console.log(climbDP(3));  // 3
console.log(climbDP(5));  // 8
console.log(climbDP(10)); // 89
`,
      python: `# Version 1: naive recursion
def climb_naive(n):
    pass

# Version 2: memoization
from functools import lru_cache
@lru_cache(maxsize=None)
def climb_memo(n):
    pass

# Version 3: bottom-up DP
def climb_dp(n):
    pass

print(climb_dp(2))   # 2
print(climb_dp(3))   # 3
print(climb_dp(5))   # 8
print(climb_dp(10))  # 89
`,
      typescript: `function climbNaive(n: number): number {
  // naive recursion — see why it's slow
  return 0;
}

function climbMemo(n: number, memo: Map<number, number> = new Map()): number {
  // memoized recursion
  return 0;
}

function climbDP(n: number): number {
  // bottom-up, O(n) time, O(1) space
  return 0;
}

console.log(climbDP(2));  // 2
console.log(climbDP(5));  // 8
`,
    },
  },

  {
    id: 'starter-js-patterns',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'JavaScript / Closures',
    teacherMode: true,
    suitableLanguages: ['js', 'typescript'],
    memoizeTest: true,
    followUpQuestions: [
      "What is a closure and how does your memoize rely on one?",
      "What happens if someone calls the memoized function with an object argument?",
      "What's the trade-off — when would you NOT want to memoize?",
    ],
    title: 'Starter: Implement Memoize',
    prompt: `Implement a \`memoize(fn)\` function that wraps any pure function and caches its results. If the same arguments are passed again, return the cached result instead of calling fn again.

Example:
  const expensiveAdd = memoize((a, b) => {
    console.log('computing...');
    return a + b;
  });

  expensiveAdd(1, 2);  // logs "computing...", returns 3
  expensiveAdd(1, 2);  // returns 3 from cache (no log)
  expensiveAdd(2, 3);  // logs "computing...", returns 5

This is simpler than debounce but teaches the same core idea — closures and higher-order functions.

Key questions:
  - How do you create a cache key from multiple arguments?
  - What JavaScript scope does the cache live in?
  - When would memoize be a bad idea (i.e., when should you NOT use it)?`,
    hints: [
      'The cache is a Map or object stored in the closure — it persists between calls but is private to each memoized function.',
      'Cache key: JSON.stringify(args) works for simple values. For functions/objects as args, you\'d need a WeakMap.',
      'Bad idea for: functions with side effects, functions that return different values for the same input (non-pure), functions with very large/varied inputs (memory leak risk).',
    ],
    tags: ['javascript', 'closures', 'higher-order functions', 'caching'],
    starterCode: {
      js: `function memoize(fn) {
  // return a wrapped version of fn that caches results
}

// Test
const add = memoize((a, b) => {
  console.log('computing...');
  return a + b;
});

console.log(add(1, 2));  // "computing..." then 3
console.log(add(1, 2));  // 3 (no "computing...")
console.log(add(2, 3));  // "computing..." then 5
console.log(add(1, 2));  // 3 (cached)
`,
      python: `def memoize(fn):
    # return a wrapped version of fn that caches results
    pass

# Test
call_count = [0]
def add(a, b):
    call_count[0] += 1
    return a + b

memo_add = memoize(add)
print(memo_add(1, 2))  # 3, call_count = 1
print(memo_add(1, 2))  # 3, call_count still 1 (cached)
print(memo_add(2, 3))  # 5, call_count = 2
print(f"calls made: {call_count[0]}")  # 2
`,
      typescript: `function memoize<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn
): (...args: TArgs) => TReturn {
  // return a wrapped version of fn that caches results
  return fn; // replace this
}

const add = memoize((a: number, b: number): number => {
  console.log('computing...');
  return a + b;
});

console.log(add(1, 2));  // "computing..." then 3
console.log(add(1, 2));  // 3 (cached)
console.log(add(2, 3));  // "computing..." then 5
`,
    },
  },

  {
    id: 'starter-data-structures',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Data Structures',
    teacherMode: true,
    classTest: true,
    className: 'MinStack',
    testCases: [
      {
        desc: 'push and getMin',
        steps: [
          { method: 'push', args: [5] },
          { method: 'push', args: [3] },
          { method: 'push', args: [7] },
          { method: 'getMin', args: [], returns: 3 },
        ],
      },
      {
        desc: 'getMin updates after pop',
        steps: [
          { method: 'push', args: [5] },
          { method: 'push', args: [3] },
          { method: 'push', args: [1] },
          { method: 'getMin', args: [], returns: 1 },
          { method: 'pop', args: [], returns: 1 },
          { method: 'getMin', args: [], returns: 3 },
        ],
      },
      {
        desc: 'peek and isEmpty',
        steps: [
          { method: 'push', args: [42] },
          { method: 'peek', args: [], returns: 42 },
          { method: 'isEmpty', args: [], returns: false },
          { method: 'pop', args: [], returns: 42 },
          { method: 'isEmpty', args: [], returns: true },
        ],
      },
      {
        desc: 'min tracks through multiple pops',
        steps: [
          { method: 'push', args: [10] },
          { method: 'push', args: [2] },
          { method: 'push', args: [8] },
          { method: 'push', args: [1] },
          { method: 'getMin', args: [], returns: 1 },
          { method: 'pop', args: [], returns: 1 },
          { method: 'getMin', args: [], returns: 2 },
          { method: 'pop', args: [], returns: 8 },
          { method: 'getMin', args: [], returns: 2 },
        ],
      },
    ],
    followUpQuestions: [
      "What are you using to track the current minimum, and why?",
      "When you pop the minimum off the stack, how do you know what the previous minimum was?",
      "What's the space cost of your approach?",
    ],
    title: 'Starter: Implement a Stack with getMin()',
    prompt: `Implement a Stack class that supports:
  - push(val) — add to top
  - pop() — remove and return top, or undefined if empty
  - peek() — return top without removing, or undefined if empty
  - isEmpty() — return true if empty
  - getMin() — return the minimum value in the stack in O(1) time

The last requirement is the interesting one. A naive getMin would scan the whole stack (O(n)). Can you track the minimum with O(1) extra work per push/pop?

Example:
  stack.push(5); stack.push(3); stack.push(7); stack.push(1);
  stack.getMin()  →  1
  stack.pop();    // removes 1
  stack.getMin()  →  3  (minimum updates!)`,
    hints: [
      'Use an array internally for the main stack. push/pop/peek are just array operations.',
      'For getMin in O(1): maintain a second "min stack." When you push a value, also push the current minimum onto the min stack. When you pop, pop both stacks.',
      'The min stack stores the minimum AT EACH LEVEL — so even after pops, getMin() looks at the top of the min stack.',
    ],
    tags: ['data structures', 'stack', 'design'],
    starterCode: {
      js: `class MinStack {
  constructor() {
    // your setup
  }

  push(val) {}
  pop() {}
  peek() {}
  isEmpty() {}
  getMin() {}  // O(1) — no scanning allowed
}

const s = new MinStack();
s.push(5); s.push(3); s.push(7); s.push(1);
console.log(s.getMin());  // 1
s.pop();
console.log(s.getMin());  // 3
s.pop(); s.pop();
console.log(s.getMin());  // 5
`,
      python: `class MinStack:
    def __init__(self):
        pass  # your setup

    def push(self, val): pass
    def pop(self): pass
    def peek(self): pass
    def is_empty(self): pass
    def get_min(self): pass  # O(1)

s = MinStack()
s.push(5); s.push(3); s.push(7); s.push(1)
print(s.get_min())  # 1
s.pop()
print(s.get_min())  # 3
`,
      typescript: `class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];

  push(val: number): void {}
  pop(): number | undefined { return undefined; }
  peek(): number | undefined { return undefined; }
  isEmpty(): boolean { return true; }
  getMin(): number | undefined { return undefined; }  // O(1)
}

const s = new MinStack();
s.push(5); s.push(3); s.push(7); s.push(1);
console.log(s.getMin());  // 1
s.pop();
console.log(s.getMin());  // 3
`,
    },
  },

  {
    id: 'starter-typescript',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'TypeScript',
    teacherMode: true,
    suitableLanguages: ['typescript'],
    classTest: true,
    className: 'Stack',
    testCases: [
      {
        desc: 'push, pop, peek',
        steps: [
          { method: 'push', args: [1] },
          { method: 'push', args: [2] },
          { method: 'push', args: [3] },
          { method: 'peek', args: [], returns: 3 },
          { method: 'pop', args: [], returns: 3 },
          { method: 'size', args: [], returns: 2 },
        ],
      },
      {
        desc: 'isEmpty on new and after push',
        steps: [
          { method: 'isEmpty', args: [], returns: true },
          { method: 'push', args: [10] },
          { method: 'isEmpty', args: [], returns: false },
          { method: 'pop', args: [], returns: 10 },
          { method: 'isEmpty', args: [], returns: true },
        ],
      },
      {
        desc: 'pop empty returns undefined, size tracks correctly',
        steps: [
          { method: 'pop', args: [], returns: undefined },
          { method: 'size', args: [], returns: 0 },
          { method: 'push', args: [5] },
          { method: 'push', args: [6] },
          { method: 'size', args: [], returns: 2 },
          { method: 'pop', args: [], returns: 6 },
          { method: 'pop', args: [], returns: 5 },
          { method: 'pop', args: [], returns: undefined },
          { method: 'size', args: [], returns: 0 },
        ],
      },
      {
        desc: 'peek does not remove, size unchanged',
        steps: [
          { method: 'push', args: [100] },
          { method: 'push', args: [200] },
          { method: 'peek', args: [], returns: 200 },
          { method: 'size', args: [], returns: 2 },
          { method: 'peek', args: [], returns: 200 },
        ],
      },
    ],
    followUpQuestions: [
      "What makes your class generic — what keyword did you use and what does it do?",
      "Does the generic type exist at runtime, or only at compile time?",
      "What's the real advantage of Stack<T> over a stack that just uses any[]?",
    ],
    title: 'Starter: Generic Stack in TypeScript',
    prompt: `Implement a type-safe generic Stack<T> class in TypeScript. The stack should be fully typed — the TypeScript compiler should prevent you from pushing the wrong type.

Requirements:
  - push(item: T): void
  - pop(): T | undefined
  - peek(): T | undefined
  - isEmpty(): boolean
  - size(): number

Then demonstrate why generics are better than using any[] or unknown[]:
  - Show that a Stack<number> rejects strings at compile time
  - Show that pop() returns T (not any), so callers don't need to cast

Bonus: add a static factory method Stack.of<T>(...items: T[]): Stack<T>`,
    hints: [
      'Declare the class with a type parameter: class Stack<T>. Store items in a private items: T[] = [].',
      'pop() returns T | undefined — the | undefined is important because popping an empty stack is valid.',
      'For the factory method: static of<T>(...items: T[]): Stack<T> — create a new Stack and push all items.',
    ],
    tags: ['TypeScript', 'generics', 'data structures', 'OOP'],
    starterCode: {
      typescript: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    // your implementation
  }

  pop(): T | undefined {
    // your implementation
    return undefined;
  }

  peek(): T | undefined {
    // your implementation
    return undefined;
  }

  isEmpty(): boolean {
    return true;
  }

  size(): number {
    return 0;
  }

  // Bonus: static factory
  static of<T>(...items: T[]): Stack<T> {
    const s = new Stack<T>();
    // push all items
    return s;
  }
}

// Test — TypeScript should know these types
const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.push(3);
const popped = numStack.pop();   // TypeScript knows: popped is number | undefined
console.log(popped);             // 3
console.log(numStack.peek()); // 2
console.log(numStack.size()); // 2

const fromFactory = Stack.of("hello", "world");
console.log(fromFactory.pop()); // "world"

// This should be a TypeScript error (uncomment to verify):
// numStack.push("not a number");
`,
      js: `class Stack {
  constructor() { this.items = []; }
  push(item) { this.items.push(item); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  static of(...items) { const s = new Stack(); items.forEach(i => s.push(i)); return s; }
}

const s = new Stack();
s.push(1); s.push(2); s.push(3);
console.log(s.pop());   // 3
console.log(s.size());  // 2
`,
    },
  },

  {
    id: 'starter-python-data',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Python Data Engineering',
    teacherMode: true,
    suitableLanguages: ['python'],
    functionName: 'group_by',
    testCases: [
      {
        desc: 'groups by status',
        args: [
          [{"id":1,"status":"open","amount":100},{"id":2,"status":"closed","amount":50},{"id":3,"status":"open","amount":200}],
          'status',
        ],
        expected: {
          open: [{"id":1,"status":"open","amount":100},{"id":3,"status":"open","amount":200}],
          closed: [{"id":2,"status":"closed","amount":50}],
        },
      },
      {
        desc: 'single record',
        args: [[{"dept":"eng","name":"Alice"}], 'dept'],
        expected: { eng: [{"dept":"eng","name":"Alice"}] },
      },
      {
        desc: 'empty list',
        args: [[], 'status'],
        expected: {},
      },
      {
        desc: 'multiple groups with multiple records each',
        args: [[{"type":"a","v":1},{"type":"b","v":2},{"type":"a","v":3},{"type":"b","v":4}], 'type'],
        expected: { a: [{"type":"a","v":1},{"type":"a","v":3}], b: [{"type":"b","v":2},{"type":"b","v":4}] },
      },
    ],
    followUpQuestions: [
      "Why defaultdict instead of a plain dict here?",
      "How would you handle a record where the grouping field is None or missing?",
      "If this dataset were too big to fit in memory, what would you reach for?",
    ],
    title: 'Starter: Group Records by a Field',
    prompt: `Write a Python function that groups a list of dictionaries by a specified field value. This is one of the most common operations in data processing pipelines.

Example:
  records = [
    {"id": 1, "status": "open",   "amount": 100},
    {"id": 2, "status": "closed", "amount": 50},
    {"id": 3, "status": "open",   "amount": 200},
    {"id": 4, "status": "closed", "amount": 75},
  ]

  group_by(records, "status") →
  {
    "open":   [{"id":1,...}, {"id":3,...}],
    "closed": [{"id":2,...}, {"id":4,...}],
  }

Then: write a second function that groups AND aggregates — return the sum of "amount" per group.

This pattern directly mirrors SQL GROUP BY and is the foundation of PySpark groupBy + aggregation.`,
    hints: [
      'Use collections.defaultdict(list) — appending to a missing key auto-creates an empty list.',
      'For aggregation: iterate the grouped dict, summing the field in each list.',
      'Python type hint: Dict[str, List[Dict]] — practice annotating data engineering functions.',
    ],
    tags: ['Python', 'data engineering', 'dictionaries', 'groupBy'],
    starterCode: {
      python: `from collections import defaultdict
from typing import Any

def group_by(records: list[dict], field: str) -> dict[str, list[dict]]:
    """Group records by the value of a given field."""
    pass

def group_and_sum(records: list[dict], group_field: str, sum_field: str) -> dict[str, float]:
    """Group records and return the sum of sum_field per group."""
    pass

# Test
records = [
    {"id": 1, "status": "open",   "amount": 100},
    {"id": 2, "status": "closed", "amount": 50},
    {"id": 3, "status": "open",   "amount": 200},
    {"id": 4, "status": "closed", "amount": 75},
]

grouped = group_by(records, "status")
print(grouped["open"])    # [{"id":1,...}, {"id":3,...}]
print(grouped["closed"])  # [{"id":2,...}, {"id":4,...}]

sums = group_and_sum(records, "status", "amount")
print(sums)  # {"open": 300, "closed": 125}
`,
    },
  },

  // ─── CODING ───────────────────────────────────────────────────────────────

  {
    id: 'coding-1',
    pattern: 'Hash Maps & Arrays',
    category: 'coding',
    difficulty: 'easy',
    title: 'Two Sum',
    functionName: 'twoSum',
    testCases: [
      { desc: 'basic case',              args: [[2,7,11,15], 9],   expected: [0,1] },
      { desc: 'answer not at index 0',   args: [[3,2,4], 6],       expected: [1,2] },
      { desc: 'duplicate values',        args: [[3,3], 6],         expected: [0,1] },
      { desc: 'negative numbers',        args: [[-1,-2,-3,-4], -7], expected: [2,3] },
      { desc: 'answer at end of array',  args: [[1,2,3,4,5], 9],   expected: [3,4] },
      { desc: 'two elements only',       args: [[5,5], 10],        expected: [0,1] },
    ],
    prompt: `Given an array of integers and a target, return the indices of the two numbers that add up to the target. Assume exactly one solution exists.

Example:
  Input:  nums = [2, 7, 11, 15], target = 9
  Output: [0, 1]   // 2 + 7 = 9

Write the function, then state the time and space complexity.`,
    hints: [
      'A brute-force double loop is O(n²). Can you do it in one pass?',
      'Use a hash map: store each number\'s index as you iterate, and check if (target - current) already exists.',
      'Time: O(n) | Space: O(n)',
    ],
    tags: ['arrays', 'hash maps'],
    starterCode: {
      typescript: `function twoSum(nums: number[], target: number): number[] {
  // your solution here
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
console.log(twoSum([3, 2, 4], 6));        // [1, 2]
`,
      js: `function twoSum(nums, target) {
  // your solution here
}

// Test
console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
console.log(twoSum([3, 2, 4], 6));        // [1, 2]
`,
      python: `def two_sum(nums, target):
    # your solution here
    pass

# Test
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
print(two_sum([3, 2, 4], 6))        # [1, 2]
`,
    },
  },

  {
    id: 'coding-2',
    pattern: 'JavaScript / Closures',
    category: 'coding',
    difficulty: 'medium',
    title: 'Implement Debounce',
    debounceTest: true,
    prompt: `Implement a \`debounce(fn, delay)\` function. It should return a new function that, when called repeatedly, only executes \`fn\` after \`delay\` milliseconds have passed since the last call.

Example:
  const search = debounce((query) => console.log('searching:', query), 300);
  search('a');   // ignored (called again too soon)
  search('ab');  // ignored
  search('abc'); // executes after 300ms — logs "searching: abc"

This is a real-world senior JS question. Implement it and explain where you'd use debounce vs. throttle.`,
    hints: [
      'You need to clear and reset a timer each time the function is called.',
      'Use setTimeout and clearTimeout. Store the timer id in closure.',
      'The returned function should accept any arguments and pass them through to fn.',
    ],
    tags: ['javascript', 'closures', 'timers', 'functional'],
    starterCode: {
      typescript: `function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  // your implementation
  return fn; // replace this
}

const log = debounce((msg: string) => console.log('fired:', msg), 200);
log('first');
log('second');
setTimeout(() => log('third'), 300);
`,
      js: `function debounce(fn, delay) {
  // your implementation
}

// Test
const log = debounce((msg) => console.log('fired:', msg), 200);
log('first');
log('second');
setTimeout(() => log('third'), 300); // should fire after 500ms total
`,
      python: `import threading

def debounce(fn, delay):
    # your implementation (delay in seconds)
    pass

# Test
import time
log = debounce(lambda msg: print(f'fired: {msg}'), 0.2)
log('first')
log('second')
time.sleep(0.3)
log('third')
time.sleep(0.3)
`,
    },
  },

  {
    id: 'coding-3',
    pattern: 'JavaScript / Closures',
    category: 'coding',
    difficulty: 'medium',
    functionName: 'flatten',
    testCases: [
      { desc: 'one level deep',        args: [{ a: { b: 1 } }],               expected: { 'a.b': 1 } },
      { desc: 'two levels deep',       args: [{ a: { b: { c: 2 } } }],        expected: { 'a.b.c': 2 } },
      { desc: 'flat value passthrough',args: [{ x: 1, y: 2 }],               expected: { x: 1, y: 2 } },
      { desc: 'empty object',          args: [{}],                            expected: {} },
      { desc: 'null value',            args: [{ a: null }],                   expected: { a: null } },
      { desc: 'array values',          args: [{ items: [10, 20] }],           expected: { 'items.0': 10, 'items.1': 20 } },
      { desc: 'mixed nested + flat',   args: [{ a: 1, b: { c: 2, d: 3 } }],  expected: { a: 1, 'b.c': 2, 'b.d': 3 } },
    ],
    title: 'Flatten Nested Object',
    prompt: `Write a function \`flatten(obj, prefix)\` that takes a deeply nested object and returns a flat object where keys represent the path using dot notation.

Example:
  Input:
    {
      user: {
        name: 'Alice',
        address: { city: 'Atlanta', zip: '30301' }
      },
      active: true
    }

  Output:
    {
      'user.name': 'Alice',
      'user.address.city': 'Atlanta',
      'user.address.zip': '30301',
      'active': true
    }

Handle arrays too (use index notation: e.g. \`items.0.name\`). State the time complexity.`,
    hints: [
      'Use recursion. For each key, if the value is a non-null object, recurse with an updated prefix.',
      'Track the current path as a string prefix, appending ".key" at each level.',
      'Arrays are objects too — Object.entries() works on them.',
    ],
    tags: ['javascript', 'recursion', 'objects'],
    starterCode: {
      js: `function flatten(obj, prefix = '') {
  // your implementation
}

// Test
const input = {
  user: { name: 'Alice', address: { city: 'Atlanta', zip: '30301' } },
  active: true,
  scores: [10, 20],
};
console.log(flatten(input));
`,
      python: `def flatten(obj, prefix=''):
    # your implementation
    pass

# Test
data = {
    'user': {'name': 'Alice', 'address': {'city': 'Atlanta', 'zip': '30301'}},
    'active': True,
    'scores': [10, 20],
}
print(flatten(data))
`,
    },
  },

  {
    id: 'coding-4',
    pattern: 'Data Structures',
    category: 'coding',
    difficulty: 'medium',
    title: 'Implement a Simple Event Emitter',
    eventEmitterTest: true,
    prompt: `Implement an \`EventEmitter\` class with the following methods:
  - \`on(event, listener)\` — subscribe to an event
  - \`off(event, listener)\` — unsubscribe a specific listener
  - \`emit(event, ...args)\` — call all listeners for the event with the given args
  - \`once(event, listener)\` — subscribe but auto-remove after first call

This pattern is core to Node.js. Implement it, then explain how Node's built-in EventEmitter extends this concept.`,
    hints: [
      'Store listeners in a Map: event name → array of listener functions.',
      'For once(), wrap the listener in a function that calls off() before invoking the original.',
      'emit() should iterate over a copy of the listeners array in case a listener calls off() during iteration.',
    ],
    tags: ['javascript', 'design patterns', 'node.js', 'OOP'],
    starterCode: {
      js: `class EventEmitter {
  // your implementation
}

// Test
const emitter = new EventEmitter();

emitter.on('data', (msg) => console.log('listener 1:', msg));
emitter.once('data', (msg) => console.log('once listener:', msg));

emitter.emit('data', 'hello');   // both listeners fire
emitter.emit('data', 'world');   // only listener 1 fires (once was removed)
`,
      typescript: `type Listener<T = any> = (...args: T[]) => void;

class EventEmitter {
  private listeners: Map<string, Listener[]> = new Map();

  on(event: string, listener: Listener): void {
    // your implementation
  }

  off(event: string, listener: Listener): void {
    // your implementation
  }

  emit(event: string, ...args: any[]): void {
    // your implementation
  }

  once(event: string, listener: Listener): void {
    // your implementation
  }
}

const emitter = new EventEmitter();
emitter.on('data', (msg: string) => console.log('listener 1:', msg));
emitter.once('data', (msg: string) => console.log('once:', msg));
emitter.emit('data', 'hello');  // both fire
emitter.emit('data', 'world');  // only listener 1
`,
      python: `class EventEmitter:
    # your implementation
    pass

# Test
emitter = EventEmitter()
emitter.on('data', lambda msg: print(f'listener 1: {msg}'))
emitter.once('data', lambda msg: print(f'once: {msg}'))

emitter.emit('data', 'hello')  # both fire
emitter.emit('data', 'world')  # only listener 1
`,
    },
  },

  {
    id: 'coding-5',
    pattern: 'Data Structures',
    category: 'coding',
    difficulty: 'hard',
    title: 'LRU Cache',
    classTest: true,
    className: 'LRUCache',
    testCases: [
      {
        desc: 'basic get/put and eviction',
        constructorArgs: [2],
        steps: [
          { method: 'put',  args: [1, 1] },
          { method: 'put',  args: [2, 2] },
          { method: 'get',  args: [1],    returns: 1 },
          { method: 'put',  args: [3, 3] },           // evicts key 2
          { method: 'get',  args: [2],    returns: -1 },
          { method: 'get',  args: [3],    returns: 3 },
        ],
      },
      {
        desc: 'update existing key resets recency',
        constructorArgs: [2],
        steps: [
          { method: 'put',  args: [1, 1] },
          { method: 'put',  args: [2, 2] },
          { method: 'put',  args: [1, 10] },          // update key 1 — now most recent
          { method: 'put',  args: [3, 3] },           // evicts key 2, not key 1
          { method: 'get',  args: [2],    returns: -1 },
          { method: 'get',  args: [1],    returns: 10 },
        ],
      },
      {
        desc: 'capacity 1 — always evicts on put',
        constructorArgs: [1],
        steps: [
          { method: 'put',  args: [1, 1] },
          { method: 'put',  args: [2, 2] },           // evicts key 1
          { method: 'get',  args: [1],    returns: -1 },
          { method: 'get',  args: [2],    returns: 2 },
        ],
      },
      {
        desc: 'get promotes key — evicts the true LRU not most recently accessed',
        steps: [
          { method: 'put',  args: [1, 10] },
          { method: 'put',  args: [2, 20] },
          { method: 'get',  args: [1],    returns: 10 }, // 1 is now most recent; 2 is LRU
          { method: 'put',  args: [3, 30] },             // evicts 2 (LRU), not 1
          { method: 'get',  args: [2],    returns: -1 },
          { method: 'get',  args: [1],    returns: 10 },
          { method: 'get',  args: [3],    returns: 30 },
        ],
      },
    ],
    prompt: `Design and implement an LRU (Least Recently Used) Cache class:
  - \`LRUCache(capacity)\` — initialize with a max size
  - \`get(key)\` → value or -1 if not found (marks key as recently used)
  - \`put(key, value)\` — insert or update; evict LRU entry if at capacity

Both get and put must run in O(1) time.

Implement the class, explain your data structure choice, and walk through the O(1) reasoning.`,
    hints: [
      'O(1) lookup → hash map. O(1) insert/delete with ordering → doubly linked list.',
      'Combine them: the map stores key → node, the list maintains access order (head = most recent, tail = LRU).',
      'On get/put, move the accessed node to the head. On eviction, remove from the tail.',
    ],
    tags: ['data structures', 'hash maps', 'linked lists', 'design'],
    starterCode: {
      typescript: `class LRUCache {
  private capacity: number;
  private map: Map<number, number>;
  // add doubly linked list fields here

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
    // your setup
  }

  get(key: number): number {
    // your implementation
    return -1;
  }

  put(key: number, value: number): void {
    // your implementation
  }
}

const cache = new LRUCache(2);
cache.put(1, 1); cache.put(2, 2);
console.log(cache.get(1));   // 1
cache.put(3, 3);
console.log(cache.get(2));   // -1
`,
      js: `class LRUCache {
  constructor(capacity) {
    // your setup
  }

  get(key) {
    // your implementation
  }

  put(key, value) {
    // your implementation
  }
}

// Test
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));   // 1  (marks 1 as recently used)
cache.put(3, 3);             // evicts key 2
console.log(cache.get(2));   // -1
console.log(cache.get(3));   // 3
`,
      python: `class LRUCache:
    def __init__(self, capacity):
        pass  # your setup

    def get(self, key):
        pass  # your implementation

    def put(self, key, value):
        pass  # your implementation

# Test
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))   # 1
cache.put(3, 3)       # evicts 2
print(cache.get(2))   # -1
print(cache.get(3))   # 3
`,
    },
  },

  {
    id: 'coding-6',
    pattern: 'Greedy & Scheduling',
    category: 'coding',
    difficulty: 'hard',
    functionName: 'minMakespan',
    testCases: [
      { desc: 'equal delays, equal tasks',    args: [[0,0], [3,3,3,3,3,3,3,3]],          expected: 12 },
      { desc: 'basic asymmetric',             args: [[0,0], [8,7,6,5,4,3,2,1]],          expected: 18 },
      { desc: 'one processor has delay',      args: [[1,10], [8,7,6,5,4,3,2,1]],         expected: 24 },
      { desc: 'all tasks same, one delayed',  args: [[0,100], [1,1,1,1,1,1,1,1]],        expected: 104 },
      { desc: '1 processor (n=1)',            args: [[5], [2,2,2,2]],                     expected: 13 },
    ],
    title: 'Task Scheduling — Minimum Makespan',
    prompt: `You have two arrays:
  - delays: length n  — the startup delay for each of n processors
  - tasks:  length 4n — the processing time for each task

Each processor runs tasks sequentially and starts after its delay. Tasks can be distributed however you like. Return the minimum possible time until ALL tasks are complete (the makespan).

Note: there are exactly 4 tasks per processor (4n / n = 4).

Example:
  delays = [1, 10]
  tasks  = [8, 7, 6, 5, 4, 3, 2, 1]
  Output: 24
  (P0 gets tasks summing to 23 → finishes at 24; P1 gets tasks summing to 14 → finishes at 24)

State the time complexity of your solution.`,
    hints: [
      'This is a makespan minimization problem. The key insight: assign the largest available task to the currently least-loaded processor.',
      'Use a min-heap (priority queue) ordered by current finish time. For each task (sorted largest-first), pop the min-load processor, assign the task, push it back with updated load.',
      'Time: O(4n log n) for sorting + heap operations. Each processor gets exactly 4 tasks, so track count per processor.',
    ],
    tags: ['greedy', 'heap', 'scheduling', 'priority queue'],
    starterCode: {
      js: `/**
 * @param {number[]} delays - length n, startup delay per processor
 * @param {number[]} tasks  - length 4n, processing time per task
 * @return {number} minimum makespan
 */
function minMakespan(delays, tasks) {
  // your solution here
}

// Test
console.log(minMakespan([1, 10], [8, 7, 6, 5, 4, 3, 2, 1])); // 24
console.log(minMakespan([0, 0], [3, 3, 3, 3, 3, 3, 3, 3]));   // 12
`,
      python: `import heapq

def min_makespan(delays, tasks):
    """
    delays: list of length n
    tasks:  list of length 4n
    returns: minimum makespan (int)
    """
    # your solution here
    pass

# Test
print(min_makespan([1, 10], [8, 7, 6, 5, 4, 3, 2, 1]))  # 24
print(min_makespan([0, 0], [3, 3, 3, 3, 3, 3, 3, 3]))    # 12
`,
    },
  },

  // ─── ARCHITECTURE ─────────────────────────────────────────────────────────

  {
    id: 'arch-1',
    category: 'architecture',
    difficulty: 'medium',
    title: 'Design a RAG System for Document Q&A',
    prompt: `Design a Retrieval-Augmented Generation (RAG) system that lets users ask natural language questions against a large corpus of internal documents (e.g., product documentation, internal knowledge bases, technical manuals).

Requirements:
  - Users submit a question via a web interface
  - The system finds relevant document chunks and passes them to an LLM
  - Responses cite the source documents
  - ~10,000 documents, each up to 50 pages
  - Response time target: < 3 seconds

Address: document ingestion pipeline, chunking strategy, embedding model choice, vector database, retrieval strategy, LLM integration, and how you'd handle hallucination risk.`,
    hints: [
      'Start with the ingestion pipeline: parse → chunk → embed → store. What chunk size and overlap?',
      'Retrieval: dense search (vector similarity) vs. sparse (BM25/keyword) vs. hybrid. Why hybrid is often better.',
      'At query time: embed the question → similarity search → rerank → stuff into context → LLM call.',
    ],
    tags: ['GenAI', 'RAG', 'vector databases', 'LLMs', 'embeddings', 'architecture'],
  },

  {
    id: 'arch-2',
    category: 'architecture',
    difficulty: 'medium',
    title: 'Design a Streaming AI Chatbot Backend',
    prompt: `Design the backend for an AI-powered chatbot that supports streaming responses (tokens appear as they're generated), conversation history, and multiple users simultaneously.

Requirements:
  - Users chat via a React frontend
  - Responses stream token-by-token (like ChatGPT)
  - Conversation history is preserved per session
  - 5,000 concurrent users at peak
  - Each conversation can have up to 50 turns

Address: streaming protocol (SSE vs. WebSocket), how you pass conversation history to the LLM, session storage, token limits, and how you'd handle context window overflow.`,
    hints: [
      'Server-Sent Events (SSE) is simpler than WebSockets for streaming one-way LLM output.',
      'Conversation history must fit in the LLM context window — think about summarization or truncation strategies.',
      'Store conversation history in a fast store (Redis) keyed by session ID, with TTL for cleanup.',
    ],
    tags: ['GenAI', 'streaming', 'SSE', 'websockets', 'real-time', 'architecture'],
  },

  {
    id: 'arch-3',
    category: 'architecture',
    difficulty: 'medium',
    title: 'Design a Full-Stack Feature Flagging System',
    prompt: `Design a feature flagging system used across a large enterprise application (React frontend + Node.js backend + multiple microservices).

Requirements:
  - Toggle features on/off without deployments
  - Target specific users, user groups, or percentages (e.g., 10% rollout)
  - Changes should propagate within 30 seconds
  - Flags must work in the React frontend (client-side) and Node.js services (server-side)
  - High availability — if the flag service is down, the app must keep working

Address: data model, API design, client SDKs, propagation strategy, and the fallback/offline story.`,
    hints: [
      'Flags need to be cached locally in each service — don\'t make an API call on every request.',
      'Propagation: polling vs. SSE/WebSocket push from the flag service.',
      'For availability: each client caches the last known state. If the flag service is unreachable, use cached values.',
    ],
    tags: ['full stack', 'microservices', 'architecture', 'devops', 'React', 'Node.js'],
  },

  {
    id: 'arch-4',
    category: 'architecture',
    difficulty: 'hard',
    title: 'Design an AI Document Processing Pipeline',
    prompt: `Design an end-to-end pipeline for processing incoming business documents. Documents arrive as PDFs, images, or emails. The pipeline must:

  1. Extract text (OCR for images/scanned PDFs)
  2. Classify the document type (form, report, invoice, contract, etc.)
  3. Extract structured data fields (record ID, dates, amounts, names)
  4. Flag documents that need human review
  5. Store results and make them queryable

Scale: 50,000 documents per day with peak bursts of 5,000/hour.

Address: ingestion, queue architecture, OCR + AI extraction strategy, error handling, human-in-the-loop design, and the data store for results.`,
    hints: [
      'Use an async queue (SQS, RabbitMQ) to decouple ingestion from processing — handles bursts gracefully.',
      'Classification + extraction can be a single LLM call with a structured output schema (JSON mode).',
      'For human review, think about a confidence threshold — low-confidence extractions go to a review queue.',
    ],
    tags: ['GenAI', 'pipelines', 'queues', 'OCR', 'architecture', 'enterprise'],
  },

  {
    id: 'arch-5',
    category: 'architecture',
    difficulty: 'hard',
    title: 'Design a URL Shortener',
    prompt: `Design a URL shortening service (like bit.ly).

Requirements:
  - Users submit a long URL and get a short one (e.g., go.co/abc123)
  - Short URLs redirect to the original in < 50ms
  - Scale: 10M new URLs/day, 1B redirects/day
  - URLs should persist for 5 years
  - (Bonus) Support custom aliases and click analytics

Address: API design, short key generation strategy (trade-offs between hashing vs. counter-based), data storage, caching layer, and any bottlenecks.`,
    hints: [
      'Key generation: a random Base62 string (7 chars = 62^7 ≈ 3.5T combinations). How do you handle collisions?',
      'Redirects are read-heavy (100:1 read/write ratio) — cache the top URLs in Redis.',
      'A counter-based approach (auto-increment ID → Base62) avoids collisions but requires a distributed counter.',
    ],
    tags: ['hashing', 'caching', 'databases', 'scalability', 'architecture'],
  },

  {
    id: 'arch-6',
    category: 'architecture',
    difficulty: 'medium',
    title: 'Design a CI/CD Pipeline for a Microservices App',
    prompt: `Design a CI/CD pipeline for a microservices application with ~20 services (mix of Node.js and Python). The team ships code daily.

Requirements:
  - Automated tests run on every PR
  - Build and push Docker images on merge to main
  - Zero-downtime deployments to production
  - Easy rollback if something goes wrong
  - Secrets (API keys, DB passwords) must never be in code

Address: branching strategy, pipeline stages (lint → test → build → deploy), container registry, deployment strategy (blue/green vs. rolling vs. canary), secrets management, and observability.`,
    hints: [
      'Pipeline stages: lint/type-check → unit tests → integration tests → build image → push to registry → deploy.',
      'Zero-downtime: rolling updates (Kubernetes) or blue/green (two environments, swap load balancer).',
      'Secrets: environment-specific secrets injected at deploy time via vault (HashiCorp Vault, AWS Secrets Manager), never baked into images.',
    ],
    tags: ['CI/CD', 'Docker', 'Kubernetes', 'DevOps', 'microservices', 'architecture'],
  },

  {
    id: 'arch-7',
    category: 'architecture',
    difficulty: 'medium',
    title: 'Design a Data Processing Pipeline',
    prompt: `Design a scalable data processing pipeline for ingesting, transforming, and serving enterprise data — where raw data (from databases, APIs, files) is cleaned, joined, and made available as datasets for analytics and ML.

Requirements:
  - Ingest data from multiple sources: SQL databases, REST APIs, flat files (CSV/JSON)
  - Transform and join data across sources
  - Support both batch (daily) and incremental (near-real-time) processing
  - Lineage tracking — know which output datasets depend on which inputs
  - 100TB total data, some datasets updated every 15 minutes

Address: ingestion patterns, transformation layer (code-based vs. SQL vs. visual), orchestration, incremental processing strategy, and data lineage.`,
    hints: [
      'Orchestration: Airflow, Prefect, or Foundry\'s built-in scheduler. DAG-based pipelines for lineage.',
      'Incremental: watermark-based (process only rows newer than last run timestamp) or change data capture (CDC).',
      'Lineage: track dataset dependencies as a DAG — when a source changes, know which downstream datasets need recompute.',
    ],
    tags: ['data engineering', 'pipelines', 'ETL', 'architecture', 'enterprise'],
  },

  // ─── BEHAVIORAL ───────────────────────────────────────────────────────────

  {
    id: 'behavioral-1',
    category: 'behavioral',
    difficulty: 'easy',
    title: 'Technical Disagreement with a Teammate',
    prompt: `Tell me about a time you disagreed with a teammate or manager on a technical decision.

Use the STAR format:
  Situation — Set the context briefly
  Task       — What was your role?
  Action     — What did you specifically do to address the disagreement?
  Result     — What was the outcome? (Quantify if possible)

The interviewer is evaluating: how you advocate for your position, whether you stay open to other views, and how you prioritize technical correctness vs. team cohesion.`,
    hints: [
      'Pick a story with real technical stakes — not just a preference.',
      'Show you listened and engaged with their reasoning, not just pushed your own view.',
      'Quantify the outcome: did your approach reduce latency, prevent an outage, save dev time?',
    ],
    tags: ['conflict', 'communication', 'leadership', 'STAR'],
  },

  {
    id: 'behavioral-2',
    category: 'behavioral',
    difficulty: 'easy',
    title: 'Your Biggest Technical Failure',
    prompt: `Describe your biggest technical failure. What happened, and what did you learn?

Use the STAR format. The interviewer wants to see:
  - Accountability: do you own mistakes, or deflect?
  - Root cause analysis: do you understand what actually went wrong?
  - Growth: what changed in your process or approach afterward?

Don't pick something trivial. Don't sanitize it into a non-failure. Real failures with real lessons are far more compelling.`,
    hints: [
      'Spend more time on the learning and process change than on the failure itself.',
      'Show systemic thinking: did you add monitoring, improve testing, document something to prevent recurrence?',
      'A good failure story ends with a concrete change you made — not just "I learned to be more careful."',
    ],
    tags: ['growth mindset', 'accountability', 'STAR'],
  },

  {
    id: 'behavioral-3',
    category: 'behavioral',
    difficulty: 'medium',
    title: 'Delivering a Complex Feature Under Deadline',
    prompt: `Tell me about a time you had to deliver a complex technical feature or project under a tight or unexpected deadline.

Use the STAR format. The interviewer is evaluating:
  - How you scope and prioritize under pressure
  - Whether you communicate proactively with stakeholders
  - Your technical judgment about trade-offs (what to cut, what to keep)
  - Whether you shipped something you're still proud of`,
    hints: [
      'Be specific about the deadline and what made it tight — was it a business event, a dependency, a promise made?',
      'Show your decision-making: what did you cut or defer, and why?',
      'Mention how you kept stakeholders informed. Surprises at deadline are career-limiting.',
    ],
    tags: ['delivery', 'prioritization', 'communication', 'STAR'],
  },

  {
    id: 'behavioral-4',
    category: 'behavioral',
    difficulty: 'medium',
    title: 'Introducing AI/ML to an Existing System',
    prompt: `Tell me about a time you introduced AI, machine learning, or a GenAI feature into an existing product or workflow.

Use the STAR format. If you don't have a direct AI example, describe a time you introduced a significant new technology or capability.

The interviewer wants to see:
  - How you evaluated whether AI was actually the right solution
  - How you handled uncertainty (AI outputs aren't deterministic)
  - How you measured success
  - What you'd do differently`,
    hints: [
      'Be honest about the constraints and risks you navigated — hallucination, latency, cost, or stakeholder skepticism.',
      'Quantify the impact: accuracy improvement, time saved, user engagement, cost reduction.',
      'If you\'re newer to GenAI specifically, talk about a related technical initiative and bridge to what you\'d do differently with LLMs.',
    ],
    tags: ['AI/ML', 'innovation', 'GenAI', 'leadership', 'STAR'],
  },

  {
    id: 'behavioral-5',
    category: 'behavioral',
    difficulty: 'medium',
    title: 'Leading a Technical Project End-to-End',
    prompt: `Tell me about a time you led a technical project from initial scoping to production.

Use the STAR format. The interviewer is looking for:
  - How you defined scope and broke down the work
  - How you managed dependencies, blockers, or scope changes
  - How you involved and aligned stakeholders
  - What the measurable outcome was`,
    hints: [
      'Be specific: how many engineers, what was the timeline, what was the business goal?',
      'Show initiative — did you define the roadmap, unblock teammates, push back on scope creep?',
      'Include one thing you\'d do differently — it shows self-awareness and maturity.',
    ],
    tags: ['leadership', 'project management', 'execution', 'STAR'],
  },

  // ─── TRIVIA ───────────────────────────────────────────────────────────────

  {
    id: 'trivia-1',
    category: 'trivia',
    difficulty: 'easy',
    title: 'RAG vs. Fine-Tuning',
    prompt: `What is the difference between RAG (Retrieval-Augmented Generation) and fine-tuning an LLM?

Cover:
  - How each approach works at a high level
  - When you'd choose RAG over fine-tuning and vice versa
  - Cost and maintenance trade-offs
  - Can you combine them? Should you?
  - Bonus: What is "in-context learning" and how does it relate?`,
    hints: [
      'RAG injects external knowledge at inference time. Fine-tuning bakes knowledge into model weights.',
      'RAG is better when data changes frequently or you need source citations. Fine-tuning is better for style/behavior changes.',
    ],
    tags: ['GenAI', 'LLMs', 'RAG', 'fine-tuning', 'machine learning'],
  },

  {
    id: 'trivia-2',
    category: 'trivia',
    difficulty: 'easy',
    title: 'JavaScript Event Loop',
    prompt: `Explain the JavaScript event loop.

Cover:
  - The call stack, task queue (macrotask), and microtask queue
  - How async operations (setTimeout, Promises, async/await) interact with the loop
  - What this code prints and why:

    console.log('1');
    setTimeout(() => console.log('2'), 0);
    Promise.resolve().then(() => console.log('3'));
    console.log('4');

  - Why Node.js can handle many concurrent I/O operations with a single thread`,
    hints: [
      'Microtasks (Promises) are processed before the next macrotask (setTimeout) even at delay=0.',
      'Output is: 1, 4, 3, 2 — synchronous first, then microtasks, then macrotasks.',
    ],
    tags: ['javascript', 'async', 'event loop', 'node.js', 'concurrency'],
  },

  {
    id: 'trivia-3',
    category: 'trivia',
    difficulty: 'easy',
    title: 'React Hooks Deep Dive',
    prompt: `Explain the following React hooks, including when you'd use each and any common pitfalls:
  - useState
  - useEffect
  - useCallback
  - useMemo
  - useRef

Then answer: what is the rules of hooks, and why does React enforce them?`,
    hints: [
      'useCallback memoizes a function reference. useMemo memoizes a computed value. Overusing them adds complexity without benefit.',
      'useEffect deps array: missing deps causes stale closures; extra deps causes unnecessary re-runs.',
    ],
    tags: ['React', 'hooks', 'frontend', 'performance', 'javascript'],
  },

  {
    id: 'trivia-4',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Vector Embeddings in AI',
    prompt: `Explain vector embeddings as used in AI/GenAI systems.

Cover:
  - What an embedding is and what it represents geometrically
  - How text gets converted to an embedding (high-level)
  - Why embeddings enable semantic search (vs. keyword search)
  - What cosine similarity is and why it's used
  - How embeddings are stored and queried at scale (vector databases)
  - A concrete example: how a RAG system uses embeddings at query time`,
    hints: [
      'An embedding is a dense vector of floats that encodes semantic meaning — similar meanings → similar vectors.',
      'Cosine similarity measures the angle between vectors, not distance — so magnitude doesn\'t affect the result.',
    ],
    tags: ['GenAI', 'embeddings', 'vector databases', 'semantic search', 'machine learning'],
  },

  {
    id: 'trivia-5',
    category: 'trivia',
    difficulty: 'medium',
    title: 'TypeScript Generics',
    prompt: `Explain TypeScript generics with practical examples.

Cover:
  - What problem generics solve (without them, what would you have to do?)
  - A generic function example
  - A generic interface or class example
  - Generic constraints (extends keyword)
  - A real utility type built with generics (e.g., Partial<T>, Pick<T,K>, or ReturnType<T>)
  - When to use generics vs. just using any or unknown`,
    hints: [
      'Generics let you write type-safe code that works over many types without duplicating it.',
      'Constraints: <T extends object> means T must be an object type. This prevents calling array methods on a string, etc.',
    ],
    tags: ['TypeScript', 'generics', 'type system', 'full stack'],
  },

  {
    id: 'trivia-6',
    category: 'trivia',
    difficulty: 'easy',
    title: 'Docker and Containerization Basics',
    prompt: `Explain Docker and containerization.

Cover:
  - What a container is vs. a virtual machine — key differences
  - The role of a Dockerfile: what goes in it, layer caching
  - What docker-compose is and when you'd use it vs. Kubernetes
  - How you'd optimize a Docker image for production (size, security)
  - A common mistake you've seen with containers in production`,
    hints: [
      'Containers share the host OS kernel; VMs emulate hardware. Containers are faster to start and more lightweight.',
      'Layer caching: put rarely-changing instructions (install deps) before frequently-changing ones (COPY source code).',
    ],
    tags: ['Docker', 'containerization', 'DevOps', 'infrastructure'],
  },

  {
    id: 'trivia-7',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Python: async/await and GIL',
    prompt: `Explain Python's async/await model and the GIL (Global Interpreter Lock).

Cover:
  - What the GIL is and why Python has it
  - The difference between threading, multiprocessing, and asyncio in Python
  - When to use each (I/O-bound vs CPU-bound work)
  - How async/await works under the hood (event loop)
  - A practical example: when would you choose asyncio over threading for a data pipeline?`,
    hints: [
      'GIL: only one thread executes Python bytecode at a time. Threading helps with I/O-bound work but not CPU-bound.',
      'asyncio is single-threaded cooperative multitasking — great for many concurrent I/O operations without thread overhead.',
    ],
    tags: ['Python', 'async', 'concurrency', 'GIL', 'data engineering'],
  },

  {
    id: 'trivia-8',
    category: 'trivia',
    difficulty: 'medium',
    title: 'REST API Design Best Practices',
    prompt: `You\'re designing a REST API for a data platform used by internal and external teams.

Cover:
  - URL structure and naming conventions (resources vs. actions)
  - Correct use of HTTP methods and status codes
  - Versioning strategies (URL vs. header vs. content negotiation)
  - Pagination for large result sets
  - Authentication patterns (API keys vs. OAuth vs. JWT)
  - How you'd document the API so other teams can self-serve`,
    hints: [
      'Resources should be nouns: /orders, /users. Actions become sub-resources: POST /orders/{id}/cancel.',
      'Pagination: cursor-based (opaque token) is more robust than offset-based for large/frequently-changing datasets.',
    ],
    tags: ['REST', 'API design', 'full stack', 'documentation'],
  },

  // ─── CODING (core patterns: sliding window, BFS/DFS, trees, linked lists) ─

  {
    id: 'coding-13',
    pattern: 'Linked Lists',
    category: 'coding',
    difficulty: 'easy',
    title: 'Reverse a Linked List',
    functionNames: ['reverseList', 'reverseListRecursive'],
    linkedListRoundTrip: true,
    testCases: [
      { desc: '5 nodes',         args: [[1,2,3,4,5]], expected: [5,4,3,2,1] },
      { desc: '2 nodes',         args: [[1,2]],       expected: [2,1] },
      { desc: 'single node',     args: [[1]],         expected: [1] },
      { desc: 'empty list',      args: [[]],          expected: [] },
    ],
    prompt: `Reverse a singly linked list. Return the new head.

Example:
  Input:  1 → 2 → 3 → 4 → 5
  Output: 5 → 4 → 3 → 2 → 1

Implement both an iterative and a recursive solution. State the time and space complexity of each.`,
    hints: [
      'Iterative: track three pointers — prev (starts null), curr, and next. At each step, flip curr.next = prev, then advance all three.',
      'Recursive: reverse the rest of the list, then make the next node point back to curr, and set curr.next = null.',
      'Iterative: O(n) time, O(1) space. Recursive: O(n) time, O(n) stack space.',
    ],
    tags: ['linked lists', 'pointers', 'recursion'],
    starterCode: {
      typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val; this.next = next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // iterative solution
  return null;
}

function reverseListRecursive(head: ListNode | null): ListNode | null {
  // recursive solution
  return null;
}

function fromArray(arr: number[]): ListNode | null {
  let head: ListNode | null = null;
  for (let i = arr.length - 1; i >= 0; i--) head = new ListNode(arr[i], head);
  return head;
}
function toArray(head: ListNode | null): number[] {
  const res: number[] = [];
  while (head) { res.push(head.val); head = head.next; }
  return res;
}
console.log(toArray(reverseList(fromArray([1,2,3,4,5]))));  // [5,4,3,2,1]
`,
      js: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  // iterative solution
}

function reverseListRecursive(head) {
  // recursive solution
}

// Helper to build list from array
function fromArray(arr) {
  let head = null;
  for (let i = arr.length - 1; i >= 0; i--) head = new ListNode(arr[i], head);
  return head;
}
function toArray(head) {
  const res = [];
  while (head) { res.push(head.val); head = head.next; }
  return res;
}

console.log(toArray(reverseList(fromArray([1,2,3,4,5]))));  // [5,4,3,2,1]
console.log(toArray(reverseList(fromArray([1,2]))));         // [2,1]
`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    # iterative
    pass

def reverse_list_recursive(head):
    # recursive
    pass

def from_array(arr):
    head = None
    for v in reversed(arr):
        head = ListNode(v, head)
    return head

def to_array(head):
    res = []
    while head:
        res.append(head.val)
        head = head.next
    return res

print(to_array(reverse_list(from_array([1,2,3,4,5]))))  # [5,4,3,2,1]
`,
    },
  },

  {
    id: 'coding-14',
    pattern: 'Binary Search',
    category: 'coding',
    difficulty: 'easy',
    title: 'Binary Search',
    functionName: 'search',
    testCases: [
      { desc: 'target in middle',          args: [[-1,0,3,5,9,12], 9],   expected: 4 },
      { desc: 'target not found',          args: [[-1,0,3,5,9,12], 2],   expected: -1 },
      { desc: 'single element — found',    args: [[5], 5],               expected: 0 },
      { desc: 'single element — missing',  args: [[5], 3],               expected: -1 },
      { desc: 'target at start',           args: [[1,2,3,4,5], 1],       expected: 0 },
      { desc: 'target at end',             args: [[1,2,3,4,5], 5],       expected: 4 },
      { desc: 'all negatives',             args: [[-5,-3,-1], -3],        expected: 1 },
    ],
    prompt: `Implement binary search. Given a sorted array of integers and a target value, return the index of the target, or -1 if not found.

Example:
  nums = [-1,0,3,5,9,12], target = 9  → 4
  nums = [-1,0,3,5,9,12], target = 2  → -1

Then answer: what is the time complexity, and why does the array need to be sorted? Give one real-world example where you'd apply binary search beyond searching a list.`,
    hints: [
      'Maintain lo and hi pointers. At each step, check the midpoint: if nums[mid] === target, return mid. If target > nums[mid], search right half. Otherwise search left.',
      'Beware the classic overflow bug: use mid = lo + Math.floor((hi - lo) / 2), not Math.floor((lo + hi) / 2).',
      'Real-world: binary searching on an answer (e.g. "what is the minimum speed to complete a task in time?") — search over the range of possible answers.',
    ],
    tags: ['binary search', 'arrays', 'fundamentals'],
    starterCode: {
      js: `/**
 * @param {number[]} nums - sorted array
 * @param {number} target
 * @return {number} index or -1
 */
function search(nums, target) {
  // your solution
}

console.log(search([-1,0,3,5,9,12], 9));  // 4
console.log(search([-1,0,3,5,9,12], 2));  // -1
console.log(search([5], 5));               // 0
`,
      python: `def search(nums, target):
    # your solution
    pass

print(search([-1,0,3,5,9,12], 9))  # 4
print(search([-1,0,3,5,9,12], 2))  # -1
print(search([5], 5))               # 0
`,
    },
  },

  {
    id: 'coding-15',
    pattern: 'Sliding Window',
    category: 'coding',
    difficulty: 'medium',
    title: 'Longest Substring Without Repeating Characters',
    functionName: 'lengthOfLongestSubstring',
    testCases: [
      { desc: 'classic repeat',            args: ['abcabcbb'],  expected: 3 },
      { desc: 'all same character',        args: ['bbbbb'],     expected: 1 },
      { desc: 'repeat with skip',          args: ['pwwkew'],    expected: 3 },
      { desc: 'empty string',              args: [''],          expected: 0 },
      { desc: 'all unique',                args: ['abcdef'],    expected: 6 },
      { desc: 'tricky reuse — dvdf',       args: ['dvdf'],      expected: 3 },
      { desc: 'single space',              args: [' '],         expected: 1 },
      { desc: 'repeat at boundary',        args: ['abba'],      expected: 2 },
    ],
    prompt: `Given a string s, find the length of the longest substring without repeating characters.

Example:
  "abcabcbb"  → 3  ("abc")
  "bbbbb"     → 1  ("b")
  "pwwkew"    → 3  ("wke")

Implement the sliding window solution and explain how the window contracts when a duplicate is found. State time and space complexity.`,
    hints: [
      'Use a sliding window with a hash map storing each character\'s most recent index.',
      'When you see a character already in the window, move the left pointer to max(left, lastSeen[char] + 1) — skipping past the duplicate.',
      'O(n) time, O(min(n, alphabet_size)) space.',
    ],
    tags: ['sliding window', 'hash maps', 'strings'],
    starterCode: {
      js: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // your solution
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3
console.log(lengthOfLongestSubstring(""));          // 0
`,
      python: `def length_of_longest_substring(s):
    # your solution
    pass

print(length_of_longest_substring("abcabcbb"))  # 3
print(length_of_longest_substring("bbbbb"))     # 1
print(length_of_longest_substring("pwwkew"))    # 3
`,
    },
  },

  {
    id: 'coding-16',
    pattern: 'BFS / DFS',
    category: 'coding',
    difficulty: 'medium',
    title: 'Number of Islands',
    functionName: 'numIslands',
    testCases: [
      { desc: 'one large island',          args: [[['1','1','1'],['0','1','0'],['1','1','1']]],  expected: 1 },
      { desc: 'four separate islands',     args: [[['1','0','1'],['0','0','0'],['1','0','1']]],  expected: 4 },
      { desc: 'all water',                 args: [[['0','0'],['0','0']]],                        expected: 0 },
      { desc: 'single cell land',          args: [[['1']]],                                      expected: 1 },
      { desc: 'single cell water',         args: [[['0']]],                                      expected: 0 },
      { desc: 'diagonal not connected',    args: [[['1','0'],['0','1']]],                        expected: 2 },
      { desc: 'all land',                  args: [[['1','1'],['1','1']]],                        expected: 1 },
    ],
    prompt: `Given an m×n grid of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent land cells horizontally or vertically.

Example:
  grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
  Output: 1

  grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
  Output: 3

Implement using both DFS and BFS. State time and space complexity.`,
    hints: [
      'DFS: when you find a \'1\', increment count, then recursively mark all connected land as \'0\' (visited) to avoid counting it again.',
      'BFS: same idea but use a queue. Add the starting cell, then process neighbors iteratively.',
      'Time: O(m×n). Space: O(m×n) in worst case for the recursion stack (DFS) or queue (BFS).',
    ],
    tags: ['BFS', 'DFS', 'graphs', 'grid', 'recursion'],
    starterCode: {
      js: `/**
 * @param {string[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  // your solution (DFS or BFS)
}

console.log(numIslands([
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
])); // 1

console.log(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
])); // 3
`,
      python: `from collections import deque

def num_islands(grid):
    # your solution (DFS or BFS)
    pass

print(num_islands([
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
]))  # 1

print(num_islands([
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]))  # 3
`,
    },
  },

  {
    id: 'coding-17',
    pattern: 'Trees',
    category: 'coding',
    difficulty: 'medium',
    title: 'Lowest Common Ancestor of a BST',
    lcaTest: true,
    testCases: [
      { desc: 'LCA(2, 8) = 6  — split across root',    pVal: 2, qVal: 8, expected: 6 },
      { desc: 'LCA(2, 4) = 2  — ancestor is one node', pVal: 2, qVal: 4, expected: 2 },
      { desc: 'LCA(7, 9) = 8  — both in right subtree', pVal: 7, qVal: 9, expected: 8 },
      { desc: 'LCA(0, 5) = 2  — deep leaves same side', pVal: 0, qVal: 5, expected: 2 },
    ],
    prompt: `Given a Binary Search Tree (BST) and two node values p and q, find their Lowest Common Ancestor (LCA). The LCA is the deepest node that has both p and q as descendants (a node can be a descendant of itself).

Example (BST):
        6
       / \\
      2   8
     / \\ / \\
    0  4 7  9
      / \\
     3   5

  LCA(2, 8) → 6
  LCA(2, 4) → 2
  LCA(7, 9) → 8

Leverage the BST property for an O(h) solution — do NOT just use a general tree LCA approach.`,
    hints: [
      'BST property: if both p and q are less than current node, LCA is in the left subtree. If both greater, right subtree.',
      'If p and q are on opposite sides (or one equals current), the current node IS the LCA.',
      'This can be done iteratively (no recursion stack needed) in O(h) time, O(1) space.',
    ],
    tags: ['trees', 'BST', 'recursion', 'binary search'],
    starterCode: {
      js: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
  // your solution — use the BST property
}

// Build example BST:
const root = new TreeNode(6,
  new TreeNode(2, new TreeNode(0), new TreeNode(4, new TreeNode(3), new TreeNode(5))),
  new TreeNode(8, new TreeNode(7), new TreeNode(9))
);

const p1 = root.left;        // node 2
const q1 = root.right;       // node 8
const p2 = root.left;        // node 2
const q2 = root.left.right;  // node 4

console.log(lowestCommonAncestor(root, p1, q1).val); // 6
console.log(lowestCommonAncestor(root, p2, q2).val); // 2
`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor(root, p, q):
    # use the BST property
    pass

# Build example BST:
root = TreeNode(6,
    TreeNode(2, TreeNode(0), TreeNode(4, TreeNode(3), TreeNode(5))),
    TreeNode(8, TreeNode(7), TreeNode(9))
)
p1, q1 = root.left, root.right          # nodes 2 and 8
p2, q2 = root.left, root.left.right     # nodes 2 and 4
print(lowest_common_ancestor(root, p1, q1).val)  # 6
print(lowest_common_ancestor(root, p2, q2).val)  # 2
`,
    },
  },

  {
    id: 'coding-18',
    pattern: 'Greedy & Scheduling',
    category: 'coding',
    difficulty: 'medium',
    title: 'Top K Frequent Elements',
    functionName: 'topKFrequent',
    testCases: [
      { desc: 'basic k=2',          args: [[1,1,1,2,2,3], 2],    expected: [1,2],    sortResult: true },
      { desc: 'k equals length',    args: [[1,2], 2],            expected: [1,2],    sortResult: true },
      { desc: 'single unique',      args: [[1], 1],              expected: [1] },
      { desc: 'all same frequency', args: [[1,2,3], 2],          expected: [1,2],    sortResult: true },
      { desc: 'large dominance',    args: [[4,4,4,4,1,1,2], 1], expected: [4] },
    ],
    prompt: `Given an integer array and an integer k, return the k most frequent elements. The answer can be in any order.

Example:
  nums = [1,1,1,2,2,3], k = 2  → [1, 2]
  nums = [1], k = 1             → [1]

Your solution must be better than O(n log n). State how you achieve it and the final time complexity.`,
    hints: [
      'Count frequencies with a hash map. Then use a min-heap of size k: push each (count, num), pop when size exceeds k. Final heap contains top k. O(n log k).',
      'Alternative: bucket sort. Create buckets[frequency] = [list of nums]. Iterate from highest frequency downward until you collect k elements. O(n).',
      'Both approaches are better than sorting all elements — the bucket sort is the optimal O(n) solution.',
    ],
    tags: ['heap', 'hash maps', 'bucket sort', 'arrays'],
    starterCode: {
      js: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  // your solution — must be better than O(n log n)
}

console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1, 2]
console.log(topKFrequent([1], 1));             // [1]
console.log(topKFrequent([4,1,1,2,2,3], 2));  // [1, 2]
`,
      python: `import heapq
from collections import Counter

def top_k_frequent(nums, k):
    # must be better than O(n log n)
    pass

print(top_k_frequent([1,1,1,2,2,3], 2))  # [1, 2]
print(top_k_frequent([1], 1))             # [1]
`,
    },
  },

  {
    id: 'coding-19',
    pattern: 'Hash Maps & Arrays',
    category: 'coding',
    difficulty: 'medium',
    title: 'Product of Array Except Self',
    functionName: 'productExceptSelf',
    testCases: [
      { desc: 'basic case',          args: [[1,2,3,4]],         expected: [24,12,8,6] },
      { desc: 'contains zero',       args: [[0,1,2,3]],         expected: [6,0,0,0] },
      { desc: 'two zeros',           args: [[0,0,1,2]],         expected: [0,0,0,0] },
      { desc: 'all ones',            args: [[1,1,1,1]],         expected: [1,1,1,1] },
      { desc: 'negatives',           args: [[-1,1,0,-3,3]],     expected: [0,0,9,0,0] },
      { desc: 'two elements',        args: [[3,4]],             expected: [4,3] },
    ],
    prompt: `Given an integer array, return an array answer where answer[i] is the product of all elements except nums[i]. You must solve it in O(n) time without using division.

Example:
  nums = [1,2,3,4]  → [24,12,8,6]
  nums = [-1,1,0,-3,3] → [0,0,9,0,0]

Explain your approach clearly — this problem has a well-known O(n) prefix/suffix trick.`,
    hints: [
      'Build a prefix product array (product of everything to the left) and a suffix product array (product of everything to the right). answer[i] = prefix[i] * suffix[i].',
      'You can do this in O(1) extra space (besides the output): first pass fills output with prefix products, second pass multiplies in suffix on the fly.',
      'No division needed — this avoids the edge case of zeros in the array.',
    ],
    tags: ['arrays', 'prefix/suffix', 'no division'],
    starterCode: {
      js: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
  // O(n) time, O(1) extra space (output array doesn't count)
}

console.log(productExceptSelf([1,2,3,4]));        // [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3]));    // [0,0,9,0,0]
`,
      python: `def product_except_self(nums):
    # O(n) time, O(1) extra space
    pass

print(product_except_self([1,2,3,4]))       # [24,12,8,6]
print(product_except_self([-1,1,0,-3,3]))   # [0,0,9,0,0]
`,
    },
  },

  {
    id: 'coding-20',
    pattern: 'Hash Maps & Arrays',
    category: 'coding',
    difficulty: 'medium',
    title: 'Group Anagrams',
    functionName: 'groupAnagrams',
    testCases: [
      { desc: 'classic groups',      args: [['eat','tea','tan','ate','nat','bat']], expected: [['ate','eat','tea'],['bat'],['nat','tan']], sortResult: true },
      { desc: 'single word',         args: [['a']],                                expected: [['a']] },
      { desc: 'all same anagram',    args: [['abc','bca','cab']],                  expected: [['abc','bca','cab']], sortResult: true },
      { desc: 'all unique',          args: [['ab','cd']],                          expected: [['ab'],['cd']], sortResult: true },
      { desc: 'empty string',        args: [['']],                                 expected: [['']] },
    ],
    prompt: `Given an array of strings, group the anagrams together. The order of groups and strings within groups does not matter.

Example:
  ["eat","tea","tan","ate","nat","bat"]
  → [["bat"],["nat","tan"],["ate","eat","tea"]]

Implement an efficient solution and state the time complexity in terms of n (number of strings) and k (max string length).`,
    hints: [
      'Key insight: two strings are anagrams if and only if their sorted characters are identical. Use sorted(word) as the hash map key.',
      'Alternative key: a character frequency tuple (26 counts for a-z) — avoids sorting, O(k) per word instead of O(k log k).',
      'Time: O(n * k log k) with sorting key, O(n * k) with frequency key.',
    ],
    tags: ['hash maps', 'strings', 'sorting'],
    starterCode: {
      js: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  // your solution
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// [["bat"],["nat","tan"],["ate","eat","tea"]] (order may vary)
console.log(groupAnagrams([""]));   // [[""]]
console.log(groupAnagrams(["a"]));  // [["a"]]
`,
      python: `from collections import defaultdict

def group_anagrams(strs):
    # your solution
    pass

print(group_anagrams(["eat","tea","tan","ate","nat","bat"]))
# [["bat"],["nat","tan"],["ate","eat","tea"]] (order may vary)
`,
    },
  },

  // ─── CODING (TypeScript-specific) ────────────────────────────────────────

  {
    id: 'coding-21',
    pattern: 'TypeScript',
    category: 'coding',
    difficulty: 'medium',
    suitableLanguages: ['typescript'],
    title: 'TypeScript: Type-Safe API Response Handler',
    functionName: 'processResponse',
    testCases: [
      { desc: 'user response',          args: [{ type: 'user',    id: 1,   name: 'Alice', email: 'alice@example.com' }], expected: 'User: Alice (alice@example.com)' },
      { desc: 'error response',         args: [{ type: 'error',   code: 404, message: 'Not found' }],                    expected: 'Error 404: Not found' },
      { desc: 'pending response',       args: [{ type: 'pending', jobId: 'abc123', estimatedMs: 3000 }],                  expected: 'Job abc123 pending (~3s)' },
      { desc: 'pending rounds to seconds', args: [{ type: 'pending', jobId: 'xyz999', estimatedMs: 7500 }],               expected: 'Job xyz999 pending (~8s)' },
    ],
    prompt: `You have an API that can return different shapes depending on a "type" discriminator field. Write a TypeScript function that handles the response in a fully type-safe way using discriminated unions and type narrowing.

The API returns one of:
  { type: "user";    id: number; name: string; email: string }
  { type: "error";   code: number; message: string }
  { type: "pending"; jobId: string; estimatedMs: number }

Requirements:
  1. Define the union type ApiResponse
  2. Write a function processResponse(res: ApiResponse): string that returns a human-readable summary for each case:
     - user    → "User: {name} ({email})"
     - error   → "Error {code}: {message}"
     - pending → "Job {jobId} pending (~{estimatedMs/1000}s)"
  3. TypeScript must enforce exhaustive handling — if a new type is added, it should be a compile error if not handled
  4. Write a generic function fetchWithRetry<T>(url: string, retries: number): Promise<T> that retries on failure

Explain how TypeScript's type narrowing works with discriminated unions.`,
    hints: [
      'Discriminated union: each member has a literal type field (type: "user"). TypeScript narrows the type inside each case branch.',
      'For exhaustive checking, add a default case with a "never" check: const _exhaustive: never = res — this errors at compile time if res can still be something.',
      'For fetchWithRetry, use a generic <T> so the caller controls the return type without casting.',
    ],
    tags: ['TypeScript', 'generics', 'type narrowing', 'discriminated unions', 'async'],
    starterCode: {
      typescript: `// 1. Define the discriminated union type
type ApiResponse =
  | { type: "user";    id: number; name: string; email: string }
  | { type: "error";   code: number; message: string }
  | { type: "pending"; jobId: string; estimatedMs: number };

// 2. Exhaustively handle each case
function processResponse(res: ApiResponse): string {
  // your implementation — TypeScript should error if a case is missing
}

// 3. Generic fetch with retry
async function fetchWithRetry<T>(url: string, retries: number): Promise<T> {
  // your implementation
}

// Test processResponse
const user: ApiResponse = { type: "user", id: 1, name: "Alice", email: "alice@example.com" };
const err: ApiResponse  = { type: "error", code: 404, message: "Not found" };
const pend: ApiResponse = { type: "pending", jobId: "abc123", estimatedMs: 3000 };

console.log(processResponse(user));  // e.g. "User: Alice (alice@example.com)"
console.log(processResponse(err));   // e.g. "Error 404: Not found"
console.log(processResponse(pend));  // e.g. "Job abc123 pending (~3s)"
`,
      js: `// JavaScript version (no type safety — consider what you'd lose without TypeScript)

function processResponse(res) {
  switch (res.type) {
    case 'user':    // handle user
    case 'error':   // handle error
    case 'pending': // handle pending
    default:
      throw new Error('Unknown response type: ' + res.type);
  }
}

async function fetchWithRetry(url, retries) {
  // your implementation
}

const user  = { type: 'user',    id: 1, name: 'Alice', email: 'alice@example.com' };
const err   = { type: 'error',   code: 404, message: 'Not found' };
const pend  = { type: 'pending', jobId: 'abc123', estimatedMs: 3000 };
console.log(processResponse(user));  // "User: Alice (alice@example.com)"
console.log(processResponse(err));   // "Error 404: Not found"
console.log(processResponse(pend));  // "Job abc123 pending (~3s)"
`,
    },
  },

  {
    id: 'coding-22',
    pattern: 'TypeScript',
    category: 'coding',
    difficulty: 'medium',
    suitableLanguages: ['typescript'],
    title: 'TypeScript: Build a Typed Pipeline / Function Composer',
    pipelineTest: true,
    prompt: `Implement a type-safe pipe function in TypeScript that composes functions left-to-right, where each function's output type must match the next function's input type.

Example:
  const result = pipe(
    (x: number) => x * 2,         // number → number
    (x: number) => x.toString(),  // number → string
    (s: string) => s + "!"        // string → string
  )(5);
  // result === "10!" and TypeScript knows result is a string

Requirements:
  1. pipe(f1, f2, f3) returns a function that accepts f1's input and returns f3's output
  2. TypeScript must reject pipe(f1, f2) if f1's output type ≠ f2's input type
  3. Implement for at least 2 and 3 function arities using overloads

This tests TypeScript's conditional types and function overloads — both commonly asked at senior level.`,
    hints: [
      'Use function overloads for different arities. For 2 functions: pipe<A,B,C>(f: (a:A)=>B, g: (b:B)=>C): (a:A)=>C',
      'The implementation itself is simple (compose the calls). The challenge is getting the types right.',
      'For a fully variadic version, you\'d need conditional/mapped types — but overloads for 2-4 args is the practical interview answer.',
    ],
    tags: ['TypeScript', 'generics', 'functional programming', 'overloads', 'type inference'],
    starterCode: {
      typescript: `// Implement type-safe pipe with overloads

// 2-function overload
function pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C;
// 3-function overload
function pipe<A, B, C, D>(f: (a: A) => B, g: (b: B) => C, h: (c: C) => D): (a: A) => D;
// Implementation
function pipe(...fns: Function[]) {
  // your implementation
}

// Tests — TypeScript should infer types correctly
const double = (x: number) => x * 2;
const toString = (x: number) => x.toString();
const exclaim = (s: string) => s + "!";

const transform = pipe(double, toString, exclaim);
const result = transform(5);  // TypeScript should know: result is string
console.log(result);           // "10!"

// This should be a TypeScript ERROR (uncomment to verify):
// pipe(double, exclaim); // number → string, then string takes string — but exclaim takes string not number
`,
      js: `function pipe(...fns) {
  return (input) => fns.reduce((acc, fn) => fn(acc), input);
}

const result = pipe(
  x => x * 2,
  x => x.toString(),
  s => s + "!"
)(5);
console.log(result); // "10!"
`,
    },
  },

  // ─── CODING (greedy/heap family — same pattern as the scheduling problem) ─

  {
    id: 'coding-7',
    pattern: 'Merge Intervals',
    category: 'coding',
    difficulty: 'medium',
    title: 'Meeting Rooms II — Minimum Rooms Needed',
    functionName: 'minMeetingRooms',
    testCases: [
      { desc: 'classic overlap',           args: [[[0,30],[5,10],[15,20]]],    expected: 2 },
      { desc: 'no overlap',                args: [[[7,10],[2,4]]],             expected: 1 },
      { desc: 'all overlap at once',       args: [[[1,5],[2,6],[3,7]]],        expected: 3 },
      { desc: 'same start same end',       args: [[[0,1],[0,1],[0,1]]],        expected: 3 },
      { desc: 'single meeting',            args: [[[5,20]]],                   expected: 1 },
      { desc: 'back to back — 1 room',     args: [[[1,5],[5,10],[10,15]]],     expected: 1 },
    ],
    prompt: `Given an array of meeting time intervals [start, end], return the minimum number of conference rooms required to schedule all meetings without overlap.

Example:
  meetings = [[0,30],[5,10],[15,20]]
  Output: 2

  meetings = [[7,10],[2,4]]
  Output: 1

This uses the SAME min-heap pattern as the processor/task scheduling problem. Explain your approach and state the time complexity.`,
    hints: [
      'Sort meetings by start time. Use a min-heap to track when each room becomes free (the end times).',
      'For each new meeting: if its start time >= the earliest end time in the heap, that room is reusable — pop it, push the new end time. Otherwise, allocate a new room.',
      'The heap size at the end equals the minimum rooms needed. O(n log n).',
    ],
    tags: ['heap', 'greedy', 'intervals', 'sorting'],
    starterCode: {
      js: `/**
 * @param {number[][]} intervals - array of [start, end] pairs
 * @return {number} minimum conference rooms needed
 */
function minMeetingRooms(intervals) {
  // your solution here
}

console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
console.log(minMeetingRooms([[7,10],[2,4]]));           // 1
console.log(minMeetingRooms([[1,5],[2,6],[3,7]]));      // 3
`,
      python: `import heapq

def min_meeting_rooms(intervals):
    """
    :param intervals: list of [start, end] pairs
    :return: minimum rooms needed (int)
    """
    # your solution here
    pass

print(min_meeting_rooms([[0,30],[5,10],[15,20]]))  # 2
print(min_meeting_rooms([[7,10],[2,4]]))            # 1
print(min_meeting_rooms([[1,5],[2,6],[3,7]]))       # 3
`,
    },
  },

  {
    id: 'coding-8',
    pattern: 'Greedy & Scheduling',
    category: 'coding',
    difficulty: 'medium',
    title: 'Task Scheduler with Cooldown',
    functionName: 'leastInterval',
    testCases: [
      { desc: 'classic cooldown',          args: [['A','A','A','B','B','B'], 2],  expected: 8 },
      { desc: 'no cooldown',               args: [['A','A','A','B','B','B'], 0],  expected: 6 },
      { desc: 'single task',               args: [['A'], 2],                      expected: 1 },
      { desc: 'all unique tasks',          args: [['A','B','C','D','E','F'], 2],  expected: 6 },
      { desc: 'one dominant task',         args: [['A','A','A','A','B','C'], 2],  expected: 10 },
      { desc: 'many tasks, small cooldown',args: [['A','A','B','B'], 1],          expected: 4 },
    ],
    prompt: `Given a list of tasks (characters) and an integer n representing the cooldown period, return the minimum number of CPU intervals needed to complete all tasks. Between two occurrences of the same task, there must be at least n intervals (other tasks or idle slots).

Example:
  tasks = ["A","A","A","B","B","B"], n = 2
  Output: 8
  Explanation: A -> B -> idle -> A -> B -> idle -> A -> B

  tasks = ["A","A","A","B","B","B"], n = 0
  Output: 6  (no cooldown needed)

State the time complexity and explain your approach.`,
    hints: [
      'The key insight: the task that appears most frequently determines the structure. If max_count tasks appear f times, you need at least (f-1)*(n+1) + (number of tasks with frequency = f) intervals.',
      'Alternative simulation: use a max-heap of frequencies. Each "round" of n+1 slots, pop up to n+1 tasks (highest frequency first), decrement their counts, and re-add non-zero ones.',
      'The answer is max(len(tasks), the formula above).',
    ],
    tags: ['heap', 'greedy', 'scheduling', 'frequency'],
    starterCode: {
      js: `/**
 * @param {string[]} tasks
 * @param {number} n - cooldown period
 * @return {number} minimum CPU intervals
 */
function leastInterval(tasks, n) {
  // your solution here
}

console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 8
console.log(leastInterval(["A","A","A","B","B","B"], 0)); // 6
console.log(leastInterval(["A","A","A","A","B","B","C"], 2)); // 10
`,
      python: `import heapq
from collections import Counter

def least_interval(tasks, n):
    """
    :param tasks: list of task characters
    :param n: cooldown period
    :return: minimum intervals (int)
    """
    # your solution here
    pass

print(least_interval(["A","A","A","B","B","B"], 2))  # 8
print(least_interval(["A","A","A","B","B","B"], 0))  # 6
`,
    },
  },

  {
    id: 'coding-9',
    pattern: 'Greedy & Scheduling',
    category: 'coding',
    difficulty: 'medium',
    title: 'Jump Game',
    functionName: 'canJump',
    testCases: [
      { desc: 'basic — can reach',         args: [[2,3,1,1,4]],     expected: true },
      { desc: 'blocked by zero',           args: [[3,2,1,0,4]],     expected: false },
      { desc: 'single element',            args: [[0]],             expected: true },
      { desc: 'zero start',                args: [[0,1]],           expected: false },
      { desc: 'jump over zeros',           args: [[2,0,0]],         expected: true },
      { desc: 'exact reach',               args: [[1,1,1,0]],       expected: true },
      { desc: 'trapped early',             args: [[1,0,1,0]],       expected: false },
    ],
    prompt: `Given an integer array nums where nums[i] represents the maximum jump length from index i, return true if you can reach the last index starting from index 0.

Example:
  nums = [2,3,1,1,4]  → true   (0→1→4 or 0→2→3→4)
  nums = [3,2,1,0,4]  → false  (always stuck at index 3)

Bonus: for Jump Game II, return the minimum number of jumps to reach the last index.

Explain the greedy insight that makes this O(n).`,
    hints: [
      'Track the farthest index reachable so far. At each step, if your current index exceeds it, you\'re stuck.',
      'Greedy: iterate left to right. At index i, update max_reach = max(max_reach, i + nums[i]). If i > max_reach at any point, return false.',
      'For Jump Game II: count jumps when you\'re forced to take one (when you reach the end of your current jump range).',
    ],
    tags: ['greedy', 'arrays', 'prefix'],
    starterCode: {
      js: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canJump(nums) {
  // your solution here
}

// Bonus: minimum jumps
function jump(nums) {
  // your solution here
}

console.log(canJump([2,3,1,1,4]));  // true
console.log(canJump([3,2,1,0,4]));  // false
console.log(jump([2,3,1,1,4]));     // 2
console.log(jump([2,3,0,1,4]));     // 2
`,
      python: `def can_jump(nums):
    # your solution here
    pass

def jump(nums):
    # minimum jumps (bonus)
    pass

print(can_jump([2,3,1,1,4]))  # True
print(can_jump([3,2,1,0,4]))  # False
print(jump([2,3,1,1,4]))      # 2
`,
    },
  },

  {
    id: 'coding-10',
    pattern: 'Two Pointers',
    category: 'coding',
    difficulty: 'medium',
    title: 'Boats to Save People',
    functionName: 'numRescueBoats',
    testCases: [
      { desc: 'pair fits in one boat',      args: [[1,2], 3],        expected: 1 },
      { desc: 'some must go alone',         args: [[3,2,2,1], 3],    expected: 3 },
      { desc: 'heavy people alone',         args: [[3,5,3,4], 5],    expected: 4 },
      { desc: 'all can pair',               args: [[1,1,1,1], 2],    expected: 2 },
      { desc: 'single person',              args: [[5], 5],          expected: 1 },
      { desc: 'all at limit',               args: [[5,5,5,5], 5],    expected: 4 },
      { desc: 'heaviest takes entire boat', args: [[2,2,3,3,4], 5],  expected: 3 },
    ],
    prompt: `You have people with weights and boats with a weight limit. Each boat can carry at most 2 people, and the total weight cannot exceed the limit. Return the minimum number of boats needed to rescue everyone.

Example:
  people = [1,2], limit = 3   → 1  (both fit)
  people = [3,2,2,1], limit = 3 → 3  ([3],[2,1],[2])
  people = [3,5,3,4], limit = 5 → 4  (no two can share)

Explain your greedy approach and time complexity.`,
    hints: [
      'Sort the array. Then use two pointers — one at the lightest person, one at the heaviest.',
      'If the heaviest + lightest ≤ limit, they can share a boat. Move both pointers inward. Otherwise, the heaviest goes alone.',
      'Always give the heaviest person a chance to share with the lightest available. O(n log n) for sort + O(n) for two-pointer pass.',
    ],
    tags: ['greedy', 'two pointers', 'sorting'],
    starterCode: {
      js: `/**
 * @param {number[]} people - weights
 * @param {number} limit - boat weight limit
 * @return {number} minimum boats
 */
function numRescueBoats(people, limit) {
  // your solution here
}

console.log(numRescueBoats([1,2], 3));        // 1
console.log(numRescueBoats([3,2,2,1], 3));    // 3
console.log(numRescueBoats([3,5,3,4], 5));    // 4
`,
      python: `def num_rescue_boats(people, limit):
    # your solution here
    pass

print(num_rescue_boats([1,2], 3))        # 1
print(num_rescue_boats([3,2,2,1], 3))    # 3
print(num_rescue_boats([3,5,3,4], 5))    # 4
`,
    },
  },

  {
    id: 'coding-11',
    pattern: 'Python Data Engineering',
    category: 'coding',
    difficulty: 'medium',
    suitableLanguages: ['python'],
    title: 'Python: Process a Large Log File (Generator + ETL)',
    generatorTest: true,
    prompt: `Write a Python function that processes a large log file efficiently. The log file has lines in this format:
  2024-01-15T10:23:45 ERROR service=payments message=timeout after 30s
  2024-01-15T10:23:46 INFO  service=auth message=user login successful

Your function should:
  1. Accept either a filepath string OR a file-like object (e.g. io.StringIO) for testability — iterate over lines from either
  2. Read lines lazily (do not load the entire file into memory)
  3. Parse each line into a structured dict: {timestamp, level, service, message}
  4. Filter to only ERROR and WARN lines
  5. Return a generator that yields the parsed dicts

Then write a second function that takes that generator and returns a dict of error counts per service.

Explain why using a generator matters here vs. reading all lines into a list.`,
    hints: [
      'Use a generator function (yield) so you never hold the full file in memory — critical for multi-GB log files.',
      'Parse with str.split() or re.match(). A regex like r\'(\\S+) (\\w+)\\s+service=(\\w+) message=(.+)\' handles the format.',
      'For the aggregation step: iterate the generator once, accumulating counts in a defaultdict(int).',
    ],
    tags: ['Python', 'generators', 'data engineering', 'ETL', 'file processing'],
    starterCode: {
      python: `from typing import Generator, Union, IO
import io

def parse_error_logs(source: Union[str, IO]) -> Generator[dict, None, None]:
    """
    Accepts a filepath string OR a file-like object (e.g. io.StringIO).
    Lazily yields parsed dicts for ERROR/WARN lines only.
    Each dict: {timestamp, level, service, message}
    """
    # your implementation
    pass


def count_errors_by_service(log_gen: Generator) -> dict:
    """
    Returns {service: error_count} from the log generator.
    """
    # your implementation
    pass


# Quick test with a string buffer instead of a file:
import io

sample = """2024-01-15T10:23:45 ERROR service=payments message=timeout after 30s
2024-01-15T10:23:46 INFO  service=auth message=user login successful
2024-01-15T10:23:47 ERROR service=payments message=connection refused
2024-01-15T10:23:48 WARN  service=inventory message=low stock threshold
"""

# Run with a string buffer instead of a real file:
log_gen = parse_error_logs(io.StringIO(sample))
result = count_errors_by_service(log_gen)
print(result)  # {'payments': 2, 'inventory': 1}
`,
    },
  },

  {
    id: 'coding-12',
    pattern: 'Dynamic Programming',
    category: 'coding',
    difficulty: 'hard',
    title: 'Minimum Interval Cost (Weighted Job Scheduling)',
    functionName: 'jobScheduling',
    testCases: [
      { desc: 'basic non-overlapping',     args: [[[1,2,50],[3,5,20],[6,9,100]]],              expected: 170 },
      { desc: 'classic — skip low profit', args: [[[1,3,50],[2,5,20],[4,6,70],[6,9,60]]],      expected: 180 },
      { desc: 'single job',                args: [[[1,10,5]]],                                 expected: 5 },
      { desc: 'all overlap — take max',    args: [[[1,3,5],[1,3,10],[1,3,3]]],                 expected: 10 },
      { desc: 'chain greedy trap',         args: [[[1,2,10],[2,3,10],[1,4,25]]],               expected: 25 },
    ],
    prompt: `You have a list of jobs, each with a start time, end time, and profit. Find the maximum profit you can earn by scheduling non-overlapping jobs.

Example:
  jobs = [(1,3,50), (2,5,20), (4,6,70), (6,9,60)]
  //      [start, end, profit]
  Output: 180
  Explanation: Take job (1,3,50) + (4,6,70) + (6,9,60) = 180
               Job (2,5,20) would conflict with (4,6,70)

This is harder than the "earliest finish time" scheduling — you need to maximize weighted profit, not just count.

State your approach, the data structure choices, and time complexity.`,
    hints: [
      'Sort jobs by end time. Use DP: dp[i] = max profit using the first i jobs.',
      'For job i, you can either skip it (dp[i] = dp[i-1]) or take it (dp[i] = profit[i] + dp[last non-overlapping job]).',
      'To find the "last non-overlapping job" efficiently, use binary search on end times. Total: O(n log n).',
    ],
    tags: ['dynamic programming', 'binary search', 'greedy', 'scheduling', 'intervals'],
    starterCode: {
      js: `/**
 * @param {number[][]} jobs - array of [start, end, profit]
 * @return {number} maximum profit
 */
function jobScheduling(jobs) {
  // your solution here
}

console.log(jobScheduling([[1,3,50],[2,5,20],[4,6,70],[6,9,60]])); // 180
console.log(jobScheduling([[1,2,50],[3,5,20],[6,9,100]]));          // 170
`,
      python: `import bisect

def job_scheduling(jobs):
    """
    :param jobs: list of [start, end, profit]
    :return: maximum profit (int)
    """
    # your solution here
    pass

print(job_scheduling([[1,3,50],[2,5,20],[4,6,70],[6,9,60]]))  # 180
print(job_scheduling([[1,2,50],[3,5,20],[6,9,100]]))           # 170
`,
    },
  },

  // ─── TRIVIA (data engineering + Python) ──────────────────────────────────

  {
    id: 'trivia-12',
    category: 'trivia',
    difficulty: 'medium',
    title: 'TypeScript: Type Guards and Narrowing',
    prompt: `Explain TypeScript type narrowing and type guards.

Cover:
  - What type narrowing is and why TypeScript needs it
  - The built-in narrowing techniques: typeof, instanceof, in operator, equality checks
  - User-defined type guards (is keyword) — when do you need them?
  - Discriminated unions as a narrowing pattern
  - The never type and exhaustiveness checking
  - A real example: you receive a value that is string | number | null — write type-safe code that handles each case without any type assertions (as)`,
    hints: [
      'typeof "abc" === "string" tells TypeScript the type is string inside that branch — that\'s narrowing.',
      'User-defined guard: function isUser(x: unknown): x is User { return typeof x === "object" && x !== null && "name" in x; }',
    ],
    tags: ['TypeScript', 'type guards', 'narrowing', 'discriminated unions'],
  },

  {
    id: 'trivia-9',
    category: 'trivia',
    difficulty: 'medium',
    title: 'PySpark vs Pandas — When to Use Which',
    prompt: `Explain the difference between Pandas and PySpark. When would you choose one over the other for a data engineering task?

Cover:
  - How each handles data (in-memory vs distributed)
  - The performance crossover point (roughly when does Pandas fall apart?)
  - Key API differences that trip people up (lazy evaluation in Spark, index in Pandas)
  - When you'd use Pandas inside a Spark job (UDFs, pandas_udf)
  - A concrete scenario: you have a 500GB CSV file that needs to be cleaned and aggregated — which do you use and why?`,
    hints: [
      'Pandas loads data into a single machine\'s RAM. Spark distributes across a cluster. Pandas is faster for small data, Spark for big data.',
      'Spark uses lazy evaluation — transformations build a DAG, nothing executes until an action (collect, write, show) is called.',
    ],
    tags: ['Python', 'PySpark', 'Pandas', 'data engineering', 'distributed systems'],
  },

  {
    id: 'trivia-10',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Data Lineage and Pipeline Observability',
    prompt: `Explain data lineage in the context of a data platform or custom pipeline.

Cover:
  - What data lineage is and why it matters (debugging, compliance, auditing)
  - How lineage is typically captured (metadata stores, DAG tracking)
  - Column-level vs dataset-level lineage — when does each matter?
  - How platforms like dbt, Apache Atlas, or OpenLineage model lineage
  - A concrete scenario: a business analyst says "the revenue_summary report looks wrong." How do you use lineage to debug it?`,
    hints: [
      'Lineage answers: "where did this data come from, what transformations were applied, and what downstream datasets depend on it?"',
      'For debugging, trace backwards from the broken output dataset through its inputs until you find where the bad data was introduced.',
    ],
    tags: ['data engineering', 'data lineage', 'observability', 'compliance'],
  },

  {
    id: 'trivia-11',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Database Indexing Deep Dive',
    prompt: `Explain how database indexes work and how to use them effectively.

Cover:
  - How a B-tree index works (at a conceptual level)
  - When a query uses an index vs. does a full table scan
  - Composite indexes: what is the "leftmost prefix rule"?
  - The trade-off: why not just index every column?
  - EXPLAIN / query plan: how do you verify an index is being used?
  - A scenario: you have a 50M-row events table with slow queries on (user_id, created_at, status). What indexes do you create and why?`,
    hints: [
      'B-tree: balanced tree where leaf nodes hold actual row pointers. Lookups are O(log n), sequential scans are efficient.',
      'Leftmost prefix: an index on (a, b, c) helps queries filtering on a, or a+b, or a+b+c — but NOT on b alone.',
    ],
    tags: ['databases', 'SQL', 'indexing', 'performance', 'data engineering'],
  },

  // ── Fast & Slow Pointers ─────────────────────────────────────────────────

  {
    id: 'starter-fast-slow',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Fast & Slow Pointers',
    teacherMode: true,
    functionName: 'hasCycle',
    cycleTest: true,
    testCases: [
      { desc: 'empty list (null)',        vals: [],          cycleIdx: -1, expected: false },
      { desc: 'single node no cycle',     vals: [1],         cycleIdx: -1, expected: false },
      { desc: 'linear 4 nodes no cycle',  vals: [1,2,3,4],   cycleIdx: -1, expected: false },
      { desc: 'cycle — tail to head',     vals: [1,2,3,4],   cycleIdx: 0,  expected: true  },
      { desc: 'cycle — tail to middle',   vals: [1,2,3,4,5], cycleIdx: 2,  expected: true  },
      { desc: 'two-node self cycle',       vals: [1,2],       cycleIdx: 0,  expected: true  },
    ],
    followUpQuestions: [
      "Why does the fast pointer inevitably lap the slow pointer if there's a cycle?",
      "How does this compare to just using a Set — what are you trading off?",
    ],
    suitableLanguages: ['js', 'typescript'],
    title: 'Starter: Detect a Cycle in a Linked List',
    prompt: `Given the head of a linked list, return true if the list has a cycle (a node that points back to a previously visited node), or false otherwise.

Example (cycle exists):
  1 → 2 → 3 → 4
          ↑       ↓
          └── ← ←

Example (no cycle):
  1 → 2 → 3 → null   →  false

Constraints: solve in O(n) time and O(1) space — no Sets allowed.

Questions to think about:
  - What happens to two runners on a circular track — one twice as fast?
  - What base cases should you handle?`,
    hints: [
      'Think about two runners on a circular track. What inevitably happens?',
      'Move slow by 1 step, fast by 2 steps each iteration.',
      'If fast ever equals null or fast.next is null, there is no cycle.',
    ],
    starterCode: {
      js: `// class ListNode { constructor(val) { this.val = val; this.next = null; } }

function hasCycle(head) {
  // Your solution here

}

// Manual test — build a cyclic list
const n1 = { val: 1, next: null };
const n2 = { val: 2, next: null };
const n3 = { val: 3, next: null };
n1.next = n2; n2.next = n3; n3.next = n2; // cycle: 3 → 2
console.log(hasCycle(n1));  // true

const m1 = { val: 1, next: null };
const m2 = { val: 2, next: null };
m1.next = m2;
console.log(hasCycle(m1));  // false
console.log(hasCycle(null)); // false`,
      typescript: `// class ListNode { constructor(public val: number, public next: ListNode | null = null) {} }

function hasCycle(head: { val: number; next: any } | null): boolean {
  // Your solution here

}

// Manual test — build a cyclic list
const n1 = { val: 1, next: null as any };
const n2 = { val: 2, next: null as any };
const n3 = { val: 3, next: null as any };
n1.next = n2; n2.next = n3; n3.next = n2; // cycle: 3 → 2
console.log(hasCycle(n1));   // true

const m1 = { val: 1, next: null as any };
const m2 = { val: 2, next: null as any };
m1.next = m2;
console.log(hasCycle(m1));   // false
console.log(hasCycle(null)); // false`,
    },
    tags: ['fast-slow-pointers', 'linked-list', 'cycle-detection', 'two-pointers'],
  },

  {
    id: 'coding-fast-slow-1',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Fast & Slow Pointers',
    suitableLanguages: ['js', 'typescript'],
    functionName: 'isHappy',
    testCases: [
      { desc: 'happy number — 19',    args: [19],   expected: true },
      { desc: 'not happy — 2',        args: [2],    expected: false },
      { desc: 'happy number — 1',     args: [1],    expected: true },
      { desc: 'not happy — 4',        args: [4],    expected: false },
      { desc: 'happy number — 7',     args: [7],    expected: true },
    ],
    title: 'Happy Number',
    prompt: `A number is "happy" if: repeatedly replacing it with the sum of squares of its digits eventually reaches 1. If it loops endlessly without reaching 1, it is not happy.

Example:
  19 → 1² + 9² = 82 → 8² + 2² = 68 → 6² + 8² = 100 → 1  ✓ happy

Write isHappy(n) — return true if n is a happy number.

Hint: unhappy numbers cycle. Think fast/slow pointers on a virtual sequence.`,
    hints: [
      'Think of each number as a "node" that points to its next digit-square-sum.',
      'The sequence either reaches 1 or enters a cycle — classic fast/slow problem.',
      'You can also use a Set to detect a repeated state.',
    ],
    starterCode: {
      js: `function isHappy(n) {
  function next(num) {
    let sum = 0;
    while (num > 0) { const d = num % 10; sum += d * d; num = Math.floor(num / 10); }
    return sum;
  }

  // Your solution here

}

console.log(isHappy(19)); // true
console.log(isHappy(2));  // false`,
      typescript: `function isHappy(n: number): boolean {
  function next(num: number): number {
    let sum = 0;
    while (num > 0) { const d = num % 10; sum += d * d; num = Math.floor(num / 10); }
    return sum;
  }

  // Your solution here

}

console.log(isHappy(19)); // true
console.log(isHappy(2));  // false`,
    },
    tags: ['fast-slow-pointers', 'cycle-detection', 'math'],
  },

  // ── Merge Intervals ──────────────────────────────────────────────────────

  {
    id: 'starter-merge-intervals',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Merge Intervals',
    teacherMode: true,
    functionName: 'merge',
    testCases: [
      { desc: 'classic overlaps',         args: [[[1,3],[2,6],[8,10],[15,18]]],  expected: [[1,6],[8,10],[15,18]] },
      { desc: 'no overlaps',              args: [[[1,2],[3,4],[5,6]]],           expected: [[1,2],[3,4],[5,6]] },
      { desc: 'all merge into one',       args: [[[1,10],[2,5],[3,8]]],          expected: [[1,10]] },
      { desc: 'single interval',          args: [[[1,5]]],                       expected: [[1,5]] },
      { desc: 'touching but not overlap', args: [[[1,2],[2,3]]],                 expected: [[1,3]] },
    ],
    followUpQuestions: [
      "Why sort by start time first — what breaks if you skip that?",
      "What's the exact condition for two intervals to overlap?",
      "What dominates the time complexity here?",
    ],
    title: 'Starter: Merge Overlapping Intervals',
    prompt: `Given an array of intervals [start, end], merge all overlapping intervals and return the result.

Example:
  Input:  [[1,3], [2,6], [8,10], [15,18]]
  Output: [[1,6], [8,10], [15,18]]

  [1,3] and [2,6] overlap (2 ≤ 3), so they merge to [1,6].

Questions to think about:
  - What ordering makes it easy to decide if two intervals overlap?
  - What is the condition for two intervals NOT overlapping?`,
    hints: [
      'Sort by start time. Then you only need to check the last merged interval.',
      'Two intervals [a,b] and [c,d] overlap if c ≤ b (next start ≤ current end).',
      'When merging, the new end is max(b, d).',
    ],
    starterCode: {
      js: `function merge(intervals) {
  // Step 1: sort by start time
  // Step 2: iterate and merge

}

console.log(JSON.stringify(merge([[1,3],[2,6],[8,10],[15,18]]))); // [[1,6],[8,10],[15,18]]
console.log(JSON.stringify(merge([[1,4],[4,5]])));                // [[1,5]]`,
      typescript: `function merge(intervals: number[][]): number[][] {

}

console.log(JSON.stringify(merge([[1,3],[2,6],[8,10],[15,18]]))); // [[1,6],[8,10],[15,18]]
console.log(JSON.stringify(merge([[1,4],[4,5]])));                // [[1,5]]`,
      python: `def merge(intervals):
    pass

print(merge([[1,3],[2,6],[8,10],[15,18]]))  # [[1,6],[8,10],[15,18]]`,
    },
    tags: ['merge-intervals', 'sorting', 'arrays'],
  },

  {
    id: 'coding-intervals-1',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Merge Intervals',
    functionName: 'insert',
    testCases: [
      { desc: 'insert and merge two',      args: [[[1,3],[6,9]], [2,5]],           expected: [[1,5],[6,9]] },
      { desc: 'no overlap — before all',   args: [[[3,5],[6,9]], [1,2]],           expected: [[1,2],[3,5],[6,9]] },
      { desc: 'no overlap — after all',    args: [[[1,3],[6,9]], [10,12]],         expected: [[1,3],[6,9],[10,12]] },
      { desc: 'swallows all',              args: [[[1,3],[3,5],[6,9]], [2,10]],    expected: [[1,10]] },
      { desc: 'empty list',                args: [[], [5,7]],                      expected: [[5,7]] },
    ],
    title: 'Insert Interval',
    prompt: `Given a list of non-overlapping intervals sorted by start time, and a new interval, insert the new interval and merge if necessary.

Example:
  intervals = [[1,3],[6,9]], newInterval = [2,5]
  Output: [[1,5],[6,9]]

Example 2:
  intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
  Output: [[1,2],[3,10],[12,16]]`,
    hints: [
      'Skip all intervals that end before the new interval starts.',
      'Merge all intervals that start before the new interval ends.',
      'After merging, append the rest unchanged.',
    ],
    starterCode: {
      js: `function insert(intervals, newInterval) {

}

console.log(JSON.stringify(insert([[1,3],[6,9]], [2,5]))); // [[1,5],[6,9]]`,
      typescript: `function insert(intervals: number[][], newInterval: number[]): number[][] {

}

console.log(JSON.stringify(insert([[1,3],[6,9]], [2,5])));  // [[1,5],[6,9]]
console.log(JSON.stringify(insert([], [5,7])));             // [[5,7]]`,
      python: `def insert(intervals, new_interval):
    pass

print(insert([[1,3],[6,9]], [2,5]))   # [[1,5],[6,9]]
print(insert([], [5,7]))             # [[5,7]]`,
    },
    tags: ['merge-intervals', 'arrays'],
  },

  // ── Cyclic Sort ──────────────────────────────────────────────────────────

  {
    id: 'starter-cyclic-sort',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Cyclic Sort',
    teacherMode: true,
    functionName: 'missingNumber',
    testCases: [
      { desc: 'missing 2',            args: [[3,0,1]],       expected: 2 },
      { desc: 'missing 0',            args: [[9,6,4,2,3,5,7,0,1]], expected: 8 },
      { desc: 'single element',       args: [[0]],           expected: 1 },
      { desc: 'missing last',         args: [[0,1]],         expected: 2 },
      { desc: 'consecutive — miss 1', args: [[0,2]],         expected: 1 },
    ],
    followUpQuestions: [
      "What's the key invariant — where should each number end up after the sort?",
      "After the sort pass, how do you find the missing number?",
      "How does this compare to a Set-based solution in time and space?",
    ],
    title: 'Starter: Find the Missing Number (Cyclic Sort)',
    prompt: `Given an array nums containing n distinct numbers in the range [0, n], return the one number missing from the range.

Example:
  Input:  [3, 0, 1]   (n=3, range 0-3, missing 2)
  Output: 2

Constraints: O(n) time, O(1) space.

Questions to think about:
  - If every number 0..n were present, where should each number sit in a sorted array?
  - Can the sum formula give you an O(1) space solution?`,
    hints: [
      'Cyclic sort insight: each number i should be at index i. Sort in O(n) by swapping each number to its correct index.',
      'After sorting, scan for the index where nums[i] !== i — that is the missing number.',
      'Alternatively: expected sum = n*(n+1)/2 minus actual sum = missing number.',
    ],
    starterCode: {
      js: `function missingNumber(nums) {
  // Approach 1: cyclic sort — place each number at its correct index

  // Approach 2 (bonus): math — sum formula

}

console.log(missingNumber([3,0,1]));  // 2
console.log(missingNumber([0,1]));    // 2`,
      typescript: `function missingNumber(nums: number[]): number {

}

console.log(missingNumber([3,0,1]));              // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8`,
      python: `def missing_number(nums):
    pass

print(missing_number([3,0,1]))   # 2
print(missing_number([9,6,4,2,3,5,7,0,1]))  # 8`,
    },
    tags: ['cyclic-sort', 'arrays', 'in-place'],
  },

  // ── Topological Sort ─────────────────────────────────────────────────────

  {
    id: 'starter-topo-sort',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Topological Sort',
    teacherMode: true,
    functionName: 'canFinish',
    testCases: [
      { desc: 'simple dependency',       args: [2, [[1,0]]],                      expected: true },
      { desc: 'direct cycle',            args: [2, [[1,0],[0,1]]],                expected: false },
      { desc: 'chain — no cycle',        args: [4, [[1,0],[2,1],[3,2]]],          expected: true },
      { desc: 'no prerequisites',        args: [3, []],                           expected: true },
      { desc: 'self-loop',               args: [1, [[0,0]]],                      expected: false },
    ],
    followUpQuestions: [
      "What does a cycle in the prerequisite graph mean practically?",
      "Walk me through Kahn's algorithm — what drives it?",
      "What's the time complexity in terms of nodes and edges?",
    ],
    title: 'Starter: Course Schedule (Can You Finish?)',
    prompt: `You have numCourses courses (0 to numCourses-1). Some courses have prerequisites: prerequisites[i] = [a, b] means you must take course b before course a.

Return true if you can finish all courses, false if there is a cycle.

Example:
  numCourses = 2, prerequisites = [[1, 0]]
  → true: take 0 then 1

Example 2:
  numCourses = 2, prerequisites = [[1, 0], [0, 1]]
  → false: 0 requires 1, 1 requires 0 — impossible

Questions to think about:
  - This is cycle detection in a directed graph. What graph traversal finds cycles?
  - What is an "in-degree"? What happens when a node's in-degree reaches 0?`,
    hints: [
      'Build an adjacency list and an in-degree count for each node.',
      'Start BFS with all nodes that have in-degree 0 (no prerequisites).',
      'Each time you process a node, reduce the in-degree of its neighbors. If any reach 0, add them to the queue.',
      'If processed count equals numCourses, no cycle exists.',
    ],
    starterCode: {
      js: `function canFinish(numCourses, prerequisites) {
  // Build adjacency list and in-degree array
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }

  // Your BFS here

}

console.log(canFinish(2, [[1,0]]));       // true
console.log(canFinish(2, [[1,0],[0,1]])); // false`,
      typescript: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {

}

console.log(canFinish(2, [[1,0]]));       // true
console.log(canFinish(2, [[1,0],[0,1]])); // false`,
      python: `from collections import deque

def can_finish(num_courses, prerequisites):
    pass

print(can_finish(2, [[1,0]]))        # True
print(can_finish(2, [[1,0],[0,1]]))  # False`,
    },
    tags: ['topological-sort', 'graph', 'BFS', 'cycle-detection', 'directed-graph'],
  },

  // ── Monotonic Stack ──────────────────────────────────────────────────────

  {
    id: 'starter-monotonic-stack',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Monotonic Stack',
    teacherMode: true,
    functionName: 'dailyTemperatures',
    testCases: [
      { desc: 'classic case',        args: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
      { desc: 'descending order',    args: [[5,4,3,2,1]],              expected: [0,0,0,0,0] },
      { desc: 'ascending order',     args: [[1,2,3,4,5]],              expected: [1,1,1,1,0] },
      { desc: 'all same',            args: [[70,70,70]],               expected: [0,0,0] },
      { desc: 'single element',      args: [[50]],                     expected: [0] },
    ],
    followUpQuestions: [
      "What invariant does the stack maintain at all times?",
      "Why store indices on the stack instead of temperature values?",
      "Each element is pushed and popped once — so what's the time complexity?",
    ],
    title: 'Starter: Daily Temperatures',
    prompt: `Given an array of daily temperatures, return an array where answer[i] is the number of days you have to wait until a warmer temperature. If no future warmer day exists, put 0.

Example:
  Input:  [73, 74, 75, 71, 69, 72, 76, 73]
  Output: [ 1,  1,  4,  2,  1,  1,  0,  0]

  Day 0 (73°): next warmer is day 1 (74°) → wait 1
  Day 2 (75°): next warmer is day 6 (76°) → wait 4

Questions to think about:
  - When you find a warmer day, which previous days does it "answer"?
  - What data structure lets you efficiently track "pending" days waiting for a warmer answer?`,
    hints: [
      'Use a stack that stores indices of days not yet answered.',
      'When you see a temperature warmer than the top of the stack, pop it — that day has found its warmer day.',
      'The stack stays monotonically decreasing in temperature (cooler days wait below warmer ones).',
    ],
    starterCode: {
      js: `function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = []; // stores indices

  for (let i = 0; i < temperatures.length; i++) {
    // While the current temp is warmer than the temp at stack top, pop and record
    // Push current index

  }

  return result;
}

console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));
// [1, 1, 4, 2, 1, 1, 0, 0]`,
      typescript: `function dailyTemperatures(temperatures: number[]): number[] {
  const result: number[] = new Array(temperatures.length).fill(0);
  const stack: number[] = [];

  for (let i = 0; i < temperatures.length; i++) {

  }

  return result;
}

console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));
// [1, 1, 4, 2, 1, 1, 0, 0]`,
      python: `def daily_temperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []  # stores indices
    for i, temp in enumerate(temperatures):
        pass
    return result

print(daily_temperatures([73,74,75,71,69,72,76,73]))
# [1, 1, 4, 2, 1, 1, 0, 0]`,
    },
    tags: ['monotonic-stack', 'stack', 'arrays'],
  },

  {
    id: 'coding-mono-stack-1',
    category: 'coding',
    difficulty: 'hard',
    pattern: 'Monotonic Stack',
    functionName: 'largestRectangleArea',
    testCases: [
      { desc: 'classic',              args: [[2,1,5,6,2,3]],  expected: 10 },
      { desc: 'all same height',      args: [[2,2,2,2]],      expected: 8 },
      { desc: 'single bar',           args: [[5]],            expected: 5 },
      { desc: 'descending',           args: [[5,4,3,2,1]],    expected: 9 },
      { desc: 'ascending',            args: [[1,2,3,4,5]],    expected: 9 },
    ],
    title: 'Largest Rectangle in Histogram',
    prompt: `Given an array of bar heights in a histogram (each bar has width 1), find the area of the largest rectangle that fits within the histogram.

Example:
  heights = [2, 1, 5, 6, 2, 3]
  Largest rectangle area = 10  (bars at index 2 and 3, height 5, width 2)

Approach: use a monotonic stack to find, for each bar, the nearest shorter bar on its left and right.`,
    hints: [
      'For each bar, the max rectangle using that bar as the shortest bar extends to the left until a shorter bar and right until a shorter bar.',
      'A monotonic increasing stack lets you find "previous smaller" and "next smaller" in one pass.',
      'When you pop a bar because the current bar is shorter, the popped bar is bounded: right = current index, left = new stack top.',
    ],
    starterCode: {
      js: `function largestRectangleArea(heights) {
  let maxArea = 0;
  const stack = []; // monotonically increasing stack of indices

  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] > h) {
      // Pop and calculate area
    }
    stack.push(i);
  }

  return maxArea;
}

console.log(largestRectangleArea([2,1,5,6,2,3])); // 10`,
      typescript: `function largestRectangleArea(heights: number[]): number {

}

console.log(largestRectangleArea([2,1,5,6,2,3])); // 10
console.log(largestRectangleArea([2,4]));          // 4`,
      python: `def largest_rectangle_area(heights):
    pass

print(largest_rectangle_area([2,1,5,6,2,3]))  # 10`,
    },
    tags: ['monotonic-stack', 'stack', 'hard', 'histogram'],
  },

  // ── Union Find ───────────────────────────────────────────────────────────

  {
    id: 'starter-union-find',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Union Find',
    teacherMode: true,
    functionName: 'findCircleNum',
    testCases: [
      { desc: 'two groups',        args: [[[1,1,0],[1,1,0],[0,0,1]]],          expected: 2 },
      { desc: 'all connected',     args: [[[1,1,1],[1,1,1],[1,1,1]]],          expected: 1 },
      { desc: 'all separate',      args: [[[1,0,0],[0,1,0],[0,0,1]]],          expected: 3 },
      { desc: 'chain — all connected through intermediates', args: [[[1,1,0,0],[1,1,1,0],[0,1,1,1],[0,0,1,1]]], expected: 1 },
    ],
    followUpQuestions: [
      "What is path compression and what does it buy you?",
      "What is union by rank and how does it keep things flat?",
      "What's the amortized complexity of find() with both optimizations?",
    ],
    title: 'Starter: Number of Provinces (Union Find)',
    prompt: `There are n cities. isConnected[i][j] = 1 means city i and city j are directly connected.

A province is a group of directly or indirectly connected cities.

Return the number of provinces.

Example:
  [[1,1,0],
   [1,1,0],   → 2 provinces: {0,1} and {2}
   [0,0,1]]

Questions to think about:
  - How do you efficiently track which cities belong to the same group?
  - What happens when you "merge" two groups?`,
    hints: [
      'Union-Find: give each city a "parent". Initially parent[i] = i.',
      'find(i): follow parents until you reach the root. With path compression, set every node\'s parent directly to the root.',
      'union(i, j): find roots of both. If different, attach one to the other.',
      'Count distinct roots at the end — each is a province.',
    ],
    starterCode: {
      js: `function findCircleNum(isConnected) {
  const n = isConnected.length;
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]); // path compression
    return parent[x];
  }

  function union(x, y) {
    parent[find(x)] = find(y);
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j]) union(i, j);
    }
  }

  // Count distinct roots
  return parent.filter((p, i) => find(i) === i).length;
}

console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])); // 2`,
      typescript: `function findCircleNum(isConnected: number[][]): number {

}

console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])); // 2
console.log(findCircleNum([[1,0,0],[0,1,0],[0,0,1]])); // 3`,
      python: `def find_circle_num(is_connected):
    pass

print(find_circle_num([[1,1,0],[1,1,0],[0,0,1]]))  # 2
print(find_circle_num([[1,0,0],[0,1,0],[0,0,1]]))  # 3`,
    },
    tags: ['union-find', 'disjoint-set', 'graph', 'connected-components'],
  },

  // ── Backtracking / Subsets ───────────────────────────────────────────────

  {
    id: 'starter-backtracking',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Subsets & Backtracking',
    teacherMode: true,
    functionName: 'subsets',
    testCases: [
      { desc: '3 elements — 8 subsets',   args: [[1,2,3]],    expected: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]], sortResult: true },
      { desc: 'single element',           args: [[1]],        expected: [[],[1]], sortResult: true },
      { desc: 'empty input',              args: [[]],         expected: [[]] },
      { desc: 'two elements — 4 subsets', args: [[5,7]], expected: [[],[5],[7],[5,7]], sortResult: true },
    ],
    followUpQuestions: [
      "How many subsets does a set of n elements produce, and why?",
      "At what point in the recursion do you record a result?",
      "If the input had duplicate elements, how would you avoid duplicate subsets?",
    ],
    title: 'Starter: Generate All Subsets',
    prompt: `Given a list of unique integers, return all possible subsets (the power set). Order of subsets and elements within subsets does not matter.

Example:
  Input:  [1, 2, 3]
  Output: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]

Questions to think about:
  - For each element, you make a binary choice: include it or exclude it. What does that decision tree look like?
  - Where does "backtracking" happen in your recursive approach?`,
    hints: [
      'At each index, you have two choices: include nums[i] or skip it.',
      'Recurse with the current path to explore the "include" branch, then pop to explore the "skip" branch.',
      'Add a copy of the current path to results at the start of each recursive call (not just at leaf nodes).',
    ],
    starterCode: {
      js: `function subsets(nums) {
  const result = [];

  function backtrack(start, current) {
    result.push([...current]); // snapshot of current subset
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);     // include nums[i]
      backtrack(i + 1, current); // recurse
      current.pop();             // backtrack (exclude nums[i])
    }
  }

  backtrack(0, []);
  return result;
}

console.log(JSON.stringify(subsets([1,2,3])));`,
      typescript: `function subsets(nums: number[]): number[][] {

}

console.log(JSON.stringify(subsets([1,2,3]))); // [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
console.log(JSON.stringify(subsets([0])));     // [[], [0]]`,
      python: `def subsets(nums):
    result = []
    def backtrack(start, current):
        result.append(current[:])
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    backtrack(0, [])
    return result

print(subsets([1,2,3]))  # [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
print(subsets([0]))      # [[], [0]]`,
    },
    tags: ['backtracking', 'recursion', 'subsets', 'decision-tree'],
  },

  // ── Modified Binary Search ───────────────────────────────────────────────

  {
    id: 'starter-rotated-search',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Modified Binary Search',
    teacherMode: true,
    functionName: 'searchRotated',
    testCases: [
      { desc: 'target in left half',      args: [[4,5,6,7,0,1,2], 4],  expected: 0 },
      { desc: 'target in right half',     args: [[4,5,6,7,0,1,2], 0],  expected: 4 },
      { desc: 'target not found',         args: [[4,5,6,7,0,1,2], 3],  expected: -1 },
      { desc: 'no rotation',              args: [[1,2,3,4,5], 3],      expected: 2 },
      { desc: 'single element — found',   args: [[1], 1],              expected: 0 },
      { desc: 'single element — missing', args: [[1], 0],              expected: -1 },
    ],
    followUpQuestions: [
      "How do you figure out which half is sorted after finding the midpoint?",
      "Once you know which half is sorted, how do you decide which half to search?",
      "What makes this O(log n) — why can't a linear scan solve this faster?",
    ],
    title: 'Starter: Search in Rotated Sorted Array',
    prompt: `A sorted array was rotated at some pivot. Given the rotated array and a target, return the index of the target or -1 if not found.

Example:
  Original: [0, 1, 2, 4, 5, 6, 7]
  Rotated:  [4, 5, 6, 7, 0, 1, 2], target = 0
  Output:   4

Constraint: O(log n) time — so a linear scan is not acceptable.

Questions to think about:
  - Even in a rotated array, at least ONE of the two halves around the midpoint is always sorted. Which one?
  - How do you know if the target falls in the sorted half?`,
    hints: [
      'At mid, one of [lo..mid] or [mid..hi] is always sorted.',
      'If nums[lo] ≤ nums[mid], the left half is sorted.',
      'Check if target is in the sorted half; if yes, search there. Otherwise search the other half.',
    ],
    starterCode: {
      js: `function searchRotated(nums, target) {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;

    // Determine which half is sorted
    if (nums[lo] <= nums[mid]) {
      // Left half is sorted
      // Is target in [lo..mid)?

    } else {
      // Right half is sorted
      // Is target in (mid..hi]?

    }
  }

  return -1;
}

console.log(searchRotated([4,5,6,7,0,1,2], 0));  // 4
console.log(searchRotated([4,5,6,7,0,1,2], 3));  // -1`,
      typescript: `function searchRotated(nums: number[], target: number): number {

}

console.log(searchRotated([4,5,6,7,0,1,2], 0)); // 4
console.log(searchRotated([4,5,6,7,0,1,2], 3)); // -1`,
      python: `def search_rotated(nums, target):
    pass

print(search_rotated([4,5,6,7,0,1,2], 0))  # 4
print(search_rotated([4,5,6,7,0,1,2], 3))  # -1`,
    },
    tags: ['binary-search', 'rotated-array', 'modified-binary-search'],
  },

  // ── Trie ─────────────────────────────────────────────────────────────────

  {
    id: 'starter-trie',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'Trie',
    teacherMode: true,
    suitableLanguages: ['js', 'typescript'],
    classTest: true,
    className: 'Trie',
    testCases: [
      {
        desc: 'insert and search exact word',
        steps: [
          { method: 'insert', args: ['apple'] },
          { method: 'search', args: ['apple'], returns: true },
          { method: 'search', args: ['app'], returns: false },
          { method: 'startsWith', args: ['app'], returns: true },
        ],
      },
      {
        desc: 'insert prefix separately makes it searchable',
        steps: [
          { method: 'insert', args: ['app'] },
          { method: 'insert', args: ['apple'] },
          { method: 'search', args: ['app'], returns: true },
          { method: 'search', args: ['apple'], returns: true },
          { method: 'search', args: ['ap'], returns: false },
          { method: 'startsWith', args: ['ap'], returns: true },
        ],
      },
      {
        desc: 'startsWith false for unknown prefix',
        steps: [
          { method: 'insert', args: ['cat'] },
          { method: 'startsWith', args: ['dog'], returns: false },
          { method: 'search', args: ['cat'], returns: true },
        ],
      },
      {
        desc: 'search does not match prefix; startsWith true only for valid prefix',
        steps: [
          { method: 'insert', args: ['hello'] },
          { method: 'search', args: ['hell'], returns: false },
          { method: 'startsWith', args: ['hell'], returns: true },
          { method: 'startsWith', args: ['world'], returns: false },
          { method: 'insert', args: ['hell'] },
          { method: 'search', args: ['hell'], returns: true },
        ],
      },
    ],
    title: 'Starter: Implement a Trie',
    prompt: `Implement a Trie (prefix tree) with three operations:
  - insert(word)     — add a word to the trie
  - search(word)     — return true if the exact word exists
  - startsWith(prefix) — return true if any word starts with the prefix

Example:
  trie.insert("apple")
  trie.search("apple")    // true
  trie.search("app")      // false  (not inserted as a complete word)
  trie.startsWith("app")  // true   (apple starts with app)
  trie.insert("app")
  trie.search("app")      // true

Questions to think about:
  - What does each node in the trie store?
  - How do you mark that a complete word ends at a node?`,
    hints: [
      'Each TrieNode has a map of children (character → TrieNode) and a boolean isEnd.',
      'insert: for each character, create the node if it doesn\'t exist. Mark the last node isEnd=true.',
      'search: traverse the trie. Return isEnd at the last node.',
      'startsWith: traverse the trie. Return true if you reach the last prefix char without getting stuck.',
    ],
    starterCode: {
      js: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    // Traverse from root, creating nodes as needed

  }

  search(word) {
    // Return true if the exact word exists

  }

  startsWith(prefix) {
    // Return true if any inserted word starts with this prefix

  }
}

const trie = new Trie();
trie.insert('apple');
console.log(trie.search('apple'));    // true
console.log(trie.search('app'));      // false
console.log(trie.startsWith('app'));  // true
trie.insert('app');
console.log(trie.search('app'));      // true`,
      typescript: `class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd: boolean = false;
}

class Trie {
  private root: TrieNode = new TrieNode();

  insert(word: string): void {}

  search(word: string): boolean { return false; }

  startsWith(prefix: string): boolean { return false; }
}

const trie = new Trie();
trie.insert('apple');
console.log(trie.search('apple'));    // true
console.log(trie.search('app'));      // false
console.log(trie.startsWith('app'));  // true
trie.insert('app');
console.log(trie.search('app'));      // true`,
    },
    followUpQuestions: [
      "What does each node in your trie store?",
      "How does your implementation distinguish a complete word from just a prefix?",
      "Where would you use a trie in a real system?",
    ],
    tags: ['trie', 'tree', 'prefix-tree', 'string'],
  },

  // ─── New questions: Python core concepts + TypeScript equivalents ─────────────

  {
    id: 'trivia-13',
    category: 'trivia',
    difficulty: 'easy',
    title: 'Python: Tuples vs Lists vs Dicts (+ TypeScript Equivalents)',
    prompt: `Explain the key differences between Python tuples, lists, and dicts. Then describe the TypeScript equivalents.

Python side — cover:
  - Mutability differences and why that matters
  - Performance: why tuple access is slightly faster, why dicts are O(1)
  - Dict internals: how Python dicts use a hash table, what happens on collision, and why dict keys must be hashable
  - When you'd use tuple vs list in real code

TypeScript side — cover:
  - readonly arrays and const assertions (\`as const\`) as tuple analogs
  - Object literal vs Map vs WeakMap — when to use each
  - Map vs Object: key types, iteration order, prototype pollution risk
  - Why WeakMap is useful for caching without memory leaks`,
    hints: [
      'Tuples are immutable sequences — great for multi-return values and dict keys. Lists are mutable dynamic arrays.',
      'Python dicts use open addressing hash tables. CPython 3.7+ guarantees insertion order.',
      'In TS, "as const" narrows a literal array to a tuple type. Map preserves insertion order and accepts any key type; plain objects coerce keys to strings.',
    ],
    tags: ['Python', 'TypeScript', 'data structures', 'hash tables', 'fundamentals'],
  },

  {
    id: 'trivia-14',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Python Generators & Iterators (+ TypeScript Equivalents)',
    prompt: `Explain Python generators and the iterator protocol. Then describe the TypeScript/JavaScript equivalents.

Python side — cover:
  - How \`yield\` works and what state is preserved between calls
  - The iterator protocol: __iter__ and __next__
  - Generator expressions vs generator functions
  - Why generators matter for memory efficiency (lazy evaluation)
  - \`yield from\` for delegating to sub-generators

TypeScript/JS side — cover:
  - Generator functions with \`function*\` and \`yield\`
  - The Iterator protocol: objects with a \`next()\` method returning \`{value, done}\`
  - \`Symbol.iterator\` — how for...of works under the hood
  - Async generators: \`async function*\` + \`for await...of\`
  - Practical use: infinite sequences, streaming data processing, pagination`,
    hints: [
      'A generator function returns a generator object. Each call to next() runs until the next yield, suspending the frame.',
      'In JS/TS, any object with [Symbol.iterator]() is iterable. Arrays, Maps, Sets all implement this.',
      'Async generators are key for streaming LLM responses token-by-token.',
    ],
    tags: ['Python', 'TypeScript', 'generators', 'iterators', 'lazy evaluation', 'streaming'],
  },

  {
    id: 'trivia-15',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Python Decorators (+ TypeScript HOF Equivalents)',
    prompt: `Explain Python decorators — how they work, when to use them, and common patterns. Then describe the TypeScript/JavaScript equivalents.

Python side — cover:
  - How a decorator is just a function that takes a function and returns a function
  - Why \`@functools.wraps\` is essential (preserves __name__, __doc__)
  - Decorator factories (decorators that take arguments, like \`@retry(3)\`)
  - Class decorators vs function decorators
  - Common real-world uses: caching (@lru_cache), timing, retry logic, access control

TypeScript/JavaScript side — cover:
  - The HOF (higher-order function) pattern as the direct equivalent
  - TypeScript's experimental \`@decorator\` syntax (requires experimentalDecorators) — class/method/property decorators
  - The decorator metadata pattern and when you'd use Reflect.metadata
  - Practical TS decorator use cases: logging, validation, dependency injection (NestJS)
  - Difference between a Python decorator and a TS class decorator`,
    hints: [
      'Python decorator: @timer is sugar for fn = timer(fn). The wrapper function closes over the original fn.',
      'functools.wraps copies __name__ and __doc__ so the wrapper looks like the original in stack traces and help().',
      'TS class decorators receive the constructor as their argument. Method decorators get (target, propertyKey, descriptor).',
    ],
    tags: ['Python', 'TypeScript', 'decorators', 'HOF', 'closures', 'metaprogramming'],
  },

  {
    id: 'trivia-16',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Python OOP: Static, Class & Dunder Methods (+ TypeScript Equivalents)',
    prompt: `Explain Python's static methods, class methods, and dunder (magic) methods. Then describe the TypeScript equivalents.

Python side — cover:
  - \`@staticmethod\` vs \`@classmethod\` vs instance method — when to use each
  - Key dunder methods: __init__, __repr__, __str__, __eq__, __hash__, __len__, __iter__, __getitem__
  - Why __repr__ and __str__ serve different audiences
  - __enter__ / __exit__ for context managers
  - __call__ to make an instance callable

TypeScript side — cover:
  - \`static\` class members — equivalent to @staticmethod
  - No @classmethod equivalent — TS uses static factory methods instead
  - Symbol-based protocols: Symbol.iterator, Symbol.toPrimitive, Symbol.toStringTag
  - How toString() and valueOf() mirror __str__ and numeric coercion
  - TypeScript abstract classes and interfaces as a more explicit contract than Python's duck typing`,
    hints: [
      '@classmethod receives cls (the class itself) as first arg — useful for alternative constructors like Date.fromString().',
      '@staticmethod is just a namespaced function — it has no access to self or cls.',
      'Python duck typing: if an object has __iter__, it\'s iterable. TS uses interfaces/Symbol.iterator for the same contract.',
    ],
    tags: ['Python', 'TypeScript', 'OOP', 'dunder methods', 'static methods', 'class design'],
  },

  {
    id: 'trivia-17',
    category: 'trivia',
    difficulty: 'medium',
    title: 'RAG: Why Chunking Is Necessary and Chunking Strategies',
    prompt: `Explain why chunking is a critical step in RAG (Retrieval-Augmented Generation) systems and compare different chunking strategies.

Cover:
  - Why you can't just feed entire documents to the LLM (context window limits, cost, precision)
  - Why chunk granularity matters for retrieval quality — too large vs too small
  - Fixed-size chunking: pros, cons, the overlap parameter and why it helps
  - Semantic / sentence-aware chunking: split on paragraph/sentence boundaries
  - Recursive character text splitting (LangChain default) — why it's a practical middle ground
  - Document-structure-aware chunking: headers, sections, tables
  - Chunk size tradeoffs: retrieval precision vs. context completeness
  - How chunk size interacts with the embedding model (token limits) and reranking`,
    hints: [
      'A 50-page PDF might be 25,000 tokens — way over any LLM context window and expensive. You retrieve only the relevant 3–5 chunks.',
      'Overlap (e.g., 10–15% of chunk size) prevents losing context at chunk boundaries — a sentence split mid-thought would hurt retrieval.',
      'Small chunks = high retrieval precision but risk losing cross-sentence context. Large chunks = more context but lower precision and higher cost.',
    ],
    tags: ['GenAI', 'RAG', 'chunking', 'embeddings', 'LLM', 'retrieval'],
  },

  {
    id: 'trivia-18',
    category: 'trivia',
    difficulty: 'medium',
    title: 'LLM Accuracy: Grounding and Response Validation',
    prompt: `Explain techniques for improving LLM response accuracy in production systems through grounding and validation.

Cover:
  - What "grounding" means — anchoring LLM responses to retrieved or verified facts
  - Why grounding is more reliable than prompt engineering alone for factual accuracy
  - RAG as a grounding mechanism: how it constrains the LLM to your data
  - Response validation approaches:
    * Output parsing / schema enforcement (structured outputs, function calling)
    * Confidence scoring — asking the model to rate its own certainty
    * Citation checking — verify the model actually used retrieved chunks
    * LLM-as-judge: use a second LLM call to evaluate the first response
  - Hallucination detection heuristics: consistency checking, self-contradiction tests
  - Guardrails: input/output filtering, topic classifiers
  - Iterative refinement: multi-step generation with validation between steps`,
    hints: [
      'Grounding: "only answer based on the provided context" in the system prompt is the simplest form. RAG makes it structural.',
      'Structured outputs (JSON mode / function calling) prevent format hallucinations — the model can\'t invent fields.',
      'LLM-as-judge: cheap GPT-3.5/Haiku call to score factuality. Works well but can inherit the original model\'s biases.',
    ],
    tags: ['GenAI', 'LLM', 'RAG', 'hallucination', 'grounding', 'response validation'],
  },

  // ─── Coding: Python decorator + TS HOF equivalent ────────────────────────────

  {
    id: 'coding-23',
    category: 'coding',
    difficulty: 'medium',
    title: 'Implement a @retry Decorator (Python) / retry HOF (TypeScript)',
    prompt: `Implement a retry mechanism that automatically re-calls a failing function up to N times before giving up.

Python: implement \`@retry(max_attempts, exceptions=(Exception,))\` as a decorator factory.
  - Only retry if the raised exception matches the \`exceptions\` tuple
  - On final failure, re-raise the last exception
  - Bonus: add an \`delay\` parameter (seconds between retries)

TypeScript: implement \`retry<T>(fn: () => Promise<T>, maxAttempts: number): Promise<T>\`
  - Works with async functions
  - On final failure, throw the last error

Usage examples:
  # Python
  @retry(max_attempts=3, exceptions=(requests.Timeout,))
  def fetch_data(url: str) -> dict: ...

  // TypeScript
  const data = await retry(() => fetchData(url), 3);`,
    hints: [
      'Python decorator factory: retry(3) returns a decorator, which returns the wrapper. Three levels of nesting.',
      'Use functools.wraps on the wrapper to preserve the original function\'s name and docstring.',
      'TypeScript: loop from 0 to maxAttempts-1, try/catch each iteration, only re-throw on the last attempt.',
    ],
    tags: ['Python', 'TypeScript', 'decorators', 'HOF', 'async', 'error handling', 'patterns'],
    retryTest: true,
  },

  // ─── Architecture: LLM accuracy in production ────────────────────────────────

  {
    id: 'arch-8',
    category: 'architecture',
    difficulty: 'hard',
    title: 'Design a System to Improve LLM Response Accuracy in Production',
    prompt: `You're running an AI assistant for an enterprise product. Users report that the LLM sometimes gives incorrect information. Design a system to improve accuracy and reliability.

Constraints:
  - The LLM is a hosted model (you can't fine-tune it)
  - ~500 concurrent users, latency target < 4 seconds
  - Responses must be auditable — you need to know why a specific answer was given
  - Wrong answers can cause serious downstream consequences

Design:
  1. How would you ground responses to your official internal documentation?
  2. What validation layers would you add before returning a response?
  3. How would you detect and handle low-confidence or out-of-scope queries?
  4. How do you handle the latency budget given multi-step validation?
  5. How would you monitor accuracy over time and detect regressions?`,
    hints: [
      'Grounding: RAG with citation enforcement — the LLM\'s system prompt requires it to cite chunks and say "I don\'t know" if not found.',
      'Validation layers: structured output parsing → citation check → LLM-as-judge (async/background for low latency) → human review queue for flagged responses.',
      'Confidence signal: ask the model to output a confidence field in its structured JSON response. Route low-confidence queries to a fallback or human.',
    ],
    tags: ['GenAI', 'LLM', 'RAG', 'architecture', 'hallucination', 'compliance', 'monitoring'],
  },

  // ─── Cycle Detection practice ────────────────────────────────────────────────

  {
    id: 'coding-27',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'BFS / DFS',
    title: 'Detect Cycle in Undirected Graph',
    functionName: 'hasCycleUndirected',
    testCases: [
      { desc: 'triangle — cycle',              args: [3, [[0,1],[1,2],[2,0]]],          expected: true  },
      { desc: 'linear chain — no cycle',       args: [4, [[0,1],[1,2],[2,3]]],          expected: false },
      { desc: 'extra edge closes loop',        args: [4, [[0,1],[1,2],[2,3],[3,1]]],    expected: true  },
      { desc: 'single node no edges',          args: [1, []],                            expected: false },
      { desc: 'two components, one cyclic',    args: [5, [[0,1],[1,2],[2,0],[3,4]]],    expected: true  },
      { desc: 'star graph — no cycle',         args: [5, [[0,1],[0,2],[0,3],[0,4]]],    expected: false },
    ],
    prompt: `Given n nodes (labeled 0 to n-1) and a list of UNDIRECTED edges, return true if the graph contains a cycle.

Example:
  n=3, edges=[[0,1],[1,2],[2,0]]       →  true   (triangle)
  n=4, edges=[[0,1],[1,2],[2,3]]       →  false  (chain, no way back)
  n=4, edges=[[0,1],[1,2],[2,3],[3,1]] →  true   (1→2→3→1)

Important distinction from directed cycle detection:
  In an undirected graph, every edge [u,v] creates a path BOTH ways. So when you DFS from u to v, you must NOT count going back to u as a "cycle" — that's just the same edge. You need to track the parent (where you came from) and skip it.

Two valid approaches:
  a) DFS with parent tracking — pass the parent node into recursion, skip it when checking neighbors
  b) Union Find — for each edge [u,v], if find(u) === find(v) they're already connected → adding this edge creates a cycle`,
    hints: [
      'DFS approach: for each unvisited node, DFS with a parent parameter. If you reach a visited neighbor that is NOT the parent, it\'s a cycle.',
      'Build an adjacency list first (undirected: add both directions). Then outer loop runs DFS on each unvisited node to handle disconnected components.',
      'Union Find approach: process edges one at a time. Before union(u,v), check if find(u) === find(v). If yes — they\'re already in the same component, so this edge creates a cycle.',
    ],
    tags: ['DFS', 'cycle detection', 'undirected graph', 'union find', 'graphs'],
    starterCode: {
      js: `function hasCycleUndirected(n, edges) {

}

console.log(hasCycleUndirected(3, [[0,1],[1,2],[2,0]])); // true
console.log(hasCycleUndirected(4, [[0,1],[1,2],[2,3]])); // false
`,
      typescript: `function hasCycleUndirected(n: number, edges: number[][]): boolean {

}

console.log(hasCycleUndirected(3, [[0,1],[1,2],[2,0]])); // true
console.log(hasCycleUndirected(4, [[0,1],[1,2],[2,3]])); // false
`,
      python: `def has_cycle_undirected(n, edges):
    pass

print(has_cycle_undirected(3, [[0,1],[1,2],[2,0]]))  # True
print(has_cycle_undirected(4, [[0,1],[1,2],[2,3]]))  # False
`,
    },
  },

  // ─── Union Find practice ──────────────────────────────────────────────────────

  {
    id: 'coding-28',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Union Find',
    title: 'Number of Connected Components in Undirected Graph',
    functionName: 'countComponents',
    testCases: [
      { desc: 'all connected',           args: [5, [[0,1],[1,2],[3,4],[2,3]]],    expected: 1 },
      { desc: 'two components',          args: [5, [[0,1],[1,2],[3,4]]],           expected: 2 },
      { desc: 'no edges — all isolated', args: [4, []],                            expected: 4 },
      { desc: 'one edge',                args: [3, [[0,2]]],                       expected: 2 },
      { desc: 'single node',             args: [1, []],                            expected: 1 },
    ],
    prompt: `Given n nodes (labeled 0 to n-1) and a list of undirected edges, return the number of connected components.

Example:
  n=5, edges=[[0,1],[1,2],[3,4]]     →  2   (component {0,1,2} and component {3,4})
  n=5, edges=[[0,1],[1,2],[2,3],[3,4]] →  1   (all connected)
  n=4, edges=[]                       →  4   (all isolated)

Solve this with Union Find (DSU):
  - Start with n components (each node is its own component)
  - For each edge [u,v]: union(u,v). If they were in different components, decrement the component count.
  - Return the final count.

Implement find() with path compression and union() with union by rank.`,
    hints: [
      'Initialize: parent[i] = i, rank[i] = 0, components = n.',
      'find(x): if parent[x] !== x, set parent[x] = find(parent[x]) (path compression) and return that.',
      'union(x, y): find both roots. If same root, already connected — do nothing. If different, merge smaller rank under larger, and decrement components by 1.',
    ],
    tags: ['union find', 'DSU', 'connected components', 'graphs'],
    starterCode: {
      js: `function countComponents(n, edges) {
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = new Array(n).fill(0);

    function find(x) {
        // path compression

    }

    function union(x, y) {
        // union by rank

    }

    let components = n;
    for (const [u, v] of edges) {
        // union u and v; decrement components if they were separate

    }
    return components;
}

console.log(countComponents(5, [[0,1],[1,2],[3,4]]));       // 2
console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]])); // 1
`,
      typescript: `function countComponents(n: number, edges: number[][]): number {

}

console.log(countComponents(5, [[0,1],[1,2],[3,4]]));       // 2
console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]])); // 1
`,
      python: `def count_components(n, edges):
    pass

print(count_components(5, [[0,1],[1,2],[3,4]]))         # 2
print(count_components(5, [[0,1],[1,2],[2,3],[3,4]]))   # 1
`,
    },
  },

  {
    id: 'coding-29',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Union Find',
    title: 'Redundant Connection',
    functionName: 'findRedundantConnection',
    testCases: [
      { desc: 'triangle',          args: [[[1,2],[1,3],[2,3]]],    expected: [2,3] },
      { desc: 'chain with loop',   args: [[[1,2],[2,3],[3,4],[1,4],[1,5]]], expected: [1,4] },
      { desc: 'simple two-node',   args: [[[1,2],[2,3],[3,1]]],    expected: [3,1] },
      { desc: 'last edge is redundant among options', args: [[[1,2],[2,3],[3,1],[1,4],[4,5]]], expected: [3,1] },
    ],
    prompt: `A tree of n nodes (labeled 1 to n) has exactly n-1 edges. Given a graph that started as a tree but had one extra edge added, find and return that redundant edge.

The input is an array of edges where edges[i] = [u, v]. The "redundant" edge is the one that, when added, first created a cycle. If there are multiple answers, return the last such edge in the input.

Example:
  [[1,2],[1,3],[2,3]]      →  [2,3]   (1-2-3 is a tree; 2-3 closes a cycle)
  [[1,2],[2,3],[3,4],[1,4],[1,5]]  →  [1,4]

Process edges one at a time with Union Find:
  - For each edge [u,v]: if find(u) === find(v), they're already connected — this edge is redundant.
  - Otherwise, union(u,v) and continue.`,
    hints: [
      'Process edges left to right. The first edge where find(u) === find(v) is the redundant one.',
      'Nodes are labeled 1 to n — initialize parent array of size n+1 (index 0 unused).',
      'Use standard Union Find with path compression. No special data structure needed — just process edges in order.',
    ],
    tags: ['union find', 'cycle detection', 'graphs', 'trees'],
    starterCode: {
      js: `function findRedundantConnection(edges) {

}

console.log(findRedundantConnection([[1,2],[1,3],[2,3]]));             // [2,3]
console.log(findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])); // [1,4]
`,
      typescript: `function findRedundantConnection(edges: number[][]): number[] {

}

console.log(findRedundantConnection([[1,2],[1,3],[2,3]]));             // [2,3]
console.log(findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])); // [1,4]
`,
      python: `def find_redundant_connection(edges):
    pass

print(find_redundant_connection([[1,2],[1,3],[2,3]]))              # [2,3]
print(find_redundant_connection([[1,2],[2,3],[3,4],[1,4],[1,5]]))  # [1,4]
`,
    },
  },

  // ─── Trie practice ───────────────────────────────────────────────────────────

  {
    id: 'coding-30',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Trie',
    title: 'Implement Trie (Prefix Tree)',
    classTest: true,
    className: 'Trie',
    testCases: [
      {
        desc: 'insert and search exact',
        steps: [
          { method: 'insert', args: ['apple'] },
          { method: 'search', args: ['apple'], returns: true },
          { method: 'search', args: ['app'], returns: false },
        ],
      },
      {
        desc: 'startsWith prefix',
        steps: [
          { method: 'insert', args: ['apple'] },
          { method: 'startsWith', args: ['app'], returns: true },
          { method: 'startsWith', args: ['apl'], returns: false },
        ],
      },
      {
        desc: 'multiple words sharing prefix',
        steps: [
          { method: 'insert', args: ['app'] },
          { method: 'insert', args: ['apple'] },
          { method: 'search', args: ['app'], returns: true },
          { method: 'search', args: ['apple'], returns: true },
          { method: 'search', args: ['ap'], returns: false },
          { method: 'startsWith', args: ['ap'], returns: true },
        ],
      },
      {
        desc: 'empty trie searches',
        steps: [
          { method: 'search', args: ['anything'], returns: false },
          { method: 'startsWith', args: ['a'], returns: false },
        ],
      },
    ],
    prompt: `Implement a Trie (prefix tree) with three operations:

  insert(word)         — insert a word into the trie
  search(word)         — return true if the EXACT word exists in the trie
  startsWith(prefix)   — return true if any word in the trie starts with the given prefix

Example:
  trie.insert("apple")
  trie.search("apple")    →  true
  trie.search("app")      →  false   (only a prefix, not a complete word)
  trie.startsWith("app")  →  true
  trie.insert("app")
  trie.search("app")      →  true    (now it's a complete word too)

Structure: each node stores a map of children (character → child node) and a boolean isEnd (true if a complete word ends here).`,
    hints: [
      'Each TrieNode: { children: {}, isEnd: false }. The root is an empty node — it doesn\'t represent any character.',
      'insert: walk character by character. If a child for that character doesn\'t exist, create it. After the last character, set isEnd = true.',
      'search: walk the trie. If any character is missing, return false. After the last character, return node.isEnd.',
      'startsWith: same as search but return true as long as you reach the end without a missing character — don\'t check isEnd.',
    ],
    tags: ['trie', 'prefix tree', 'data structures'],
    starterCode: {
      js: `class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {

    }

    search(word) {

    }

    startsWith(prefix) {

    }
}

const trie = new Trie();
trie.insert('apple');
console.log(trie.search('apple'));    // true
console.log(trie.search('app'));      // false
console.log(trie.startsWith('app'));  // true
`,
      typescript: `class TrieNode {
    children: Record<string, TrieNode> = {};
    isEnd = false;
}

class Trie {
    root = new TrieNode();

    insert(word: string): void {

    }

    search(word: string): boolean {
        return false;
    }

    startsWith(prefix: string): boolean {
        return false;
    }
}

const trie = new Trie();
trie.insert('apple');
console.log(trie.search('apple'));    // true
console.log(trie.search('app'));      // false
console.log(trie.startsWith('app'));  // true
`,
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass

    def starts_with(self, prefix: str) -> bool:
        pass

trie = Trie()
trie.insert('apple')
print(trie.search('apple'))     # True
print(trie.search('app'))       # False
print(trie.starts_with('app'))  # True
`,
    },
  },

  {
    id: 'coding-31',
    category: 'coding',
    difficulty: 'hard',
    pattern: 'Trie',
    title: 'Word Search II (Find Words in a Grid)',
    functionName: 'findWords',
    testCases: [
      {
        desc: 'two words found',
        args: [[['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], ['oath','pea','eat','rain']],
        expected: ['eat','oath'],
        sortResult: true,
      },
      {
        desc: 'no words found',
        args: [[['a','b'],['c','d']], ['abcb']],
        expected: [],
      },
      {
        desc: 'single cell word',
        args: [[['a']], ['a']],
        expected: ['a'],
      },
      {
        desc: 'same letter cannot be reused in a single word',
        args: [[['a','b'],['c','d']], ['abdc','abcd']],
        expected: ['abdc'],
        sortResult: true,
      },
    ],
    prompt: `Given an m×n grid of characters and a list of words, find all words from the list that exist in the grid.

Words can be constructed from letters in sequentially adjacent cells (horizontally or vertically). A cell may not be used more than once in a single word.

Example:
  board = [["o","a","a","n"],
            ["e","t","a","e"],
            ["i","h","k","r"],
            ["i","f","l","v"]]
  words = ["oath","pea","eat","rain"]
  Output: ["eat","oath"]

Naive approach: run word search DFS for each word separately — O(words × m×n × 4^L). Too slow for many words.

Optimized approach: build a Trie from all words, then do a SINGLE DFS pass over the grid. At each cell, follow the trie to prune paths that can't lead to any word.

Key trie optimization: once a word is found, delete it from the trie so it's not found again.`,
    hints: [
      'Build a Trie from all words first. Then DFS from every cell, moving through the trie simultaneously.',
      'At each step: if the current character isn\'t in the trie node\'s children, prune (return early). If the node has isEnd=True, add the word to results and mark isEnd=False to avoid duplicates.',
      'Mark the cell as visited during DFS (e.g., replace with "#") and restore it after backtracking.',
    ],
    tags: ['trie', 'DFS', 'backtracking', 'grid', 'hard'],
    starterCode: {
      js: `function findWords(board, words) {

}

console.log(findWords(
  [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']],
  ['oath','pea','eat','rain']
)); // ['eat','oath'] (any order)
`,
      typescript: `function findWords(board: string[][], words: string[]): string[] {
    return [];
}

console.log(findWords(
    [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']],
    ['oath','pea','eat','rain']
)); // ['eat','oath']
`,
      python: `def find_words(board, words):
    pass

print(find_words(
    [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']],
    ['oath','pea','eat','rain']
))  # ['eat','oath']
`,
    },
  },

  // ─── Backtracking practice ────────────────────────────────────────────────────

  {
    id: 'coding-32',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Subsets & Backtracking',
    title: 'Subsets (Power Set)',
    functionName: 'subsets',
    testCases: [
      { desc: 'three elements',  args: [[1,2,3]], expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]], sortResult: true },
      { desc: 'single element',  args: [[0]],     expected: [[],[0]] },
      { desc: 'two elements',    args: [[1,2]],   expected: [[],[1],[2],[1,2]], sortResult: true },
      { desc: 'empty input — just empty subset', args: [[]], expected: [[]] },
    ],
    prompt: `Given an integer array nums with no duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return in any order.

Example:
  nums = [1,2,3]
  Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

  nums = [0]
  Output: [[],[0]]

Two approaches:
  a) Backtracking: DFS with a running subset. At each index, branch — include nums[i] or not. Base case: index reaches end → add current subset to results.
  b) Iterative: start with [[]], then for each number, take every existing subset and add the number to it.

Backtracking template:
  dfs(start, current):
    results.push([...current])
    for i from start to end:
      current.push(nums[i])
      dfs(i+1, current)
      current.pop()  ← backtrack`,
    hints: [
      'Backtracking: add the current subset to results at the START of each DFS call (before the loop), not just at leaf nodes.',
      'Use a start index to only consider elements to the right of the last chosen element — this avoids duplicates.',
      'Don\'t forget to spread/copy the current array when adding to results, not push the reference.',
    ],
    tags: ['backtracking', 'subsets', 'recursion', 'DFS'],
    starterCode: {
      js: `function subsets(nums) {
    const results = [];
    // dfs(start, current) — backtracking

    return results;
}

console.log(JSON.stringify(subsets([1,2,3]))); // 8 subsets
console.log(JSON.stringify(subsets([0])));     // [[],[0]]
`,
      typescript: `function subsets(nums: number[]): number[][] {
    return [];
}

console.log(JSON.stringify(subsets([1,2,3]))); // 8 subsets
`,
      python: `def subsets(nums):
    pass

print(subsets([1,2,3]))  # 8 subsets
print(subsets([0]))      # [[], [0]]
`,
    },
  },

  {
    id: 'coding-33',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Subsets & Backtracking',
    title: 'Combination Sum',
    functionName: 'combinationSum',
    testCases: [
      { desc: 'target 7',       args: [[2,3,6,7], 7],  expected: [[2,2,3],[7]], sortResult: true },
      { desc: 'target 8',       args: [[2,3,5], 8],     expected: [[2,2,2,2],[2,3,3],[3,5]], sortResult: true },
      { desc: 'no solution',    args: [[2], 1],          expected: [] },
      { desc: 'single candidate repeated', args: [[3], 9], expected: [[3,3,3]] },
    ],
    prompt: `Given an array of distinct integers candidates and a target integer, return all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen unlimited times.

Example:
  candidates=[2,3,6,7], target=7  →  [[2,2,3],[7]]
  candidates=[2,3,5], target=8    →  [[2,2,2,2],[2,3,3],[3,5]]

Key differences from Subsets:
  - You CAN reuse the same element multiple times
  - You can only add larger or equal elements (pass the SAME index i, not i+1, into the recursive call — and also include i in the next call to allow reuse)

Backtracking template:
  dfs(start, current, remaining):
    if remaining === 0: add result
    if remaining < 0: prune
    for i from start to end:
      current.push(candidates[i])
      dfs(i, current, remaining - candidates[i])  ← same i (allow reuse)
      current.pop()`,
    hints: [
      'Pass i (not i+1) in the recursive call so the same candidate can be reused.',
      'Prune early: if remaining < 0, return. Sort candidates first so you can break the loop once candidates[i] > remaining.',
      'Sort the candidates array first — it enables the pruning optimization and produces sorted combinations.',
    ],
    tags: ['backtracking', 'combination sum', 'recursion', 'DFS'],
    starterCode: {
      js: `function combinationSum(candidates, target) {
    const results = [];
    // sort candidates first, then backtrack

    return results;
}

console.log(JSON.stringify(combinationSum([2,3,6,7], 7))); // [[2,2,3],[7]]
console.log(JSON.stringify(combinationSum([2,3,5], 8)));   // [[2,2,2,2],[2,3,3],[3,5]]
`,
      typescript: `function combinationSum(candidates: number[], target: number): number[][] {
    return [];
}

console.log(JSON.stringify(combinationSum([2,3,6,7], 7))); // [[2,2,3],[7]]
`,
      python: `def combination_sum(candidates, target):
    pass

print(combination_sum([2,3,6,7], 7))  # [[2,2,3],[7]]
print(combination_sum([2,3,5], 8))    # [[2,2,2,2],[2,3,3],[3,5]]
`,
    },
  },

  // ─── Topological Sort practice ────────────────────────────────────────────────

  {
    id: 'coding-34',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Topological Sort',
    title: 'Course Schedule II (Return the Order)',
    functionName: 'findOrder',
    testCases: [
      { desc: 'two courses in order',    args: [2, [[1,0]]],              expected: [0,1] },
      { desc: 'cycle — impossible',      args: [2, [[1,0],[0,1]]],        expected: [] },
      { desc: 'no prerequisites',        args: [3, []],                   expected: [0,1,2], sortResult: true },
      { desc: 'four courses chain',      args: [4, [[1,0],[2,1],[3,2]]],  expected: [0,1,2,3] },
      { desc: 'multi-root DAG',          args: [4, [[3,0],[3,1],[3,2]]],  expected: [0,1,2,3], sortResult: true },
    ],
    prompt: `There are numCourses courses (0 to numCourses-1). prerequisites[i] = [a, b] means course b must be taken before course a.

Return a valid order to finish all courses. If impossible (cycle), return [].

Example:
  numCourses=2, prerequisites=[[1,0]]      →  [0, 1]
  numCourses=2, prerequisites=[[1,0],[0,1]] →  []  (cycle)
  numCourses=4, prerequisites=[[1,0],[2,1],[3,2]] →  [0,1,2,3]

Use Kahn's Algorithm (BFS topological sort):
  1. Build adjacency list and in-degree count for each node
  2. Enqueue all nodes with in-degree 0 (no prerequisites)
  3. Process queue: dequeue a node, add to result, decrement in-degree of its neighbors
  4. If a neighbor's in-degree hits 0, enqueue it
  5. If result.length < numCourses at the end → cycle → return []`,
    hints: [
      'In-degree = number of prerequisites a course has. Courses with in-degree 0 have no prerequisites — they can be taken first.',
      'Kahn\'s: when you "take" a course, remove it from the graph (decrement in-degree of its dependents). Any dependent that hits in-degree 0 can now be taken.',
      'At the end: if you added all numCourses to the result, return it. If fewer — some courses were in a cycle and never reached in-degree 0.',
    ],
    tags: ['topological sort', 'BFS', "Kahn's algorithm", 'DAG', 'graphs'],
    starterCode: {
      js: `function findOrder(numCourses, prerequisites) {
    // Build adj list and in-degree array
    // Kahn's BFS: queue all in-degree-0 nodes, process, return order

}

console.log(findOrder(2, [[1,0]]));         // [0,1]
console.log(findOrder(2, [[1,0],[0,1]]));   // []
console.log(findOrder(4, [[1,0],[2,1],[3,2]])); // [0,1,2,3]
`,
      typescript: `function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    return [];
}

console.log(findOrder(2, [[1,0]]));         // [0,1]
console.log(findOrder(2, [[1,0],[0,1]]));   // []
`,
      python: `from collections import deque

def find_order(num_courses, prerequisites):
    pass

print(find_order(2, [[1,0]]))          # [0,1]
print(find_order(2, [[1,0],[0,1]]))    # []
print(find_order(4, [[1,0],[2,1],[3,2]]))  # [0,1,2,3]
`,
    },
  },

  {
    id: 'coding-35',
    category: 'coding',
    difficulty: 'hard',
    pattern: 'Topological Sort',
    title: 'Alien Dictionary (Derive Character Order)',
    functionName: 'alienOrder',
    testCases: [
      { desc: 'simple order',        args: [['wrt','wrf','er','ett','rftt']],  expected: 'wertf' },
      { desc: 'invalid — cycle',     args: [['z','x','z']],                    expected: '' },
      { desc: 'no order derivable',  args: [['z','x']],                        expected: 'zx' },
      { desc: 'prefix longer',       args: [['abc','ab']],                      expected: '' },
    ],
    prompt: `You are given a list of words sorted in a foreign alphabet's lexicographic order. Derive the order of characters in that alphabet.

Example:
  words = ["wrt","wrf","er","ett","rftt"]
  Comparing adjacent words:
    "wrt" vs "wrf" → t comes before f
    "wrf" vs "er"  → w comes before e
    "er"  vs "ett" → r comes before t
    "ett" vs "rftt"→ e comes before r
  Output: "wertf"

  words = ["z","x","z"] → "" (cycle: z before x, x before z)

Steps:
  1. Collect all unique characters
  2. Compare each adjacent pair of words character-by-character — the first differing character gives a directed edge (char1 → char2)
  3. Edge case: if word1 is longer than word2 and word2 is a prefix of word1, the input is invalid → return ""
  4. Topological sort the resulting directed graph (Kahn's BFS or DFS)
  5. If cycle detected → return ""`,
    hints: [
      'Compare words[i] and words[i+1] character by character — stop at the first difference. That pair gives exactly one ordering constraint.',
      'If words[i] is longer than words[i+1] and words[i+1] is a prefix of words[i] (no differing character found), return "" — invalid.',
      'Build a directed graph of character dependencies, then topological sort. If the result has fewer characters than the unique character set, there\'s a cycle.',
    ],
    tags: ['topological sort', 'BFS', 'directed graph', 'hard', 'string'],
    starterCode: {
      js: `function alienOrder(words) {

}

console.log(alienOrder(['wrt','wrf','er','ett','rftt'])); // 'wertf'
console.log(alienOrder(['z','x','z']));                   // ''
`,
      typescript: `function alienOrder(words: string[]): string {
    return '';
}

console.log(alienOrder(['wrt','wrf','er','ett','rftt'])); // 'wertf'
console.log(alienOrder(['z','x','z']));                   // ''
`,
      python: `from collections import deque, defaultdict

def alien_order(words):
    pass

print(alien_order(['wrt','wrf','er','ett','rftt']))  # 'wertf'
print(alien_order(['z','x','z']))                    # ''
`,
    },
  },

  // ─── Cyclic Sort practice ─────────────────────────────────────────────────────

  {
    id: 'coding-36',
    category: 'coding',
    difficulty: 'easy',
    pattern: 'Cyclic Sort',
    title: 'Missing Number',
    functionName: 'missingNumber',
    testCases: [
      { desc: 'missing 2',      args: [[3,0,1]],       expected: 2 },
      { desc: 'missing 2 (4)',  args: [[0,1,3]],        expected: 2 },
      { desc: 'missing 8',      args: [[9,6,4,2,3,5,7,0,1]], expected: 8 },
      { desc: 'missing 0',      args: [[1]],            expected: 0 },
      { desc: 'missing n',      args: [[0,1]],          expected: 2 },
    ],
    prompt: `Given an array nums containing n distinct numbers in the range [0, n], return the one missing number.

Example:
  nums = [3,0,1]  →  2   (range is [0,3], 2 is missing)
  nums = [0,1,3]  →  2
  nums = [9,6,4,2,3,5,7,0,1]  →  8

Three approaches (know all three):
  a) Math: expected sum = n*(n+1)/2. Return expectedSum - actualSum. O(n) time, O(1) space.
  b) XOR: XOR all indices 0..n with all values. Missing number is what's left. O(n) time, O(1) space.
  c) Cyclic Sort: place each number at its correct index (nums[i] at index nums[i]). After sorting, scan for the index where nums[i] !== i. O(n) time, O(1) space, in-place.

For the cyclic sort approach:
  while nums[i] < n and nums[i] !== i: swap nums[i] with nums[nums[i]]
  Then find the first index where nums[i] !== i.`,
    hints: [
      'Math approach: sum 0+1+2+...+n = n*(n+1)/2. Subtract the actual array sum. The difference is the missing number.',
      'Cyclic sort: each number should live at its own index. While nums[i] is in range and not at the right index, swap it into place.',
      'After cyclic sort: scan left to right. The first index i where nums[i] !== i is the answer. If all match, the missing number is n.',
    ],
    tags: ['cyclic sort', 'math', 'XOR', 'arrays'],
    starterCode: {
      js: `function missingNumber(nums) {

}

console.log(missingNumber([3,0,1]));              // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8
console.log(missingNumber([0,1]));                // 2
`,
      typescript: `function missingNumber(nums: number[]): number {
    return -1;
}

console.log(missingNumber([3,0,1]));              // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8
`,
      python: `def missing_number(nums):
    pass

print(missing_number([3,0,1]))              # 2
print(missing_number([9,6,4,2,3,5,7,0,1])) # 8
print(missing_number([0,1]))               # 2
`,
    },
  },

  {
    id: 'coding-37',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Cyclic Sort',
    title: 'Find All Duplicates in an Array',
    functionName: 'findDuplicates',
    testCases: [
      { desc: 'two duplicates',    args: [[4,3,2,7,8,2,3,1]], expected: [2,3], sortResult: true },
      { desc: 'one duplicate',     args: [[1,1,2]],            expected: [1] },
      { desc: 'no duplicates',     args: [[1,2,3]],            expected: [] },
      { desc: 'all duplicates',    args: [[2,2,1,1]],          expected: [1,2], sortResult: true },
    ],
    prompt: `Given an integer array nums of length n where all integers are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appear twice.

You must use O(1) extra space and O(n) runtime — no hash map allowed.

Example:
  nums = [4,3,2,7,8,2,3,1]  →  [2,3]
  nums = [1,1,2]             →  [1]

Cyclic Sort approach:
  - Integers are in [1, n], so the correct index for value v is index v-1.
  - Place each number at its correct index by swapping. If nums[i] is already at the right place OR the correct spot has the same value (a duplicate is trying to go there), stop swapping for that position.
  - After the sort, any index i where nums[i] !== i+1 holds a duplicate.

Alternative O(n) space approach: use a frequency map or set (simpler but uses extra space).`,
    hints: [
      'Cyclic sort: while nums[i] !== i+1, check nums[nums[i]-1]. If it already equals nums[i], you\'ve found a duplicate — stop. Otherwise swap.',
      'After sorting: iterate through the array. Wherever nums[i] !== i+1, that number is a duplicate (it couldn\'t go home because home was taken).',
      'Don\'t swap if nums[correct] === nums[i] — this would cause an infinite loop on the duplicate.',
    ],
    tags: ['cyclic sort', 'arrays', 'duplicates'],
    starterCode: {
      js: `function findDuplicates(nums) {
    const result = [];
    // cyclic sort: place each number at index nums[i]-1

    // find all positions where nums[i] !== i+1

    return result;
}

console.log(findDuplicates([4,3,2,7,8,2,3,1])); // [2,3]
console.log(findDuplicates([1,1,2]));            // [1]
`,
      typescript: `function findDuplicates(nums: number[]): number[] {
    return [];
}

console.log(findDuplicates([4,3,2,7,8,2,3,1])); // [2,3]
console.log(findDuplicates([1,1,2]));            // [1]
`,
      python: `def find_duplicates(nums):
    pass

print(find_duplicates([4,3,2,7,8,2,3,1]))  # [2,3]
print(find_duplicates([1,1,2]))            # [1]
`,
    },
  },

  // ─── Modified Binary Search practice ─────────────────────────────────────────

  {
    id: 'coding-38',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Binary Search',
    title: 'Search in Rotated Sorted Array',
    functionName: 'searchRotated',
    testCases: [
      { desc: 'target found left half',   args: [[4,5,6,7,0,1,2], 0],  expected: 4 },
      { desc: 'target found right half',  args: [[4,5,6,7,0,1,2], 4],  expected: 0 },
      { desc: 'target not present',       args: [[4,5,6,7,0,1,2], 3],  expected: -1 },
      { desc: 'single element match',     args: [[1], 1],               expected: 0 },
      { desc: 'single element no match',  args: [[1], 0],               expected: -1 },
      { desc: 'not rotated',              args: [[1,3,5,7], 5],         expected: 2 },
    ],
    prompt: `Given an integer array nums sorted in ascending order that has been rotated at an unknown pivot, and a target, return the index of the target or -1 if not found. Must be O(log n).

Example:
  nums=[4,5,6,7,0,1,2], target=0  →  4
  nums=[4,5,6,7,0,1,2], target=3  →  -1
  nums=[1,3,5], target=3          →  1

Key insight: even though the array is rotated, ONE of the two halves (left or right of mid) is always sorted. Use this to decide which half the target is in.

At each step:
  1. Check if left half [lo..mid] is sorted: nums[lo] <= nums[mid]
     - If target is in [nums[lo], nums[mid]): search left
     - Else: search right
  2. Otherwise right half [mid..hi] is sorted:
     - If target is in (nums[mid], nums[hi]]: search right
     - Else: search left`,
    hints: [
      'One of the two halves is always sorted after a rotation. Identify which half is sorted first, then check if the target falls in that sorted range.',
      'Left half is sorted if nums[lo] <= nums[mid]. Then check: nums[lo] <= target < nums[mid] to decide which side to search.',
      'Don\'t try to find the pivot first — you don\'t need it. Just apply the sorted-half logic at each binary search step.',
    ],
    tags: ['binary search', 'rotated array', 'modified binary search'],
    starterCode: {
      js: `function searchRotated(nums, target) {
    let lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (nums[mid] === target) return mid;
        // determine which half is sorted, then narrow search

    }
    return -1;
}

console.log(searchRotated([4,5,6,7,0,1,2], 0)); // 4
console.log(searchRotated([4,5,6,7,0,1,2], 3)); // -1
`,
      typescript: `function searchRotated(nums: number[], target: number): number {
    return -1;
}

console.log(searchRotated([4,5,6,7,0,1,2], 0)); // 4
console.log(searchRotated([4,5,6,7,0,1,2], 3)); // -1
`,
      python: `def search_rotated(nums, target):
    pass

print(search_rotated([4,5,6,7,0,1,2], 0))  # 4
print(search_rotated([4,5,6,7,0,1,2], 3))  # -1
`,
    },
  },

  {
    id: 'coding-39',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Binary Search',
    title: 'Find Minimum in Rotated Sorted Array',
    functionName: 'findMin',
    testCases: [
      { desc: 'rotated at 4',     args: [[3,4,5,1,2]],       expected: 1 },
      { desc: 'rotated at 1',     args: [[4,5,6,7,0,1,2]],   expected: 0 },
      { desc: 'not rotated',      args: [[1,2,3]],            expected: 1 },
      { desc: 'single element',   args: [[1]],                expected: 1 },
      { desc: 'two elements',     args: [[2,1]],              expected: 1 },
    ],
    prompt: `Given a sorted array that has been rotated between 1 and n times, find the minimum element. Must be O(log n).

Example:
  [3,4,5,1,2]     →  1   (rotated 3 times — original: [1,2,3,4,5])
  [4,5,6,7,0,1,2] →  0
  [11,13,15,17]   →  11  (rotated 4 times = original order)

Key insight: the minimum is always at the inflection point (where the array "resets" from high to low). Binary search by comparing mid to hi:

  - If nums[mid] > nums[hi]: the minimum must be in the RIGHT half (mid+1..hi) — the left side is the sorted high portion
  - If nums[mid] <= nums[hi]: the minimum is in the LEFT half (lo..mid) — we might be looking at it already
  - Keep narrowing until lo === hi — that's the minimum.`,
    hints: [
      'Compare nums[mid] to nums[hi] (not nums[lo]). If nums[mid] > nums[hi], the minimum is to the right of mid.',
      'If nums[mid] <= nums[hi], the minimum is at mid or to the left — set hi = mid (not hi = mid-1, since mid could be the answer).',
      'Loop until lo === hi. The answer is nums[lo].',
    ],
    tags: ['binary search', 'rotated array', 'modified binary search'],
    starterCode: {
      js: `function findMin(nums) {
    let lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        // compare nums[mid] to nums[hi] to decide which half has the minimum

    }
    return nums[lo];
}

console.log(findMin([3,4,5,1,2]));     // 1
console.log(findMin([4,5,6,7,0,1,2])); // 0
console.log(findMin([11,13,15,17]));   // 11
`,
      typescript: `function findMin(nums: number[]): number {
    return -1;
}

console.log(findMin([3,4,5,1,2]));     // 1
console.log(findMin([4,5,6,7,0,1,2])); // 0
`,
      python: `def find_min(nums):
    pass

print(find_min([3,4,5,1,2]))      # 1
print(find_min([4,5,6,7,0,1,2]))  # 0
print(find_min([11,13,15,17]))    # 11
`,
    },
  },

  // ─── Fast & Slow Pointers practice ───────────────────────────────────────────

  {
    id: 'coding-40',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Fast & Slow Pointers',
    title: 'Find the Duplicate Number (Floyd\'s Cycle)',
    functionName: 'findDuplicate',
    testCases: [
      { desc: 'dup is 2',  args: [[1,3,4,2,2]], expected: 2 },
      { desc: 'dup is 3',  args: [[3,1,3,4,2]], expected: 3 },
      { desc: 'dup is 1',  args: [[1,1]],        expected: 1 },
      { desc: 'dup is 1 (longer)', args: [[1,1,2]], expected: 1 },
    ],
    prompt: `Given an array nums of n+1 integers where each integer is in the range [1, n], there is exactly one duplicate number. Find it. You must not modify the array and must use only O(1) extra space.

Example:
  nums = [1,3,4,2,2]  →  2
  nums = [3,1,3,4,2]  →  3

Treat the array as a linked list where nums[i] is the "next" pointer from index i. Because there's a duplicate value, two indices point to the same index — creating a cycle.

Floyd's cycle detection:
  Phase 1: fast moves 2 steps, slow moves 1 step. They meet inside the cycle.
  Phase 2: reset slow to index 0. Move both one step at a time. Where they meet is the cycle entrance = the duplicate number.

Why does this work? The duplicate value is the entry point of the cycle, because two different "nodes" point to the same "next node."`,
    hints: [
      'Start both fast and slow at index 0. Move: slow = nums[slow], fast = nums[nums[fast]]. When they meet, end phase 1.',
      'Phase 2: keep fast where it met slow, reset slow to 0. Move both one step (slow = nums[slow], fast = nums[fast]) until they meet again.',
      'The meeting point in phase 2 is the duplicate number — it\'s the entry point of the cycle in the implicit linked list.',
    ],
    tags: ['fast and slow pointers', 'cycle detection', 'Floyd\'s algorithm', 'arrays'],
    starterCode: {
      js: `function findDuplicate(nums) {
    // Phase 1: find meeting point inside the cycle
    let slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);

    // Phase 2: find cycle entrance
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}

console.log(findDuplicate([1,3,4,2,2])); // 2
console.log(findDuplicate([3,1,3,4,2])); // 3
`,
      typescript: `function findDuplicate(nums: number[]): number {
    return -1;
}

console.log(findDuplicate([1,3,4,2,2])); // 2
console.log(findDuplicate([3,1,3,4,2])); // 3
`,
      python: `def find_duplicate(nums):
    pass

print(find_duplicate([1,3,4,2,2]))  # 2
print(find_duplicate([3,1,3,4,2]))  # 3
`,
    },
  },

  // ─── DSA Pattern Trivia (one per knowledge doc) ──────────────────────────────

  {
    id: 'trivia-24',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Sliding Window & Two Pointers: When and Why',
    prompt: `Answer each of the following:

  a) What is the sliding window pattern? What property of a problem tells you to use it?
  b) When do you use a fixed-size window vs a variable-size (shrinkable) window? Give an example of each.
  c) What is the two-pointer pattern? How does it differ from a sliding window?
  d) What is the time complexity of sliding window solutions, and why?
  e) What's the key loop invariant you maintain in a shrinkable window? (i.e., what does the window always represent?)`,
    hints: [
      'Sliding window: contiguous subarray/substring problems. Property: you can extend or shrink the window without revisiting elements — O(n) instead of O(n²) nested loops.',
      'Fixed-size: window is always exactly k elements (max sum of k elements). Variable-size: expand right, shrink left when a constraint is violated (longest substring without repeat).',
      'Two pointers: two indices moving through the same array or from both ends. Used when there\'s a sorted array or a symmetry (two-sum in sorted array, valid palindrome).',
      'O(n) — each element enters and leaves the window at most once, so despite the nested loop appearance it\'s linear.',
    ],
    followUps: [
      'How do you decide which data structure to track window contents (Set vs Map vs counter)?',
      'What is the difference between "at most K distinct chars" and "exactly K distinct chars" windows?',
    ],
    tags: ['sliding window', 'two pointers', 'algorithms', 'patterns'],
  },

  {
    id: 'trivia-25',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Trees & BSTs: Traversals, Properties, Complexity',
    prompt: `Answer each of the following:

  a) Name the four tree traversal orders (three DFS + one BFS). For a BST, which DFS order gives you sorted output?
  b) What is the difference between a binary tree and a binary search tree (BST)? What property does a BST guarantee?
  c) What are the average and worst-case time complexities for search, insert, and delete in a BST?
  d) What is a balanced BST? Why does balance matter? Name one self-balancing BST variant.
  e) When would you use BFS (level-order) over DFS on a tree? Give a problem where BFS is clearly better.`,
    hints: [
      'DFS orders: pre-order (root→left→right), in-order (left→root→right), post-order (left→right→root). In-order on a BST yields sorted output.',
      'BST property: for every node, all values in the left subtree < node.val < all values in right subtree.',
      'Average: O(log n) for balanced. Worst case (degenerate/skewed tree): O(n). Same for insert and delete.',
      'Balanced BST: height stays O(log n). AVL tree, Red-Black tree are examples. Without balance, BST degenerates to a linked list.',
    ],
    followUps: [
      'How do you serialize and deserialize a binary tree?',
      'What is the lowest common ancestor (LCA) problem and how do you solve it?',
      'How does BFS level-order traversal work iteratively?',
    ],
    tags: ['trees', 'BST', 'DFS', 'BFS', 'traversal', 'algorithms'],
  },

  {
    id: 'trivia-26',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Dynamic Programming: When to Use It and How',
    prompt: `Answer each of the following:

  a) What are the two properties a problem must have for dynamic programming to apply?
  b) What is the difference between top-down DP (memoization) and bottom-up DP (tabulation)?
  c) How do you identify the "state" in a DP problem? Walk through how you'd define the state for the longest common subsequence (LCS) problem.
  d) What is the difference between 0/1 knapsack and unbounded knapsack, and how does the DP table differ?
  e) When is greedy better than DP, and how do you know which one to reach for?`,
    hints: [
      'DP properties: (1) optimal substructure — optimal solution is built from optimal solutions to subproblems; (2) overlapping subproblems — the same subproblems are solved repeatedly.',
      'Top-down: recursive with a cache (dictionary/array). Bottom-up: build a table iteratively, usually more space-efficient.',
      'State = the minimum info needed to describe a subproblem uniquely. LCS: dp[i][j] = length of LCS of first i chars of s1 and first j chars of s2.',
      'Greedy: make the locally optimal choice at each step without backtracking. Works when greedy choice property holds (provable). DP is for when you need to try all choices.',
    ],
    followUps: [
      'How do you reduce 2D DP table to 1D? When is that possible?',
      'What is the difference between LCS and LIS (longest increasing subsequence)?',
      'How would you approach a DP problem in an interview if you\'re not sure of the recurrence?',
    ],
    tags: ['dynamic programming', 'memoization', 'tabulation', 'algorithms', 'patterns'],
  },

  {
    id: 'trivia-27',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Hash Maps: Patterns and Complexity',
    prompt: `Answer each of the following:

  a) What is the average and worst-case time complexity of get/put in a hash map? What causes the worst case?
  b) Name four common interview problem patterns that use a hash map. For each, give a one-sentence description of how the map is used.
  c) What is the difference between a hash map and a hash set? When would you use each?
  d) You need to find two numbers in an array that sum to a target. How do you solve this in O(n) with a hash map? Trace through an example.
  e) What is a frequency/count map? Give two problems where counting character or element frequencies is the key insight.`,
    hints: [
      'Average O(1) get/put. Worst case O(n) — hash collision causing all keys to land in the same bucket. Rare with good hash functions.',
      'Four patterns: (1) frequency count (element → count), (2) index map (value → index, for two-sum), (3) prefix sum map (prefix → index, for subarray sum), (4) grouping (key → list, for anagrams).',
      'Hash set: only stores keys, no values. Use it when you just need "does this exist" — O(1) membership test.',
      'Two-sum: for each num, check if (target - num) is already in the map. If yes, return the pair. If no, store num → index.',
    ],
    followUps: [
      'How would you find all anagrams of a pattern in a string using a hash map?',
      'What is a prefix sum and how do you combine it with a hash map to find subarrays with a given sum?',
    ],
    tags: ['hash map', 'hash set', 'frequency count', 'algorithms', 'patterns'],
  },

  {
    id: 'trivia-28',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Heaps, Stacks, and Queues: When to Use Each',
    prompt: `Answer each of the following:

  a) What is a min-heap / max-heap? What is the time complexity of insert and extract-min/max?
  b) When would you use a heap in a coding problem? Name three classic problem types where a heap is the right tool.
  c) What is the difference between a stack (LIFO) and a queue (FIFO)? Give one classic interview problem for each.
  d) What is a deque (double-ended queue)? What is the sliding window maximum problem and why does a deque solve it efficiently?
  e) Python has heapq which is a min-heap. How do you simulate a max-heap using heapq?`,
    hints: [
      'Heap: insert O(log n), extract-min/max O(log n), peek O(1). Backed by an array — parent at i, children at 2i+1 and 2i+2.',
      'Three heap use cases: (1) top-K elements (maintain a heap of size K), (2) merge K sorted lists (min-heap of (val, listIndex)), (3) scheduling/median maintenance (two heaps — min and max).',
      'Stack classics: valid parentheses, daily temperatures, min stack. Queue classics: BFS traversal, task scheduling.',
      'Python max-heap trick: negate values. Push -val to heapq. Popping gives the largest original value.',
    ],
    followUps: [
      'What is the time complexity of building a heap from n elements using heapify?',
      'How do you find the median of a data stream using two heaps?',
      'What is a monotonic deque and what problem does it solve?',
    ],
    tags: ['heap', 'stack', 'queue', 'deque', 'priority queue', 'algorithms', 'patterns'],
  },

  {
    id: 'trivia-29',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Monotonic Stack: Pattern and Problems',
    prompt: `Answer each of the following:

  a) What is a monotonic stack? What does "monotonically increasing" vs "monotonically decreasing" mean in this context?
  b) What is the "next greater element" problem? How does a monotonic stack solve it in O(n) instead of O(n²)?
  c) What property of a problem tells you to reach for a monotonic stack?
  d) Explain how you'd solve "largest rectangle in histogram" using a monotonic stack. What does the stack store and when do you pop?
  e) What is the difference between the "next greater element" and "previous smaller element" patterns?`,
    hints: [
      'Monotonic stack: elements in the stack are always in increasing (or decreasing) order. You pop elements that violate the ordering when pushing a new one.',
      'Next greater element: iterate left to right. Push index onto stack. When a new element is larger than stack top, pop and that element is the "next greater" for the popped index.',
      'Signal: "for each element, find the nearest element to the left/right that is larger/smaller." Any problem involving spans, widths, or "how far does this element dominate."',
      'Histogram: stack stores indices. Pop when current bar is shorter than top. Width = current index - (new top index + 1). Area = popped bar height × width.',
    ],
    followUps: [
      'How would you solve "trapping rain water" using a monotonic stack?',
      'Is a monotonic stack the same as a monotonic queue/deque? When would you use a deque instead?',
    ],
    tags: ['monotonic stack', 'stack', 'algorithms', 'patterns'],
  },

  {
    id: 'trivia-30',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Tries: Structure, Operations, and Use Cases',
    prompt: `Answer each of the following:

  a) What is a trie (prefix tree)? Describe its structure and how words are stored in it.
  b) What is the time complexity of insert and search in a trie? How does it compare to a hash map for string lookups?
  c) What problems is a trie specifically better at than a hash map?
  d) How does the "starts with" / prefix search operation work in a trie?
  e) What are the space tradeoffs of a trie vs a hash set of strings?`,
    hints: [
      'Trie: tree where each node represents a character. Path from root to a node spells out a prefix. Leaf nodes (or nodes with isEnd=True) mark complete words.',
      'Insert/search: O(m) where m = length of word. Same as hash map for exact lookup, but trie additionally supports prefix queries efficiently.',
      'Trie beats hash map for: prefix/autocomplete queries, finding all words with a common prefix, word validation in a dictionary, IP routing (binary trie).',
      'Space: trie can use more memory than a hash set because each character is a separate node. A compressed trie (radix tree) mitigates this.',
    ],
    followUps: [
      'How would you implement autocomplete (return all words with a given prefix)?',
      'What is a compressed trie / PATRICIA trie and when would you use one?',
      'How do you implement delete in a trie?',
    ],
    tags: ['trie', 'prefix tree', 'algorithms', 'data structures'],
  },

  {
    id: 'trivia-31',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Union Find (Disjoint Set Union): Operations and Applications',
    prompt: `Answer each of the following:

  a) What is the Union Find (DSU) data structure? What two operations does it support?
  b) What is path compression and why does it matter for performance?
  c) What is union by rank (or union by size)? How does it work and what does it guarantee?
  d) With both path compression and union by rank, what is the amortized time complexity of union and find?
  e) Name two classic coding problems where Union Find is the right tool and explain why.`,
    hints: [
      'Union Find: tracks which elements belong to the same component (set). Operations: find(x) returns the root/representative of x\'s set; union(x, y) merges the sets containing x and y.',
      'Path compression: during find(), make every node on the path point directly to the root. Flattens the tree so future finds are O(1).',
      'Union by rank: always attach the smaller tree under the root of the taller tree. Prevents degenerate tall trees.',
      'With both: effectively O(α(n)) — inverse Ackermann function, practically constant for all n.',
    ],
    followUps: [
      'How do you detect a cycle in an undirected graph using Union Find?',
      'How would you count connected components using Union Find?',
      'What is the difference between Union Find and BFS/DFS for connectivity queries?',
    ],
    tags: ['union find', 'disjoint set', 'connected components', 'algorithms', 'data structures'],
  },

  {
    id: 'trivia-32',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Greedy Algorithms: When They Work and Why',
    prompt: `Answer each of the following:

  a) What is a greedy algorithm? What two conditions must hold for greedy to produce an optimal solution?
  b) How do you prove a greedy algorithm is correct? What is the "exchange argument"?
  c) For the interval scheduling problem (maximize number of non-overlapping intervals), what is the greedy choice? Why does it work?
  d) Distinguish: greedy vs dynamic programming. Give an example where greedy fails but DP succeeds.
  e) What is the two-pass greedy pattern? Give a problem where you scan left-to-right and then right-to-left to compute a result.`,
    hints: [
      'Greedy conditions: (1) greedy choice property — a globally optimal solution can be built by making the locally optimal choice; (2) optimal substructure — the remaining problem after a greedy choice is also optimal.',
      'Exchange argument: assume an optimal solution doesn\'t make the greedy choice. Show you can "exchange" to use the greedy choice without making the solution worse.',
      'Interval scheduling: always pick the interval that ends earliest. Leaves the most room for remaining intervals.',
      'Greedy vs DP: coin change with arbitrary denominations — greedy (always pick largest) fails. DP tries all choices. Greedy works for canonical coin sets (US coins).',
    ],
    followUps: [
      'What is the activity selection problem and how does it relate to interval scheduling?',
      'How does Huffman coding use a greedy approach?',
      'How would you solve the "gas station" problem with a greedy approach?',
    ],
    tags: ['greedy', 'algorithms', 'interval scheduling', 'exchange argument', 'patterns'],
  },

  // ─── AWS ────────────────────────────────────────────────────────────────────

  {
    id: 'trivia-19',
    category: 'trivia',
    difficulty: 'medium',
    title: 'AWS Compute: Lambda vs EC2 vs ECS',
    prompt: `Explain the tradeoffs between Lambda, EC2, and ECS/Fargate. For each scenario, which would you choose and why?

  a) A REST API handling 0–500k requests/day with unpredictable spikes
  b) A video transcoding job that takes up to 45 minutes per file
  c) A microservice that maintains a warm WebSocket connection with thousands of clients
  d) A nightly batch job that processes 10 GB of data from S3

Cover: cold starts, max runtime, state, scaling model, cost characteristics, and operational overhead.`,
    hints: [
      'Lambda: 15-min max runtime, event-driven, auto-scales, charges per invocation+duration. Cold start mitigated with provisioned concurrency.',
      'EC2: full VM, unlimited runtime, you manage scaling/patching. Good for stateful workloads or specific OS-level config.',
      'ECS/Fargate: containerized, no server management. Fargate removes the EC2 layer entirely — you only define the container.',
    ],
    followUps: [
      'What is a Lambda cold start and how do you mitigate it?',
      'What is ECS Fargate and how does it differ from ECS on EC2?',
      'When would you use EKS instead of ECS?',
    ],
    tags: ['AWS', 'Lambda', 'EC2', 'ECS', 'compute', 'serverless'],
  },

  {
    id: 'trivia-20',
    category: 'trivia',
    difficulty: 'medium',
    title: 'AWS Messaging: SQS vs SNS vs EventBridge vs Kinesis',
    prompt: `Compare SQS, SNS, EventBridge, and Kinesis. Explain when to use each.

Then describe how you'd implement each pattern:

  a) An order service where placing an order must trigger both a shipping service and a notification service independently
  b) A high-throughput clickstream pipeline needing multiple independent consumers with replay capability
  c) A simple background job queue where uploaded files are processed one at a time
  d) Cross-service event routing where different event types go to different targets based on content

Cover: delivery model (push vs pull), consumer model, retention, ordering, and replay.`,
    hints: [
      'SQS: pull-based queue, one consumer per message, up to 14-day retention. FIFO for ordered/exactly-once.',
      'SNS: push-based pub/sub, fan-out to multiple subscribers simultaneously. No retention.',
      'EventBridge: event bus with routing rules. Filter by event content and route to different targets.',
      'Kinesis: ordered, replayable stream. Multiple consumers read independently. Up to 7-day retention.',
    ],
    followUps: [
      'What is a DLQ (Dead Letter Queue) and when would you use one?',
      'What is the difference between SQS Standard and SQS FIFO?',
      'How would you implement fan-out using SNS + SQS?',
    ],
    tags: ['AWS', 'SQS', 'SNS', 'EventBridge', 'Kinesis', 'messaging', 'event-driven'],
  },

  {
    id: 'trivia-21',
    category: 'trivia',
    difficulty: 'medium',
    title: 'AWS DynamoDB: Partition Keys, GSIs, and Scaling',
    prompt: `Answer each of the following about DynamoDB:

  a) What is a partition key and why does cardinality matter? What happens if many items share the same partition key?
  b) What is a GSI? How does it differ from the table's primary key and when do you need one?
  c) You have a users table with userId as partition key. You need to query all users by email efficiently. How do you model this?
  d) What is the difference between On-Demand and Provisioned capacity modes?
  e) What are DynamoDB Streams and what can you use them for?`,
    hints: [
      'Hot partition: many requests to the same partition key → that partition hits its 3,000 RCU / 1,000 WCU limit and gets throttled.',
      'GSI: a separate index with its own partition+sort key, stored separately from the base table. Lets you query on non-primary-key attributes.',
      'Email lookup: add a GSI with email as partition key → Query on the GSI instead of a full Scan.',
      'On-demand: auto-scales instantly, pay per request. Provisioned: set RCU/WCU upfront, cheaper at steady load.',
    ],
    followUps: [
      'What is the difference between a Scan and a Query in DynamoDB?',
      'How does DynamoDB handle transactions?',
      'What is a sort key and how does it enable range queries?',
    ],
    tags: ['AWS', 'DynamoDB', 'NoSQL', 'GSI', 'partition key', 'database'],
  },

  {
    id: 'arch-9',
    category: 'architecture',
    difficulty: 'medium',
    title: 'Design a Serverless REST API on AWS',
    prompt: `Design a production-ready serverless REST API on AWS for a task management app. Requirements:

  - Only authenticated users can access their own data
  - Scales automatically with zero idle cost
  - Handles 10,000 requests/minute at peak with < 200ms p99 latency
  - Structured logging and alerting on errors

Address:
  1. The AWS services for each layer (API, auth, compute, database, observability)
  2. How authentication/authorization works end to end (tokens, validation, IAM)
  3. How you'd handle Lambda cold starts on latency-sensitive paths
  4. DynamoDB data model (partition key strategy for multi-tenant data)
  5. What you'd monitor and what alerts you'd set up
  6. One significant tradeoff and why you made it`,
    hints: [
      'Core stack: API Gateway → Lambda → DynamoDB. Auth: Cognito User Pool with a JWT authorizer on API Gateway — validation happens before Lambda is invoked.',
      'Cold start: provisioned concurrency on hot Lambdas, or use HTTP API (lower overhead than REST API). Keep Lambda package small.',
      'DynamoDB: partition key = userId (all of a user\'s tasks on one partition). Sort key = taskId for range queries. Single-table design fits this well.',
      'Monitoring: CloudWatch structured logs, alarm on Lambda error rate > 1%, alarm on p99 duration > 1000ms, alarm on throttles > 0.',
    ],
    followUps: [
      'When would you choose RDS over DynamoDB for this API?',
      'How would you handle database migrations in a serverless setup?',
      'How would you implement per-user rate limiting?',
    ],
    tags: ['AWS', 'serverless', 'Lambda', 'API Gateway', 'DynamoDB', 'system design'],
  },

  {
    id: 'arch-10',
    category: 'architecture',
    difficulty: 'medium',
    title: 'Design a Real-Time Notification System',
    prompt: `Design a notification system that:

  - Sends across multiple channels: email, SMS, push (mobile), and in-app
  - Handles 1 million notification events/day with spikes up to 10,000/minute
  - Respects user preferences (e.g. user opted out of SMS, push only)
  - Guarantees at-least-once delivery with retry logic for transient failures
  - Provides a delivery status audit trail (sent, failed, bounced)

Address:
  1. Overall architecture — how does an event become a notification across channels?
  2. How you fan out to multiple channels without coupling the producer to each provider
  3. How you handle failures (provider down, invalid number, unsubscribed user)
  4. How you enforce user preferences without blocking the hot path
  5. How you store and query delivery status at scale
  6. One tradeoff to hit the throughput target`,
    hints: [
      'Fan-out: event → SNS topic → per-channel SQS queues → channel Lambda workers (email, SMS, push each have their own queue+Lambda).',
      'User preferences: cache in Redis keyed by userId. Check before sending — cache miss falls back to DynamoDB. Never block on a DB read in the hot path.',
      'Failures: DLQ on each SQS queue after N retries. SES bounce webhook → mark address invalid in DynamoDB.',
      'Delivery status: write to DynamoDB (notificationId PK, timestamp SK). GSI on userId for per-user history.',
    ],
    followUps: [
      'How would you prevent a single event from flooding a user with duplicate notifications?',
      'How would you implement digest/batching (daily summary email)?',
      'How would you handle notification deduplication?',
    ],
    tags: ['AWS', 'SNS', 'SQS', 'system design', 'notifications', 'fan-out', 'event-driven'],
  },

  {
    id: 'arch-11',
    category: 'architecture',
    difficulty: 'hard',
    title: 'Design a URL Shortener at Scale',
    prompt: `Design a URL shortening service (like bit.ly):

  - Generates short codes for long URLs (e.g. short.ly/abc123 → a long URL)
  - 1,000 writes/second (new URLs), 100,000 reads/second (redirects)
  - Globally unique short codes
  - Custom aliases (user picks their own short code)
  - Analytics: total clicks, clicks per day, referrer breakdown
  - URLs never expire but can be soft-deleted by the owner

Address:
  1. Short code generation — uniqueness at high write throughput
  2. Data model — what you store and where
  3. Read path optimization — redirects must be < 10ms p99 globally
  4. Analytics write path — record clicks without slowing the redirect
  5. Custom alias conflict handling
  6. How you'd scale from 1 server to global scale`,
    hints: [
      'Short code generation: random base62 + uniqueness check in DB works at low scale. At high scale: pre-generate a pool of unused codes, or use auto-increment ID → base62 encode.',
      'Read path: cache hot short codes in Redis (no TTL — URLs are immutable). CDN edge caching for the most popular links.',
      'Analytics: redirect → return 302 immediately → publish click event to SQS/Kinesis → async consumer aggregates into a time-series store. Never block the redirect on analytics.',
      'Custom aliases: alias IS the short code in the same table. Check for conflict before write. Rate-limit alias creation per user.',
    ],
    followUps: [
      'How would you prevent abuse (shortening malicious URLs)?',
      'How would you implement link expiration at scale?',
      'What consistency model does your analytics system use — is that acceptable?',
    ],
    tags: ['system design', 'URL shortener', 'caching', 'Redis', 'scalability', 'analytics'],
  },

  {
    id: 'arch-12',
    category: 'architecture',
    difficulty: 'hard',
    title: 'Design a Distributed Rate Limiter',
    prompt: `Design a rate limiter that can be used across a fleet of API servers:

  - Limits each user to 1,000 requests/minute
  - Works correctly even when 50+ API server instances are running
  - P99 latency overhead of the rate limit check must be < 5ms
  - Must handle Redis failures gracefully (don't take down the API)
  - Supports both per-user and per-IP limiting

Address:
  1. Which rate limiting algorithm you'd use and why (token bucket, sliding window, fixed window, leaky bucket)
  2. How you implement it with Redis (exact data structures and commands)
  3. How you keep the latency overhead under 5ms
  4. What happens when Redis is down — fail open or fail closed, and why?
  5. How you handle Redis cluster failover and data consistency across shards
  6. How you'd expose rate limit state to clients (response headers)`,
    hints: [
      'Sliding window counter: Redis sorted set, score = timestamp. ZADD to add request, ZREMRANGEBYSCORE to drop old entries, ZCARD to count. Atomic with a Lua script.',
      'Token bucket in Redis: store (tokens, lastRefillTime) per user. On each request, compute tokens earned since last refill, cap at max, then check and deduct.',
      'Latency: use a Lua script to make the check-and-decrement atomic in a single round-trip. Use Redis pipelining to batch commands.',
      'Redis down: fail open (allow requests) is standard for rate limiting — the alternative is taking down your whole API for a cache failure.',
    ],
    followUps: [
      'How would you handle rate limiting for anonymous (unauthenticated) users?',
      'How would you implement per-endpoint rate limits (stricter limits on /login than /search)?',
      'How would you test a rate limiter for correctness under concurrent load?',
    ],
    tags: ['system design', 'rate limiting', 'Redis', 'distributed systems', 'algorithms'],
  },

  {
    id: 'arch-13',
    category: 'architecture',
    difficulty: 'hard',
    title: 'Design a Social Media Feed (News Feed System)',
    prompt: `Design the news feed for a social media platform:

  - Users follow other users. The feed shows the most recent N posts from followed users.
  - 500 million users, average user follows 200 people, posts 2 times/day
  - Feed load must be < 200ms p99
  - Newly posted content should appear in followers' feeds within 5 seconds
  - Some users are "celebrities" with 10+ million followers

Address:
  1. Push vs pull model (fan-out on write vs fan-out on read) — tradeoffs of each
  2. How you handle the "celebrity problem" (10M follower fan-out takes too long)
  3. Data model for posts, follows, and feed storage
  4. How you serve the feed fast (what's cached and where)
  5. How you handle feed ranking (chronological vs ML-ranked)
  6. How pagination works efficiently at scale`,
    hints: [
      'Fan-out on write: when a user posts, push to all followers\' feed lists (Redis sorted sets). Fast reads, slow writes — bad for celebrities.',
      'Fan-out on read: on feed request, fetch posts from all followed users\' post lists and merge. Slow reads, fast writes — bad for users following many people.',
      'Hybrid: fan-out on write for normal users. For celebrities, fan-out on read and merge at request time. Cache celebrity posts separately.',
      'Feed storage: Redis sorted set per user, score = timestamp. Trim to 800 entries. On cache miss, reconstruct from DB.',
    ],
    followUps: [
      'How would you handle a user seeing a post they already saw when paginating?',
      'How would you add a "liked by people you follow" signal to the feed?',
      'How would you A/B test a new feed ranking algorithm?',
    ],
    tags: ['system design', 'social media', 'news feed', 'caching', 'fan-out', 'scalability'],
  },

  {
    id: 'trivia-22',
    category: 'trivia',
    difficulty: 'medium',
    title: 'CAP Theorem and Consistency Models',
    prompt: `Answer the following about distributed systems consistency:

  a) State the CAP theorem. What are the three properties and why can you only guarantee two?
  b) What does "eventual consistency" mean in practice? Give a concrete example.
  c) Compare strong, eventual, and causal consistency — when would you choose each?
  d) What is the difference between availability and partition tolerance in CAP? What does it mean to "sacrifice" partition tolerance?
  e) DynamoDB offers both eventually consistent and strongly consistent reads. What is the difference, and what is the cost of strongly consistent reads?`,
    hints: [
      'CAP: Consistency (every read returns latest write), Availability (every request gets a response), Partition Tolerance (works when network splits). Can\'t guarantee all 3 simultaneously.',
      'Real choice is CP (sacrifice availability — e.g. HBase, ZooKeeper) vs AP (sacrifice strict consistency — e.g. DynamoDB, Cassandra). P is not optional in distributed systems.',
      'Eventual consistency: all nodes converge to the same value eventually. DNS record updates are a classic example.',
      'DynamoDB strongly consistent reads: double the RCU cost, reads only from the primary node. Eventually consistent reads may return slightly stale data.',
    ],
    followUps: [
      'What is the PACELC theorem and how does it extend CAP?',
      'What is read-your-writes consistency?',
      'How does optimistic locking (versioning) help with consistency?',
    ],
    tags: ['distributed systems', 'CAP theorem', 'consistency', 'system design'],
  },

  {
    id: 'trivia-23',
    category: 'trivia',
    difficulty: 'medium',
    title: 'Rate Limiting Algorithms',
    prompt: `Explain how rate limiting works in production systems:

  a) Compare: token bucket, leaky bucket, fixed window counter, sliding window log. Tradeoffs?
  b) Fixed window allows 100 req/min. A user sends 100 req at 0:59 and 100 req at 1:01. How many get through? Why is this a problem?
  c) How would you implement distributed rate limiting (across multiple API servers) using Redis?
  d) Where in the request path should rate limiting happen — client, API gateway, or application layer?
  e) Per-user vs per-IP rate limiting — when would you use each?`,
    hints: [
      'Token bucket: tokens refill at a steady rate, requests consume tokens. Allows short bursts up to bucket size. Most common in practice.',
      'Fixed window burst: 200 requests in 2 seconds straddle two 1-minute windows — both windows see 100 and allow them. Sliding window solves this.',
      'Redis sliding window: sorted set per user/IP, score = timestamp. ZADD on each request, ZREMRANGEBYSCORE to drop old entries, ZCARD to count. Lua script for atomicity.',
      'API Gateway is ideal — centralized, before business logic. Application-layer limiting is a defense-in-depth fallback.',
    ],
    followUps: [
      'How do you communicate rate limit state to clients (response headers)?',
      'What is circuit breaking and how does it relate to rate limiting?',
      'How do you test a rate limiter for correctness under concurrent load?',
    ],
    tags: ['rate limiting', 'system design', 'Redis', 'distributed systems', 'algorithms'],
  },

  // ─── Graph traversal with array-based adjacency lists ───────────────────────

  {
    id: 'coding-24',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'BFS / DFS',
    title: 'All Paths From Source to Target',
    functionName: 'allPathsSourceTarget',
    testCases: [
      { desc: 'two paths',   args: [[[1,2],[3],[3],[]]],           expected: [[0,1,3],[0,2,3]] },
      { desc: 'one path',    args: [[[1],[2],[]]],                  expected: [[0,1,2]] },
      { desc: 'four paths',  args: [[[1,2],[3],[3],[4,5],[6],[6],[]]],
        expected: [[0,1,3,4,6],[0,1,3,5,6],[0,2,3,4,6],[0,2,3,5,6]], sortResult: true },
      { desc: 'direct edge', args: [[[1],[]]],                      expected: [[0,1]] },
    ],
    prompt: `Given a directed acyclic graph (DAG) of n nodes, find all possible paths from node 0 to node n-1. Return them in any order.

The graph is given as an adjacency list: graph[i] is a list of nodes you can go to from node i.

Example:
  graph = [[1,2],[3],[3],[]]
  Paths: 0→1→3, 0→2→3
  Output: [[0,1,3],[0,2,3]]

  graph = [[4,3,1],[3,2,4],[3],[4],[]]
  Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

Use DFS with backtracking. State why memoization doesn't help here.`,
    hints: [
      'DFS with a running path array. At each node, push it to the path, recurse to each neighbor, then pop (backtrack).',
      'Base case: when current node === n-1, push a copy of the current path to results.',
      'Since it\'s a DAG (no cycles), you don\'t need a visited set — you won\'t loop forever.',
    ],
    tags: ['DFS', 'backtracking', 'graphs', 'adjacency list', 'DAG'],
    starterCode: {
      js: `function allPathsSourceTarget(graph) {
  const results = [];
  // DFS from node 0 to node graph.length - 1
}

console.log(JSON.stringify(allPathsSourceTarget([[1,2],[3],[3],[]]))); // [[0,1,3],[0,2,3]]
console.log(JSON.stringify(allPathsSourceTarget([[1],[2],[]]))); // [[0,1,2]]
`,
      typescript: `function allPathsSourceTarget(graph: number[][]): number[][] {

}

console.log(JSON.stringify(allPathsSourceTarget([[1,2],[3],[3],[]]))); // [[0,1,3],[0,2,3]]
console.log(JSON.stringify(allPathsSourceTarget([[1],[2],[]]))); // [[0,1,2]]
`,
      python: `def all_paths_source_target(graph):
    pass

print(all_paths_source_target([[1,2],[3],[3],[]]))  # [[0,1,3],[0,2,3]]
print(all_paths_source_target([[1],[2],[]]))         # [[0,1,2]]
`,
    },
  },

  {
    id: 'coding-25',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'BFS / DFS',
    title: 'Course Schedule (Cycle Detection in Directed Graph)',
    functionName: 'canFinish',
    testCases: [
      { desc: 'possible — no cycle',     args: [2, [[1,0]]],              expected: true },
      { desc: 'impossible — cycle',      args: [2, [[1,0],[0,1]]],        expected: false },
      { desc: 'no prerequisites',        args: [3, []],                   expected: true },
      { desc: 'linear chain',            args: [4, [[1,0],[2,1],[3,2]]],  expected: true },
      { desc: 'cycle in longer chain',   args: [3, [[1,0],[2,1],[0,2]]],  expected: false },
    ],
    prompt: `There are numCourses courses (0 to numCourses-1). prerequisites[i] = [a, b] means you must take course b before course a.

Return true if you can finish all courses, false if there is a cycle making it impossible.

Example:
  numCourses=2, prerequisites=[[1,0]]  →  true  (take 0 then 1)
  numCourses=2, prerequisites=[[1,0],[0,1]]  →  false  (0 needs 1, 1 needs 0 — cycle)

This is: can you topologically sort a directed graph? Equivalently: does the graph have a cycle?

Implement using either:
  a) DFS with 3-color marking (white/gray/black — unvisited/in-progress/done)
  b) Kahn's algorithm (BFS with in-degree counting)`,
    hints: [
      'Build a directed adjacency list: for [a,b], add edge b → a (b is a prerequisite of a).',
      'DFS approach: track 3 states per node — 0=unvisited, 1=visiting (in current path), 2=done. If you reach a node with state 1, there\'s a cycle.',
      'Kahn\'s BFS: start with all nodes with in-degree 0. Reduce neighbors\' in-degrees as you process. If not all nodes are processed, there\'s a cycle.',
    ],
    tags: ['BFS', 'DFS', 'topological sort', 'cycle detection', 'graphs', 'adjacency list'],
    starterCode: {
      js: `function canFinish(numCourses, prerequisites) {
  // Build adjacency list, then detect cycle via DFS or Kahn's BFS
}

console.log(canFinish(2, [[1,0]]));       // true
console.log(canFinish(2, [[1,0],[0,1]])); // false
console.log(canFinish(3, []));            // true
`,
      typescript: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {

}

console.log(canFinish(2, [[1,0]]));       // true
console.log(canFinish(2, [[1,0],[0,1]])); // false
`,
      python: `def can_finish(num_courses, prerequisites):
    pass

print(can_finish(2, [[1,0]]))        # True
print(can_finish(2, [[1,0],[0,1]]))  # False
print(can_finish(3, []))             # True
`,
    },
  },

  {
    id: 'coding-26',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'BFS / DFS',
    title: 'Rotting Oranges (Multi-Source BFS on Grid)',
    functionName: 'orangesRotting',
    testCases: [
      { desc: 'all rot in 4 minutes',  args: [[[2,1,1],[1,1,0],[0,1,1]]], expected: 4 },
      { desc: 'fresh unreachable',     args: [[[2,1,1],[0,1,1],[1,0,1]]], expected: -1 },
      { desc: 'no fresh oranges',      args: [[[0,2]]],                   expected: 0 },
      { desc: 'single fresh, instant', args: [[[2,1]]],                   expected: 1 },
      { desc: 'empty grid',            args: [[[0]]],                     expected: 0 },
      { desc: 'isolated fresh',        args: [[[1]]],                     expected: -1 },
    ],
    prompt: `You are given an m×n grid where:
  0 = empty cell
  1 = fresh orange
  2 = rotten orange

Every minute, a fresh orange adjacent (4-directionally) to a rotten orange becomes rotten. Return the minimum number of minutes until no fresh oranges remain, or -1 if it is impossible.

Example:
  [[2,1,1],
   [1,1,0],   →  4 minutes
   [0,1,1]]

  [[2,1,1],
   [0,1,1],   →  -1 (bottom-left fresh orange is unreachable)
   [1,0,1]]

This is a multi-source BFS — all rotten oranges spread simultaneously, so enqueue all of them at time=0.`,
    hints: [
      'Multi-source BFS: seed the queue with ALL rotten oranges at once (not one at a time). Each level of BFS = 1 minute.',
      'Track fresh count. Each time a fresh orange rots, decrement it. If fresh > 0 after BFS, return -1.',
      'Time elapsed = number of BFS levels processed. Be careful: if the initial queue is empty and there are fresh oranges, return -1 immediately.',
    ],
    tags: ['BFS', 'multi-source BFS', 'graphs', 'grid', 'matrix'],
    starterCode: {
      js: `function orangesRotting(grid) {
  // Multi-source BFS — seed queue with all rotten oranges at once
}

console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // 4
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])); // -1
console.log(orangesRotting([[0,2]]));                   // 0
`,
      typescript: `function orangesRotting(grid: number[][]): number {

}

console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // 4
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])); // -1
console.log(orangesRotting([[0,2]]));                   // 0
`,
      python: `from collections import deque

def oranges_rotting(grid):
    pass

print(oranges_rotting([[2,1,1],[1,1,0],[0,1,1]]))  # 4
print(oranges_rotting([[2,1,1],[0,1,1],[1,0,1]]))  # -1
print(oranges_rotting([[0,2]]))                     # 0
`,
    },
  },
];

export function getQuestions(filters = {}) {
  return QUESTIONS.filter(q => {
    if (filters.category && filters.category !== 'all' && q.category !== filters.category) return false;
    if (filters.difficulty && filters.difficulty !== 'all' && q.difficulty !== filters.difficulty) return false;
    if (filters.excludeIds?.has(q.id)) return false;
    // If a question declares suitableLanguages, only show it for those languages
    if (filters.language && q.suitableLanguages && !q.suitableLanguages.includes(filters.language)) return false;
    return true;
  });
}

export function getRandomQuestion(filters = {}) {
  const available = getQuestions(filters);
  if (!available.length) return null;
  return available[Math.floor(Math.random() * available.length)];
}
