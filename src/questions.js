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

  {
    id: 'coding-41',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Sliding Window',
    title: 'Longest Substring Without Repeating Characters',
    functionName: 'lengthOfLongestSubstring',
    testCases: [
      { desc: 'abcabcbb',        args: ['abcabcbb'], expected: 3 },
      { desc: 'all same chars',  args: ['bbbbb'],    expected: 1 },
      { desc: 'pwwkew',          args: ['pwwkew'],   expected: 3 },
      { desc: 'empty string',    args: [''],         expected: 0 },
      { desc: 'dvdf',            args: ['dvdf'],      expected: 3 },
    ],
    prompt: `Given a string s, find the length of the longest substring without repeating characters.

Example:
  "abcabcbb" -> 3   ("abc")
  "bbbbb"    -> 1   ("b")
  "pwwkew"   -> 3   ("wke")

This is the canonical variable-size sliding window. Expand the right edge; when you hit a duplicate, shrink the left edge until the window is valid again. Track the max window size seen.`,
    hints: [
      'Use a set or a map of char -> last index. Expand right; on a duplicate, advance left past the previous occurrence.',
      'Each character enters and leaves the window at most once, so the whole scan is O(n).',
      'Track the answer as right - left + 1 at every step.',
    ],
    tags: ['sliding window', 'strings', 'hash maps'],
    starterCode: {
      js: `function lengthOfLongestSubstring(s) {
  // variable-size sliding window
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3
`,
      typescript: `function lengthOfLongestSubstring(s: string): number {
  // variable-size sliding window
  return 0;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("pwwkew"));   // 3
`,
      python: `def length_of_longest_substring(s):
    # variable-size sliding window
    pass

print(length_of_longest_substring("abcabcbb"))  # 3
print(length_of_longest_substring("bbbbb"))      # 1
print(length_of_longest_substring("pwwkew"))     # 3
`,
      java: `class Solution {
    public static int lengthOfLongestSubstring(String s) {
        // variable-size sliding window
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // 3
        System.out.println(lengthOfLongestSubstring("bbbbb"));    // 1
        System.out.println(lengthOfLongestSubstring("pwwkew"));   // 3
    }
}
`,
    },
  },


  {
    id: 'coding-42',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Trees',
    title: 'Validate Binary Search Tree',
    functionName: 'isValidBST',
    treeTest: true,
    testCases: [
      { desc: '[2,1,3] valid',                args: [[2,1,3]],                 expected: true },
      { desc: '[5,1,4,null,null,3,6] invalid', args: [[5,1,4,null,null,3,6]],  expected: false },
      { desc: 'single node',                   args: [[1]],                     expected: true },
      { desc: '[5,4,6,null,null,3,7] invalid', args: [[5,4,6,null,null,3,7]],  expected: false },
    ],
    prompt: `Given the root of a binary tree, determine whether it is a valid binary search tree (BST).

A valid BST requires: for every node, ALL values in the left subtree are strictly less than the node, and ALL values in the right subtree are strictly greater. This must hold for the entire subtree, not just the immediate children.

Example:
      5
     / \
    1   4       -> false (3 and 6 are under 4, but 3 < 5 so it violates the BST property)
       / \
      3   6

The classic trap: checking only node.left < node < node.right. You must carry down a valid (min, max) range, or do an in-order traversal and verify it is strictly increasing.`,
    hints: [
      'Carry a (low, high) bound down the recursion. Left child tightens high to node.val; right child tightens low to node.val.',
      'Alternative: in-order traversal of a BST yields strictly increasing values. Track the previous value and verify each is greater.',
      'Watch the strictness: equal values are NOT allowed in a standard BST.',
    ],
    tags: ['trees', 'BST', 'DFS', 'recursion'],
    starterCode: {
      js: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function isValidBST(root) {
  // carry a (low, high) range down, or do an in-order check
}
`,
      typescript: `class TreeNode {
  val: number; left: TreeNode | null; right: TreeNode | null;
  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function isValidBST(root: TreeNode | null): boolean {
  return true;
}
`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

def is_valid_bst(root):
    # carry a (low, high) range down, or do an in-order check
    pass
`,
      java: `class Solution {
    static class TreeNode {
        int val; TreeNode left, right;
        TreeNode(int val) { this.val = val; }
        TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val; this.left = left; this.right = right;
        }
    }

    public static boolean isValidBST(TreeNode root) {
        // carry a (low, high) range down, or do an in-order check
        return true;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(2, new TreeNode(1), new TreeNode(3));
        System.out.println(isValidBST(root)); // true
    }
}
`,
    },
  },


  {
    id: 'coding-43',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Dynamic Programming',
    title: 'Coin Change (Fewest Coins)',
    functionName: 'coinChange',
    testCases: [
      { desc: 'coins [1,2,5] amount 11 -> 3',        args: [[1,2,5], 11],         expected: 3 },
      { desc: 'coins [2] amount 3 -> impossible',     args: [[2], 3],              expected: -1 },
      { desc: 'amount 0 -> 0 coins',                  args: [[1], 0],              expected: 0 },
      { desc: 'coins [1,5,11] amount 11 -> 1',        args: [[1,5,11], 11],        expected: 1 },
      { desc: 'large amount',                         args: [[186,419,83,408], 6249], expected: 20 },
    ],
    prompt: `You are given an array of coin denominations and a target amount. Return the fewest number of coins needed to make up that amount. If it cannot be made, return -1. You have an unlimited supply of each coin.

Example:
  coins = [1, 2, 5], amount = 11 -> 3   (5 + 5 + 1)
  coins = [2],       amount = 3  -> -1  (cannot make an odd amount)
  coins = [1, 5, 11], amount = 11 -> 1  (just the 11)

This is an unbounded-knapsack-style DP. Define dp[x] = fewest coins to make amount x. dp[0] = 0, everything else starts at infinity.`,
    hints: [
      'dp[x] = min over all coins c of dp[x - c] + 1, for c <= x. Initialize dp[0] = 0, rest = Infinity.',
      'A greedy "take the largest coin first" approach does NOT work in general (e.g., coins [1,3,4], amount 6).',
      'If dp[amount] is still Infinity at the end, the amount is unreachable -> return -1.',
    ],
    tags: ['dynamic programming', 'unbounded knapsack', 'arrays'],
    starterCode: {
      js: `function coinChange(coins, amount) {
  // dp[x] = fewest coins to make x
}

console.log(coinChange([1,2,5], 11)); // 3
console.log(coinChange([2], 3));       // -1
console.log(coinChange([1], 0));       // 0
`,
      typescript: `function coinChange(coins: number[], amount: number): number {
  return -1;
}

console.log(coinChange([1,2,5], 11)); // 3
console.log(coinChange([2], 3));       // -1
`,
      python: `def coin_change(coins, amount):
    # dp[x] = fewest coins to make x
    pass

print(coin_change([1,2,5], 11))  # 3
print(coin_change([2], 3))        # -1
print(coin_change([1], 0))        # 0
`,
      java: `class Solution {
    public static int coinChange(int[] coins, int amount) {
        // dp[x] = fewest coins to make x
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(coinChange(new int[]{1,2,5}, 11)); // 3
        System.out.println(coinChange(new int[]{2}, 3));       // -1
    }
}
`,
    },
  },


  {
    id: 'coding-44',
    category: 'coding',
    difficulty: 'easy',
    pattern: 'Two Pointers',
    title: 'Merge Two Sorted Arrays',
    functionName: 'mergeSortedArrays',
    testCases: [
      { desc: 'interleaved',          args: [[1,2,4],[1,3,4]], expected: [1,1,2,3,4,4] },
      { desc: 'both empty',           args: [[],[]],           expected: [] },
      { desc: 'one empty',            args: [[],[0]],          expected: [0] },
      { desc: 'other empty',          args: [[1],[]],          expected: [1] },
      { desc: 'no overlap',           args: [[1,2,3],[4,5,6]], expected: [1,2,3,4,5,6] },
    ],
    prompt: `Given two arrays that are each already sorted in ascending order, merge them into one sorted array and return it. Do it in O(n + m) using the two-pointer merge technique (the merge step of merge sort) - do NOT just concatenate and re-sort.

Example:
  [1,2,4] and [1,3,4] -> [1,1,2,3,4,4]
  []       and [0]    -> [0]

Walk a pointer through each array, always taking the smaller front element next.`,
    hints: [
      'Two pointers i and j, one per array. Compare a[i] and b[j]; push the smaller and advance that pointer.',
      'When one array is exhausted, append the rest of the other array.',
      'This is exactly the merge half of merge sort. O(n + m) time, O(n + m) output space.',
    ],
    tags: ['two pointers', 'arrays', 'sorting', 'merge'],
    starterCode: {
      js: `function mergeSortedArrays(a, b) {
  // two-pointer merge
}

console.log(mergeSortedArrays([1,2,4],[1,3,4])); // [1,1,2,3,4,4]
console.log(mergeSortedArrays([],[0]));          // [0]
`,
      typescript: `function mergeSortedArrays(a: number[], b: number[]): number[] {
  return [];
}

console.log(mergeSortedArrays([1,2,4],[1,3,4])); // [1,1,2,3,4,4]
`,
      python: `def merge_sorted_arrays(a, b):
    # two-pointer merge
    pass

print(merge_sorted_arrays([1,2,4],[1,3,4]))  # [1,1,2,3,4,4]
print(merge_sorted_arrays([],[0]))            # [0]
`,
      java: `import java.util.*;

class Solution {
    public static int[] mergeSortedArrays(int[] a, int[] b) {
        // two-pointer merge
        return new int[0];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(mergeSortedArrays(new int[]{1,2,4}, new int[]{1,3,4}))); // [1, 1, 2, 3, 4, 4]
    }
}
`,
    },
  },


  {
    id: 'coding-45',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Monotonic Stack',
    title: 'Daily Temperatures',
    functionName: 'dailyTemperatures',
    testCases: [
      { desc: 'mixed',          args: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
      { desc: 'strictly rising', args: [[30,40,50,60]],            expected: [1,1,1,0] },
      { desc: 'three rising',    args: [[30,60,90]],                expected: [1,1,0] },
      { desc: 'strictly falling', args: [[90,80,70,60]],           expected: [0,0,0,0] },
    ],
    prompt: `Given an array of daily temperatures, return an array answer where answer[i] is the number of days you have to wait after day i to get a warmer temperature. If there is no future warmer day, answer[i] = 0.

Example:
  [73,74,75,71,69,72,76,73] -> [1,1,4,2,1,1,0,0]

This is the canonical monotonic (decreasing) stack problem. Keep a stack of indices whose warmer day has not been found yet; when a warmer temperature arrives, pop everything it resolves.`,
    hints: [
      'Maintain a stack of indices with a monotonically decreasing temperature.',
      'For each day i: while the stack is non-empty and temps[i] > temps[stack.top], pop j and set answer[j] = i - j.',
      'Push i. Each index is pushed and popped at most once -> O(n).',
    ],
    tags: ['monotonic stack', 'stack', 'arrays'],
    starterCode: {
      js: `function dailyTemperatures(temps) {
  // monotonic decreasing stack of indices
}

console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // [1,1,4,2,1,1,0,0]
console.log(dailyTemperatures([30,40,50,60]));             // [1,1,1,0]
`,
      typescript: `function dailyTemperatures(temps: number[]): number[] {
  return [];
}

console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // [1,1,4,2,1,1,0,0]
`,
      python: `def daily_temperatures(temps):
    # monotonic decreasing stack of indices
    pass

print(daily_temperatures([73,74,75,71,69,72,76,73]))  # [1,1,4,2,1,1,0,0]
print(daily_temperatures([30,40,50,60]))               # [1,1,1,0]
`,
      java: `import java.util.*;

class Solution {
    public static int[] dailyTemperatures(int[] temps) {
        // monotonic decreasing stack of indices
        return new int[0];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(dailyTemperatures(new int[]{73,74,75,71,69,72,76,73}))); // [1, 1, 4, 2, 1, 1, 0, 0]
    }
}
`,
    },
  },


  {
    id: 'starter-oop',
    category: 'coding',
    difficulty: 'starter',
    pattern: 'OOP',
    teacherMode: true,
    title: 'Starter: Design an Animal Hierarchy (OOP)',
    prompt: `Design a small class hierarchy that demonstrates the four pillars of object-oriented programming.

Build:
  - A base class Animal with a name, a speak() method, and a move() method.
  - A Dog subclass that overrides speak() to return "Woof".
  - A Cat subclass that overrides speak() to return "Meow".
  - A small loop that holds a list of mixed animals and calls speak() on each - the SAME call dispatches to different behavior. That is polymorphism.

Example output:
  Rex says Woof
  Whiskers says Meow

Things to think about as you build it:
  - Encapsulation: keep the name as instance state; expose behavior through methods.
  - Inheritance: Dog and Cat reuse Animal's move() without rewriting it.
  - Polymorphism: one loop, one speak() call, many behaviors.
  - Abstraction: a caller iterating the list only needs to know "it is an Animal that can speak()".

This is not a trick problem - it is the OOP vocabulary you must be able to speak fluently and demonstrate in code.`,
    followUpQuestions: [
      "Which of the four OOP pillars does the speak() override demonstrate, and why?",
      "If Animal.speak() should never be called directly, how would you express that in your language (abstract method / raising NotImplementedError)?",
      "When would you favor composition over this inheritance hierarchy?",
    ],
    hints: [
      'Define behavior once in the base class (move) and override only what differs (speak).',
      'Polymorphism shows up when you store Dog and Cat in one list typed as Animal and call speak() uniformly.',
      'In TS/Java mark the base method/class abstract; in Python raise NotImplementedError; in JS just override it.',
    ],
    tags: ['OOP', 'inheritance', 'polymorphism', 'classes'],
    starterCode: {
      js: `class Animal {
  constructor(name) { this.name = name; }
  speak() { return "..."; }          // override in subclasses
  move()  { return this.name + " moves"; }
}

class Dog extends Animal {
  // override speak() to return "Woof"
}

class Cat extends Animal {
  // override speak() to return "Meow"
}

const animals = [new Dog("Rex"), new Cat("Whiskers")];
for (const a of animals) console.log(a.name + " says " + a.speak());
`,
      typescript: `abstract class Animal {
  constructor(public name: string) {}
  abstract speak(): string;          // each subclass must implement
  move(): string { return \`\${this.name} moves\`; }
}

class Dog extends Animal {
  // override speak() to return "Woof"
  speak(): string { return ""; }
}

class Cat extends Animal {
  // override speak() to return "Meow"
  speak(): string { return ""; }
}

const animals: Animal[] = [new Dog("Rex"), new Cat("Whiskers")];
for (const a of animals) console.log(\`\${a.name} says \${a.speak()}\`);
`,
      python: `class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        raise NotImplementedError  # override in subclasses
    def move(self):
        return f"{self.name} moves"

class Dog(Animal):
    # override speak() to return "Woof"
    pass

class Cat(Animal):
    # override speak() to return "Meow"
    pass

animals = [Dog("Rex"), Cat("Whiskers")]
for a in animals:
    print(f"{a.name} says {a.speak()}")
`,
      java: `import java.util.*;

abstract class Animal {
    protected String name;
    Animal(String name) { this.name = name; }
    abstract String speak();        // each subclass must implement
    String move() { return name + " moves"; }
}

class Dog extends Animal {
    Dog(String name) { super(name); }
    // override speak() to return "Woof"
    String speak() { return ""; }
}

class Cat extends Animal {
    Cat(String name) { super(name); }
    // override speak() to return "Meow"
    String speak() { return ""; }
}

class Solution {
    public static void main(String[] args) {
        List<Animal> animals = List.of(new Dog("Rex"), new Cat("Whiskers"));
        for (Animal a : animals) System.out.println(a.name + " says " + a.speak());
    }
}
`,
    },
  },


  {
    id: 'coding-46',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'OOP',
    title: 'Design a Parking Lot',
    classTest: true,
    className: 'ParkingLot',
    testCases: [
      {
        desc: 'park fills lowest spots and reports availability',
        constructorArgs: [3],
        steps: [
          { method: 'availableSpots', args: [], returns: 3 },
          { method: 'park', args: ['ABC-1'], returns: 0 },
          { method: 'park', args: ['ABC-2'], returns: 1 },
          { method: 'availableSpots', args: [], returns: 1 },
        ],
      },
      {
        desc: 'lot full returns -1',
        constructorArgs: [2],
        steps: [
          { method: 'park', args: ['A'], returns: 0 },
          { method: 'park', args: ['B'], returns: 1 },
          { method: 'park', args: ['C'], returns: -1 },
          { method: 'availableSpots', args: [], returns: 0 },
        ],
      },
      {
        desc: 'unpark frees the spot and is reused',
        constructorArgs: [2],
        steps: [
          { method: 'park', args: ['A'], returns: 0 },
          { method: 'park', args: ['B'], returns: 1 },
          { method: 'unpark', args: ['A'], returns: true },
          { method: 'availableSpots', args: [], returns: 1 },
          { method: 'park', args: ['C'], returns: 0 },
        ],
      },
      {
        desc: 'unpark unknown plate returns false',
        constructorArgs: [2],
        steps: [
          { method: 'unpark', args: ['NOPE'], returns: false },
          { method: 'park', args: ['A'], returns: 0 },
          { method: 'unpark', args: ['A'], returns: true },
          { method: 'unpark', args: ['A'], returns: false },
        ],
      },
    ],
    prompt: `Design a ParkingLot class.

  new ParkingLot(capacity)   - a lot with the given number of numbered spots (0..capacity-1)
  park(plate)                - park the car, return the spot number it took (the LOWEST free spot). If the lot is full, return -1.
  unpark(plate)              - remove the car. Return true if it was parked, false otherwise.
  availableSpots()           - return the count of currently free spots.

Example:
  const lot = new ParkingLot(2);
  lot.park("A")          -> 0
  lot.park("B")          -> 1
  lot.park("C")          -> -1   (full)
  lot.unpark("A")        -> true
  lot.availableSpots()   -> 1
  lot.park("C")          -> 0    (reuses spot 0)

This exercises OOP state management: pick data structures that make each operation efficient. Think about what you need to look up by plate vs. by spot.`,
    hints: [
      'Track which spots are free (a min-heap or a sorted set / boolean array) so park() always returns the lowest free spot.',
      'Keep a map plate -> spot so unpark() is O(1) and you can detect unknown plates.',
      'availableSpots() should be O(1) if you maintain a running count.',
    ],
    tags: ['OOP', 'design', 'data structures', 'classes'],
    starterCode: {
      js: `class ParkingLot {
  constructor(capacity) {
    // set up your spot tracking and plate -> spot map
  }
  park(plate) {
    // return the lowest free spot number, or -1 if full
  }
  unpark(plate) {
    // return true if removed, false if not parked
  }
  availableSpots() {
    // return count of free spots
  }
}
`,
      typescript: `class ParkingLot {
  constructor(capacity: number) {}
  park(plate: string): number { return -1; }
  unpark(plate: string): boolean { return false; }
  availableSpots(): number { return 0; }
}
`,
      python: `class ParkingLot:
    def __init__(self, capacity):
        # set up your spot tracking and plate -> spot map
        pass
    def park(self, plate):
        # return the lowest free spot number, or -1 if full
        pass
    def unpark(self, plate):
        # return True if removed, False if not parked
        pass
    def available_spots(self):
        # return count of free spots
        pass
`,
      java: `import java.util.*;

class ParkingLot {
    ParkingLot(int capacity) {}
    int park(String plate) { return -1; }
    boolean unpark(String plate) { return false; }
    int availableSpots() { return 0; }
}

class Solution {
    public static void main(String[] args) {
        ParkingLot lot = new ParkingLot(2);
        System.out.println(lot.park("A"));         // 0
        System.out.println(lot.park("B"));         // 1
        System.out.println(lot.park("C"));         // -1
        System.out.println(lot.unpark("A"));       // true
        System.out.println(lot.availableSpots());  // 1
    }
}
`,
    },
  },


  {
    id: 'coding-47',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'OOP',
    title: 'Implement a Stack Using Two Queues',
    classTest: true,
    className: 'MyStack',
    testCases: [
      {
        desc: 'push/pop LIFO order',
        constructorArgs: [],
        steps: [
          { method: 'push', args: [1] },
          { method: 'push', args: [2] },
          { method: 'top', args: [], returns: 2 },
          { method: 'pop', args: [], returns: 2 },
          { method: 'pop', args: [], returns: 1 },
          { method: 'empty', args: [], returns: true },
        ],
      },
      {
        desc: 'empty on fresh stack',
        constructorArgs: [],
        steps: [
          { method: 'empty', args: [], returns: true },
          { method: 'push', args: [42] },
          { method: 'empty', args: [], returns: false },
        ],
      },
      {
        desc: 'top does not remove',
        constructorArgs: [],
        steps: [
          { method: 'push', args: [5] },
          { method: 'push', args: [6] },
          { method: 'top', args: [], returns: 6 },
          { method: 'top', args: [], returns: 6 },
          { method: 'pop', args: [], returns: 6 },
        ],
      },
      {
        desc: 'interleaved operations',
        constructorArgs: [],
        steps: [
          { method: 'push', args: [1] },
          { method: 'pop', args: [], returns: 1 },
          { method: 'push', args: [2] },
          { method: 'push', args: [3] },
          { method: 'pop', args: [], returns: 3 },
          { method: 'top', args: [], returns: 2 },
        ],
      },
    ],
    prompt: `Implement a LIFO stack using only queue operations (push to back, pop from front, peek front, size, is-empty). You may use one or two queues internally, but the public behavior must be a stack.

  push(x)  - push x onto the stack
  pop()    - remove and return the top element
  top()    - return (without removing) the top element
  empty()  - return true if the stack is empty

Example:
  s.push(1); s.push(2);
  s.top()   -> 2
  s.pop()   -> 2
  s.empty() -> false

The trick: a queue is FIFO but a stack is LIFO. The common approach makes push O(n) (rotate the queue so the newest element is at the front) and pop/top O(1) - or the reverse. Be able to explain the trade-off.`,
    hints: [
      'One-queue approach: on push, enqueue x, then rotate the queue size-1 times so x ends up at the front. push is O(n), pop/top are O(1).',
      'Two-queue approach: keep a main queue and a helper; on pop, move all but the last element across. Decide which operation you want to be cheap.',
      'empty() is just "is the queue empty"; top() returns the front element under the one-queue scheme.',
    ],
    tags: ['OOP', 'stack', 'queue', 'data structures', 'design'],
    starterCode: {
      js: `class MyStack {
  constructor() {
    // use an array as a queue: push() to back, shift() from front
  }
  push(x) {}
  pop() {}
  top() {}
  empty() {}
}
`,
      typescript: `class MyStack {
  constructor() {}
  push(x: number): void {}
  pop(): number { return 0; }
  top(): number { return 0; }
  empty(): boolean { return true; }
}
`,
      python: `from collections import deque

class MyStack:
    def __init__(self):
        # use deque(s) as queue(s): append to back, popleft from front
        pass
    def push(self, x):
        pass
    def pop(self):
        pass
    def top(self):
        pass
    def empty(self):
        pass
`,
      java: `import java.util.*;

class MyStack {
    MyStack() {}
    void push(int x) {}
    int pop() { return 0; }
    int top() { return 0; }
    boolean empty() { return true; }
}

class Solution {
    public static void main(String[] args) {
        MyStack s = new MyStack();
        s.push(1); s.push(2);
        System.out.println(s.top());    // 2
        System.out.println(s.pop());    // 2
        System.out.println(s.empty());  // false
    }
}
`,
    },
  },


  {
    id: 'coding-48',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Hash Maps & Arrays',
    title: 'Group Anagrams (Count Groups)',
    functionName: 'countAnagramGroups',
    testCases: [
      { desc: 'classic - 3 groups',  args: [['eat','tea','tan','ate','nat','bat']], expected: 3 },
      { desc: 'single empty string', args: [['']],          expected: 1 },
      { desc: 'single char',         args: [['a']],          expected: 1 },
      { desc: 'no anagrams',         args: [['abc','def']],  expected: 2 },
      { desc: 'all anagrams',        args: [['abc','bca','cab']], expected: 1 },
    ],
    prompt: `Given an array of strings, group the anagrams together and return HOW MANY distinct anagram groups there are. Two words belong to the same group iff one is a rearrangement of the other.

Example:
  ["eat","tea","tan","ate","nat","bat"]
    groups: {eat,tea,ate}, {tan,nat}, {bat}  ->  3
  ["abc","bca","cab"] -> 1

The key insight: two words are anagrams iff their sorted characters (or 26-letter count signature) are equal. Use that canonical form as a hash-map key, then count the distinct keys.`,
    hints: [
      'Canonical key: sort the letters of each word (or build a 26-length count signature). Anagrams share the same key.',
      'Put every key into a Set (or Map) and return its size - that is the number of groups.',
      'The 26-count signature avoids the O(k log k) sort per word if performance matters.',
    ],
    tags: ['hash maps', 'strings', 'sorting', 'grouping'],
    starterCode: {
      js: `function countAnagramGroups(words) {
  // map each word to its sorted-letter key; count distinct keys
}

console.log(countAnagramGroups(["eat","tea","tan","ate","nat","bat"])); // 3
console.log(countAnagramGroups(["abc","bca","cab"]));                    // 1
`,
      typescript: `function countAnagramGroups(words: string[]): number {
  return 0;
}

console.log(countAnagramGroups(["eat","tea","tan","ate","nat","bat"])); // 3
`,
      python: `def count_anagram_groups(words):
    # map each word to its sorted-letter key; count distinct keys
    pass

print(count_anagram_groups(["eat","tea","tan","ate","nat","bat"]))  # 3
print(count_anagram_groups(["abc","bca","cab"]))                     # 1
`,
      java: `import java.util.*;

class Solution {
    public static int countAnagramGroups(String[] words) {
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(countAnagramGroups(new String[]{"eat","tea","tan","ate","nat","bat"})); // 3
        System.out.println(countAnagramGroups(new String[]{"abc","bca","cab"}));                    // 1
    }
}
`,
    },
  },


  {
    id: 'coding-49',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Arrays / Prefix',
    title: 'Product of Array Except Self',
    functionName: 'productExceptSelf',
    testCases: [
      { desc: 'basic',            args: [[1,2,3,4]],   expected: [24,12,8,6] },
      { desc: 'with a zero',      args: [[-1,1,0,-3,3]], expected: [0,0,9,0,0] },
      { desc: 'two elements',     args: [[2,3]],       expected: [3,2] },
      { desc: 'all ones',         args: [[1,1,1]],     expected: [1,1,1] },
    ],
    prompt: `Given an integer array nums, return an array answer where answer[i] is the product of all elements of nums EXCEPT nums[i]. You must do it in O(n) WITHOUT using division (so a zero anywhere does not break it).

Example:
  [1,2,3,4] -> [24,12,8,6]
  [-1,1,0,-3,3] -> [0,0,9,0,0]

The trick: answer[i] = (product of everything to the left of i) * (product of everything to the right of i). Compute prefix products in one pass, suffix products in a second pass.`,
    hints: [
      'First pass left-to-right: answer[i] = product of all elements before i (prefix).',
      'Second pass right-to-left: multiply answer[i] by the running product of all elements after i (suffix).',
      'No division needed, and it naturally handles zeros. O(n) time, O(1) extra space (besides the output).',
    ],
    tags: ['arrays', 'prefix product', 'no division'],
    starterCode: {
      js: `function productExceptSelf(nums) {
  // prefix pass then suffix pass
}

console.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]
`,
      typescript: `function productExceptSelf(nums: number[]): number[] {
  return [];
}

console.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]
`,
      python: `def product_except_self(nums):
    # prefix pass then suffix pass
    pass

print(product_except_self([1,2,3,4]))  # [24,12,8,6]
`,
      java: `import java.util.*;

class Solution {
    public static int[] productExceptSelf(int[] nums) {
        return new int[0];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(productExceptSelf(new int[]{1,2,3,4}))); // [24, 12, 8, 6]
    }
}
`,
    },
  },


  {
    id: 'coding-50',
    category: 'coding',
    difficulty: 'medium',
    pattern: 'Heaps / Top K',
    title: 'Kth Largest Element in an Array',
    functionName: 'findKthLargest',
    testCases: [
      { desc: 'k=2',                args: [[3,2,1,5,6,4], 2],         expected: 5 },
      { desc: 'k=4 with dups',      args: [[3,2,3,1,2,4,5,5,6], 4],   expected: 4 },
      { desc: 'k=1 (max)',          args: [[1], 1],                   expected: 1 },
      { desc: 'k = length (min)',   args: [[7,6,5,4,3,2,1], 7],       expected: 1 },
    ],
    prompt: `Find the kth largest element in an unsorted array. Note this is the kth largest in sorted ORDER, not the kth distinct element.

Example:
  [3,2,1,5,6,4], k=2 -> 5
  [3,2,3,1,2,4,5,5,6], k=4 -> 4

The clean approach is a size-k min-heap: keep the k largest seen so far; the heap root is the answer. That is O(n log k). (Quickselect gives O(n) average.)`,
    hints: [
      'Min-heap of size k: push each number; if the heap grows beyond k, pop the smallest. The root is the kth largest.',
      'Why a MIN-heap for the kth LARGEST? The smallest of the k largest sits at the root and is exactly the answer.',
      'Alternative: quickselect partitions around a pivot for O(n) average time, but the heap is simpler to get right.',
    ],
    tags: ['heap', 'priority queue', 'top k', 'quickselect'],
    starterCode: {
      js: `function findKthLargest(nums, k) {
  // size-k min-heap, or sort, or quickselect
}

console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5
`,
      typescript: `function findKthLargest(nums: number[], k: number): number {
  return 0;
}

console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5
`,
      python: `import heapq

def find_kth_largest(nums, k):
    # size-k min-heap, or sort, or quickselect
    pass

print(find_kth_largest([3,2,1,5,6,4], 2))  # 5
`,
      java: `import java.util.*;

class Solution {
    public static int findKthLargest(int[] nums, int k) {
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(findKthLargest(new int[]{3,2,1,5,6,4}, 2)); // 5
    }
}
`,
    },
  },


  {
    id: "arch-14",
    category: 'architecture',
    difficulty: "hard",
    title: "Design a Chat System (WhatsApp-like)",
    prompt: "Design the following system.\n\nRequirements:\n  - 1-on-1 and group messaging, up to 500 members per group\n  - Online/offline presence and last-seen\n  - Delivery + read receipts (sent / delivered / read)\n  - Message history synced across a user's devices\n  - ~50M daily active users, billions of messages/day\n  - Media attachments (images, short video)\n  - End-to-end latency under ~500ms for online users\n\nAddress:\n  - Connection model: persistent WebSocket vs long-poll, and how you route a message to the recipient's connection\n  - Message storage and fan-out for large groups (write fan-out vs read fan-out)\n  - Presence tracking at scale without hammering the DB\n  - How offline delivery and multi-device sync work\n  - How you guarantee ordering and at-least-once delivery",
    hints: [
      "Persistent connections need a way to find which server holds a given user's socket - think a connection/session registry.",
      "Group fan-out is the scaling pain point: 500 members x billions of messages. Compare fan-out-on-write vs fan-out-on-read.",
      "Presence is high-write, low-value data - consider a TTL heartbeat in an in-memory store rather than durable writes.",
    ],
    tags: ["system design", "chat", "websockets", "messaging", "real-time", "fan-out"],
  },


  {
    id: "arch-15",
    category: 'architecture',
    difficulty: "hard",
    title: "Design a Video Streaming Platform (YouTube)",
    prompt: "Design the following system.\n\nRequirements:\n  - Upload, transcode, and stream video to a global audience\n  - Adaptive bitrate streaming on flaky networks\n  - Billions of views/day; long-tail + viral spikes\n  - View counts, likes, comments\n  - Recommendations on the home feed\n  - Store petabytes of video durably\n\nAddress:\n  - Upload + transcoding pipeline (multiple resolutions/codecs) and why it is async\n  - How adaptive bitrate streaming works (HLS/DASH, chunking, manifests)\n  - CDN strategy for global delivery and cache warming for viral videos\n  - Metadata storage vs blob storage separation\n  - How you count views at massive scale (approximate vs exact)",
    hints: [
      "Transcoding is CPU-heavy and async: upload -> queue -> transcode to a ladder of bitrates -> store -> publish.",
      "ABR splits each rendition into small segments and a manifest; the client picks a bitrate per segment based on bandwidth.",
      "The CDN does the heavy lifting for delivery; origin should rarely be hit. Think about cache hit ratio and eviction.",
    ],
    tags: ["system design", "video", "streaming", "CDN", "transcoding", "adaptive bitrate"],
  },


  {
    id: "arch-16",
    category: 'architecture',
    difficulty: "hard",
    title: "Design a Distributed File Storage System (Dropbox)",
    prompt: "Design the following system.\n\nRequirements:\n  - Upload/download files, sync across a user's devices\n  - File versioning and conflict resolution\n  - Share files/folders with other users\n  - Efficient sync of large files that changed slightly\n  - Petabyte scale, strong durability\n  - Offline edits that reconcile on reconnect\n\nAddress:\n  - Chunking + content-addressed storage and how it enables dedup and delta sync\n  - Sync protocol: how a client learns what changed (metadata service vs polling)\n  - Conflict resolution when two devices edit the same file offline\n  - Metadata vs block storage separation and consistency between them\n  - How you achieve durability (replication / erasure coding)",
    hints: [
      "Split files into content-hashed chunks: only changed chunks are uploaded (delta sync) and identical chunks are deduplicated.",
      "Separate a metadata service (file tree, versions, chunk lists) from a block store (the actual bytes).",
      "Conflicts: last-writer-wins is simplest but lossy; consider keeping both versions (conflicted copy) like real Dropbox does.",
    ],
    tags: ["system design", "storage", "sync", "chunking", "deduplication", "durability"],
  },


  {
    id: "arch-17",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Search Autocomplete System",
    prompt: "Design the following system.\n\nRequirements:\n  - Suggest top completions as the user types each keystroke\n  - Rank suggestions by popularity/frequency\n  - Sub-100ms response per keystroke\n  - Tens of millions of queries/day\n  - Suggestions update as trends change (daily is fine)\n  - Handle typos gracefully (optional stretch)\n\nAddress:\n  - Data structure for prefix lookup (trie) and how you attach top-k to each node\n  - How you precompute and cache top-k completions to hit the latency target\n  - How the suggestion data is built/updated from query logs (batch pipeline)\n  - Sharding the trie across the keyspace\n  - Client-side vs server-side debouncing of keystrokes",
    hints: [
      "A trie gives prefix matching; store the top-k completions at each node (or use a separate ranked store) so you do not traverse the whole subtree per keystroke.",
      "This is read-heavy and latency-critical: precompute and cache aggressively; the update path can be a slow batch job.",
      "Debounce keystrokes on the client and cap results to top ~10 to keep payloads tiny.",
    ],
    tags: ["system design", "autocomplete", "trie", "caching", "search", "top-k"],
  },


  {
    id: "arch-18",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Notification Service (push, email, SMS)",
    prompt: "Design the following system.\n\nRequirements:\n  - Send notifications across channels: push, email, SMS, in-app\n  - Per-user channel preferences and opt-outs\n  - Templating and localization\n  - Rate limiting / batching to avoid spamming users\n  - Millions of notifications/day with retries\n  - Track delivery status\n\nAddress:\n  - How you decouple producers from channel delivery (queue + workers per channel)\n  - Handling third-party provider failures and retries (idempotency, dead-letter queue)\n  - Respecting user preferences and quiet hours\n  - Templating/localization pipeline\n  - Deduplication so the same event does not notify twice",
    hints: [
      "A message queue between producers and per-channel workers gives buffering, retries, and isolation between channels.",
      "Provider calls are unreliable: retry with backoff, use idempotency keys, and route permanent failures to a dead-letter queue.",
      "Preference checks and dedup should happen before you fan out to channels.",
    ],
    tags: ["system design", "notifications", "message queue", "push", "email", "SMS"],
  },


  {
    id: "arch-19",
    category: 'architecture',
    difficulty: "hard",
    title: "Design a Content Delivery Network (CDN)",
    prompt: "Design the following system.\n\nRequirements:\n  - Cache and serve static assets close to users globally\n  - High cache hit ratio; low origin load\n  - Cache invalidation / purge of stale content\n  - Handle origin failures gracefully\n  - Support large objects (video segments) and small (images, CSS)\n  - TLS termination at the edge\n\nAddress:\n  - Edge cache hierarchy (edge -> regional -> origin) and request routing (anycast / GeoDNS)\n  - Cache key design, TTLs, and cache-control header handling\n  - Invalidation strategies (purge, versioned URLs, soft TTL + revalidate)\n  - Handling cache misses and the thundering-herd / cache stampede problem\n  - Consistency vs freshness trade-offs",
    hints: [
      "Route users to the nearest edge with anycast or GeoDNS; a tiered cache reduces origin hits further.",
      "Prefer versioned/fingerprinted URLs (style.abc123.css) over purges - they are immutable and cache forever.",
      "Guard against stampedes on miss with request coalescing / a short lock so only one request fetches from origin.",
    ],
    tags: ["system design", "CDN", "caching", "edge", "invalidation", "geo-routing"],
  },


  {
    id: "arch-20",
    category: 'architecture',
    difficulty: "hard",
    title: "Design a Distributed Cache (Redis-like)",
    prompt: "Design the following system.\n\nRequirements:\n  - In-memory key-value cache with get/set/expire\n  - Horizontal scale beyond one node's memory\n  - Handle node failures without losing the whole cache\n  - Eviction when memory is full\n  - Optional persistence/replication\n  - Low single-digit-ms latency\n\nAddress:\n  - Data partitioning across nodes (consistent hashing) and how you minimize reshuffling on add/remove\n  - Replication for availability and the consistency trade-off\n  - Eviction policies (LRU/LFU/TTL) and how you implement them efficiently\n  - Handling hot keys and the thundering herd on miss\n  - Client routing: client-side hashing vs a proxy",
    hints: [
      "Consistent hashing with virtual nodes keeps key movement small when a node joins/leaves.",
      "Eviction: an approximate LRU (sampling) is cheaper than exact LRU at scale; combine with TTLs.",
      "Hot keys can overwhelm one shard - consider client-side caching or replicating the hot key.",
    ],
    tags: ["system design", "cache", "consistent hashing", "redis", "eviction", "partitioning"],
  },


  {
    id: "arch-21",
    category: 'architecture',
    difficulty: "hard",
    title: "Design a Payment Processing System",
    prompt: "Design the following system.\n\nRequirements:\n  - Charge cards, handle refunds, track transaction state\n  - Exactly-once charging - never double-charge on retry\n  - Integrate multiple payment providers\n  - Strong auditability and consistency\n  - PCI compliance considerations\n  - Reconciliation with provider settlement reports\n\nAddress:\n  - Idempotency: how you guarantee a retried charge does not double-charge\n  - Transaction state machine (pending -> authorized -> captured -> settled / failed / refunded)\n  - Consistency model - why payments lean toward strong consistency\n  - Handling provider timeouts where you do not know if the charge succeeded\n  - Auditing and reconciliation",
    hints: [
      "Idempotency keys are the heart of this: store key -> result; a retry returns the stored result instead of re-charging.",
      "Model the payment as an explicit state machine and persist every transition for auditability.",
      "On a provider timeout you are in an unknown state - reconcile via a status query or webhook before retrying.",
    ],
    tags: ["system design", "payments", "idempotency", "consistency", "state machine", "transactions"],
  },


  {
    id: "arch-22",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Hotel Reservation System",
    prompt: "Design the following system.\n\nRequirements:\n  - Search availability by date range and location\n  - Book a room and prevent double-booking\n  - Handle cancellations and modifications\n  - Pricing that varies by date\n  - Thousands of hotels, high read volume\n  - Hold a room briefly during checkout\n\nAddress:\n  - Modeling inventory and availability over date ranges\n  - Preventing double-booking under concurrent requests (locking / atomic reservation)\n  - Read-heavy search vs write-consistent booking - splitting the two paths\n  - Temporary holds during checkout and how they expire\n  - Caching search results vs keeping availability fresh",
    hints: [
      "Double-booking is the core concurrency problem: use an atomic conditional update / row lock / reservation row so two bookings cannot claim the same room-night.",
      "Search is read-heavy and can tolerate slight staleness (cache it); the booking write path needs strong consistency.",
      "Holds can be a short-TTL reservation that auto-expires if checkout is not completed.",
    ],
    tags: ["system design", "reservations", "concurrency", "inventory", "double-booking"],
  },


  {
    id: "arch-23",
    category: 'architecture',
    difficulty: "hard",
    title: "Design a Ride-Sharing Service (Uber)",
    prompt: "Design the following system.\n\nRequirements:\n  - Match riders with nearby drivers in real time\n  - Live driver location updates and ETAs\n  - Surge pricing under high demand\n  - Trip lifecycle: request -> match -> pickup -> dropoff -> pay\n  - Millions of location updates/sec at peak\n  - Map/routing for ETAs\n\nAddress:\n  - Geospatial indexing for \"nearby drivers\" (geohash / quadtree / S2 cells)\n  - Ingesting high-frequency location updates without overwhelming storage\n  - The matching algorithm and how you avoid matching the same driver twice\n  - Surge pricing computation by region\n  - Trip state management and payment at the end",
    hints: [
      "Index driver locations by geospatial cell (geohash/S2) so \"nearby\" is a cheap cell lookup rather than a full scan.",
      "Location updates are massive write volume - keep current location in an in-memory store; you rarely need full history.",
      "Matching must be atomic so one driver is not offered two rides simultaneously.",
    ],
    tags: ["system design", "ride-sharing", "geospatial", "matching", "real-time", "surge pricing"],
  },


  {
    id: "arch-24",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Web Crawler",
    prompt: "Design the following system.\n\nRequirements:\n  - Crawl billions of web pages politely\n  - Respect robots.txt and per-domain rate limits\n  - Avoid re-crawling unchanged pages too often\n  - Detect and skip duplicate content\n  - Distributed across many workers\n  - Be resilient to slow/malicious sites\n\nAddress:\n  - The crawl frontier (URL queue) design and prioritization\n  - Politeness: per-domain rate limiting and robots.txt handling\n  - Deduplication of URLs and of page content (hashing / shingling)\n  - Distributing work across crawlers without overlap\n  - Detecting crawler traps and dead ends",
    hints: [
      "The frontier is a prioritized queue; politeness means per-domain queues with delays, not one global firehose.",
      "Dedup URLs with a seen-set (bloom filter at scale) and dedup content with a hash/fingerprint of the page body.",
      "Partition domains across workers so two crawlers do not hammer the same site.",
    ],
    tags: ["system design", "web crawler", "frontier", "dedup", "bloom filter", "politeness"],
  },


  {
    id: "arch-25",
    category: 'architecture',
    difficulty: "hard",
    title: "Design an Ad Click Aggregation System",
    prompt: "Design the following system.\n\nRequirements:\n  - Ingest billions of ad-click events/day\n  - Aggregate clicks by ad/campaign over time windows\n  - Near-real-time dashboards (seconds to minutes)\n  - Accurate billing - clicks map to charges\n  - Detect and filter click fraud\n  - Replayable / correctable aggregates\n\nAddress:\n  - Streaming ingestion pipeline (event -> queue -> stream processor -> store)\n  - Windowed aggregation and handling late/out-of-order events\n  - Exactly-once vs at-least-once for billing accuracy\n  - Hot-partition / hot-campaign skew\n  - How you support both real-time and corrected batch numbers (lambda/kappa)",
    hints: [
      "This is a streaming aggregation problem: Kafka -> stream processor (windowed counts) -> OLAP store.",
      "Late events break naive windows - use event-time windows with watermarks and allowed lateness.",
      "Billing wants accuracy, so reconcile the fast streaming numbers with a slower exact batch recompute.",
    ],
    tags: ["system design", "streaming", "aggregation", "kafka", "windowing", "ad-tech"],
  },


  {
    id: "arch-26",
    category: 'architecture',
    difficulty: "hard",
    title: "Design a Stock Exchange",
    prompt: "Design the following system.\n\nRequirements:\n  - Accept buy/sell orders and match them\n  - Maintain an order book per symbol with price-time priority\n  - Extremely low, predictable latency\n  - Strict correctness and fairness\n  - Market data feed to subscribers\n  - Durability/audit of every order\n\nAddress:\n  - The matching engine and order book data structure (price-time priority)\n  - Why a single-threaded per-symbol matcher is often used (determinism)\n  - Sequencing/ordering of incoming orders for fairness\n  - Market-data fan-out to many subscribers\n  - Durability and recovery without sacrificing latency",
    hints: [
      "Order book: two sorted structures (bids descending, asks ascending) with FIFO at each price level for time priority.",
      "A single-threaded matcher per symbol gives deterministic, fair ordering and avoids lock contention; scale by sharding symbols.",
      "Persist a sequenced log of orders so you can replay/recover the exact book state.",
    ],
    tags: ["system design", "stock exchange", "matching engine", "order book", "low latency", "fairness"],
  },


  {
    id: "arch-27",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Gaming Leaderboard",
    prompt: "Design the following system.\n\nRequirements:\n  - Real-time top-N leaderboard by score\n  - Get a player's rank quickly\n  - Millions of players, frequent score updates\n  - Global and per-region/per-friend leaderboards\n  - Handle ties consistently\n  - Time-windowed boards (daily/weekly)\n\nAddress:\n  - Data structure for ranking (sorted set) and the cost of rank queries\n  - How you get a single player's rank without scanning everyone\n  - Sharding/partitioning when one sorted set is too big\n  - Time-windowed leaderboards and resets\n  - Caching the hot top-N",
    hints: [
      "A sorted set (e.g., Redis ZSET) gives O(log n) updates and O(log n) rank lookups - the natural fit.",
      "Top-N is a cheap range query; a single player's rank uses the sorted set's rank operation.",
      "For huge populations, shard by bucket/region and merge, or approximate exact rank below the top tiers.",
    ],
    tags: ["system design", "leaderboard", "sorted set", "ranking", "redis", "real-time"],
  },


  {
    id: "arch-28",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Proximity Service (Yelp / nearby places)",
    prompt: "Design the following system.\n\nRequirements:\n  - Find businesses within a radius of a location\n  - Filter by category/rating\n  - Low-latency \"near me\" queries\n  - Tens of millions of places, heavy reads\n  - Place data updates infrequently\n  - Pagination of results\n\nAddress:\n  - Geospatial indexing approach (geohash vs quadtree vs S2) and the trade-offs\n  - How a radius query maps to index lookups (neighboring cells)\n  - Read-heavy caching strategy\n  - Handling dense areas (cities) vs sparse areas\n  - Keeping place data fresh",
    hints: [
      "Geohash/S2 turns \"within radius\" into \"look up these cells plus neighbors\" - much cheaper than scanning all places.",
      "Quadtrees adapt to density (split crowded regions further) where fixed grids do not.",
      "This is read-dominant and data is fairly static, so cache aggressively.",
    ],
    tags: ["system design", "geospatial", "geohash", "quadtree", "proximity", "search"],
  },


  {
    id: "arch-29",
    category: 'architecture',
    difficulty: "hard",
    title: "Design a Distributed Message Queue (Kafka-like)",
    prompt: "Design the following system.\n\nRequirements:\n  - Durable, ordered, replayable message log\n  - Topics partitioned for parallelism\n  - At-least-once delivery; consumers track offsets\n  - High throughput, horizontal scale\n  - Survive broker failures\n  - Multiple independent consumer groups\n\nAddress:\n  - Partitioning and ordering guarantees (order within a partition, not across)\n  - Replication of partitions for durability (leader/follower, ISR)\n  - Consumer offset tracking and consumer-group rebalancing\n  - Delivery semantics: at-least-once vs exactly-once\n  - Retention and compaction of the log",
    hints: [
      "Order is only guaranteed within a partition; the partition key decides which partition a message lands in.",
      "Each partition has a leader and follower replicas; writes go to the leader and replicate before acknowledgment for durability.",
      "Consumers commit offsets to resume; rebalancing reassigns partitions when a consumer joins/leaves.",
    ],
    tags: ["system design", "message queue", "kafka", "partitioning", "replication", "offsets"],
  },


  {
    id: "arch-30",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Microservices API Gateway",
    prompt: "Design the following system.\n\nRequirements:\n  - Single entry point routing to many backend services\n  - Authentication and authorization at the edge\n  - Rate limiting and quotas per client\n  - Request/response transformation and aggregation\n  - TLS termination\n  - Observability (logging, tracing)\n\nAddress:\n  - Responsibilities the gateway should own vs what belongs in services\n  - Routing and service discovery integration\n  - Where auth/rate-limiting/caching live and how they are configured\n  - Avoiding the gateway becoming a bottleneck or single point of failure\n  - BFF pattern - when to have per-client gateways",
    hints: [
      "The gateway centralizes cross-cutting concerns (auth, rate limit, TLS) so services do not each reimplement them.",
      "Keep business logic OUT of the gateway - it routes and enforces policy, it does not own domain rules.",
      "Run the gateway stateless and horizontally scaled behind a load balancer so it is not a SPOF.",
    ],
    tags: ["system design", "api gateway", "microservices", "routing", "auth", "rate limiting"],
  },


  {
    id: "arch-31",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Feature Flag / Configuration System",
    prompt: "Design the following system.\n\nRequirements:\n  - Toggle features on/off without redeploy\n  - Target flags by user/segment/percentage rollout\n  - Near-instant propagation of changes\n  - Low-latency evaluation in the request path\n  - Audit who changed what\n  - Safe defaults if the config service is unreachable\n\nAddress:\n  - Flag evaluation in the request path - local cache vs remote call\n  - How flag changes propagate to all clients quickly (streaming/poll/SDK)\n  - Targeting rules and percentage rollouts (consistent bucketing)\n  - Failure mode: what happens if the config service is down\n  - Auditing and gradual rollout / kill-switch",
    hints: [
      "Evaluate flags locally from a cached ruleset so the hot path never makes a network call; refresh the cache via streaming or short polling.",
      "Percentage rollouts need consistent hashing of the user id so a user stays in the same bucket across evaluations.",
      "Always ship a safe default and last-known-good cache so a config outage does not take down the app.",
    ],
    tags: ["system design", "feature flags", "configuration", "rollout", "caching"],
  },


  {
    id: "arch-32",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Distributed Locking Service",
    prompt: "Design the following system.\n\nRequirements:\n  - Mutual exclusion across distributed processes\n  - Locks must release if the holder crashes (no deadlock)\n  - Low latency acquire/release\n  - Avoid two holders believing they own the lock\n  - Fairness (optional)\n  - Survive node failures\n\nAddress:\n  - Lock representation and the role of TTL / lease\n  - Preventing a crashed holder from holding the lock forever\n  - The split-brain / expired-lease problem and fencing tokens\n  - Consensus-backed locks (ZooKeeper/etcd) vs Redis-based (Redlock) trade-offs\n  - Reentrancy and fairness",
    hints: [
      "Locks need a TTL/lease so a crashed holder's lock auto-expires; the holder must renew before expiry.",
      "The classic danger: holder pauses (GC), lease expires, another acquires, then the first resumes - use fencing tokens (monotonic ids) so stale holders are rejected.",
      "Consensus systems (etcd/ZooKeeper) give stronger guarantees than a single Redis instance.",
    ],
    tags: ["system design", "distributed lock", "lease", "fencing", "consensus", "concurrency"],
  },


  {
    id: "arch-33",
    category: 'architecture',
    difficulty: "hard",
    title: "Design a Real-Time Collaborative Document Editor (Google Docs)",
    prompt: "Design the following system.\n\nRequirements:\n  - Multiple users edit the same document simultaneously\n  - Changes appear in near real time for all editors\n  - Convergence: everyone ends up with the same document\n  - Offline edits that merge on reconnect\n  - Cursor/presence of other users\n  - Revision history\n\nAddress:\n  - Concurrency model: Operational Transformation (OT) vs CRDTs and the trade-off\n  - How edits are broadcast and ordered among clients\n  - Convergence guarantee - why naive last-writer-wins fails for text\n  - Handling offline edits and reconnection merges\n  - Persistence and revision history",
    hints: [
      "OT transforms concurrent operations against each other; CRDTs make operations commutative so they merge without a central transform - know the difference.",
      "A server (or peer protocol) sequences/relays operations; the algorithm guarantees all replicas converge regardless of order.",
      "Naive character-position edits conflict; that is exactly why OT/CRDTs exist.",
    ],
    tags: ["system design", "collaboration", "OT", "CRDT", "real-time", "convergence"],
  },


  {
    id: "arch-34",
    category: 'architecture',
    difficulty: "hard",
    title: "Design a Recommendation Engine",
    prompt: "Design the following system.\n\nRequirements:\n  - Recommend items (videos/products) per user\n  - Mix of personalization and popularity\n  - Serve recommendations with low latency\n  - Update as user behavior changes\n  - Cold-start for new users/items\n  - Billions of user-item interactions\n\nAddress:\n  - Candidate generation vs ranking (the two-stage funnel)\n  - Collaborative filtering vs content-based vs hybrid\n  - Offline training pipeline vs online serving\n  - Cold-start strategy for new users and items\n  - Feature store and serving latency",
    hints: [
      "A two-stage funnel is standard: cheaply generate a few hundred candidates, then a heavier model ranks them.",
      "Collaborative filtering uses behavior (users like you); content-based uses item features - hybrids cover each other's gaps.",
      "Train models offline in batch; precompute embeddings/candidates and serve from a fast store to hit latency targets.",
    ],
    tags: ["system design", "recommendations", "collaborative filtering", "ranking", "ML", "cold start"],
  },


  {
    id: "arch-35",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Log Aggregation System",
    prompt: "Design the following system.\n\nRequirements:\n  - Collect logs from thousands of services/hosts\n  - Centralized search over recent and historical logs\n  - Near-real-time ingestion\n  - Retention tiers (hot/warm/cold)\n  - Handle ingestion spikes without dropping logs\n  - Alerting on patterns\n\nAddress:\n  - Ingestion pipeline (agents -> buffer/queue -> indexer -> store)\n  - Buffering to survive spikes and downstream slowness\n  - Indexing for search vs cost (full-text index is expensive)\n  - Retention tiering and archival\n  - Structured logging and correlation (trace ids)",
    hints: [
      "Agents ship logs to a buffer (Kafka) that absorbs spikes before indexing, so a slow indexer never drops data.",
      "Full-text indexing is costly - index hot/recent data, archive old data to cheap cold storage.",
      "Structured logs with trace ids make cross-service correlation possible.",
    ],
    tags: ["system design", "logging", "observability", "ingestion", "search", "retention"],
  },


  {
    id: "arch-36",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Rate Limiter",
    prompt: "Design the following system.\n\nRequirements:\n  - Limit requests per client (e.g., 100 req/min)\n  - Work across a distributed fleet of servers\n  - Low overhead in the request path\n  - Return clear throttling responses (429 + Retry-After)\n  - Support different limits per tier/endpoint\n  - Allow controlled bursts\n\nAddress:\n  - Algorithm choice: token bucket vs leaky bucket vs sliding-window counter, and the trade-offs\n  - Where state lives so the limit is enforced across all servers (shared store)\n  - Atomicity of the check-and-decrement under concurrency\n  - Handling the shared store being slow/unavailable\n  - Per-client vs global limits and burst allowance",
    hints: [
      "Token bucket allows bursts up to capacity while bounding the average rate - the most common choice. Walk through its refill math.",
      "Distributed enforcement needs shared state (e.g., Redis) with an atomic check-and-decrement (Lua script / INCR with TTL).",
      "Decide the failure mode: fail-open (allow) keeps you up but unprotected; fail-closed protects but can cause outages.",
    ],
    tags: ["system design", "rate limiting", "token bucket", "sliding window", "redis", "throttling"],
  },


  {
    id: "arch-37",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Circuit Breaker Service",
    prompt: "Design the following system.\n\nRequirements:\n  - Protect callers from a failing downstream dependency\n  - Fail fast when the dependency is unhealthy\n  - Automatically probe for recovery\n  - Per-dependency isolation\n  - Configurable thresholds\n  - Metrics on trips and recoveries\n\nAddress:\n  - The three states (closed / open / half-open) and the transitions between them\n  - What signals trip the breaker (error rate, latency, consecutive failures)\n  - How half-open probing tests recovery without a flood\n  - Combining with timeouts, retries, and bulkheads\n  - Per-dependency configuration and observability",
    hints: [
      "Closed = pass and count failures; Open = fail fast for a cooldown; Half-open = allow a trial request to test recovery.",
      "Trip on an error-rate or consecutive-failure threshold, not a single blip; latency can also trip it.",
      "Pair the breaker with timeouts and bulkheads - the breaker reacts, the timeout/bulkhead prevents resource exhaustion in the first place.",
    ],
    tags: ["system design", "circuit breaker", "resilience", "fault tolerance", "timeouts"],
  },


  {
    id: "arch-38",
    category: 'architecture',
    difficulty: "medium",
    title: "Design a Distributed Tracing System",
    prompt: "Design the following system.\n\nRequirements:\n  - Trace a request across many microservices\n  - Show where latency is spent per hop\n  - Low overhead in instrumented services\n  - Sampling to control data volume\n  - Search traces by id/service/latency\n  - Correlate with logs and metrics\n\nAddress:\n  - Trace context propagation (trace id + span id) across service boundaries\n  - The span model: parent/child spans forming a trace tree\n  - Sampling strategies (head-based vs tail-based) and why\n  - Collection pipeline and storage of spans\n  - Correlating traces with logs/metrics",
    hints: [
      "Propagate a trace id and span id in headers on every hop; each service emits spans tagged with them (OpenTelemetry standardizes this).",
      "A trace is a tree of spans; each span records start/end and parent so you can see the critical path.",
      "Sampling controls cost: head-based decides up front; tail-based keeps interesting (slow/error) traces but needs buffering.",
    ],
    tags: ["system design", "tracing", "observability", "spans", "sampling", "opentelemetry"],
  },


  {
    id: "arch-39",
    category: 'architecture',
    difficulty: "medium",
    title: "REST API Design Best Practices",
    prompt: "Design the following system.\n\nRequirements:\n  - Design a clean, consistent REST API for a resource (e.g., orders)\n  - Correct use of HTTP verbs and status codes\n  - Pagination, filtering, sorting\n  - Error response format\n  - Versioning and backward compatibility\n  - Idempotency for unsafe operations\n\nAddress:\n  - Resource modeling - nouns, nesting, and verb usage (GET/POST/PUT/PATCH/DELETE)\n  - Status code choices for success and error cases\n  - Pagination approach (offset vs cursor) and filtering/sorting conventions\n  - A consistent error response shape\n  - Idempotency for retried POSTs and how versioning is handled",
    hints: [
      "Model resources as nouns and let HTTP verbs express the action; reserve verbs-in-the-path for rare RPC-style actions.",
      "Cursor pagination is more stable than offset under inserts/deletes at scale.",
      "Make unsafe operations idempotent with an Idempotency-Key so retries do not duplicate effects.",
    ],
    tags: ["REST", "api design", "HTTP", "pagination", "idempotency", "versioning"],
  },


  {
    id: "arch-40",
    category: 'architecture',
    difficulty: "medium",
    title: "GraphQL vs REST vs gRPC Trade-offs",
    prompt: "Design the following system.\n\nRequirements:\n  - Choose an API style for a new system\n  - Support varied frontends (web, mobile, third-party)\n  - Internal service-to-service calls\n  - Performance and payload-size considerations\n  - Tooling, caching, and evolvability\n  - Streaming needs\n\nAddress:\n  - When GraphQL wins (varied client data needs, over/under-fetching) and its costs (caching, N+1, complexity)\n  - When gRPC wins (internal, high-throughput, typed contracts, streaming) and its limits (browser support)\n  - When plain REST is the right default\n  - Caching differences across the three\n  - Schema/contract evolution in each",
    hints: [
      "GraphQL lets clients fetch exactly what they need in one round trip, at the cost of harder caching and N+1 query risk.",
      "gRPC (Protobuf/HTTP-2) is fast and strongly typed - ideal internally, weak in browsers.",
      "REST is the simplest, most cacheable default; reach for the others only when a specific need justifies the cost.",
    ],
    tags: ["api design", "GraphQL", "REST", "gRPC", "trade-offs", "protocols"],
  },


  {
    id: "arch-41",
    category: 'architecture',
    difficulty: "medium",
    title: "Database Sharding Strategies",
    prompt: "Design the following system.\n\nRequirements:\n  - Scale a database beyond one node's capacity\n  - Distribute data across shards\n  - Route queries to the right shard\n  - Avoid hot shards\n  - Support growth (resharding)\n  - Cross-shard queries where unavoidable\n\nAddress:\n  - Sharding key selection and its impact on hotspots and query routing\n  - Range vs hash vs directory-based sharding and the trade-offs\n  - Handling cross-shard queries and joins\n  - Rebalancing/resharding with minimal disruption (consistent hashing)\n  - Avoiding hot shards from skewed keys",
    hints: [
      "The shard key makes or breaks this: it must spread load evenly AND keep common queries on a single shard.",
      "Range sharding allows range scans but risks hotspots; hash sharding spreads evenly but kills range scans.",
      "Consistent hashing minimizes data movement when adding/removing shards.",
    ],
    tags: ["system design", "sharding", "databases", "partitioning", "consistent hashing", "scaling"],
  },


  {
    id: "arch-42",
    category: 'architecture',
    difficulty: "medium",
    title: "CAP Theorem Applied: Choosing a Database",
    prompt: "Design the following system.\n\nRequirements:\n  - Pick a datastore for a given workload\n  - Reason about consistency vs availability under partition\n  - Map requirements to CP vs AP systems\n  - Latency and geo-distribution needs\n  - Read vs write patterns\n  - Acceptable staleness\n\nAddress:\n  - State CAP precisely - during a network partition you choose Consistency OR Availability\n  - Give an example workload that demands CP (e.g., banking) and one that tolerates AP (e.g., social feed)\n  - How eventual consistency and tunable consistency (quorums) fit in\n  - Latency implications of strong consistency across regions\n  - Mapping a concrete requirement to a database choice",
    hints: [
      "CAP only forces a choice DURING a partition: a CP store rejects/blocks to stay consistent; an AP store stays up and reconciles later.",
      "Banking-style correctness wants CP; a like-count or feed can accept AP with eventual consistency.",
      "Quorum systems (R + W > N) let you tune the consistency/availability balance rather than pick a hard extreme.",
    ],
    tags: ["system design", "CAP theorem", "consistency", "availability", "databases", "partitions"],
  },


  {
    id: "arch-43",
    category: 'architecture',
    difficulty: "hard",
    title: "Event Sourcing and CQRS",
    prompt: "Design the following system.\n\nRequirements:\n  - Persist state as a log of events rather than current state\n  - Separate read and write models\n  - Rebuild state and derived views by replaying events\n  - Full audit trail / time travel\n  - Eventually consistent read projections\n  - Handle event schema evolution\n\nAddress:\n  - Event sourcing: storing events vs current state, and how you derive current state (replay + snapshots)\n  - CQRS: why split command (write) and query (read) models, and how they stay in sync\n  - The eventual consistency between write and read sides\n  - Event schema evolution / versioning\n  - When this complexity is justified vs over-engineering",
    hints: [
      "Event sourcing stores the append-only sequence of changes; current state is a fold over events, with snapshots to avoid replaying everything.",
      "CQRS pairs naturally: events update denormalized read projections asynchronously, so reads are fast but eventually consistent.",
      "This is powerful but heavy - justify it with real audit/temporal/scaling needs, not as a default.",
    ],
    tags: ["system design", "event sourcing", "CQRS", "events", "audit", "eventual consistency"],
  },


  {
    id: "arch-44",
    category: 'architecture',
    difficulty: "hard",
    title: "Saga Pattern for Distributed Transactions",
    prompt: "Design the following system.\n\nRequirements:\n  - Coordinate a transaction spanning multiple services\n  - No distributed ACID transaction available\n  - Roll back partial work on failure\n  - Maintain data consistency across services\n  - Idempotent, retryable steps\n  - Observability of the saga\n\nAddress:\n  - Why 2-phase commit is avoided across microservices and what a saga replaces it with\n  - Choreography vs orchestration and the trade-offs\n  - Compensating transactions and how rollback works (semantic, not literal undo)\n  - Idempotency and handling partial failures / retries\n  - Observability - tracking a saga in flight",
    hints: [
      "A saga is a sequence of local transactions, each with a compensating action to undo it - there is no global rollback.",
      "Choreography (services react to events) is decoupled but hard to follow; orchestration (a coordinator drives steps) is explicit but centralizes logic.",
      "Compensations are semantic (issue a refund), not a literal DB rollback, since each step already committed.",
    ],
    tags: ["system design", "saga", "distributed transactions", "compensation", "choreography", "orchestration"],
  },


  {
    id: "arch-45",
    category: 'architecture',
    difficulty: "medium",
    title: "Zero-Downtime Deployments",
    prompt: "Design the following system.\n\nRequirements:\n  - Deploy new versions with no user-visible downtime\n  - Safe rollback if the new version misbehaves\n  - Database migrations without breaking running code\n  - Gradual exposure to limit blast radius\n  - Health checks gate traffic\n  - Observability during rollout\n\nAddress:\n  - Blue-green vs canary vs rolling deployments and the trade-offs\n  - Backward/forward-compatible database migrations (expand-contract)\n  - How traffic is shifted and how rollback works in each strategy\n  - Health/readiness checks gating new instances\n  - Detecting a bad release quickly (metrics, automated rollback)",
    hints: [
      "Blue-green flips all traffic at once (instant rollback, double infra); canary exposes a small % first; rolling replaces instances gradually.",
      "DB migrations must be backward compatible (expand-contract): add columns before code uses them, remove only after old code is gone.",
      "Readiness probes prevent traffic hitting an instance before it is ready; watch error/latency metrics to trigger rollback.",
    ],
    tags: ["system design", "deployment", "blue-green", "canary", "rolling", "migrations"],
  },


  {
    id: "arch-46",
    category: 'architecture',
    difficulty: "medium",
    title: "Kubernetes: Scheduling, Health Checks, Autoscaling",
    prompt: "Design the following system.\n\nRequirements:\n  - Run a containerized service reliably on Kubernetes\n  - Restart crashed/hung pods automatically\n  - Scale with load\n  - Gate traffic to only-ready pods\n  - Control where pods land\n  - Roll out updates safely\n\nAddress:\n  - Pod scheduling basics (requests/limits, node selectors/affinity, taints/tolerations)\n  - Liveness vs readiness vs startup probes and what each controls\n  - Horizontal Pod Autoscaler - what it scales on and its limits\n  - Rolling updates and rollbacks via Deployments\n  - Resource requests/limits and their effect on scheduling and stability",
    hints: [
      "Liveness restarts a hung pod; readiness gates traffic; startup protects slow-booting apps from premature liveness kills - know the distinction.",
      "HPA scales replica count on CPU/memory/custom metrics; it needs requests set to compute utilization.",
      "Requests/limits drive scheduling and prevent a noisy neighbor from starving others.",
    ],
    tags: ["system design", "kubernetes", "scheduling", "health checks", "HPA", "autoscaling"],
  },


  {
    id: "arch-47",
    category: 'architecture',
    difficulty: "medium",
    title: "OAuth2 and JWT Authorization Flow",
    prompt: "Design the following system.\n\nRequirements:\n  - Let a third-party app act on a user's behalf without their password\n  - Issue and validate access tokens\n  - Stateless authorization across services\n  - Token refresh and expiry\n  - Scope-limited access\n  - Revocation considerations\n\nAddress:\n  - The OAuth2 roles (resource owner, client, auth server, resource server) and the Authorization Code + PKCE flow\n  - What a JWT contains and how a resource server validates it without a DB lookup\n  - Access vs refresh tokens and expiry strategy\n  - Scopes and least-privilege access\n  - JWT revocation problem and mitigations",
    hints: [
      "Walk the Authorization Code + PKCE flow: user logs in -> auth code -> exchange for access + refresh tokens -> bearer token on API calls.",
      "A JWT is signed, so the resource server verifies the signature + claims (exp, scopes) statelessly - no DB hit.",
      "JWTs cannot be easily revoked before expiry; mitigate with short TTLs + refresh tokens or a denylist.",
    ],
    tags: ["security", "OAuth2", "JWT", "authorization", "authentication", "tokens"],
  },


  {
    id: "arch-48",
    category: 'architecture',
    difficulty: "medium",
    title: "API Versioning Strategies",
    prompt: "Design the following system.\n\nRequirements:\n  - Evolve an API without breaking existing clients\n  - Support multiple versions during migration\n  - Clear deprecation path\n  - Minimize version proliferation\n  - Communicate breaking vs non-breaking changes\n  - Routing requests to the right version\n\nAddress:\n  - Versioning approaches: URI (/v1), header (Accept), query param - trade-offs of each\n  - Distinguishing breaking from non-breaking changes (additive vs removal/rename)\n  - How long you support old versions and the deprecation/sunset process\n  - Routing and maintaining multiple versions without code duplication\n  - Communicating changes to consumers",
    hints: [
      "URI versioning is the most visible and simplest to route; header versioning keeps URLs clean but is less discoverable.",
      "Most changes can be additive (new optional fields) and need NO new version - only breaking changes (removal/rename/semantic change) force a bump.",
      "Define a sunset policy and signal deprecation (headers, docs) so clients have time to migrate.",
    ],
    tags: ["api design", "versioning", "backward compatibility", "deprecation", "REST"],
  },


  {
    id: "arch-49",
    category: 'architecture',
    difficulty: "medium",
    title: "Service Mesh (Istio / Linkerd)",
    prompt: "Design the following system.\n\nRequirements:\n  - Manage service-to-service traffic in a microservices fleet\n  - Consistent mTLS, retries, timeouts without app code changes\n  - Fine-grained traffic control (canary, mirroring)\n  - Observability of inter-service calls\n  - Policy enforcement (authz between services)\n  - Decide when a mesh is worth it\n\nAddress:\n  - What a service mesh does and how (sidecar proxies / data plane vs control plane)\n  - Cross-cutting concerns it moves out of app code (mTLS, retries, timeouts, circuit breaking)\n  - Traffic management features (canary, traffic splitting, mirroring)\n  - Observability the mesh provides for free\n  - When a mesh is overkill vs when it pays off",
    hints: [
      "A mesh injects a sidecar proxy next to each service; the data plane handles traffic, the control plane configures policy centrally.",
      "It moves mTLS, retries, timeouts, and circuit breaking out of every service's code into the platform.",
      "It adds operational complexity and latency - justify it only when you have enough services that reimplementing these everywhere is the bigger cost.",
    ],
    tags: ["system design", "service mesh", "istio", "linkerd", "mTLS", "sidecar"],
  },


  {
    id: "arch-50",
    category: 'architecture',
    difficulty: "medium",
    title: "Microservices Data Management: Database-per-Service",
    prompt: "Design the following system.\n\nRequirements:\n  - Each service owns its data; no shared database\n  - Maintain loose coupling between services\n  - Handle queries that span multiple services\n  - Keep data consistent across services\n  - Allow each service to pick the right datastore\n  - Evolve schemas independently\n\nAddress:\n  - Why database-per-service (loose coupling, independent scaling/schema) and its cost (no cross-service joins/transactions)\n  - How to satisfy a query that needs data from several services (API composition vs CQRS read model)\n  - Maintaining consistency without distributed transactions (sagas, events)\n  - Avoiding the shared-database anti-pattern and the distributed monolith\n  - Handling reporting/analytics across services",
    hints: [
      "Owning your own DB is what makes a service independently deployable - a shared DB couples everyone and recreates a monolith.",
      "Cross-service queries are solved by API composition (call each service and join in code) or a maintained CQRS read model fed by events.",
      "Consistency without 2PC means sagas + events and accepting eventual consistency.",
    ],
    tags: ["system design", "microservices", "database-per-service", "data management", "CQRS", "coupling"],
  },


  {
    id: "trivia-33",
    category: 'trivia',
    difficulty: "medium",
    title: "OOP Principles: The Four Pillars & SOLID",
    prompt: "Answer each of the following:\n\n  a) Name the four pillars of object-oriented programming and define each in one sentence.\n  b) What is encapsulation and why does hiding internal state behind methods matter?\n  c) What is the difference between inheritance and composition, and what does \"favor composition over inheritance\" mean?\n  d) What is polymorphism? Distinguish method overriding from method overloading.\n  e) Name the five SOLID principles and explain the Single Responsibility and Dependency Inversion principles.",
    hints: [
      "The four pillars: Encapsulation (bundle data + behavior, hide internals), Abstraction (expose a simple interface, hide complexity), Inheritance (subclass reuses/extends a base), Polymorphism (one interface, many implementations).",
      "Encapsulation protects invariants: callers change state only through methods that can validate, so an object can never enter an invalid state.",
      "Inheritance is an \"is-a\" relationship; composition is \"has-a\". Composition is more flexible because it avoids rigid hierarchies and tight coupling to a base class.",
      "Overriding = a subclass replaces a base method (runtime dispatch); overloading = same method name, different parameter lists (compile-time resolution).",
      "SOLID: Single Responsibility (one reason to change), Open/Closed (open to extension, closed to modification), Liskov Substitution (subtypes substitutable for base), Interface Segregation (small focused interfaces), Dependency Inversion (depend on abstractions, not concretions).",
    ],
    followUps: [
      "When does deep inheritance become a liability?",
      "How does the Liskov Substitution Principle relate to polymorphism?",
    ],
    tags: ["OOP", "SOLID", "encapsulation", "inheritance", "polymorphism", "design"],
  },


  {
    id: "trivia-34",
    category: 'trivia',
    difficulty: "medium",
    title: "Sliding Window & Two Pointers: Fixed vs Variable Windows",
    prompt: "Answer each of the following:\n\n  a) What distinguishes a fixed-size window from a variable-size (shrinkable) window?\n  b) Give one classic problem for each.\n  c) What signals that a problem needs a shrinkable window?",
    hints: [
      "Fixed: window is always exactly k elements. Variable: expand right, shrink left when a constraint breaks.",
      "Fixed: max sum of k elements. Variable: longest substring without repeating characters.",
      "A \"longest/shortest subarray satisfying condition X\" phrasing usually means a variable window.",
    ],
    tags: ["sliding window", "two pointers", "algorithms"],
  },


  {
    id: "trivia-35",
    category: 'trivia',
    difficulty: "medium",
    title: "Sliding Window & Two Pointers: Why O(n)",
    prompt: "Answer each of the following:\n\n  a) Why is a sliding window O(n) despite looking like a nested loop?\n  b) What is the amortized argument?\n  c) When does the window approach NOT apply?",
    hints: [
      "Each element enters and leaves the window at most once.",
      "Total work across all left-pointer moves is bounded by n, so it is linear amortized.",
      "It fails when the property is not monotonic over the window (shrinking does not reliably restore validity).",
    ],
    tags: ["sliding window", "two pointers", "algorithms"],
  },


  {
    id: "trivia-36",
    category: 'trivia',
    difficulty: "medium",
    title: "Sliding Window & Two Pointers: Two-pointer convergence",
    prompt: "Answer each of the following:\n\n  a) Describe the converging two-pointer technique (pointers from both ends).\n  b) What precondition does it usually require?\n  c) Give an example problem it solves in O(n).",
    hints: [
      "Two pointers start at opposite ends and move toward each other based on a comparison.",
      "Usually a sorted array (or a symmetry like palindrome).",
      "Two-sum in a sorted array, or container-with-most-water, or valid palindrome.",
    ],
    tags: ["sliding window", "two pointers", "algorithms"],
  },


  {
    id: "trivia-37",
    category: 'trivia',
    difficulty: "medium",
    title: "Sliding Window & Two Pointers: Tracking window contents",
    prompt: "Answer each of the following:\n\n  a) When do you track window contents with a Set vs a Map/counter?\n  b) Why is a counter needed for \"at most K distinct\" problems?\n  c) What is the cost of these structures?",
    hints: [
      "Set when you only need presence (no duplicates allowed); Map/counter when you need counts (duplicates, frequencies).",
      "You must know how many of each element are in the window to decide when a distinct count drops.",
      "O(1) average per operation, O(window size) space.",
    ],
    tags: ["sliding window", "two pointers", "algorithms"],
  },


  {
    id: "trivia-38",
    category: 'trivia',
    difficulty: "medium",
    title: "Sliding Window & Two Pointers: At most vs exactly K",
    prompt: "Answer each of the following:\n\n  a) How do you compute \"exactly K distinct\" from \"at most K distinct\"?\n  b) Why is the direct \"exactly K\" window awkward?\n  c) Write the identity.",
    hints: [
      "exactly(K) = atMost(K) - atMost(K-1).",
      "A window for exactly K is not monotonic - you cannot simply shrink to restore the exact count.",
      "count(exactly K) = count(atMost K) minus count(atMost K-1).",
    ],
    tags: ["sliding window", "two pointers", "algorithms"],
  },


  {
    id: "trivia-39",
    category: 'trivia',
    difficulty: "medium",
    title: "Sliding Window & Two Pointers: Slow/fast same-direction",
    prompt: "Answer each of the following:\n\n  a) Describe same-direction two pointers (slow/fast) for in-place array work.\n  b) Give an example like remove-duplicates or move-zeroes.\n  c) Why is it O(1) extra space?",
    hints: [
      "A slow pointer marks the write position; a fast pointer scans; you copy qualifying elements to slow.",
      "Remove duplicates from a sorted array: slow writes unique values as fast scans.",
      "You overwrite in place, allocating no auxiliary array.",
    ],
    tags: ["sliding window", "two pointers", "algorithms"],
  },


  {
    id: "trivia-40",
    category: 'trivia',
    difficulty: "medium",
    title: "Sliding Window & Two Pointers: Window sum updates",
    prompt: "Answer each of the following:\n\n  a) In a fixed window, how do you update the sum without re-summing?\n  b) What is the per-step work?\n  c) Why does this matter for large k?",
    hints: [
      "Subtract the element leaving and add the element entering: sum += nums[r] - nums[l-1].",
      "O(1) per slide.",
      "Re-summing would be O(k) per step -> O(nk); the incremental update keeps it O(n).",
    ],
    tags: ["sliding window", "two pointers", "algorithms"],
  },


  {
    id: "trivia-41",
    category: 'trivia',
    difficulty: "medium",
    title: "Sliding Window & Two Pointers: Minimum-window problems",
    prompt: "Answer each of the following:\n\n  a) Outline the approach for \"minimum window substring containing all of T\".\n  b) When do you record the answer?\n  c) What do you shrink on?",
    hints: [
      "Expand right until the window contains all required chars; then shrink left while still valid, recording the min.",
      "Record whenever the window is valid (contains all of T), trying to make it smaller.",
      "Shrink while the validity condition still holds, stopping when removing one more would break it.",
    ],
    tags: ["sliding window", "two pointers", "algorithms"],
  },


  {
    id: "trivia-42",
    category: 'trivia',
    difficulty: "medium",
    title: "Sliding Window & Two Pointers: Common bugs",
    prompt: "Answer each of the following:\n\n  a) What are two common off-by-one or initialization bugs in window code?\n  b) How do you guard the empty-input case?\n  c) What about when k > array length?",
    hints: [
      "Forgetting to update the answer before shrinking, and mismanaging left when removing elements.",
      "Return early (0 / empty) when the input length is 0.",
      "Define behavior explicitly: often return 0 or the whole-array result depending on the problem.",
    ],
    tags: ["sliding window", "two pointers", "algorithms"],
  },


  {
    id: "trivia-43",
    category: 'trivia',
    difficulty: "medium",
    title: "Sliding Window & Two Pointers: Choosing the pattern",
    prompt: "Answer each of the following:\n\n  a) Given a contiguous-subarray problem, how do you decide window vs two-pointer vs prefix sums?\n  b) When are prefix sums better?\n  c) What about problems needing negative numbers?",
    hints: [
      "Contiguous + a running constraint -> window; sorted/converging -> two pointers; many range-sum queries -> prefix sums.",
      "Prefix sums shine for repeated range-sum queries or \"subarray sum equals K\" with a hashmap.",
      "With negatives, the shrink-on-violation invariant can break - prefix sums + hashmap is often safer.",
    ],
    tags: ["sliding window", "two pointers", "algorithms"],
  },


  {
    id: "trivia-44",
    category: 'trivia',
    difficulty: "medium",
    title: "Fast & Slow Pointers: Floyd cycle detection",
    prompt: "Answer each of the following:\n\n  a) How does Floyd's tortoise-and-hare detect a cycle?\n  b) Why must they meet if a cycle exists?\n  c) What is the time/space cost?",
    hints: [
      "Slow moves 1 step, fast moves 2; if there is a cycle, fast laps slow and they meet.",
      "Inside a cycle the gap between them shrinks by 1 each step, so it eventually reaches 0.",
      "O(n) time, O(1) space.",
    ],
    tags: ["fast-slow pointers", "linked lists", "cycle detection", "algorithms"],
  },


  {
    id: "trivia-45",
    category: 'trivia',
    difficulty: "medium",
    title: "Fast & Slow Pointers: Cycle start",
    prompt: "Answer each of the following:\n\n  a) After they meet, how do you find the node where the cycle begins?\n  b) Why does resetting one pointer to head work?\n  c) State the key distance relationship.",
    hints: [
      "Reset one pointer to head; move both 1 step at a time; they meet at the cycle start.",
      "The distance from head to the cycle start equals the distance from the meeting point to the cycle start (mod cycle length).",
      "The math: 2(a+b) = a+b+kC simplifies so head-to-start = meet-to-start.",
    ],
    tags: ["fast-slow pointers", "linked lists", "cycle detection", "algorithms"],
  },


  {
    id: "trivia-46",
    category: 'trivia',
    difficulty: "medium",
    title: "Fast & Slow Pointers: Middle of list",
    prompt: "Answer each of the following:\n\n  a) How do you find the middle node in one pass?\n  b) Where does slow end up for even-length lists?\n  c) How do you make it land on the first vs second middle?",
    hints: [
      "Advance slow by 1 and fast by 2; when fast hits the end, slow is at the middle.",
      "It depends on the loop condition - it can land on either of the two middles.",
      "Adjust whether you loop while fast and fast.next vs fast.next and fast.next.next.",
    ],
    tags: ["fast-slow pointers", "linked lists", "cycle detection", "algorithms"],
  },


  {
    id: "trivia-47",
    category: 'trivia',
    difficulty: "medium",
    title: "Fast & Slow Pointers: Happy number",
    prompt: "Answer each of the following:\n\n  a) How do fast/slow pointers apply to the happy-number problem?\n  b) What plays the role of \"next node\"?\n  c) What does a cycle mean here?",
    hints: [
      "Treat the sum-of-squared-digits transform as the \"next\" function and detect a cycle on the number sequence.",
      "The next value is the sum of squares of digits.",
      "A cycle that is not 1 means the number is not happy.",
    ],
    tags: ["fast-slow pointers", "linked lists", "cycle detection", "algorithms"],
  },


  {
    id: "trivia-48",
    category: 'trivia',
    difficulty: "medium",
    title: "Fast & Slow Pointers: Palindrome linked list",
    prompt: "Answer each of the following:\n\n  a) Outline checking if a linked list is a palindrome in O(1) space.\n  b) Which two techniques combine?\n  c) What should you do afterward?",
    hints: [
      "Find the middle with fast/slow, reverse the second half, compare both halves.",
      "Fast/slow to find the middle, plus in-place reversal.",
      "Optionally restore the list by re-reversing the second half.",
    ],
    tags: ["fast-slow pointers", "linked lists", "cycle detection", "algorithms"],
  },


  {
    id: "trivia-49",
    category: 'trivia',
    difficulty: "medium",
    title: "Fast & Slow Pointers: Why two speeds",
    prompt: "Answer each of the following:\n\n  a) Why specifically 1x and 2x speeds rather than other ratios?\n  b) Would 1x and 3x still detect a cycle?\n  c) What is the trade-off of larger gaps?",
    hints: [
      "1 and 2 guarantee they meet and keep the meeting-point math clean.",
      "Yes, any faster pointer will eventually lap, but the cycle-start math is simplest with 2x.",
      "Larger gaps can still work but complicate the distance proof and offer no benefit.",
    ],
    tags: ["fast-slow pointers", "linked lists", "cycle detection", "algorithms"],
  },


  {
    id: "trivia-50",
    category: 'trivia',
    difficulty: "medium",
    title: "Fast & Slow Pointers: Nth from end",
    prompt: "Answer each of the following:\n\n  a) How do you find the nth node from the end in one pass?\n  b) Is this fast/slow or fixed-gap two pointers?\n  c) Watch out for what edge case?",
    hints: [
      "Advance a lead pointer n steps, then move both until lead hits the end; trailing is at the nth-from-end.",
      "It is a fixed-gap two-pointer (gap n), a cousin of fast/slow.",
      "Removing the head itself - use a dummy node to simplify.",
    ],
    tags: ["fast-slow pointers", "linked lists", "cycle detection", "algorithms"],
  },


  {
    id: "trivia-51",
    category: 'trivia',
    difficulty: "medium",
    title: "Fast & Slow Pointers: Detecting intersection",
    prompt: "Answer each of the following:\n\n  a) How can two pointers find where two linked lists intersect?\n  b) What is the pointer-switching trick?\n  c) Why does it align them?",
    hints: [
      "Advance two pointers; when one hits the end, redirect it to the other list's head.",
      "Each pointer traverses lenA + lenB, so they align at the intersection (or both hit null).",
      "The path lengths equalize, so they reach the intersection simultaneously.",
    ],
    tags: ["fast-slow pointers", "linked lists", "cycle detection", "algorithms"],
  },


  {
    id: "trivia-52",
    category: 'trivia',
    difficulty: "medium",
    title: "Fast & Slow Pointers: Loop length",
    prompt: "Answer each of the following:\n\n  a) Once a cycle is detected, how do you measure its length?\n  b) From the meeting point, what do you do?\n  c) Why does that count the cycle?",
    hints: [
      "From the meeting point, keep one pointer fixed and walk the other until it returns; count the steps.",
      "Move one pointer around the loop until it comes back to the meeting node.",
      "It traverses exactly one full cycle, so the step count is the cycle length.",
    ],
    tags: ["fast-slow pointers", "linked lists", "cycle detection", "algorithms"],
  },


  {
    id: "trivia-53",
    category: 'trivia',
    difficulty: "medium",
    title: "Fast & Slow Pointers: When not to use",
    prompt: "Answer each of the following:\n\n  a) When are fast/slow pointers the wrong tool?\n  b) What if you need to count or store visited nodes?\n  c) Compare to a hash-set approach.",
    hints: [
      "When you need more than presence of a cycle - e.g., to record all visited nodes or handle non-linked structures.",
      "A hash set of visited nodes is simpler if O(n) space is acceptable.",
      "Hash set: O(n) space but trivial; fast/slow: O(1) space but trickier math.",
    ],
    tags: ["fast-slow pointers", "linked lists", "cycle detection", "algorithms"],
  },


  {
    id: "trivia-54",
    category: 'trivia',
    difficulty: "medium",
    title: "Merge Intervals: Core merge",
    prompt: "Answer each of the following:\n\n  a) What is the first step in almost every interval problem?\n  b) How do you decide two intervals overlap?\n  c) What is the overall complexity?",
    hints: [
      "Sort the intervals by start time.",
      "They overlap if the next start <= current end.",
      "O(n log n) dominated by the sort; the merge pass is O(n).",
    ],
    tags: ["merge intervals", "intervals", "sorting", "algorithms"],
  },


  {
    id: "trivia-55",
    category: 'trivia',
    difficulty: "medium",
    title: "Merge Intervals: Merging logic",
    prompt: "Answer each of the following:\n\n  a) After sorting, how do you merge overlapping intervals?\n  b) How do you extend the current interval?\n  c) When do you push a new interval?",
    hints: [
      "Iterate; if the next interval overlaps the current, merge; otherwise start a new one.",
      "Set current end = max(current end, next end).",
      "Push when the next start is strictly greater than the current end.",
    ],
    tags: ["merge intervals", "intervals", "sorting", "algorithms"],
  },


  {
    id: "trivia-56",
    category: 'trivia',
    difficulty: "medium",
    title: "Merge Intervals: Insert interval",
    prompt: "Answer each of the following:\n\n  a) How do you insert a new interval into a sorted, non-overlapping list?\n  b) What three phases does the scan have?\n  c) Is sorting needed?",
    hints: [
      "Add all intervals ending before the new one, merge all overlapping with it, then add the rest.",
      "Before, overlapping (merge), after.",
      "No - the list is already sorted, so it is a single O(n) pass.",
    ],
    tags: ["merge intervals", "intervals", "sorting", "algorithms"],
  },


  {
    id: "trivia-57",
    category: 'trivia',
    difficulty: "medium",
    title: "Merge Intervals: Meeting rooms I",
    prompt: "Answer each of the following:\n\n  a) How do you decide if a person can attend all meetings?\n  b) What do you check after sorting by start?\n  c) Complexity?",
    hints: [
      "Sort by start; if any meeting starts before the previous ends, they conflict.",
      "Check adjacent pairs for overlap.",
      "O(n log n).",
    ],
    tags: ["merge intervals", "intervals", "sorting", "algorithms"],
  },


  {
    id: "trivia-58",
    category: 'trivia',
    difficulty: "medium",
    title: "Merge Intervals: Meeting rooms II",
    prompt: "Answer each of the following:\n\n  a) How do you find the minimum number of rooms needed?\n  b) What data structure tracks active meetings?\n  c) What is the heap-free alternative?",
    hints: [
      "Sort by start; use a min-heap of end times; reuse a room if the earliest end <= current start.",
      "A min-heap keyed on end time; its size is the rooms in use.",
      "Sweep line: sort start and end events separately and track concurrent overlaps.",
    ],
    tags: ["merge intervals", "intervals", "sorting", "algorithms"],
  },


  {
    id: "trivia-59",
    category: 'trivia',
    difficulty: "medium",
    title: "Merge Intervals: Sweep line",
    prompt: "Answer each of the following:\n\n  a) Explain the sweep-line / chronological-ordering technique.\n  b) How do you represent starts and ends?\n  c) What do you track as you sweep?",
    hints: [
      "Process all endpoints in time order, +1 at a start, -1 at an end.",
      "Two sorted arrays (or a sorted event list with type tags).",
      "A running count of active intervals; the max is the answer for max-overlap problems.",
    ],
    tags: ["merge intervals", "intervals", "sorting", "algorithms"],
  },


  {
    id: "trivia-60",
    category: 'trivia',
    difficulty: "medium",
    title: "Merge Intervals: Interval intersection",
    prompt: "Answer each of the following:\n\n  a) How do you compute the intersection of two sorted interval lists?\n  b) What defines the overlap of two intervals [a,b] and [c,d]?\n  c) How do you advance pointers?",
    hints: [
      "Two pointers; for each pair compute max(starts) and min(ends); it is a valid intersection if start <= end.",
      "Overlap = [max(a,c), min(b,d)] when that is non-empty.",
      "Advance the pointer whose interval ends first.",
    ],
    tags: ["merge intervals", "intervals", "sorting", "algorithms"],
  },


  {
    id: "trivia-61",
    category: 'trivia',
    difficulty: "medium",
    title: "Merge Intervals: Sort by start vs end",
    prompt: "Answer each of the following:\n\n  a) When do you sort by start time vs end time?\n  b) Which problems prefer sorting by end?\n  c) Why does it matter for greedy interval scheduling?",
    hints: [
      "Merging/inserting sort by start; many greedy scheduling problems sort by end.",
      "Activity selection / non-overlapping intervals: sort by end to maximize count.",
      "Picking the earliest-finishing interval leaves the most room for future ones.",
    ],
    tags: ["merge intervals", "intervals", "sorting", "algorithms"],
  },


  {
    id: "trivia-62",
    category: 'trivia',
    difficulty: "medium",
    title: "Merge Intervals: Non-overlapping removal",
    prompt: "Answer each of the following:\n\n  a) How do you find the minimum intervals to remove so none overlap?\n  b) What greedy choice do you make?\n  c) Why end-time sorting?",
    hints: [
      "Sort by end; greedily keep intervals that do not overlap the last kept one; count the rest as removals.",
      "Always keep the interval that finishes earliest among conflicts.",
      "Earliest finish maximizes remaining space, minimizing removals.",
    ],
    tags: ["merge intervals", "intervals", "sorting", "algorithms"],
  },


  {
    id: "trivia-63",
    category: 'trivia',
    difficulty: "medium",
    title: "Merge Intervals: Edge cases",
    prompt: "Answer each of the following:\n\n  a) How do you treat intervals that merely touch (e.g., [1,2] and [2,3])?\n  b) Why must this be defined explicitly?\n  c) How do empty inputs behave?",
    hints: [
      "Depends on the problem: sometimes touching counts as overlap, sometimes not - decide and be consistent.",
      "Off-by-one bugs come from inconsistent <= vs < comparisons at the boundary.",
      "Empty input returns an empty result; guard before sorting.",
    ],
    tags: ["merge intervals", "intervals", "sorting", "algorithms"],
  },


  {
    id: "trivia-64",
    category: 'trivia',
    difficulty: "medium",
    title: "Cyclic Sort: When to use",
    prompt: "Answer each of the following:\n\n  a) What input pattern signals cyclic sort?\n  b) Why is it O(n) and O(1) space?\n  c) What is the placement rule?",
    hints: [
      "Arrays containing numbers in a known range like 1..n (or 0..n-1).",
      "Each number is swapped to its correct index at most a constant number of times; in place.",
      "Value v belongs at index v-1 (for 1..n) or v (for 0..n-1).",
    ],
    tags: ["cyclic sort", "arrays", "in-place", "algorithms"],
  },


  {
    id: "trivia-65",
    category: 'trivia',
    difficulty: "medium",
    title: "Cyclic Sort: Mechanics",
    prompt: "Answer each of the following:\n\n  a) Describe the swap loop of cyclic sort.\n  b) What is the loop condition?\n  c) Why a while, not an if?",
    hints: [
      "For each index, while the element is not in its correct slot, swap it there.",
      "While nums[i] != i+1 (for 1..n), swap nums[i] with nums[correct index].",
      "One swap may bring another out-of-place value, so you keep swapping until i is settled.",
    ],
    tags: ["cyclic sort", "arrays", "in-place", "algorithms"],
  },


  {
    id: "trivia-66",
    category: 'trivia',
    difficulty: "medium",
    title: "Cyclic Sort: Missing number",
    prompt: "Answer each of the following:\n\n  a) How do you find the missing number in 0..n after cyclic sort?\n  b) Where does it reveal itself?\n  c) What is the complexity?",
    hints: [
      "Cyclic-sort, then scan for the first index where the value does not match.",
      "The first index i where nums[i] != i is the missing number.",
      "O(n) time, O(1) space.",
    ],
    tags: ["cyclic sort", "arrays", "in-place", "algorithms"],
  },


  {
    id: "trivia-67",
    category: 'trivia',
    difficulty: "medium",
    title: "Cyclic Sort: Find duplicate",
    prompt: "Answer each of the following:\n\n  a) How does cyclic sort help find a duplicate in 1..n?\n  b) What happens during placement when a duplicate exists?\n  c) How is this different from Floyd's?",
    hints: [
      "Place each value; the value that wants an already-correctly-filled slot is the duplicate.",
      "You detect a value that is already at its target index.",
      "Floyd's treats the array as a linked list to find a cycle without modifying it.",
    ],
    tags: ["cyclic sort", "arrays", "in-place", "algorithms"],
  },


  {
    id: "trivia-68",
    category: 'trivia',
    difficulty: "medium",
    title: "Cyclic Sort: All missing numbers",
    prompt: "Answer each of the following:\n\n  a) How do you find all numbers missing from 1..n?\n  b) After sorting, what indicates a missing value?\n  c) Output?",
    hints: [
      "Cyclic-sort, then collect every index i where nums[i] != i+1.",
      "A mismatch at index i means i+1 is missing.",
      "A list of all missing numbers in O(n).",
    ],
    tags: ["cyclic sort", "arrays", "in-place", "algorithms"],
  },


  {
    id: "trivia-69",
    category: 'trivia',
    difficulty: "medium",
    title: "Cyclic Sort: First missing positive",
    prompt: "Answer each of the following:\n\n  a) How do you find the smallest missing positive integer?\n  b) Why ignore non-positive and out-of-range values?\n  c) Complexity constraints?",
    hints: [
      "Cyclic-sort placing v at index v-1 for 1<=v<=n; first mismatch index +1 is the answer.",
      "Values <=0 or >n cannot be the first missing positive in range, so skip placing them.",
      "O(n) time, O(1) space is the classic requirement.",
    ],
    tags: ["cyclic sort", "arrays", "in-place", "algorithms"],
  },


  {
    id: "trivia-70",
    category: 'trivia',
    difficulty: "medium",
    title: "Cyclic Sort: Duplicate and missing",
    prompt: "Answer each of the following:\n\n  a) How do you find both the duplicated and the missing number together?\n  b) After cyclic sort, what do you read off?\n  c) Why does the mismatch slot encode both?",
    hints: [
      "Cyclic-sort; at the mismatched index, the present value is the duplicate and index+1 is the missing one.",
      "The single bad slot holds the duplicate; its expected value is missing.",
      "One value is doubled and one absent, so exactly one slot is wrong.",
    ],
    tags: ["cyclic sort", "arrays", "in-place", "algorithms"],
  },


  {
    id: "trivia-71",
    category: 'trivia',
    difficulty: "medium",
    title: "Cyclic Sort: Index as hash",
    prompt: "Answer each of the following:\n\n  a) Why is cyclic sort described as \"using the index as a hash\"?\n  b) How does this relate to counting sort?\n  c) What constraint makes it possible?",
    hints: [
      "Each value maps deterministically to a home index, like a perfect hash.",
      "It is a special case where keys are a dense integer range, so no collisions.",
      "The values must lie in a known contiguous range with (near) one-to-one mapping to indices.",
    ],
    tags: ["cyclic sort", "arrays", "in-place", "algorithms"],
  },


  {
    id: "trivia-72",
    category: 'trivia',
    difficulty: "medium",
    title: "Cyclic Sort: 0-based vs 1-based",
    prompt: "Answer each of the following:\n\n  a) How does the placement formula change between 0..n-1 and 1..n?\n  b) What bug arises if you mix them?\n  c) How do you choose?",
    hints: [
      "0-based: value v -> index v. 1-based: value v -> index v-1.",
      "An off-by-one that puts every value one slot wrong and breaks termination.",
      "Match the formula to the problem's stated range.",
    ],
    tags: ["cyclic sort", "arrays", "in-place", "algorithms"],
  },


  {
    id: "trivia-73",
    category: 'trivia',
    difficulty: "medium",
    title: "Cyclic Sort: Limitations",
    prompt: "Answer each of the following:\n\n  a) When can you NOT use cyclic sort?\n  b) What if values are arbitrary integers?\n  c) What about read-only arrays?",
    hints: [
      "When values are not a bounded integer range mapping to indices.",
      "Arbitrary or sparse values have no natural home index, so the swap logic fails.",
      "Cyclic sort mutates the array; if it must stay read-only, use a different approach (e.g., binary search on value).",
    ],
    tags: ["cyclic sort", "arrays", "in-place", "algorithms"],
  },


  {
    id: "trivia-74",
    category: 'trivia',
    difficulty: "medium",
    title: "Linked Lists & Heaps: Reversal",
    prompt: "Answer each of the following:\n\n  a) How do you reverse a singly linked list iteratively?\n  b) Which three pointers do you track?\n  c) What is the time/space cost?",
    hints: [
      "Walk the list, repointing each node's next to the previous node.",
      "prev, current, and next (saved before repointing).",
      "O(n) time, O(1) space.",
    ],
    tags: ["linked lists", "heaps", "priority queue", "data structures"],
  },


  {
    id: "trivia-75",
    category: 'trivia',
    difficulty: "medium",
    title: "Linked Lists & Heaps: Dummy node",
    prompt: "Answer each of the following:\n\n  a) Why use a dummy/sentinel head node?\n  b) Which operations does it simplify?\n  c) Give an example.",
    hints: [
      "It removes special-casing of the head, so insertions/deletions at the front behave like the middle.",
      "Merging lists, removing the head, building a new list.",
      "Merge two sorted lists: attach to dummy.next and return dummy.next.",
    ],
    tags: ["linked lists", "heaps", "priority queue", "data structures"],
  },


  {
    id: "trivia-76",
    category: 'trivia',
    difficulty: "medium",
    title: "Linked Lists & Heaps: Heap basics",
    prompt: "Answer each of the following:\n\n  a) What ordering invariant does a binary heap maintain?\n  b) What are the costs of insert, peek, and extract?\n  c) How is it stored?",
    hints: [
      "Parent <= children (min-heap) or parent >= children (max-heap).",
      "Peek O(1), insert and extract O(log n).",
      "As an array; children of index i are at 2i+1 and 2i+2.",
    ],
    tags: ["linked lists", "heaps", "priority queue", "data structures"],
  },


  {
    id: "trivia-77",
    category: 'trivia',
    difficulty: "medium",
    title: "Linked Lists & Heaps: Heapify",
    prompt: "Answer each of the following:\n\n  a) What is the cost of building a heap from n elements?\n  b) Why is bottom-up heapify O(n), not O(n log n)?\n  c) When do you use it?",
    hints: [
      "O(n) with bottom-up heapify.",
      "Most nodes are near the leaves with tiny sift distances; the sum telescopes to O(n).",
      "When you have all elements up front rather than inserting one at a time.",
    ],
    tags: ["linked lists", "heaps", "priority queue", "data structures"],
  },


  {
    id: "trivia-78",
    category: 'trivia',
    difficulty: "medium",
    title: "Linked Lists & Heaps: Top K",
    prompt: "Answer each of the following:\n\n  a) How does a size-K heap solve \"K largest elements\"?\n  b) Min-heap or max-heap, and why?\n  c) Complexity?",
    hints: [
      "Keep a heap of K elements; evict the worst as you scan.",
      "A MIN-heap of size K for K LARGEST - the root is the smallest of the kept K and is evicted first.",
      "O(n log k).",
    ],
    tags: ["linked lists", "heaps", "priority queue", "data structures"],
  },


  {
    id: "trivia-79",
    category: 'trivia',
    difficulty: "medium",
    title: "Linked Lists & Heaps: Merge K lists",
    prompt: "Answer each of the following:\n\n  a) How do you merge K sorted lists efficiently?\n  b) What goes into the heap?\n  c) What is the complexity vs naive?",
    hints: [
      "Push the head of each list into a min-heap; repeatedly pop the smallest and push its successor.",
      "One node per list at a time (K nodes max in the heap).",
      "O(N log K) vs O(NK) for naive pairwise scanning.",
    ],
    tags: ["linked lists", "heaps", "priority queue", "data structures"],
  },


  {
    id: "trivia-80",
    category: 'trivia',
    difficulty: "medium",
    title: "Linked Lists & Heaps: Two heaps / median",
    prompt: "Answer each of the following:\n\n  a) How do two heaps maintain a running median?\n  b) Which heap holds which half?\n  c) How do you rebalance?",
    hints: [
      "A max-heap for the lower half and a min-heap for the upper half.",
      "Max-heap = smaller half (root is the largest small value); min-heap = larger half.",
      "Keep sizes within 1; the median is a root or the average of the two roots.",
    ],
    tags: ["linked lists", "heaps", "priority queue", "data structures"],
  },


  {
    id: "trivia-81",
    category: 'trivia',
    difficulty: "medium",
    title: "Linked Lists & Heaps: Cycle in list",
    prompt: "Answer each of the following:\n\n  a) How do you detect a cycle in a linked list?\n  b) What is the O(1)-space method?\n  c) How do you find the cycle start?",
    hints: [
      "Fast/slow pointers (Floyd's) - they meet inside a cycle.",
      "Tortoise (1x) and hare (2x); meeting implies a cycle.",
      "Reset one to head and advance both by 1 until they meet at the start.",
    ],
    tags: ["linked lists", "heaps", "priority queue", "data structures"],
  },


  {
    id: "trivia-82",
    category: 'trivia',
    difficulty: "medium",
    title: "Linked Lists & Heaps: Heap vs BST",
    prompt: "Answer each of the following:\n\n  a) When do you prefer a heap over a balanced BST?\n  b) What can a BST do that a heap cannot?\n  c) Why is a heap cheaper for priority queues?",
    hints: [
      "When you only need the min/max repeatedly, not full ordering or search.",
      "A BST supports ordered traversal, predecessor/successor, and arbitrary search in O(log n).",
      "A heap has a simpler array layout and O(1) peek with cheaper constant factors.",
    ],
    tags: ["linked lists", "heaps", "priority queue", "data structures"],
  },


  {
    id: "trivia-83",
    category: 'trivia',
    difficulty: "medium",
    title: "Linked Lists & Heaps: Doubly linked use",
    prompt: "Answer each of the following:\n\n  a) When is a doubly linked list worth the extra pointer?\n  b) Give a structure that relies on it.\n  c) What is the cost?",
    hints: [
      "When you need O(1) removal given a node, or bidirectional traversal.",
      "An LRU cache combines a hash map with a doubly linked list.",
      "Extra memory per node and more pointer bookkeeping.",
    ],
    tags: ["linked lists", "heaps", "priority queue", "data structures"],
  },


  {
    id: "trivia-84",
    category: 'trivia',
    difficulty: "medium",
    title: "Trees & Binary Search Trees: Traversals",
    prompt: "Answer each of the following:\n\n  a) Name the three DFS orders and the one BFS order.\n  b) Which DFS order yields sorted output on a BST?\n  c) How do you implement BFS?",
    hints: [
      "Pre-order, in-order, post-order (DFS); level-order (BFS).",
      "In-order traversal of a BST yields ascending sorted values.",
      "BFS uses a queue, processing nodes level by level.",
    ],
    tags: ["trees", "BST", "DFS", "BFS", "data structures"],
  },


  {
    id: "trivia-85",
    category: 'trivia',
    difficulty: "medium",
    title: "Trees & Binary Search Trees: BST property",
    prompt: "Answer each of the following:\n\n  a) State the BST invariant precisely.\n  b) Why does checking only immediate children fail to validate a BST?\n  c) How do you validate correctly?",
    hints: [
      "For every node, all left-subtree values < node < all right-subtree values.",
      "A node can satisfy its parent locally yet violate an ancestor's bound.",
      "Carry a (min, max) range down, or verify in-order output is strictly increasing.",
    ],
    tags: ["trees", "BST", "DFS", "BFS", "data structures"],
  },


  {
    id: "trivia-86",
    category: 'trivia',
    difficulty: "medium",
    title: "Trees & Binary Search Trees: Complexity",
    prompt: "Answer each of the following:\n\n  a) Average vs worst-case search/insert/delete in a BST?\n  b) What causes the worst case?\n  c) How is it fixed?",
    hints: [
      "Average O(log n) when balanced; worst O(n).",
      "A skewed/degenerate tree (e.g., inserting sorted data) becomes a linked list.",
      "Self-balancing trees (AVL, Red-Black) keep height O(log n).",
    ],
    tags: ["trees", "BST", "DFS", "BFS", "data structures"],
  },


  {
    id: "trivia-87",
    category: 'trivia',
    difficulty: "medium",
    title: "Trees & Binary Search Trees: Balanced trees",
    prompt: "Answer each of the following:\n\n  a) What does \"balanced\" mean for a tree?\n  b) Name two self-balancing BSTs.\n  c) What do they cost on insert?",
    hints: [
      "Height stays O(log n) regardless of insertion order.",
      "AVL trees and Red-Black trees.",
      "Rotations on insert/delete keep operations O(log n).",
    ],
    tags: ["trees", "BST", "DFS", "BFS", "data structures"],
  },


  {
    id: "trivia-88",
    category: 'trivia',
    difficulty: "medium",
    title: "Trees & Binary Search Trees: LCA",
    prompt: "Answer each of the following:\n\n  a) What is the lowest common ancestor problem?\n  b) How do you find the LCA in a BST efficiently?\n  c) In a general binary tree?",
    hints: [
      "The deepest node that is an ancestor of two given nodes.",
      "Walk from the root: go left/right based on values; the split point is the LCA - O(h).",
      "Recurse; the node where the two targets appear in different subtrees is the LCA.",
    ],
    tags: ["trees", "BST", "DFS", "BFS", "data structures"],
  },


  {
    id: "trivia-89",
    category: 'trivia',
    difficulty: "medium",
    title: "Trees & Binary Search Trees: Height vs depth",
    prompt: "Answer each of the following:\n\n  a) Distinguish height from depth of a node.\n  b) How do you compute tree height recursively?\n  c) What is the base case?",
    hints: [
      "Depth = distance from root; height = distance to the deepest leaf below.",
      "height(node) = 1 + max(height(left), height(right)).",
      "An empty subtree has height 0 (or -1 by some conventions).",
    ],
    tags: ["trees", "BST", "DFS", "BFS", "data structures"],
  },


  {
    id: "trivia-90",
    category: 'trivia',
    difficulty: "medium",
    title: "Trees & Binary Search Trees: BFS vs DFS choice",
    prompt: "Answer each of the following:\n\n  a) When is BFS clearly better than DFS on a tree?\n  b) When is DFS better?\n  c) What is the space trade-off?",
    hints: [
      "BFS for shortest-path-by-edges or level-by-level problems (e.g., level order, min depth).",
      "DFS for path problems, subtree aggregates, or when recursion is natural.",
      "BFS uses O(width) space; DFS uses O(height) stack space.",
    ],
    tags: ["trees", "BST", "DFS", "BFS", "data structures"],
  },


  {
    id: "trivia-91",
    category: 'trivia',
    difficulty: "medium",
    title: "Trees & Binary Search Trees: Serialize",
    prompt: "Answer each of the following:\n\n  a) How do you serialize and deserialize a binary tree?\n  b) Why must nulls be encoded?\n  c) Which traversal is common?",
    hints: [
      "Record nodes in a fixed traversal order, encoding null children explicitly.",
      "Without null markers the structure is ambiguous and cannot be rebuilt.",
      "Pre-order (with null markers) or BFS level-order are both common.",
    ],
    tags: ["trees", "BST", "DFS", "BFS", "data structures"],
  },


  {
    id: "trivia-92",
    category: 'trivia',
    difficulty: "medium",
    title: "Trees & Binary Search Trees: Insert/delete in BST",
    prompt: "Answer each of the following:\n\n  a) How do you insert into a BST?\n  b) What are the three delete cases?\n  c) Why is delete trickier?",
    hints: [
      "Walk down comparing values until you reach a null slot, then attach.",
      "Leaf (remove), one child (splice), two children (replace with in-order successor/predecessor).",
      "The two-child case requires finding a replacement and re-linking.",
    ],
    tags: ["trees", "BST", "DFS", "BFS", "data structures"],
  },


  {
    id: "trivia-93",
    category: 'trivia',
    difficulty: "medium",
    title: "Trees & Binary Search Trees: Tree DP",
    prompt: "Answer each of the following:\n\n  a) What is \"tree DP\" / post-order aggregation?\n  b) Give an example like diameter or max path sum.\n  c) Why post-order?",
    hints: [
      "Compute a value for each node from its children's results in one DFS pass.",
      "Diameter: at each node combine left and right heights; max path sum similarly.",
      "You need children's results before the parent, which is exactly post-order.",
    ],
    tags: ["trees", "BST", "DFS", "BFS", "data structures"],
  },


  {
    id: "trivia-94",
    category: 'trivia',
    difficulty: "medium",
    title: "Subsets & Backtracking: Backtracking template",
    prompt: "Answer each of the following:\n\n  a) Describe the general backtracking template.\n  b) What three things does each recursive call manage?\n  c) What is the time complexity ballpark?",
    hints: [
      "Choose, explore (recurse), un-choose (undo), repeating over options.",
      "A partial solution, the choices remaining, and a base/goal condition.",
      "Often exponential (e.g., O(2^n) for subsets, O(n!) for permutations).",
    ],
    tags: ["backtracking", "subsets", "recursion", "algorithms"],
  },


  {
    id: "trivia-95",
    category: 'trivia',
    difficulty: "medium",
    title: "Subsets & Backtracking: Subsets",
    prompt: "Answer each of the following:\n\n  a) How do you generate all subsets of a set?\n  b) How many subsets are there?\n  c) Two ways to enumerate them?",
    hints: [
      "Backtrack including/excluding each element, recording the current subset at each node.",
      "2^n subsets.",
      "Recursive include/exclude, or iterate a bitmask from 0 to 2^n-1.",
    ],
    tags: ["backtracking", "subsets", "recursion", "algorithms"],
  },


  {
    id: "trivia-96",
    category: 'trivia',
    difficulty: "medium",
    title: "Subsets & Backtracking: Permutations",
    prompt: "Answer each of the following:\n\n  a) How do you generate all permutations?\n  b) How do you avoid reusing an element?\n  c) Count?",
    hints: [
      "Backtrack picking an unused element at each position.",
      "Track a used[] set/array or swap elements in place.",
      "n! permutations.",
    ],
    tags: ["backtracking", "subsets", "recursion", "algorithms"],
  },


  {
    id: "trivia-97",
    category: 'trivia',
    difficulty: "medium",
    title: "Subsets & Backtracking: Combinations",
    prompt: "Answer each of the following:\n\n  a) How do you generate combinations of size k from n?\n  b) How do you avoid duplicates/order?\n  c) Count?",
    hints: [
      "Backtrack choosing the next element only from indices after the current one.",
      "Enforce increasing indices so each combination is generated once.",
      "C(n, k).",
    ],
    tags: ["backtracking", "subsets", "recursion", "algorithms"],
  },


  {
    id: "trivia-98",
    category: 'trivia',
    difficulty: "medium",
    title: "Subsets & Backtracking: Pruning",
    prompt: "Answer each of the following:\n\n  a) What is pruning and why does it matter?\n  b) Give an example pruning condition.\n  c) How does it affect complexity?",
    hints: [
      "Abandoning a branch early when it cannot lead to a valid/optimal solution.",
      "In combination-sum, stop when the running sum exceeds the target.",
      "It cuts the search tree dramatically though worst case can stay exponential.",
    ],
    tags: ["backtracking", "subsets", "recursion", "algorithms"],
  },


  {
    id: "trivia-99",
    category: 'trivia',
    difficulty: "medium",
    title: "Subsets & Backtracking: Duplicates handling",
    prompt: "Answer each of the following:\n\n  a) How do you avoid duplicate subsets/permutations with repeated elements?\n  b) What preprocessing helps?\n  c) What is the skip rule?",
    hints: [
      "Sort first, then skip an element equal to its predecessor at the same recursion depth.",
      "Sorting groups equal elements adjacently.",
      "At a given level, skip nums[i] if nums[i] == nums[i-1] and i-1 was not chosen this branch.",
    ],
    tags: ["backtracking", "subsets", "recursion", "algorithms"],
  },


  {
    id: "trivia-100",
    category: 'trivia',
    difficulty: "medium",
    title: "Subsets & Backtracking: N-Queens",
    prompt: "Answer each of the following:\n\n  a) How does backtracking solve N-Queens?\n  b) What conflicts must you check?\n  c) How do you check diagonals in O(1)?",
    hints: [
      "Place one queen per row, backtracking when a column/diagonal conflicts.",
      "Same column, and both diagonals.",
      "Track occupied columns and the two diagonal keys (row+col and row-col) in sets.",
    ],
    tags: ["backtracking", "subsets", "recursion", "algorithms"],
  },


  {
    id: "trivia-101",
    category: 'trivia',
    difficulty: "medium",
    title: "Subsets & Backtracking: Word search / grid",
    prompt: "Answer each of the following:\n\n  a) How do you backtrack on a grid (e.g., word search)?\n  b) How do you avoid revisiting a cell within a path?\n  c) How do you undo?",
    hints: [
      "DFS from each cell, matching characters and exploring neighbors.",
      "Mark the cell visited (or temporarily mutate it) during the path.",
      "Restore the cell on backtrack so other paths can use it.",
    ],
    tags: ["backtracking", "subsets", "recursion", "algorithms"],
  },


  {
    id: "trivia-102",
    category: 'trivia',
    difficulty: "medium",
    title: "Subsets & Backtracking: Decision tree shape",
    prompt: "Answer each of the following:\n\n  a) How does the branching factor differ for subsets vs permutations?\n  b) Why is permutations' tree wider?\n  c) How does this affect cost?",
    hints: [
      "Subsets: binary include/exclude per element; permutations: branch over all remaining elements.",
      "Each permutation node branches over every unused element, shrinking by one each level.",
      "That gives n! leaves vs 2^n for subsets.",
    ],
    tags: ["backtracking", "subsets", "recursion", "algorithms"],
  },


  {
    id: "trivia-103",
    category: 'trivia',
    difficulty: "medium",
    title: "Subsets & Backtracking: When to use",
    prompt: "Answer each of the following:\n\n  a) What problem signals point to backtracking?\n  b) How is it different from DP?\n  c) When should you prefer DP instead?",
    hints: [
      "\"Generate all\", \"find all combinations/paths\", or constraint-satisfaction phrasing.",
      "Backtracking enumerates the search space; DP reuses overlapping subproblem results.",
      "Use DP when subproblems overlap and you only need an optimal value/count, not every solution.",
    ],
    tags: ["backtracking", "subsets", "recursion", "algorithms"],
  },


  {
    id: "trivia-104",
    category: 'trivia',
    difficulty: "medium",
    title: "Modified Binary Search: Invariant",
    prompt: "Answer each of the following:\n\n  a) What loop invariant must binary search preserve?\n  b) What is the classic off-by-one pitfall?\n  c) How do you avoid infinite loops?",
    hints: [
      "The target, if present, always remains within [low, high].",
      "Mishandling mid, low=mid vs low=mid+1, causing the range not to shrink.",
      "Ensure the search space strictly shrinks each iteration; pick mid and bounds consistently.",
    ],
    tags: ["binary search", "arrays", "algorithms"],
  },


  {
    id: "trivia-105",
    category: 'trivia',
    difficulty: "medium",
    title: "Modified Binary Search: Rotated array",
    prompt: "Answer each of the following:\n\n  a) How do you search a rotated sorted array?\n  b) How do you decide which half is sorted?\n  c) Complexity?",
    hints: [
      "At each step, one half is sorted; check if the target lies within it to pick a side.",
      "Compare nums[low], nums[mid], nums[high] to find the sorted half.",
      "O(log n).",
    ],
    tags: ["binary search", "arrays", "algorithms"],
  },


  {
    id: "trivia-106",
    category: 'trivia',
    difficulty: "medium",
    title: "Modified Binary Search: Find pivot",
    prompt: "Answer each of the following:\n\n  a) How do you find the rotation point / minimum in a rotated array?\n  b) What comparison drives it?\n  c) Edge case?",
    hints: [
      "Binary search comparing nums[mid] to nums[high] to find where the order breaks.",
      "If nums[mid] > nums[high], the min is to the right; else to the left (inclusive).",
      "A non-rotated (already sorted) array - handle it as min at index 0.",
    ],
    tags: ["binary search", "arrays", "algorithms"],
  },


  {
    id: "trivia-107",
    category: 'trivia',
    difficulty: "medium",
    title: "Modified Binary Search: First/last occurrence",
    prompt: "Answer each of the following:\n\n  a) How do you find the first and last index of a target with duplicates?\n  b) How does the search bias toward an edge?\n  c) Why two searches?",
    hints: [
      "Binary search but keep going left (for first) or right (for last) after a match.",
      "On a match, record it and continue toward the desired side instead of stopping.",
      "One biased search for the leftmost, one for the rightmost.",
    ],
    tags: ["binary search", "arrays", "algorithms"],
  },


  {
    id: "trivia-108",
    category: 'trivia',
    difficulty: "medium",
    title: "Modified Binary Search: Search on answer",
    prompt: "Answer each of the following:\n\n  a) What is \"binary search on the answer\"?\n  b) Give an example like minimum capacity to ship in D days.\n  c) What must be monotonic?",
    hints: [
      "Binary-search the answer value and use a feasibility check at each midpoint.",
      "Guess a capacity; check if it ships within D days; shrink the range accordingly.",
      "The feasibility predicate must be monotonic in the candidate value.",
    ],
    tags: ["binary search", "arrays", "algorithms"],
  },


  {
    id: "trivia-109",
    category: 'trivia',
    difficulty: "medium",
    title: "Modified Binary Search: Bound vs exact",
    prompt: "Answer each of the following:\n\n  a) Distinguish finding an exact match from finding a boundary (lower/upper bound).\n  b) When do you want a boundary search?\n  c) How does the comparison change?",
    hints: [
      "Exact stops on equality; boundary keeps narrowing to the insertion point.",
      "When inserting into sorted order or counting elements < / <= x.",
      "Use < vs <= in the comparison to land on lower vs upper bound.",
    ],
    tags: ["binary search", "arrays", "algorithms"],
  },


  {
    id: "trivia-110",
    category: 'trivia',
    difficulty: "medium",
    title: "Modified Binary Search: Infinite/unknown size",
    prompt: "Answer each of the following:\n\n  a) How do you binary search an array of unknown length?\n  b) What is exponential probing?\n  c) Then what?",
    hints: [
      "Double an index until you overshoot, bounding the target, then binary search the range.",
      "Probe indices 1,2,4,8,... until the value exceeds the target.",
      "Binary search between the last in-range and the overshoot index.",
    ],
    tags: ["binary search", "arrays", "algorithms"],
  },


  {
    id: "trivia-111",
    category: 'trivia',
    difficulty: "medium",
    title: "Modified Binary Search: Matrix search",
    prompt: "Answer each of the following:\n\n  a) How do you search a row-and-column-sorted matrix?\n  b) What is the staircase method?\n  c) Complexity?",
    hints: [
      "Start at the top-right; move left if too big, down if too small.",
      "Each step eliminates a row or column, walking a staircase.",
      "O(m + n).",
    ],
    tags: ["binary search", "arrays", "algorithms"],
  },


  {
    id: "trivia-112",
    category: 'trivia',
    difficulty: "medium",
    title: "Modified Binary Search: Peak element",
    prompt: "Answer each of the following:\n\n  a) How do you find a peak element in O(log n)?\n  b) What does comparing mid to mid+1 tell you?\n  c) Why is a peak guaranteed?",
    hints: [
      "Binary search toward the higher neighbor.",
      "If nums[mid] < nums[mid+1], a peak lies to the right; else to the left (inclusive).",
      "With boundaries treated as -infinity, an ascending step always leads to a peak.",
    ],
    tags: ["binary search", "arrays", "algorithms"],
  },


  {
    id: "trivia-113",
    category: 'trivia',
    difficulty: "medium",
    title: "Modified Binary Search: Common mistakes",
    prompt: "Answer each of the following:\n\n  a) What are two frequent binary-search bugs?\n  b) How can integer overflow occur in mid?\n  c) How do you compute mid safely?",
    hints: [
      "Wrong bound updates causing infinite loops, and incorrect mid rounding for boundary searches.",
      "low+high can overflow in fixed-width integers.",
      "Use low + (high - low) / 2.",
    ],
    tags: ["binary search", "arrays", "algorithms"],
  },


  {
    id: "trivia-114",
    category: 'trivia',
    difficulty: "medium",
    title: "Bitwise XOR & Bit Manipulation: XOR properties",
    prompt: "Answer each of the following:\n\n  a) List the key XOR identities.\n  b) What is x ^ x and x ^ 0?\n  c) Is XOR commutative/associative?",
    hints: [
      "x^x=0, x^0=x, and XOR is its own inverse.",
      "x^x = 0; x^0 = x.",
      "Yes - both commutative and associative, so order does not matter.",
    ],
    tags: ["bitwise", "XOR", "bit manipulation", "algorithms"],
  },


  {
    id: "trivia-115",
    category: 'trivia',
    difficulty: "medium",
    title: "Bitwise XOR & Bit Manipulation: Single number",
    prompt: "Answer each of the following:\n\n  a) How does XOR find the one non-duplicated number when all others appear twice?\n  b) Why does it work?\n  c) Complexity?",
    hints: [
      "XOR all elements; pairs cancel to 0, leaving the unique value.",
      "Equal values cancel (x^x=0) and 0 is the identity.",
      "O(n) time, O(1) space.",
    ],
    tags: ["bitwise", "XOR", "bit manipulation", "algorithms"],
  },


  {
    id: "trivia-116",
    category: 'trivia',
    difficulty: "medium",
    title: "Bitwise XOR & Bit Manipulation: Two single numbers",
    prompt: "Answer each of the following:\n\n  a) When two numbers appear once and the rest twice, how do you find both?\n  b) What does the XOR of all give you?\n  c) How do you split into two groups?",
    hints: [
      "XOR all to get a^b; isolate a differing bit to partition elements into two groups.",
      "It yields a^b (the XOR of the two unique numbers).",
      "Pick any set bit of a^b; group by whether that bit is set, then XOR each group.",
    ],
    tags: ["bitwise", "XOR", "bit manipulation", "algorithms"],
  },


  {
    id: "trivia-117",
    category: 'trivia',
    difficulty: "medium",
    title: "Bitwise XOR & Bit Manipulation: Isolate lowest bit",
    prompt: "Answer each of the following:\n\n  a) How do you isolate the lowest set bit of x?\n  b) What does x & -x give?\n  c) Where is this used?",
    hints: [
      "Use x & (-x).",
      "It returns a value with only the lowest set bit of x.",
      "Fenwick/BIT indexing and bit-by-bit iteration.",
    ],
    tags: ["bitwise", "XOR", "bit manipulation", "algorithms"],
  },


  {
    id: "trivia-118",
    category: 'trivia',
    difficulty: "medium",
    title: "Bitwise XOR & Bit Manipulation: Count set bits",
    prompt: "Answer each of the following:\n\n  a) How do you count set bits (popcount)?\n  b) What does x & (x-1) do?\n  c) Complexity of the trick?",
    hints: [
      "Repeatedly clear the lowest set bit and count iterations.",
      "It clears the lowest set bit of x.",
      "O(number of set bits) rather than O(bit width).",
    ],
    tags: ["bitwise", "XOR", "bit manipulation", "algorithms"],
  },


  {
    id: "trivia-119",
    category: 'trivia',
    difficulty: "medium",
    title: "Bitwise XOR & Bit Manipulation: Swap without temp",
    prompt: "Answer each of the following:\n\n  a) How do you swap two values using XOR?\n  b) Write the three steps.\n  c) What is the caveat?",
    hints: [
      "a ^= b; b ^= a; a ^= b.",
      "Each line XORs in place to exchange the values.",
      "Fails if a and b are the same memory location (both become 0).",
    ],
    tags: ["bitwise", "XOR", "bit manipulation", "algorithms"],
  },


  {
    id: "trivia-120",
    category: 'trivia',
    difficulty: "medium",
    title: "Bitwise XOR & Bit Manipulation: Missing number via XOR",
    prompt: "Answer each of the following:\n\n  a) How do you find the missing number in 0..n with XOR?\n  b) What do you XOR together?\n  c) Why does it isolate the missing value?",
    hints: [
      "XOR all indices 0..n with all array values; the result is the missing number.",
      "XOR of the full range and the present values.",
      "Every present number cancels with its index match, leaving the absent one.",
    ],
    tags: ["bitwise", "XOR", "bit manipulation", "algorithms"],
  },


  {
    id: "trivia-121",
    category: 'trivia',
    difficulty: "medium",
    title: "Bitwise XOR & Bit Manipulation: Masks and flags",
    prompt: "Answer each of the following:\n\n  a) How do you set, clear, and test a bit?\n  b) Give the bit operations.\n  c) Where are bitmasks used in algorithms?",
    hints: [
      "Set: x | (1<<i); clear: x & ~(1<<i); test: (x >> i) & 1.",
      "Shift a 1 to position i and OR/AND-NOT/AND.",
      "Subset enumeration and bitmask DP (e.g., traveling salesman).",
    ],
    tags: ["bitwise", "XOR", "bit manipulation", "algorithms"],
  },


  {
    id: "trivia-122",
    category: 'trivia',
    difficulty: "medium",
    title: "Bitwise XOR & Bit Manipulation: Power of two",
    prompt: "Answer each of the following:\n\n  a) How do you test if n is a power of two?\n  b) Why does n & (n-1) == 0 work?\n  c) What about n = 0?",
    hints: [
      "Check n > 0 and (n & (n-1)) == 0.",
      "A power of two has exactly one set bit; subtracting 1 flips it and the trailing zeros.",
      "Must exclude 0 explicitly since 0 & -1 == 0.",
    ],
    tags: ["bitwise", "XOR", "bit manipulation", "algorithms"],
  },


  {
    id: "trivia-123",
    category: 'trivia',
    difficulty: "medium",
    title: "Bitwise XOR & Bit Manipulation: XOR for parity/checksums",
    prompt: "Answer each of the following:\n\n  a) How is XOR used for parity or simple error detection?\n  b) What does the XOR of a data block represent?\n  c) Limitation?",
    hints: [
      "XOR all bits/bytes to produce a parity bit or checksum.",
      "It captures the parity (odd/even count of set bits) of the data.",
      "It detects single-bit errors but misses many multi-bit errors.",
    ],
    tags: ["bitwise", "XOR", "bit manipulation", "algorithms"],
  },


  {
    id: "trivia-124",
    category: 'trivia',
    difficulty: "medium",
    title: "K-Way Merge: Core idea",
    prompt: "Answer each of the following:\n\n  a) What problem does k-way merge solve?\n  b) What data structure drives it?\n  c) Complexity?",
    hints: [
      "Merging k sorted sequences into one sorted output.",
      "A min-heap holding the current front of each sequence.",
      "O(N log k) where N is total elements.",
    ],
    tags: ["k-way merge", "heaps", "sorting", "algorithms"],
  },


  {
    id: "trivia-125",
    category: 'trivia',
    difficulty: "medium",
    title: "K-Way Merge: Merge K lists",
    prompt: "Answer each of the following:\n\n  a) How do you merge k sorted linked lists with a heap?\n  b) What do you push back after each pop?\n  c) Why only k items in the heap?",
    hints: [
      "Seed the heap with each list's head; pop the min and push its successor.",
      "The next node from the same list as the popped node.",
      "Only one node per list is in the heap at any time.",
    ],
    tags: ["k-way merge", "heaps", "sorting", "algorithms"],
  },


  {
    id: "trivia-126",
    category: 'trivia',
    difficulty: "medium",
    title: "K-Way Merge: Smallest range",
    prompt: "Answer each of the following:\n\n  a) How do you find the smallest range covering at least one element from each of k lists?\n  b) What does the heap track?\n  c) How do you advance?",
    hints: [
      "Use a min-heap of one element per list; track the current max; the range is [heap min, max].",
      "The smallest current element across lists plus the running max.",
      "Pop the min and push the next from that same list, updating the range.",
    ],
    tags: ["k-way merge", "heaps", "sorting", "algorithms"],
  },


  {
    id: "trivia-127",
    category: 'trivia',
    difficulty: "medium",
    title: "K-Way Merge: Kth smallest in matrix",
    prompt: "Answer each of the following:\n\n  a) How do you find the kth smallest in row-sorted (and column-sorted) matrix?\n  b) Heap approach?\n  c) Alternative?",
    hints: [
      "Treat each row as a sorted list and k-way merge until you pop k times.",
      "Push the first element of each row; pop k times, pushing the next in the popped row.",
      "Binary search on the value range with a count-of-<=x check.",
    ],
    tags: ["k-way merge", "heaps", "sorting", "algorithms"],
  },


  {
    id: "trivia-128",
    category: 'trivia',
    difficulty: "medium",
    title: "K-Way Merge: Merge vs heap-all",
    prompt: "Answer each of the following:\n\n  a) Why not just concatenate all elements and sort?\n  b) When is k-way merge clearly better?\n  c) What does the heap save?",
    hints: [
      "Sorting everything is O(N log N); k-way merge is O(N log k) which is better when k << N.",
      "When you have many short pre-sorted runs.",
      "It only ever compares k front elements, not all N.",
    ],
    tags: ["k-way merge", "heaps", "sorting", "algorithms"],
  },


  {
    id: "trivia-129",
    category: 'trivia',
    difficulty: "medium",
    title: "K-Way Merge: External sort",
    prompt: "Answer each of the following:\n\n  a) How does k-way merge enable sorting data larger than memory?\n  b) What are the runs?\n  c) What is the merge phase?",
    hints: [
      "Sort chunks that fit in memory into runs, then k-way merge the runs from disk.",
      "Pre-sorted on-disk segments produced in the first pass.",
      "Stream the fronts of all runs through a heap, writing sorted output.",
    ],
    tags: ["k-way merge", "heaps", "sorting", "algorithms"],
  },


  {
    id: "trivia-130",
    category: 'trivia',
    difficulty: "medium",
    title: "K-Way Merge: Heap contents",
    prompt: "Answer each of the following:\n\n  a) What metadata must each heap entry carry in k-way merge?\n  b) Why store the source index?\n  c) Why the element position?",
    hints: [
      "The value plus which list it came from (and position in that list).",
      "So you know which list to pull the next element from.",
      "To fetch the successor in array-backed inputs.",
    ],
    tags: ["k-way merge", "heaps", "sorting", "algorithms"],
  },


  {
    id: "trivia-131",
    category: 'trivia',
    difficulty: "medium",
    title: "K-Way Merge: Stability",
    prompt: "Answer each of the following:\n\n  a) Is k-way merge stable?\n  b) How do you break ties to preserve order?\n  c) Why might stability matter?",
    hints: [
      "It can be made stable with proper tie-breaking.",
      "Break ties by source-list index (and original position).",
      "To keep equal keys in their original relative order, e.g., for sorting records.",
    ],
    tags: ["k-way merge", "heaps", "sorting", "algorithms"],
  },


  {
    id: "trivia-132",
    category: 'trivia',
    difficulty: "medium",
    title: "K-Way Merge: Two-list special case",
    prompt: "Answer each of the following:\n\n  a) How does k-way merge reduce to the classic two-pointer merge when k=2?\n  b) Do you need a heap then?\n  c) Complexity?",
    hints: [
      "With two lists you just compare two fronts - the merge step of merge sort.",
      "No heap needed; a simple comparison suffices.",
      "O(n+m).",
    ],
    tags: ["k-way merge", "heaps", "sorting", "algorithms"],
  },


  {
    id: "trivia-133",
    category: 'trivia',
    difficulty: "medium",
    title: "K-Way Merge: Streaming merge",
    prompt: "Answer each of the following:\n\n  a) How do you merge k live/streaming sorted sources?\n  b) What assumption must hold?\n  c) What is the risk?",
    hints: [
      "Keep a heap of the latest value from each stream and emit the min as inputs arrive.",
      "Each individual stream must arrive in sorted order.",
      "A stalled stream can block progress since you cannot emit past its pending min.",
    ],
    tags: ["k-way merge", "heaps", "sorting", "algorithms"],
  },


  {
    id: "trivia-134",
    category: 'trivia',
    difficulty: "medium",
    title: "Dynamic Programming: When DP applies",
    prompt: "Answer each of the following:\n\n  a) What two properties must a problem have for DP?\n  b) Define each.\n  c) How is DP different from divide and conquer?",
    hints: [
      "Optimal substructure and overlapping subproblems.",
      "Optimal substructure: the optimum is built from subproblem optima. Overlapping: the same subproblems recur.",
      "Divide and conquer subproblems are independent (no overlap); DP reuses overlapping ones.",
    ],
    tags: ["dynamic programming", "DP", "algorithms"],
  },


  {
    id: "trivia-135",
    category: 'trivia',
    difficulty: "medium",
    title: "Dynamic Programming: Memo vs tabulation",
    prompt: "Answer each of the following:\n\n  a) Top-down vs bottom-up DP - define both.\n  b) What is the trade-off?\n  c) Which is easier to derive?",
    hints: [
      "Top-down: recursion + cache. Bottom-up: iterative table fill from base cases.",
      "Top-down only computes needed states but has recursion overhead; bottom-up can be optimized for space.",
      "Top-down often mirrors the recurrence more directly.",
    ],
    tags: ["dynamic programming", "DP", "algorithms"],
  },


  {
    id: "trivia-136",
    category: 'trivia',
    difficulty: "medium",
    title: "Dynamic Programming: Defining state",
    prompt: "Answer each of the following:\n\n  a) How do you identify the DP state?\n  b) Walk through state for the knapsack problem.\n  c) Why does a good state matter?",
    hints: [
      "State = the minimal information to describe a subproblem uniquely.",
      "Knapsack state: (item index, remaining capacity) -> best value.",
      "A poor state leads to wrong recurrences or exponential blowup.",
    ],
    tags: ["dynamic programming", "DP", "algorithms"],
  },


  {
    id: "trivia-137",
    category: 'trivia',
    difficulty: "medium",
    title: "Dynamic Programming: 1D problems",
    prompt: "Answer each of the following:\n\n  a) Outline the DP for climbing stairs / Fibonacci.\n  b) What is the recurrence?\n  c) Space optimization?",
    hints: [
      "dp[i] = ways to reach step i.",
      "dp[i] = dp[i-1] + dp[i-2].",
      "Keep only the last two values -> O(1) space.",
    ],
    tags: ["dynamic programming", "DP", "algorithms"],
  },


  {
    id: "trivia-138",
    category: 'trivia',
    difficulty: "medium",
    title: "Dynamic Programming: Knapsack 0/1",
    prompt: "Answer each of the following:\n\n  a) What is the 0/1 knapsack recurrence?\n  b) Why iterate capacity backward in the 1D version?\n  c) Complexity?",
    hints: [
      "dp[w] = max(dp[w], dp[w - weight] + value) for each item.",
      "Backward iteration prevents reusing an item more than once.",
      "O(n * W).",
    ],
    tags: ["dynamic programming", "DP", "algorithms"],
  },


  {
    id: "trivia-139",
    category: 'trivia',
    difficulty: "medium",
    title: "Dynamic Programming: LCS / edit distance",
    prompt: "Answer each of the following:\n\n  a) How do you set up the LCS DP table?\n  b) What does dp[i][j] mean?\n  c) How does the recurrence branch?",
    hints: [
      "A 2D table over prefixes of the two strings.",
      "Length of the LCS of the first i and first j characters.",
      "If chars match, 1 + diagonal; else max of left/top.",
    ],
    tags: ["dynamic programming", "DP", "algorithms"],
  },


  {
    id: "trivia-140",
    category: 'trivia',
    difficulty: "medium",
    title: "Dynamic Programming: Unbounded knapsack",
    prompt: "Answer each of the following:\n\n  a) How does coin change (fewest coins) differ from 0/1 knapsack?\n  b) What is the recurrence?\n  c) Why forward iteration?",
    hints: [
      "Coins are reusable (unlimited supply), unlike one-shot items.",
      "dp[x] = min over coins c of dp[x-c] + 1.",
      "Forward iteration lets a coin be reused within the same dp build.",
    ],
    tags: ["dynamic programming", "DP", "algorithms"],
  },


  {
    id: "trivia-141",
    category: 'trivia',
    difficulty: "medium",
    title: "Dynamic Programming: LIS",
    prompt: "Answer each of the following:\n\n  a) How do you compute the longest increasing subsequence?\n  b) What is the O(n^2) DP?\n  c) How does the O(n log n) approach work?",
    hints: [
      "dp[i] = LIS ending at i = 1 + max(dp[j]) for j<i with nums[j]<nums[i].",
      "For each i, scan all earlier j -> O(n^2).",
      "Maintain tails of increasing subsequences and binary-search the insertion point -> O(n log n).",
    ],
    tags: ["dynamic programming", "DP", "algorithms"],
  },


  {
    id: "trivia-142",
    category: 'trivia',
    difficulty: "medium",
    title: "Dynamic Programming: Interval/partition DP",
    prompt: "Answer each of the following:\n\n  a) What characterizes interval DP?\n  b) Give an example (matrix chain / burst balloons).\n  c) What is the typical state?",
    hints: [
      "Subproblems defined over sub-intervals [i, j], combined at a split point k.",
      "Matrix chain multiplication or burst balloons.",
      "dp[i][j] = best over all splits k in (i, j).",
    ],
    tags: ["dynamic programming", "DP", "algorithms"],
  },


  {
    id: "trivia-143",
    category: 'trivia',
    difficulty: "medium",
    title: "Dynamic Programming: Common pitfalls",
    prompt: "Answer each of the following:\n\n  a) What are two common DP mistakes?\n  b) How do you verify a recurrence?\n  c) How do you handle base cases?",
    hints: [
      "Wrong state definition and incorrect iteration order (using not-yet-computed states).",
      "Check it on small inputs by hand and confirm dependencies are filled first.",
      "Initialize base cases explicitly before the main loop.",
    ],
    tags: ["dynamic programming", "DP", "algorithms"],
  },


  {
    id: "trivia-144",
    category: 'trivia',
    difficulty: "medium",
    title: "Topological Sort: Definition",
    prompt: "Answer each of the following:\n\n  a) What is a topological ordering?\n  b) What graph property is required?\n  c) Why?",
    hints: [
      "A linear order of vertices where every edge goes from earlier to later.",
      "The graph must be a DAG (directed acyclic graph).",
      "A cycle has no valid linear ordering - dependencies would be circular.",
    ],
    tags: ["topological sort", "graphs", "DAG", "algorithms"],
  },


  {
    id: "trivia-145",
    category: 'trivia',
    difficulty: "medium",
    title: "Topological Sort: Kahn's algorithm",
    prompt: "Answer each of the following:\n\n  a) Describe Kahn's BFS-based topological sort.\n  b) What kicks off the queue?\n  c) How do you detect a cycle?",
    hints: [
      "Repeatedly remove nodes with in-degree 0, decrementing neighbors' in-degrees.",
      "All nodes with in-degree 0 start in the queue.",
      "If you process fewer than V nodes, a cycle exists.",
    ],
    tags: ["topological sort", "graphs", "DAG", "algorithms"],
  },


  {
    id: "trivia-146",
    category: 'trivia',
    difficulty: "medium",
    title: "Topological Sort: DFS-based",
    prompt: "Answer each of the following:\n\n  a) How does DFS produce a topological order?\n  b) When do you record a node?\n  c) Why reverse?",
    hints: [
      "DFS each node; push it onto a stack after exploring all its descendants.",
      "On the post-order/finish step.",
      "The reverse of finish order is a valid topological order.",
    ],
    tags: ["topological sort", "graphs", "DAG", "algorithms"],
  },


  {
    id: "trivia-147",
    category: 'trivia',
    difficulty: "medium",
    title: "Topological Sort: Cycle detection",
    prompt: "Answer each of the following:\n\n  a) How do you detect a cycle during DFS topo sort?\n  b) What three node states help?\n  c) What indicates a back edge?",
    hints: [
      "Track visiting (in-stack) vs visited nodes.",
      "Unvisited, in-progress (on the recursion stack), done.",
      "Reaching an in-progress node means a back edge -> cycle.",
    ],
    tags: ["topological sort", "graphs", "DAG", "algorithms"],
  },


  {
    id: "trivia-148",
    category: 'trivia',
    difficulty: "medium",
    title: "Topological Sort: Course schedule",
    prompt: "Answer each of the following:\n\n  a) How does course-schedule map to topo sort?\n  b) What are nodes and edges?\n  c) What does a cycle mean?",
    hints: [
      "Prerequisites form a dependency DAG; a valid schedule is a topo order.",
      "Courses are nodes; prerequisite a->b is an edge.",
      "A cycle means the prerequisites are impossible to satisfy.",
    ],
    tags: ["topological sort", "graphs", "DAG", "algorithms"],
  },


  {
    id: "trivia-149",
    category: 'trivia',
    difficulty: "medium",
    title: "Topological Sort: Multiple orderings",
    prompt: "Answer each of the following:\n\n  a) Why can a DAG have multiple valid topo orders?\n  b) When is the order unique?\n  c) How do you get a deterministic one?",
    hints: [
      "Independent nodes (no ordering constraint between them) can appear in any relative order.",
      "Unique iff there is a Hamiltonian path - each step has exactly one in-degree-0 choice.",
      "Break ties deterministically (e.g., smallest id first) using a min-heap in Kahn's.",
    ],
    tags: ["topological sort", "graphs", "DAG", "algorithms"],
  },


  {
    id: "trivia-150",
    category: 'trivia',
    difficulty: "medium",
    title: "Topological Sort: Complexity",
    prompt: "Answer each of the following:\n\n  a) What is the time and space complexity?\n  b) Why linear in V+E?\n  c) What structures do you maintain?",
    hints: [
      "O(V + E) time and space.",
      "Each node and edge is processed a constant number of times.",
      "In-degree counts (Kahn) or a visited/stack set (DFS), plus the adjacency list.",
    ],
    tags: ["topological sort", "graphs", "DAG", "algorithms"],
  },


  {
    id: "trivia-151",
    category: 'trivia',
    difficulty: "medium",
    title: "Topological Sort: Applications",
    prompt: "Answer each of the following:\n\n  a) List three real applications of topological sort.\n  b) Why do build systems use it?\n  c) Spreadsheets?",
    hints: [
      "Build/dependency resolution, task scheduling, course planning.",
      "To compile/build modules only after their dependencies.",
      "To recompute cells in dependency order without using stale values.",
    ],
    tags: ["topological sort", "graphs", "DAG", "algorithms"],
  },


  {
    id: "trivia-152",
    category: 'trivia',
    difficulty: "medium",
    title: "Topological Sort: Lexicographically smallest",
    prompt: "Answer each of the following:\n\n  a) How do you produce the lexicographically smallest topo order?\n  b) Which variant of Kahn helps?\n  c) Complexity impact?",
    hints: [
      "Use a min-heap (priority queue) instead of a plain queue in Kahn's algorithm.",
      "Always extend with the smallest available in-degree-0 node.",
      "It becomes O((V+E) log V).",
    ],
    tags: ["topological sort", "graphs", "DAG", "algorithms"],
  },


  {
    id: "trivia-153",
    category: 'trivia',
    difficulty: "medium",
    title: "Topological Sort: Kahn vs DFS",
    prompt: "Answer each of the following:\n\n  a) Compare Kahn's and DFS topo sort.\n  b) Which more naturally reports cycles?\n  c) Which gives lexicographic control?",
    hints: [
      "Kahn is iterative/BFS-style; DFS uses recursion and finish times.",
      "Both can, but Kahn detects it simply via the processed-count.",
      "Kahn with a priority queue gives easy lexicographic ordering.",
    ],
    tags: ["topological sort", "graphs", "DAG", "algorithms"],
  },


  {
    id: "trivia-154",
    category: 'trivia',
    difficulty: "medium",
    title: "Trie (Prefix Tree): Structure",
    prompt: "Answer each of the following:\n\n  a) What does each trie node store?\n  b) What does the root represent?\n  c) What marks a complete word?",
    hints: [
      "A map of child characters to child nodes, plus an end-of-word flag.",
      "An empty prefix - it holds no character itself.",
      "A boolean isEnd set true at the last character of an inserted word.",
    ],
    tags: ["trie", "prefix tree", "strings", "data structures"],
  },


  {
    id: "trivia-155",
    category: 'trivia',
    difficulty: "medium",
    title: "Trie (Prefix Tree): Operations",
    prompt: "Answer each of the following:\n\n  a) How do insert, search, and startsWith work?\n  b) How does search differ from startsWith?\n  c) Complexity of each?",
    hints: [
      "Walk character by character, creating nodes on insert.",
      "Search checks isEnd at the final node; startsWith only checks the path exists.",
      "O(L) where L is the word/prefix length.",
    ],
    tags: ["trie", "prefix tree", "strings", "data structures"],
  },


  {
    id: "trivia-156",
    category: 'trivia',
    difficulty: "medium",
    title: "Trie (Prefix Tree): Why a trie",
    prompt: "Answer each of the following:\n\n  a) Why use a trie over a hash set for prefix queries?\n  b) What does a hash set struggle with?\n  c) Trade-off?",
    hints: [
      "Tries give efficient prefix lookups and ordered traversal of words.",
      "A hash set cannot answer \"any word with this prefix\" without scanning all keys.",
      "Tries use more memory per node (one node per character).",
    ],
    tags: ["trie", "prefix tree", "strings", "data structures"],
  },


  {
    id: "trivia-157",
    category: 'trivia',
    difficulty: "medium",
    title: "Trie (Prefix Tree): Autocomplete",
    prompt: "Answer each of the following:\n\n  a) How does a trie power autocomplete?\n  b) How do you get all completions of a prefix?\n  c) How do you rank them?",
    hints: [
      "Navigate to the prefix node, then DFS to collect all words below it.",
      "Traverse the subtree under the prefix node.",
      "Store frequency/score at end nodes or precompute top-k per node.",
    ],
    tags: ["trie", "prefix tree", "strings", "data structures"],
  },


  {
    id: "trivia-158",
    category: 'trivia',
    difficulty: "medium",
    title: "Trie (Prefix Tree): Memory",
    prompt: "Answer each of the following:\n\n  a) What is the memory concern with tries?\n  b) How do you compress them?\n  c) What is a radix/Patricia trie?",
    hints: [
      "One node per character can be wasteful for sparse data.",
      "Merge chains of single-child nodes.",
      "A radix trie collapses single-child paths into edges labeled with strings.",
    ],
    tags: ["trie", "prefix tree", "strings", "data structures"],
  },


  {
    id: "trivia-159",
    category: 'trivia',
    difficulty: "medium",
    title: "Trie (Prefix Tree): Wildcard search",
    prompt: "Answer each of the following:\n\n  a) How do you support \".\" wildcard matching in a trie (add-and-search words)?\n  b) What changes in search?\n  c) Complexity impact?",
    hints: [
      "On a wildcard, recurse into all children rather than one.",
      "Search branches over every child when the current pattern char is a wildcard.",
      "Worst case it explores many branches, raising cost above O(L).",
    ],
    tags: ["trie", "prefix tree", "strings", "data structures"],
  },


  {
    id: "trivia-160",
    category: 'trivia',
    difficulty: "medium",
    title: "Trie (Prefix Tree): Word search II",
    prompt: "Answer each of the following:\n\n  a) How does a trie accelerate finding many words in a grid?\n  b) Why is it better than searching each word?\n  c) What pruning does it allow?",
    hints: [
      "Build a trie of the word list and DFS the grid against the trie simultaneously.",
      "You match all words in one traversal instead of one DFS per word.",
      "Prune a grid branch the moment no trie path matches.",
    ],
    tags: ["trie", "prefix tree", "strings", "data structures"],
  },


  {
    id: "trivia-161",
    category: 'trivia',
    difficulty: "medium",
    title: "Trie (Prefix Tree): Counting",
    prompt: "Answer each of the following:\n\n  a) How do you count words with a given prefix in a trie?\n  b) What extra field helps?\n  c) When do you update it?",
    hints: [
      "Store a prefix-count at each node.",
      "A counter incremented along the insert path.",
      "Increment every node on the path during insert.",
    ],
    tags: ["trie", "prefix tree", "strings", "data structures"],
  },


  {
    id: "trivia-162",
    category: 'trivia',
    difficulty: "medium",
    title: "Trie (Prefix Tree): Deletion",
    prompt: "Answer each of the following:\n\n  a) How do you delete a word from a trie?\n  b) When can you prune nodes?\n  c) What must you not remove?",
    hints: [
      "Unset the end flag; then prune nodes that have no children and are not word-ends.",
      "Only prune nodes that are not part of another word.",
      "Do not remove nodes shared by other words.",
    ],
    tags: ["trie", "prefix tree", "strings", "data structures"],
  },


  {
    id: "trivia-163",
    category: 'trivia',
    difficulty: "medium",
    title: "Trie (Prefix Tree): Trie vs BST",
    prompt: "Answer each of the following:\n\n  a) Compare a trie to a balanced BST for string keys.\n  b) How does lookup cost compare?\n  c) When is each preferable?",
    hints: [
      "Trie lookup is O(L) independent of the number of keys; BST is O(L log n) due to comparisons.",
      "Trie avoids the log n factor but uses more memory.",
      "Trie for prefix queries/autocomplete; BST when memory is tight or you need ordered range queries.",
    ],
    tags: ["trie", "prefix tree", "strings", "data structures"],
  },


  {
    id: "trivia-164",
    category: 'trivia',
    difficulty: "medium",
    title: "Union-Find (Disjoint Set): Purpose",
    prompt: "Answer each of the following:\n\n  a) What problem does union-find solve?\n  b) What two operations does it support?\n  c) Typical use cases?",
    hints: [
      "Tracking a partition of elements into disjoint sets with fast merge and membership queries.",
      "find(x) (which set) and union(a, b) (merge sets).",
      "Connectivity, cycle detection in undirected graphs, Kruskal's MST.",
    ],
    tags: ["union-find", "disjoint set", "graphs", "data structures"],
  },


  {
    id: "trivia-165",
    category: 'trivia',
    difficulty: "medium",
    title: "Union-Find (Disjoint Set): Find with path compression",
    prompt: "Answer each of the following:\n\n  a) What does find do?\n  b) How does path compression speed it up?\n  c) Effect on the tree?",
    hints: [
      "Follows parent pointers to the set's root/representative.",
      "It re-points visited nodes directly to the root during the find.",
      "It flattens the tree so future finds are near O(1).",
    ],
    tags: ["union-find", "disjoint set", "graphs", "data structures"],
  },


  {
    id: "trivia-166",
    category: 'trivia',
    difficulty: "medium",
    title: "Union-Find (Disjoint Set): Union by rank/size",
    prompt: "Answer each of the following:\n\n  a) What is union by rank (or size)?\n  b) Why attach the smaller tree under the larger?\n  c) Effect on height?",
    hints: [
      "Always attach the shorter/smaller tree under the taller/larger root.",
      "It keeps trees shallow, avoiding long chains.",
      "Height stays logarithmic (near constant with compression).",
    ],
    tags: ["union-find", "disjoint set", "graphs", "data structures"],
  },


  {
    id: "trivia-167",
    category: 'trivia',
    difficulty: "medium",
    title: "Union-Find (Disjoint Set): Complexity",
    prompt: "Answer each of the following:\n\n  a) What is the amortized complexity with both optimizations?\n  b) What is the inverse Ackermann function?\n  c) Practical meaning?",
    hints: [
      "Nearly O(1) amortized - O(alpha(n)) per operation.",
      "alpha(n), the inverse Ackermann, grows astronomically slowly.",
      "For all practical n, alpha(n) <= 4, so effectively constant.",
    ],
    tags: ["union-find", "disjoint set", "graphs", "data structures"],
  },


  {
    id: "trivia-168",
    category: 'trivia',
    difficulty: "medium",
    title: "Union-Find (Disjoint Set): Cycle detection",
    prompt: "Answer each of the following:\n\n  a) How does union-find detect a cycle in an undirected graph?\n  b) What happens when you union two already-connected nodes?\n  c) Why does this work?",
    hints: [
      "For each edge, union its endpoints; if they share a root already, that edge forms a cycle.",
      "find(a) == find(b) before union means they are already connected.",
      "Connecting two nodes in the same set closes a loop.",
    ],
    tags: ["union-find", "disjoint set", "graphs", "data structures"],
  },


  {
    id: "trivia-169",
    category: 'trivia',
    difficulty: "medium",
    title: "Union-Find (Disjoint Set): Connected components",
    prompt: "Answer each of the following:\n\n  a) How do you count connected components with union-find?\n  b) What is the initial count?\n  c) How does it change?",
    hints: [
      "Start with each node its own set; union edges; count distinct roots.",
      "Initially n components (one per node).",
      "Each successful union (different roots) decrements the count by 1.",
    ],
    tags: ["union-find", "disjoint set", "graphs", "data structures"],
  },


  {
    id: "trivia-170",
    category: 'trivia',
    difficulty: "medium",
    title: "Union-Find (Disjoint Set): Kruskal's MST",
    prompt: "Answer each of the following:\n\n  a) How does Kruskal's use union-find?\n  b) What order are edges considered?\n  c) When is an edge added?",
    hints: [
      "Sort edges by weight; add an edge if it connects two different sets.",
      "Ascending by weight.",
      "Add it iff find(u) != find(v), then union them; skip otherwise (would cycle).",
    ],
    tags: ["union-find", "disjoint set", "graphs", "data structures"],
  },


  {
    id: "trivia-171",
    category: 'trivia',
    difficulty: "medium",
    title: "Union-Find (Disjoint Set): Representative",
    prompt: "Answer each of the following:\n\n  a) What is the \"representative\" / root of a set?\n  b) Why must find be consistent?\n  c) How do two elements test as connected?",
    hints: [
      "The canonical root node identifying the set.",
      "So equality of roots reliably means \"same set\".",
      "connected(a,b) iff find(a) == find(b).",
    ],
    tags: ["union-find", "disjoint set", "graphs", "data structures"],
  },


  {
    id: "trivia-172",
    category: 'trivia',
    difficulty: "medium",
    title: "Union-Find (Disjoint Set): Grid problems",
    prompt: "Answer each of the following:\n\n  a) How does union-find apply to grid problems like number of islands?\n  b) What do you union?\n  c) Alternative approach?",
    hints: [
      "Treat each land cell as a node and union adjacent land cells; count roots.",
      "Union a cell with its land neighbors.",
      "BFS/DFS flood fill is the common alternative.",
    ],
    tags: ["union-find", "disjoint set", "graphs", "data structures"],
  },


  {
    id: "trivia-173",
    category: 'trivia',
    difficulty: "medium",
    title: "Union-Find (Disjoint Set): Limitations",
    prompt: "Answer each of the following:\n\n  a) What can union-find NOT do well?\n  b) Can you easily split a set?\n  c) What about directed connectivity?",
    hints: [
      "It does not support efficient deletion/splitting of unions.",
      "No - union-find is union-only; un-merging is not a cheap operation.",
      "It models undirected connectivity, not directed reachability.",
    ],
    tags: ["union-find", "disjoint set", "graphs", "data structures"],
  },


  {
    id: "trivia-174",
    category: 'trivia',
    difficulty: "medium",
    title: "Monotonic Stack: Concept",
    prompt: "Answer each of the following:\n\n  a) What is a monotonic stack?\n  b) What does it efficiently answer?\n  c) Complexity?",
    hints: [
      "A stack whose elements stay in increasing or decreasing order as you push.",
      "Next/previous greater or smaller element queries.",
      "O(n) - each element is pushed and popped once.",
    ],
    tags: ["monotonic stack", "stack", "arrays", "algorithms"],
  },


  {
    id: "trivia-175",
    category: 'trivia',
    difficulty: "medium",
    title: "Monotonic Stack: Next greater element",
    prompt: "Answer each of the following:\n\n  a) How do you compute the next greater element for each item?\n  b) Increasing or decreasing stack?\n  c) What do you store?",
    hints: [
      "Scan right to left (or left to right), popping until the stack top is greater.",
      "A decreasing stack (of values or indices).",
      "Indices are common so you can compute distances.",
    ],
    tags: ["monotonic stack", "stack", "arrays", "algorithms"],
  },


  {
    id: "trivia-176",
    category: 'trivia',
    difficulty: "medium",
    title: "Monotonic Stack: Daily temperatures",
    prompt: "Answer each of the following:\n\n  a) How does a monotonic stack solve daily temperatures?\n  b) What does popping mean?\n  c) What is the answer per popped index?",
    hints: [
      "Keep a decreasing stack of indices; a warmer day resolves cooler days on the stack.",
      "Each pop has found its next warmer day.",
      "answer[popped] = current index - popped index.",
    ],
    tags: ["monotonic stack", "stack", "arrays", "algorithms"],
  },


  {
    id: "trivia-177",
    category: 'trivia',
    difficulty: "medium",
    title: "Monotonic Stack: Largest rectangle in histogram",
    prompt: "Answer each of the following:\n\n  a) How does a monotonic stack find the largest rectangle?\n  b) What does the stack hold?\n  c) How do you compute width on pop?",
    hints: [
      "An increasing stack of bar indices; when a shorter bar appears, pop and compute areas.",
      "Indices of bars in increasing height.",
      "Width spans from the new index back to the index below the popped one.",
    ],
    tags: ["monotonic stack", "stack", "arrays", "algorithms"],
  },


  {
    id: "trivia-178",
    category: 'trivia',
    difficulty: "medium",
    title: "Monotonic Stack: Prev smaller / greater",
    prompt: "Answer each of the following:\n\n  a) How do you get the previous smaller element for each item?\n  b) Which stack direction?\n  c) When do you pop?",
    hints: [
      "Scan left to right with an increasing stack; the top after popping is the previous smaller.",
      "Increasing stack.",
      "Pop while the top is >= the current element.",
    ],
    tags: ["monotonic stack", "stack", "arrays", "algorithms"],
  },


  {
    id: "trivia-179",
    category: 'trivia',
    difficulty: "medium",
    title: "Monotonic Stack: Indices vs values",
    prompt: "Answer each of the following:\n\n  a) Why store indices instead of values on the stack?\n  b) What does this enable?\n  c) Example?",
    hints: [
      "Indices let you compute distances and look up values as needed.",
      "Distance-to-next-greater and width spans.",
      "Daily temperatures needs the index gap; histogram needs widths.",
    ],
    tags: ["monotonic stack", "stack", "arrays", "algorithms"],
  },


  {
    id: "trivia-180",
    category: 'trivia',
    difficulty: "medium",
    title: "Monotonic Stack: Trapping rain water",
    prompt: "Answer each of the following:\n\n  a) How can a monotonic stack solve trapping rain water?\n  b) What do you do on a taller bar?\n  c) Alternative method?",
    hints: [
      "Keep a decreasing stack; when a taller bar arrives, pop and add trapped water bounded by left and right walls.",
      "Pop the basin floor and add water = (min(left,right) - floor) * width.",
      "Two-pointer approach also solves it in O(n) O(1).",
    ],
    tags: ["monotonic stack", "stack", "arrays", "algorithms"],
  },


  {
    id: "trivia-181",
    category: 'trivia',
    difficulty: "medium",
    title: "Monotonic Stack: Stock span",
    prompt: "Answer each of the following:\n\n  a) How does the stock-span problem use a monotonic stack?\n  b) What does the span count?\n  c) What do you pop?",
    hints: [
      "Maintain a decreasing stack of prices/indices to count consecutive prior days <= today.",
      "The number of consecutive previous days with price <= today.",
      "Pop days with price <= today, accumulating their spans.",
    ],
    tags: ["monotonic stack", "stack", "arrays", "algorithms"],
  },


  {
    id: "trivia-182",
    category: 'trivia',
    difficulty: "medium",
    title: "Monotonic Stack: Circular arrays",
    prompt: "Answer each of the following:\n\n  a) How do you handle \"next greater element\" in a circular array?\n  b) What trick simulates wraparound?\n  c) Complexity?",
    hints: [
      "Iterate the array twice (indices mod n) with the same monotonic stack.",
      "Looping 2n times lets later-wrapping elements resolve earlier ones.",
      "Still O(n).",
    ],
    tags: ["monotonic stack", "stack", "arrays", "algorithms"],
  },


  {
    id: "trivia-183",
    category: 'trivia',
    difficulty: "medium",
    title: "Monotonic Stack: When to reach for it",
    prompt: "Answer each of the following:\n\n  a) What problem phrasing hints at a monotonic stack?\n  b) How is it different from a plain stack?\n  c) What is the key invariant?",
    hints: [
      "\"Next/previous greater/smaller\", \"span\", or \"first element to the right that...\" phrasing.",
      "It enforces an ordering invariant, popping violators eagerly.",
      "The stack always stays sorted in one direction.",
    ],
    tags: ["monotonic stack", "stack", "arrays", "algorithms"],
  },


  {
    id: "trivia-184",
    category: 'trivia',
    difficulty: "medium",
    title: "Matrix / Grid Traversal: Neighbors",
    prompt: "Answer each of the following:\n\n  a) How do you enumerate 4-directional neighbors cleanly?\n  b) What about 8-directional?\n  c) How do you bounds-check?",
    hints: [
      "Use a directions array of (dr, dc) offsets and loop over it.",
      "Add the four diagonal offsets for 8-directional.",
      "Check 0 <= r < rows and 0 <= c < cols before visiting.",
    ],
    tags: ["matrix", "grid", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-185",
    category: 'trivia',
    difficulty: "medium",
    title: "Matrix / Grid Traversal: Number of islands",
    prompt: "Answer each of the following:\n\n  a) How do you count islands in a grid?\n  b) BFS or DFS flood fill?\n  c) How do you avoid recounting?",
    hints: [
      "Scan cells; on each unvisited land cell, flood-fill the whole island and increment a counter.",
      "Either works; DFS recursion or a BFS queue.",
      "Mark visited cells (sink them to water or use a visited set).",
    ],
    tags: ["matrix", "grid", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-186",
    category: 'trivia',
    difficulty: "medium",
    title: "Matrix / Grid Traversal: Multi-source BFS",
    prompt: "Answer each of the following:\n\n  a) What is multi-source BFS and when do you use it?\n  b) Give the rotting-oranges example.\n  c) How do you seed it?",
    hints: [
      "BFS starting from many sources simultaneously, expanding in lockstep.",
      "All rotten oranges spread at once; each BFS level is one minute.",
      "Enqueue all sources at level 0 before starting.",
    ],
    tags: ["matrix", "grid", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-187",
    category: 'trivia',
    difficulty: "medium",
    title: "Matrix / Grid Traversal: Shortest path in grid",
    prompt: "Answer each of the following:\n\n  a) How do you find the shortest path in an unweighted grid?\n  b) Why BFS not DFS?\n  c) What if cells have weights?",
    hints: [
      "BFS from the start; the first time you reach the target is the shortest distance.",
      "BFS explores by distance, so it finds the minimum number of steps first.",
      "Use Dijkstra (or 0-1 BFS) when moves have different costs.",
    ],
    tags: ["matrix", "grid", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-188",
    category: 'trivia',
    difficulty: "medium",
    title: "Matrix / Grid Traversal: Spiral order",
    prompt: "Answer each of the following:\n\n  a) How do you traverse a matrix in spiral order?\n  b) What four boundaries do you track?\n  c) How do they shrink?",
    hints: [
      "Walk right, down, left, up, peeling layers inward.",
      "top, bottom, left, right boundaries.",
      "After traversing an edge, move that boundary inward by one.",
    ],
    tags: ["matrix", "grid", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-189",
    category: 'trivia',
    difficulty: "medium",
    title: "Matrix / Grid Traversal: Rotate in place",
    prompt: "Answer each of the following:\n\n  a) How do you rotate an n x n matrix 90 degrees in place?\n  b) What two operations combine?\n  c) Why does that work?",
    hints: [
      "Transpose the matrix, then reverse each row.",
      "Transpose (swap across the diagonal) + row reversal.",
      "Transposing swaps rows/cols; reversing rows completes the 90-degree turn.",
    ],
    tags: ["matrix", "grid", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-190",
    category: 'trivia',
    difficulty: "medium",
    title: "Matrix / Grid Traversal: Visited tracking",
    prompt: "Answer each of the following:\n\n  a) How do you track visited cells without extra space?\n  b) What is the in-place marker trick?\n  c) When is it unsafe?",
    hints: [
      "Mutate the cell to a sentinel value to mark it visited.",
      "E.g., set land to 0 or to a special marker.",
      "Unsafe if the original values must be preserved or the grid is read-only.",
    ],
    tags: ["matrix", "grid", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-191",
    category: 'trivia',
    difficulty: "medium",
    title: "Matrix / Grid Traversal: DFS recursion depth",
    prompt: "Answer each of the following:\n\n  a) What is the risk of recursive DFS on large grids?\n  b) How do you mitigate it?\n  c) Trade-off vs BFS?",
    hints: [
      "Deep recursion can overflow the call stack.",
      "Use an explicit stack (iterative DFS) or BFS with a queue.",
      "BFS uses queue memory proportional to the frontier width.",
    ],
    tags: ["matrix", "grid", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-192",
    category: 'trivia',
    difficulty: "medium",
    title: "Matrix / Grid Traversal: Word search",
    prompt: "Answer each of the following:\n\n  a) How do you search for a word path in a grid?\n  b) How do you prevent reusing a cell in one path?\n  c) How do you undo?",
    hints: [
      "DFS from each cell matching the word character by character.",
      "Temporarily mark the cell used during the current path.",
      "Restore it on backtrack so other paths may use it.",
    ],
    tags: ["matrix", "grid", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-193",
    category: 'trivia',
    difficulty: "medium",
    title: "Matrix / Grid Traversal: Dynamic programming on grids",
    prompt: "Answer each of the following:\n\n  a) Give an example of grid DP (min path sum / unique paths).\n  b) What is the recurrence for min path sum?\n  c) Space optimization?",
    hints: [
      "Unique paths or minimum path sum from top-left to bottom-right.",
      "dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]).",
      "Keep only one row (rolling array) for O(cols) space.",
    ],
    tags: ["matrix", "grid", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-194",
    category: 'trivia',
    difficulty: "medium",
    title: "Graphs: BFS & DFS: Representations",
    prompt: "Answer each of the following:\n\n  a) Compare adjacency list vs adjacency matrix.\n  b) When is each preferable?\n  c) Space costs?",
    hints: [
      "List: per-node neighbor lists. Matrix: a V x V boolean/weight grid.",
      "List for sparse graphs; matrix for dense graphs or O(1) edge lookups.",
      "List O(V+E); matrix O(V^2).",
    ],
    tags: ["graphs", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-195",
    category: 'trivia',
    difficulty: "medium",
    title: "Graphs: BFS & DFS: BFS vs DFS",
    prompt: "Answer each of the following:\n\n  a) How do BFS and DFS differ in traversal order?\n  b) What structure backs each?\n  c) Typical uses?",
    hints: [
      "BFS explores level by level; DFS goes deep before backtracking.",
      "BFS uses a queue; DFS uses a stack or recursion.",
      "BFS for shortest unweighted paths; DFS for connectivity, cycles, topo sort.",
    ],
    tags: ["graphs", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-196",
    category: 'trivia',
    difficulty: "medium",
    title: "Graphs: BFS & DFS: Shortest path (unweighted)",
    prompt: "Answer each of the following:\n\n  a) Why does BFS give shortest paths in unweighted graphs?\n  b) How do you reconstruct the path?\n  c) Complexity?",
    hints: [
      "BFS visits nodes in nondecreasing distance order.",
      "Track each node's parent and walk back from the target.",
      "O(V + E).",
    ],
    tags: ["graphs", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-197",
    category: 'trivia',
    difficulty: "medium",
    title: "Graphs: BFS & DFS: Cycle detection",
    prompt: "Answer each of the following:\n\n  a) How do you detect a cycle in a directed graph?\n  b) In an undirected graph?\n  c) What state do you track?",
    hints: [
      "DFS with a recursion-stack (in-progress) set; a back edge means a cycle.",
      "DFS tracking the parent, or union-find on edges.",
      "Visited plus in-progress for directed; visited + parent for undirected.",
    ],
    tags: ["graphs", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-198",
    category: 'trivia',
    difficulty: "medium",
    title: "Graphs: BFS & DFS: Connected components",
    prompt: "Answer each of the following:\n\n  a) How do you count connected components?\n  b) Which traversals work?\n  c) What about directed graphs?",
    hints: [
      "Run BFS/DFS from each unvisited node; each launch is one component.",
      "BFS or DFS, or union-find.",
      "Directed graphs use strongly connected components (Tarjan/Kosaraju).",
    ],
    tags: ["graphs", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-199",
    category: 'trivia',
    difficulty: "medium",
    title: "Graphs: BFS & DFS: Bipartite check",
    prompt: "Answer each of the following:\n\n  a) How do you test if a graph is bipartite?\n  b) What does the coloring use?\n  c) When does it fail?",
    hints: [
      "2-color the graph via BFS/DFS, alternating colors across edges.",
      "Assign opposite colors to adjacent nodes.",
      "It fails (not bipartite) if an edge connects same-colored nodes - an odd cycle.",
    ],
    tags: ["graphs", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-200",
    category: 'trivia',
    difficulty: "medium",
    title: "Graphs: BFS & DFS: Dijkstra",
    prompt: "Answer each of the following:\n\n  a) When do you use Dijkstra over BFS?\n  b) What does it require of edge weights?\n  c) What structure speeds it up?",
    hints: [
      "For shortest paths with non-negative weighted edges.",
      "Edge weights must be non-negative.",
      "A min-priority queue (binary heap) gives O((V+E) log V).",
    ],
    tags: ["graphs", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-201",
    category: 'trivia',
    difficulty: "medium",
    title: "Graphs: BFS & DFS: Topological order",
    prompt: "Answer each of the following:\n\n  a) How do BFS and DFS each produce a topological order?\n  b) What precondition?\n  c) Use case?",
    hints: [
      "Kahn's BFS removes in-degree-0 nodes; DFS uses reverse finish order.",
      "The graph must be a DAG.",
      "Dependency/task scheduling.",
    ],
    tags: ["graphs", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-202",
    category: 'trivia',
    difficulty: "medium",
    title: "Graphs: BFS & DFS: Visited management",
    prompt: "Answer each of the following:\n\n  a) Why is a visited set essential in graph traversal?\n  b) What happens without it?\n  c) Where do you mark visited?",
    hints: [
      "To avoid revisiting nodes and infinite loops in cyclic graphs.",
      "You can loop forever or do redundant exponential work.",
      "Mark on enqueue (BFS) to avoid duplicates in the queue.",
    ],
    tags: ["graphs", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-203",
    category: 'trivia',
    difficulty: "medium",
    title: "Graphs: BFS & DFS: Weighted vs unweighted",
    prompt: "Answer each of the following:\n\n  a) Which algorithm fits each: unweighted shortest path, non-negative weights, negative weights?\n  b) Name them.\n  c) Why not Dijkstra with negatives?",
    hints: [
      "BFS, Dijkstra, Bellman-Ford respectively.",
      "BFS / Dijkstra / Bellman-Ford.",
      "Dijkstra's greedy finalization is wrong when a later negative edge could shorten a finalized path.",
    ],
    tags: ["graphs", "BFS", "DFS", "algorithms"],
  },


  {
    id: "trivia-204",
    category: 'trivia',
    difficulty: "medium",
    title: "Greedy Algorithms: Greedy choice",
    prompt: "Answer each of the following:\n\n  a) What is the greedy-choice property?\n  b) How does it differ from DP?\n  c) When does greedy fail?",
    hints: [
      "A globally optimal solution can be reached by locally optimal choices.",
      "DP explores/combines subproblems; greedy commits to one choice and never reconsiders.",
      "When a locally optimal choice precludes the global optimum (no greedy-choice property).",
    ],
    tags: ["greedy", "algorithms", "optimization"],
  },


  {
    id: "trivia-205",
    category: 'trivia',
    difficulty: "medium",
    title: "Greedy Algorithms: Proving correctness",
    prompt: "Answer each of the following:\n\n  a) How do you prove a greedy algorithm correct?\n  b) What is an exchange argument?\n  c) Why is intuition not enough?",
    hints: [
      "Show the greedy-choice property and optimal substructure, often via an exchange argument.",
      "Show any optimal solution can be transformed into the greedy one without getting worse.",
      "Greedy is frequently wrong; coin change with arbitrary denominations is the classic counterexample.",
    ],
    tags: ["greedy", "algorithms", "optimization"],
  },


  {
    id: "trivia-206",
    category: 'trivia',
    difficulty: "medium",
    title: "Greedy Algorithms: Activity selection",
    prompt: "Answer each of the following:\n\n  a) How do you select the max number of non-overlapping activities?\n  b) What do you sort by?\n  c) Why end time?",
    hints: [
      "Sort by finish time and greedily take each activity that starts after the last chosen finishes.",
      "Sort by earliest finish time.",
      "Finishing earliest leaves the most room for subsequent activities.",
    ],
    tags: ["greedy", "algorithms", "optimization"],
  },


  {
    id: "trivia-207",
    category: 'trivia',
    difficulty: "medium",
    title: "Greedy Algorithms: Interval scheduling vs DP",
    prompt: "Answer each of the following:\n\n  a) When does interval scheduling need DP instead of greedy?\n  b) What changes the problem?\n  c) Example?",
    hints: [
      "When intervals have weights and you maximize total weight, greedy fails.",
      "Adding weights breaks the simple earliest-finish heuristic.",
      "Weighted interval scheduling uses DP with binary search.",
    ],
    tags: ["greedy", "algorithms", "optimization"],
  },


  {
    id: "trivia-208",
    category: 'trivia',
    difficulty: "medium",
    title: "Greedy Algorithms: Huffman coding",
    prompt: "Answer each of the following:\n\n  a) How does Huffman build an optimal prefix code?\n  b) What greedy choice?\n  c) What structure?",
    hints: [
      "Repeatedly merge the two lowest-frequency nodes into a subtree.",
      "Always combine the two least frequent items.",
      "A min-heap of frequencies.",
    ],
    tags: ["greedy", "algorithms", "optimization"],
  },


  {
    id: "trivia-209",
    category: 'trivia',
    difficulty: "medium",
    title: "Greedy Algorithms: Fractional knapsack",
    prompt: "Answer each of the following:\n\n  a) Why is fractional knapsack greedy but 0/1 is not?\n  b) What do you sort by?\n  c) Why does fractionality matter?",
    hints: [
      "You can take fractions, so taking the highest value-per-weight first is optimal.",
      "Sort by value/weight ratio descending.",
      "0/1 forbids fractions, so greedy can leave capacity wasted - it needs DP.",
    ],
    tags: ["greedy", "algorithms", "optimization"],
  },


  {
    id: "trivia-210",
    category: 'trivia',
    difficulty: "medium",
    title: "Greedy Algorithms: Jump game",
    prompt: "Answer each of the following:\n\n  a) How does greedy solve the jump game (can you reach the end)?\n  b) What do you track?\n  c) Complexity?",
    hints: [
      "Track the farthest reachable index as you scan; if you ever fall behind it, fail.",
      "The maximum reach so far.",
      "O(n).",
    ],
    tags: ["greedy", "algorithms", "optimization"],
  },


  {
    id: "trivia-211",
    category: 'trivia',
    difficulty: "medium",
    title: "Greedy Algorithms: Gas station",
    prompt: "Answer each of the following:\n\n  a) How does greedy solve the circular gas-station problem?\n  b) What does running out tell you?\n  c) Why one pass?",
    hints: [
      "Track a running tank; if total gas >= total cost, the answer exists; reset start when the tank goes negative.",
      "You cannot start anywhere between the old start and the failing station.",
      "A single pass finds the unique valid start.",
    ],
    tags: ["greedy", "algorithms", "optimization"],
  },


  {
    id: "trivia-212",
    category: 'trivia',
    difficulty: "medium",
    title: "Greedy Algorithms: Coin change greedy",
    prompt: "Answer each of the following:\n\n  a) When does greedy coin change work and when does it fail?\n  b) Which coin systems are \"canonical\"?\n  c) What is the fix when it fails?",
    hints: [
      "Greedy works for canonical systems (like standard currency) but not arbitrary denominations.",
      "Systems where greedy always yields the optimum (e.g., 1,5,10,25).",
      "Use DP for arbitrary denominations.",
    ],
    tags: ["greedy", "algorithms", "optimization"],
  },


  {
    id: "trivia-213",
    category: 'trivia',
    difficulty: "medium",
    title: "Greedy Algorithms: Recognizing greedy",
    prompt: "Answer each of the following:\n\n  a) What signals a greedy approach might work?\n  b) How do you sanity-check it?\n  c) What is the danger?",
    hints: [
      "Optimization problems where a simple ordering/local rule seems to lead to the optimum.",
      "Test on small/adversarial inputs and try to prove the exchange argument.",
      "Plausible-but-wrong greedy solutions - always verify, do not assume.",
    ],
    tags: ["greedy", "algorithms", "optimization"],
  },


  {
    id: "trivia-214",
    category: 'trivia',
    difficulty: "medium",
    title: "Hash Maps: Basics",
    prompt: "Answer each of the following:\n\n  a) What are the average time complexities of hash map operations?\n  b) What makes them O(1)?\n  c) Worst case?",
    hints: [
      "Insert, lookup, delete are O(1) average.",
      "A good hash function spreads keys uniformly across buckets.",
      "O(n) worst case when many keys collide into one bucket.",
    ],
    tags: ["hash maps", "hashing", "data structures"],
  },


  {
    id: "trivia-215",
    category: 'trivia',
    difficulty: "medium",
    title: "Hash Maps: Collisions",
    prompt: "Answer each of the following:\n\n  a) What is a hash collision?\n  b) Name two collision-resolution strategies.\n  c) How do they differ?",
    hints: [
      "Two keys hashing to the same bucket.",
      "Chaining (linked lists/buckets) and open addressing (probing).",
      "Chaining stores collisions in a bucket; open addressing finds another slot in the array.",
    ],
    tags: ["hash maps", "hashing", "data structures"],
  },


  {
    id: "trivia-216",
    category: 'trivia',
    difficulty: "medium",
    title: "Hash Maps: Load factor",
    prompt: "Answer each of the following:\n\n  a) What is the load factor?\n  b) Why does it trigger resizing?\n  c) What does resizing cost?",
    hints: [
      "The ratio of entries to buckets (n / capacity).",
      "High load factor increases collisions, degrading performance.",
      "Rehashing all entries - amortized O(1) but O(n) on the resize itself.",
    ],
    tags: ["hash maps", "hashing", "data structures"],
  },


  {
    id: "trivia-217",
    category: 'trivia',
    difficulty: "medium",
    title: "Hash Maps: Good hash functions",
    prompt: "Answer each of the following:\n\n  a) What makes a hash function good?\n  b) Why does distribution matter?\n  c) What about determinism?",
    hints: [
      "Uniform distribution, fast to compute, and deterministic.",
      "Poor distribution clusters keys and causes collisions.",
      "It must return the same hash for the same key every time.",
    ],
    tags: ["hash maps", "hashing", "data structures"],
  },


  {
    id: "trivia-218",
    category: 'trivia',
    difficulty: "medium",
    title: "Hash Maps: Two sum",
    prompt: "Answer each of the following:\n\n  a) How does a hash map solve two-sum in O(n)?\n  b) What do you store?\n  c) Why one pass?",
    hints: [
      "Store each value's index and look up the complement (target - num).",
      "Map of value -> index seen so far.",
      "You check for the complement before inserting, so one pass suffices.",
    ],
    tags: ["hash maps", "hashing", "data structures"],
  },


  {
    id: "trivia-219",
    category: 'trivia',
    difficulty: "medium",
    title: "Hash Maps: Grouping/counting",
    prompt: "Answer each of the following:\n\n  a) How are hash maps used for counting and grouping?\n  b) Give an example pattern.\n  c) Why are they ideal?",
    hints: [
      "Map a key to a count or a list of items.",
      "Frequency counts, group anagrams (sorted-letters -> list).",
      "O(1) average access makes accumulation per key cheap.",
    ],
    tags: ["hash maps", "hashing", "data structures"],
  },


  {
    id: "trivia-220",
    category: 'trivia',
    difficulty: "medium",
    title: "Hash Maps: Set vs map",
    prompt: "Answer each of the following:\n\n  a) When do you use a set vs a map?\n  b) What does a set provide?\n  c) Example uses?",
    hints: [
      "Set for membership/uniqueness; map when you need an associated value.",
      "O(1) average contains/add/remove with no values.",
      "Set: deduplication, seen-tracking. Map: counts, indices, adjacency.",
    ],
    tags: ["hash maps", "hashing", "data structures"],
  },


  {
    id: "trivia-221",
    category: 'trivia',
    difficulty: "medium",
    title: "Hash Maps: Ordered maps",
    prompt: "Answer each of the following:\n\n  a) How does an ordered/sorted map differ from a hash map?\n  b) What does it cost?\n  c) When do you need it?",
    hints: [
      "It keeps keys in sorted order (often a balanced BST), unlike unordered hashing.",
      "O(log n) operations instead of O(1) average.",
      "When you need ordered iteration or range queries.",
    ],
    tags: ["hash maps", "hashing", "data structures"],
  },


  {
    id: "trivia-222",
    category: 'trivia',
    difficulty: "medium",
    title: "Hash Maps: Hashing custom keys",
    prompt: "Answer each of the following:\n\n  a) How do you use a composite/object key in a hash map?\n  b) What must the key support?\n  c) Pitfall with mutable keys?",
    hints: [
      "Combine fields into a tuple/string or define a proper hash + equality.",
      "Consistent hashCode and equals (or be immutable/hashable).",
      "Mutating a key after insertion corrupts its bucket placement.",
    ],
    tags: ["hash maps", "hashing", "data structures"],
  },


  {
    id: "trivia-223",
    category: 'trivia',
    difficulty: "medium",
    title: "Hash Maps: Memory and trade-offs",
    prompt: "Answer each of the following:\n\n  a) What are the downsides of hash maps?\n  b) Why no ordering guarantee?\n  c) When prefer an array?",
    hints: [
      "Memory overhead and no inherent ordering of keys.",
      "Bucket placement depends on hashing, not insertion or key order.",
      "Use an array when keys are a small dense integer range (index directly).",
    ],
    tags: ["hash maps", "hashing", "data structures"],
  },


  {
    id: "trivia-224",
    category: 'trivia',
    difficulty: "medium",
    title: "TypeScript: Structural typing",
    prompt: "Answer each of the following:\n\n  a) What is structural typing in TypeScript?\n  b) How does it differ from nominal typing?\n  c) Practical consequence?",
    hints: [
      "Types are compatible if their shapes match, regardless of declared name.",
      "Nominal typing requires the same declared type/name to be compatible.",
      "An object literal satisfies an interface if it has the required members, even without implementing it explicitly.",
    ],
    tags: ["TypeScript", "types", "JavaScript", "frontend"],
  },


  {
    id: "trivia-225",
    category: 'trivia',
    difficulty: "medium",
    title: "TypeScript: interface vs type",
    prompt: "Answer each of the following:\n\n  a) How do interface and type alias differ?\n  b) What can each do that the other cannot?\n  c) When to use which?",
    hints: [
      "Interfaces are open (declaration merging, extends); type aliases handle unions, intersections, primitives, tuples.",
      "Interfaces merge across declarations; type aliases can express unions and mapped types.",
      "Interfaces for object/class shapes; type aliases for unions and complex compositions.",
    ],
    tags: ["TypeScript", "types", "JavaScript", "frontend"],
  },


  {
    id: "trivia-226",
    category: 'trivia',
    difficulty: "medium",
    title: "TypeScript: Generics",
    prompt: "Answer each of the following:\n\n  a) What problem do generics solve?\n  b) Give a generic function signature.\n  c) What are constraints?",
    hints: [
      "Reusable, type-safe code parameterized over types.",
      "function identity<T>(x: T): T.",
      "extends clauses restrict a type parameter, e.g., <T extends { id: number }>.",
    ],
    tags: ["TypeScript", "types", "JavaScript", "frontend"],
  },


  {
    id: "trivia-227",
    category: 'trivia',
    difficulty: "medium",
    title: "TypeScript: Union and narrowing",
    prompt: "Answer each of the following:\n\n  a) What is a union type?\n  b) How does type narrowing work?\n  c) Name two narrowing techniques.",
    hints: [
      "A value that may be one of several types (A | B).",
      "The compiler narrows the type within a guarded block.",
      "typeof checks, instanceof, in operator, and discriminated unions.",
    ],
    tags: ["TypeScript", "types", "JavaScript", "frontend"],
  },


  {
    id: "trivia-228",
    category: 'trivia',
    difficulty: "medium",
    title: "TypeScript: Discriminated unions",
    prompt: "Answer each of the following:\n\n  a) What is a discriminated (tagged) union?\n  b) What makes the narrowing exhaustive?\n  c) Why are they powerful?",
    hints: [
      "A union of types sharing a literal discriminant field (e.g., kind: \"circle\").",
      "Switching on the discriminant lets the compiler narrow each branch.",
      "They model variant data safely and enable exhaustiveness checks.",
    ],
    tags: ["TypeScript", "types", "JavaScript", "frontend"],
  },


  {
    id: "trivia-229",
    category: 'trivia',
    difficulty: "medium",
    title: "TypeScript: unknown vs any",
    prompt: "Answer each of the following:\n\n  a) How does unknown differ from any?\n  b) Why prefer unknown?\n  c) What must you do before using unknown?",
    hints: [
      "any disables type checking; unknown is type-safe and forces checks.",
      "unknown keeps safety - you cannot use it until you narrow it.",
      "Narrow it via a type guard or assertion before operating on it.",
    ],
    tags: ["TypeScript", "types", "JavaScript", "frontend"],
  },


  {
    id: "trivia-230",
    category: 'trivia',
    difficulty: "medium",
    title: "TypeScript: Utility types",
    prompt: "Answer each of the following:\n\n  a) Name three built-in utility types and what they do.\n  b) When is Partial useful?\n  c) What does Pick do?",
    hints: [
      "Partial<T> (all optional), Required<T>, Readonly<T>, Pick<T,K>, Omit<T,K>, Record<K,V>.",
      "For update payloads where only some fields are provided.",
      "Constructs a type with only the selected keys K from T.",
    ],
    tags: ["TypeScript", "types", "JavaScript", "frontend"],
  },


  {
    id: "trivia-231",
    category: 'trivia',
    difficulty: "medium",
    title: "TypeScript: Type guards",
    prompt: "Answer each of the following:\n\n  a) What is a user-defined type guard?\n  b) What is the return signature?\n  c) Why use it?",
    hints: [
      "A function returning a type predicate like x is Cat.",
      "param is Type as the return type annotation.",
      "To teach the compiler to narrow a type at call sites.",
    ],
    tags: ["TypeScript", "types", "JavaScript", "frontend"],
  },


  {
    id: "trivia-232",
    category: 'trivia',
    difficulty: "medium",
    title: "TypeScript: Enums and literals",
    prompt: "Answer each of the following:\n\n  a) Compare enums to union literal types.\n  b) What is a const assertion?\n  c) Why might you avoid numeric enums?",
    hints: [
      "Union literals (\"a\" | \"b\") are often lighter and tree-shakeable than enums.",
      "as const freezes a value to its literal type.",
      "Numeric enums allow unintended numeric assignments and add runtime code.",
    ],
    tags: ["TypeScript", "types", "JavaScript", "frontend"],
  },


  {
    id: "trivia-233",
    category: 'trivia',
    difficulty: "medium",
    title: "TypeScript: Strict mode",
    prompt: "Answer each of the following:\n\n  a) What does strict mode enable?\n  b) Why turn on strictNullChecks?\n  c) Benefit overall?",
    hints: [
      "A bundle of strict flags including strictNullChecks and noImplicitAny.",
      "It forces explicit handling of null/undefined, catching a huge class of bugs.",
      "Far stronger guarantees and fewer runtime surprises.",
    ],
    tags: ["TypeScript", "types", "JavaScript", "frontend"],
  },


  {
    id: "trivia-234",
    category: 'trivia',
    difficulty: "medium",
    title: "Palantir Foundry & Data Engineering: Foundry overview",
    prompt: "Answer each of the following:\n\n  a) What is Palantir Foundry at a high level?\n  b) What is the Ontology?\n  c) Why does it matter?",
    hints: [
      "A data integration and operational analytics platform connecting raw data to applications.",
      "A semantic layer mapping datasets to business objects, properties, and actions.",
      "It lets analysts/apps work with meaningful objects rather than raw tables.",
    ],
    tags: ["Palantir", "Foundry", "data engineering", "pipelines"],
  },


  {
    id: "trivia-235",
    category: 'trivia',
    difficulty: "medium",
    title: "Palantir Foundry & Data Engineering: Datasets and transforms",
    prompt: "Answer each of the following:\n\n  a) What is a dataset in Foundry?\n  b) What are transforms?\n  c) How are they typically authored?",
    hints: [
      "A versioned, immutable table of data with schema and lineage.",
      "Code (often PySpark/SQL) that produces output datasets from inputs.",
      "As Python/Spark transforms or SQL, registered in the build graph.",
    ],
    tags: ["Palantir", "Foundry", "data engineering", "pipelines"],
  },


  {
    id: "trivia-236",
    category: 'trivia',
    difficulty: "medium",
    title: "Palantir Foundry & Data Engineering: Lineage",
    prompt: "Answer each of the following:\n\n  a) What is data lineage and why does Foundry track it?\n  b) What does it enable?\n  c) How does it help debugging?",
    hints: [
      "The dependency graph of how datasets derive from one another.",
      "Impact analysis, reproducibility, and governance.",
      "You can trace a bad value back to its source transform/dataset.",
    ],
    tags: ["Palantir", "Foundry", "data engineering", "pipelines"],
  },


  {
    id: "trivia-237",
    category: 'trivia',
    difficulty: "medium",
    title: "Palantir Foundry & Data Engineering: Incremental builds",
    prompt: "Answer each of the following:\n\n  a) What is an incremental transform?\n  b) Why use it?\n  c) What must you handle?",
    hints: [
      "A transform that processes only new/changed input partitions.",
      "To avoid recomputing entire large datasets each run.",
      "Append vs snapshot semantics and correct handling of late data.",
    ],
    tags: ["Palantir", "Foundry", "data engineering", "pipelines"],
  },


  {
    id: "trivia-238",
    category: 'trivia',
    difficulty: "medium",
    title: "Palantir Foundry & Data Engineering: Batch vs streaming",
    prompt: "Answer each of the following:\n\n  a) Contrast batch and streaming data processing.\n  b) When do you choose each?\n  c) What is micro-batching?",
    hints: [
      "Batch processes bounded data on a schedule; streaming processes events continuously.",
      "Batch for periodic heavy aggregation; streaming for low-latency reactions.",
      "Processing small frequent batches to approximate streaming.",
    ],
    tags: ["Palantir", "Foundry", "data engineering", "pipelines"],
  },


  {
    id: "trivia-239",
    category: 'trivia',
    difficulty: "medium",
    title: "Palantir Foundry & Data Engineering: Spark fundamentals",
    prompt: "Answer each of the following:\n\n  a) Why is Spark suited to large data transforms?\n  b) What is a partition?\n  c) What causes a shuffle?",
    hints: [
      "It distributes work across a cluster with in-memory processing.",
      "A chunk of the dataset processed by one task in parallel.",
      "Operations like joins/groupBy that redistribute data across partitions.",
    ],
    tags: ["Palantir", "Foundry", "data engineering", "pipelines"],
  },


  {
    id: "trivia-240",
    category: 'trivia',
    difficulty: "medium",
    title: "Palantir Foundry & Data Engineering: Data quality",
    prompt: "Answer each of the following:\n\n  a) How do you enforce data quality in a pipeline?\n  b) Name two kinds of checks.\n  c) What is a health check / expectation?",
    hints: [
      "Validation checks and schema enforcement at transform boundaries.",
      "Schema/type checks and value/row-count expectations.",
      "An assertion (e.g., non-null, range, uniqueness) that fails the build if violated.",
    ],
    tags: ["Palantir", "Foundry", "data engineering", "pipelines"],
  },


  {
    id: "trivia-241",
    category: 'trivia',
    difficulty: "medium",
    title: "Palantir Foundry & Data Engineering: Idempotent pipelines",
    prompt: "Answer each of the following:\n\n  a) Why should pipeline runs be idempotent?\n  b) What does immutability of datasets give you?\n  c) How does reprocessing stay safe?",
    hints: [
      "So reruns produce the same result without duplicating or corrupting data.",
      "Each build version is reproducible and rollback-able.",
      "Outputs are recomputed deterministically from versioned inputs.",
    ],
    tags: ["Palantir", "Foundry", "data engineering", "pipelines"],
  },


  {
    id: "trivia-242",
    category: 'trivia',
    difficulty: "medium",
    title: "Palantir Foundry & Data Engineering: Partitioning strategy",
    prompt: "Answer each of the following:\n\n  a) Why does partitioning matter for performance?\n  b) What is a good partition key?\n  c) What is data skew?",
    hints: [
      "It controls parallelism and how much data each task reads.",
      "One that distributes data evenly and matches common query/join filters.",
      "Uneven partition sizes that bottleneck a few tasks.",
    ],
    tags: ["Palantir", "Foundry", "data engineering", "pipelines"],
  },


  {
    id: "trivia-243",
    category: 'trivia',
    difficulty: "medium",
    title: "Palantir Foundry & Data Engineering: Governance and access",
    prompt: "Answer each of the following:\n\n  a) How is access control handled in a data platform like Foundry?\n  b) What is purpose-based access?\n  c) Why is lineage relevant to governance?",
    hints: [
      "Granular permissions on datasets/objects, often role- and purpose-based.",
      "Access granted tied to an approved purpose, not just identity.",
      "Lineage shows where sensitive data flows so policies propagate downstream.",
    ],
    tags: ["Palantir", "Foundry", "data engineering", "pipelines"],
  },


  {
    id: "trivia-244",
    category: 'trivia',
    difficulty: "medium",
    title: "RAG & Generative AI: RAG basics",
    prompt: "Answer each of the following:\n\n  a) What does Retrieval-Augmented Generation do?\n  b) Why use it over a bare LLM?\n  c) What are the two phases?",
    hints: [
      "It retrieves relevant context and feeds it to the LLM to ground answers.",
      "It reduces hallucination and supplies up-to-date or private knowledge the model was not trained on.",
      "Retrieval (find relevant chunks) then generation (LLM answers using them).",
    ],
    tags: ["RAG", "GenAI", "LLM", "embeddings"],
  },


  {
    id: "trivia-245",
    category: 'trivia',
    difficulty: "medium",
    title: "RAG & Generative AI: Chunking",
    prompt: "Answer each of the following:\n\n  a) Why do you chunk documents for RAG?\n  b) What does chunk size affect?\n  c) Why overlap chunks?",
    hints: [
      "To fit retrievable units into context and embeddings.",
      "Too large dilutes relevance; too small loses context.",
      "Overlap preserves context that straddles chunk boundaries.",
    ],
    tags: ["RAG", "GenAI", "LLM", "embeddings"],
  },


  {
    id: "trivia-246",
    category: 'trivia',
    difficulty: "medium",
    title: "RAG & Generative AI: Embeddings",
    prompt: "Answer each of the following:\n\n  a) What is an embedding?\n  b) How is similarity measured?\n  c) Why are they central to retrieval?",
    hints: [
      "A dense vector capturing semantic meaning of text.",
      "Cosine similarity (or dot product) between vectors.",
      "Semantically similar text lands close in vector space, enabling semantic search.",
    ],
    tags: ["RAG", "GenAI", "LLM", "embeddings"],
  },


  {
    id: "trivia-247",
    category: 'trivia',
    difficulty: "medium",
    title: "RAG & Generative AI: Vector databases",
    prompt: "Answer each of the following:\n\n  a) What does a vector database do?\n  b) What is ANN search?\n  c) Why not exact nearest neighbor?",
    hints: [
      "Stores embeddings and supports fast nearest-neighbor queries.",
      "Approximate Nearest Neighbor search trades a little accuracy for big speed.",
      "Exact NN is too slow at scale; ANN (e.g., HNSW) is near-exact and fast.",
    ],
    tags: ["RAG", "GenAI", "LLM", "embeddings"],
  },


  {
    id: "trivia-248",
    category: 'trivia',
    difficulty: "medium",
    title: "RAG & Generative AI: Hybrid retrieval",
    prompt: "Answer each of the following:\n\n  a) What is hybrid search?\n  b) Why combine dense and sparse retrieval?\n  c) What is reranking?",
    hints: [
      "Combining vector (dense) search with keyword (sparse/BM25) search.",
      "Dense captures meaning; sparse nails exact terms/IDs - together they cover each other's gaps.",
      "A second-stage model reorders candidates by relevance to the query.",
    ],
    tags: ["RAG", "GenAI", "LLM", "embeddings"],
  },


  {
    id: "trivia-249",
    category: 'trivia',
    difficulty: "medium",
    title: "RAG & Generative AI: Hallucination",
    prompt: "Answer each of the following:\n\n  a) What is hallucination in LLMs?\n  b) How does RAG reduce it?\n  c) How can you further guard against it?",
    hints: [
      "Confident, fluent output that is factually wrong or unsupported.",
      "Grounding answers in retrieved source text constrains the model.",
      "Cite sources, instruct \"answer only from context\", and validate/abstain when context is weak.",
    ],
    tags: ["RAG", "GenAI", "LLM", "embeddings"],
  },


  {
    id: "trivia-250",
    category: 'trivia',
    difficulty: "medium",
    title: "RAG & Generative AI: Prompt construction",
    prompt: "Answer each of the following:\n\n  a) How do you assemble the LLM prompt in RAG?\n  b) What goes in the context window?\n  c) What is the risk of stuffing too much?",
    hints: [
      "System instructions + retrieved chunks + the user question.",
      "The top relevant chunks, formatted with any citations.",
      "Exceeding the context window or diluting signal with irrelevant text (\"lost in the middle\").",
    ],
    tags: ["RAG", "GenAI", "LLM", "embeddings"],
  },


  {
    id: "trivia-251",
    category: 'trivia',
    difficulty: "medium",
    title: "RAG & Generative AI: Evaluation",
    prompt: "Answer each of the following:\n\n  a) How do you evaluate a RAG system?\n  b) What two aspects do you measure separately?\n  c) Name a metric or method.",
    hints: [
      "Assess retrieval quality and generation quality separately.",
      "Retrieval (did it fetch the right chunks?) and answer (faithful and relevant?).",
      "Retrieval recall/precision; answer faithfulness/groundedness, often via an LLM-as-judge.",
    ],
    tags: ["RAG", "GenAI", "LLM", "embeddings"],
  },


  {
    id: "trivia-252",
    category: 'trivia',
    difficulty: "medium",
    title: "RAG & Generative AI: Context window",
    prompt: "Answer each of the following:\n\n  a) What is the context window?\n  b) Why does it constrain RAG?\n  c) How do you handle overflow?",
    hints: [
      "The maximum tokens an LLM can attend to at once.",
      "It limits how much retrieved context plus history fits in one call.",
      "Retrieve fewer/better chunks, summarize, or use a larger-context model.",
    ],
    tags: ["RAG", "GenAI", "LLM", "embeddings"],
  },


  {
    id: "trivia-253",
    category: 'trivia',
    difficulty: "medium",
    title: "RAG & Generative AI: Fine-tuning vs RAG",
    prompt: "Answer each of the following:\n\n  a) When do you fine-tune vs use RAG?\n  b) What does each change?\n  c) Can you combine them?",
    hints: [
      "Fine-tune to change behavior/style/format; use RAG to inject knowledge.",
      "Fine-tuning updates weights; RAG augments the prompt at inference.",
      "Yes - fine-tune for behavior and use RAG for fresh/private facts.",
    ],
    tags: ["RAG", "GenAI", "LLM", "embeddings"],
  },


  {
    id: "trivia-254",
    category: 'trivia',
    difficulty: "medium",
    title: "AWS: Core compute",
    prompt: "Answer each of the following:\n\n  a) Contrast EC2, Lambda, and containers (ECS/EKS).\n  b) When do you pick Lambda?\n  c) When EC2?",
    hints: [
      "EC2 = VMs you manage; Lambda = serverless functions; ECS/EKS = container orchestration.",
      "For event-driven, spiky, short tasks with no server management.",
      "For long-running, stateful, or fine-tuned workloads needing full control.",
    ],
    tags: ["AWS", "cloud", "infrastructure"],
  },


  {
    id: "trivia-255",
    category: 'trivia',
    difficulty: "medium",
    title: "AWS: S3",
    prompt: "Answer each of the following:\n\n  a) What is S3 and its consistency model?\n  b) What are storage classes for?\n  c) How do you secure a bucket?",
    hints: [
      "Object storage with strong read-after-write consistency.",
      "Cost tiers by access frequency (Standard, IA, Glacier).",
      "Block public access, use bucket policies/IAM, and encryption (SSE).",
    ],
    tags: ["AWS", "cloud", "infrastructure"],
  },


  {
    id: "trivia-256",
    category: 'trivia',
    difficulty: "medium",
    title: "AWS: Databases",
    prompt: "Answer each of the following:\n\n  a) Contrast RDS, DynamoDB, and Aurora.\n  b) When do you choose DynamoDB?\n  c) What does Aurora add over RDS?",
    hints: [
      "RDS = managed relational; DynamoDB = managed NoSQL key-value/document; Aurora = cloud-native MySQL/Postgres.",
      "For massive scale, predictable low latency, and a key-value access pattern.",
      "Higher performance, storage auto-scaling, and faster failover.",
    ],
    tags: ["AWS", "cloud", "infrastructure"],
  },


  {
    id: "trivia-257",
    category: 'trivia',
    difficulty: "medium",
    title: "AWS: IAM",
    prompt: "Answer each of the following:\n\n  a) What is IAM and the principle it enforces?\n  b) What are roles vs users?\n  c) What is least privilege?",
    hints: [
      "Identity and Access Management controlling who can do what.",
      "Users are long-lived identities; roles are assumable, temporary credentials.",
      "Granting only the minimum permissions required for a task.",
    ],
    tags: ["AWS", "cloud", "infrastructure"],
  },


  {
    id: "trivia-258",
    category: 'trivia',
    difficulty: "medium",
    title: "AWS: VPC",
    prompt: "Answer each of the following:\n\n  a) What is a VPC?\n  b) Contrast public vs private subnets.\n  c) What controls traffic?",
    hints: [
      "An isolated virtual network for your resources.",
      "Public subnets route to an internet gateway; private subnets do not.",
      "Security groups (stateful, per-resource) and network ACLs (stateless, per-subnet).",
    ],
    tags: ["AWS", "cloud", "infrastructure"],
  },


  {
    id: "trivia-259",
    category: 'trivia',
    difficulty: "medium",
    title: "AWS: Scaling and LB",
    prompt: "Answer each of the following:\n\n  a) What do Auto Scaling Groups do?\n  b) What is an ELB/ALB?\n  c) How do they work together?",
    hints: [
      "Automatically add/remove EC2 instances based on demand/metrics.",
      "Load balancers distribute traffic across healthy targets (ALB is layer 7).",
      "The ALB spreads traffic; the ASG adjusts capacity behind it.",
    ],
    tags: ["AWS", "cloud", "infrastructure"],
  },


  {
    id: "trivia-260",
    category: 'trivia',
    difficulty: "medium",
    title: "AWS: Messaging",
    prompt: "Answer each of the following:\n\n  a) Contrast SQS, SNS, and Kinesis.\n  b) When do you use SNS vs SQS?\n  c) What is Kinesis for?",
    hints: [
      "SQS = queue (point-to-point), SNS = pub/sub fan-out, Kinesis = streaming data.",
      "SNS to fan out one message to many subscribers; SQS to buffer work for consumers.",
      "High-throughput real-time streaming and analytics.",
    ],
    tags: ["AWS", "cloud", "infrastructure"],
  },


  {
    id: "trivia-261",
    category: 'trivia',
    difficulty: "medium",
    title: "AWS: Serverless patterns",
    prompt: "Answer each of the following:\n\n  a) What is a common serverless API stack on AWS?\n  b) How is it triggered?\n  c) What is the cold-start trade-off?",
    hints: [
      "API Gateway -> Lambda -> DynamoDB.",
      "HTTP requests via API Gateway invoke Lambda functions.",
      "Cold starts add latency on first/idle invocations; mitigate with provisioned concurrency.",
    ],
    tags: ["AWS", "cloud", "infrastructure"],
  },


  {
    id: "trivia-262",
    category: 'trivia',
    difficulty: "medium",
    title: "AWS: Observability",
    prompt: "Answer each of the following:\n\n  a) What does CloudWatch provide?\n  b) What is X-Ray?\n  c) How do you alert?",
    hints: [
      "Metrics, logs, and dashboards for AWS resources.",
      "Distributed tracing across AWS services.",
      "CloudWatch alarms on metric thresholds triggering SNS/actions.",
    ],
    tags: ["AWS", "cloud", "infrastructure"],
  },


  {
    id: "trivia-263",
    category: 'trivia',
    difficulty: "medium",
    title: "AWS: Cost and reliability",
    prompt: "Answer each of the following:\n\n  a) How do you control AWS cost?\n  b) What are reserved/spot instances?\n  c) What is multi-AZ for?",
    hints: [
      "Right-size, use auto-scaling, pick appropriate pricing models, and monitor with budgets.",
      "Reserved = commit for discount; Spot = cheap spare capacity that can be reclaimed.",
      "Deploying across Availability Zones for fault tolerance/high availability.",
    ],
    tags: ["AWS", "cloud", "infrastructure"],
  },


  {
    id: "trivia-264",
    category: 'trivia',
    difficulty: "medium",
    title: "System Design Fundamentals: Scaling",
    prompt: "Answer each of the following:\n\n  a) Contrast vertical and horizontal scaling.\n  b) What are the limits of vertical scaling?\n  c) Why does horizontal scaling need statelessness?",
    hints: [
      "Vertical = bigger machine; horizontal = more machines.",
      "A single machine has a hard ceiling and a single point of failure.",
      "Stateless servers let any instance handle any request, enabling load distribution.",
    ],
    tags: ["system design", "scalability", "distributed systems"],
  },


  {
    id: "trivia-265",
    category: 'trivia',
    difficulty: "medium",
    title: "System Design Fundamentals: Load balancing",
    prompt: "Answer each of the following:\n\n  a) What does a load balancer do?\n  b) Name two balancing algorithms.\n  c) What are health checks for?",
    hints: [
      "Distributes incoming traffic across multiple servers.",
      "Round-robin, least-connections, weighted, consistent hashing.",
      "To remove unhealthy instances from rotation.",
    ],
    tags: ["system design", "scalability", "distributed systems"],
  },


  {
    id: "trivia-266",
    category: 'trivia',
    difficulty: "medium",
    title: "System Design Fundamentals: Caching",
    prompt: "Answer each of the following:\n\n  a) Why cache, and where can caches live?\n  b) What is cache invalidation and why is it hard?\n  c) Name an eviction policy.",
    hints: [
      "To reduce latency and load by reusing computed/fetched results; client, CDN, app, and DB layers.",
      "Keeping cached data fresh; stale data is a classic source of bugs.",
      "LRU, LFU, or TTL-based eviction.",
    ],
    tags: ["system design", "scalability", "distributed systems"],
  },


  {
    id: "trivia-267",
    category: 'trivia',
    difficulty: "medium",
    title: "System Design Fundamentals: CAP and consistency",
    prompt: "Answer each of the following:\n\n  a) State the CAP theorem.\n  b) When does the trade-off actually apply?\n  c) What is eventual consistency?",
    hints: [
      "Under a partition you choose between consistency and availability.",
      "Only during a network partition; otherwise you can have both C and A.",
      "Replicas converge to the same value over time, not immediately.",
    ],
    tags: ["system design", "scalability", "distributed systems"],
  },


  {
    id: "trivia-268",
    category: 'trivia',
    difficulty: "medium",
    title: "System Design Fundamentals: Databases",
    prompt: "Answer each of the following:\n\n  a) When do you pick SQL vs NoSQL?\n  b) What does normalization trade off?\n  c) What is denormalization for?",
    hints: [
      "SQL for relations/transactions; NoSQL for scale/flexible schema/specific access patterns.",
      "Normalization reduces redundancy but needs joins; denormalization speeds reads at the cost of duplication.",
      "Precomputing/duplicating data to avoid expensive joins on the read path.",
    ],
    tags: ["system design", "scalability", "distributed systems"],
  },


  {
    id: "trivia-269",
    category: 'trivia',
    difficulty: "medium",
    title: "System Design Fundamentals: Sharding and replication",
    prompt: "Answer each of the following:\n\n  a) What is sharding vs replication?\n  b) What problem does each solve?\n  c) What does replication trade off?",
    hints: [
      "Sharding splits data across nodes; replication copies data to multiple nodes.",
      "Sharding scales writes/storage; replication adds read scale and availability.",
      "Replication adds consistency/lag concerns between copies.",
    ],
    tags: ["system design", "scalability", "distributed systems"],
  },


  {
    id: "trivia-270",
    category: 'trivia',
    difficulty: "medium",
    title: "System Design Fundamentals: Async and queues",
    prompt: "Answer each of the following:\n\n  a) Why introduce a message queue?\n  b) What does it decouple?\n  c) What delivery guarantee is common?",
    hints: [
      "To buffer load, decouple producers from consumers, and smooth spikes.",
      "Producer availability/throughput from consumer processing.",
      "At-least-once delivery (handle duplicates with idempotency).",
    ],
    tags: ["system design", "scalability", "distributed systems"],
  },


  {
    id: "trivia-271",
    category: 'trivia',
    difficulty: "medium",
    title: "System Design Fundamentals: Estimation",
    prompt: "Answer each of the following:\n\n  a) Why do back-of-envelope estimates matter in design?\n  b) What do you estimate?\n  c) Give a useful number to remember.",
    hints: [
      "To size the system and justify component choices.",
      "QPS, storage, bandwidth, and memory needs.",
      "A day is ~86,400 seconds; 1M/day is ~12 QPS average.",
    ],
    tags: ["system design", "scalability", "distributed systems"],
  },


  {
    id: "trivia-272",
    category: 'trivia',
    difficulty: "medium",
    title: "System Design Fundamentals: Reliability",
    prompt: "Answer each of the following:\n\n  a) What is a single point of failure and how do you remove it?\n  b) What is graceful degradation?\n  c) What are SLOs?",
    hints: [
      "A component whose failure takes down the system; remove it via redundancy/failover.",
      "Serving reduced functionality instead of failing entirely under stress.",
      "Target reliability objectives (e.g., 99.9% availability) you design and measure against.",
    ],
    tags: ["system design", "scalability", "distributed systems"],
  },


  {
    id: "trivia-273",
    category: 'trivia',
    difficulty: "medium",
    title: "System Design Fundamentals: Design process",
    prompt: "Answer each of the following:\n\n  a) Outline a structured approach to a system-design interview.\n  b) Why clarify requirements first?\n  c) What comes after the high-level design?",
    hints: [
      "Clarify requirements, estimate scale, define APIs/data model, draw high-level design, then deep-dive and discuss trade-offs.",
      "To scope the problem and surface functional/non-functional needs before designing.",
      "Identify bottlenecks and deep-dive components (scaling, caching, consistency).",
    ],
    tags: ["system design", "scalability", "distributed systems"],
  },


  {
    id: "trivia-274",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices & API Design: Mono vs micro",
    prompt: "Answer each of the following:\n\n  a) What are the main trade-offs of microservices vs a monolith?\n  b) When should you start with a monolith?\n  c) What is a \"distributed monolith\"?",
    hints: [
      "Microservices give independent deploy/scale at the cost of operational and consistency complexity.",
      "Almost always - start modular monolith and split only when you have concrete reasons.",
      "Services so tightly coupled they must deploy together - all the pain, none of the benefit.",
    ],
    tags: ["microservices", "APIs", "distributed systems"],
  },


  {
    id: "trivia-275",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices & API Design: Conway's law",
    prompt: "Answer each of the following:\n\n  a) State Conway's law.\n  b) What is the Inverse Conway Maneuver?\n  c) Why does it matter for service boundaries?",
    hints: [
      "Systems mirror the communication structure of the organization that builds them.",
      "Deliberately shaping teams to produce the architecture you want.",
      "Team ownership tends to define service boundaries, so align them intentionally.",
    ],
    tags: ["microservices", "APIs", "distributed systems"],
  },


  {
    id: "trivia-276",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices & API Design: Decomposition",
    prompt: "Answer each of the following:\n\n  a) How should you decompose services?\n  b) Why by business capability, not technical tier?\n  c) What is a bounded context?",
    hints: [
      "Along bounded contexts / business capabilities (Orders, Payments).",
      "Tier-based splits create chatty, tightly coupled services.",
      "A boundary within which a domain model and its language stay consistent.",
    ],
    tags: ["microservices", "APIs", "distributed systems"],
  },


  {
    id: "trivia-277",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices & API Design: Sync vs async",
    prompt: "Answer each of the following:\n\n  a) When do you use synchronous vs asynchronous communication?\n  b) What does async decouple?\n  c) Give a protocol for each.",
    hints: [
      "Sync when the caller needs an immediate result; async for fire-and-forget and load leveling.",
      "Producer and consumer availability and throughput.",
      "Sync: REST/gRPC. Async: message queue / event stream (Kafka, SQS).",
    ],
    tags: ["microservices", "APIs", "distributed systems"],
  },


  {
    id: "trivia-278",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices & API Design: API gateway",
    prompt: "Answer each of the following:\n\n  a) What does an API gateway do?\n  b) What concerns belong in it?\n  c) What must NOT go in it?",
    hints: [
      "A single entry point handling cross-cutting concerns and routing to services.",
      "Auth, rate limiting, TLS termination, routing, aggregation.",
      "Business/domain logic - that stays in the services.",
    ],
    tags: ["microservices", "APIs", "distributed systems"],
  },


  {
    id: "trivia-279",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices & API Design: Idempotency",
    prompt: "Answer each of the following:\n\n  a) What is an idempotent operation?\n  b) Why do payments need idempotency keys?\n  c) Which HTTP methods are naturally idempotent?",
    hints: [
      "Running it N times has the same effect as running it once.",
      "So a retried charge does not double-bill - the key returns the stored result.",
      "GET, PUT, DELETE (POST is not).",
    ],
    tags: ["microservices", "APIs", "distributed systems"],
  },


  {
    id: "trivia-280",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices & API Design: Database per service",
    prompt: "Answer each of the following:\n\n  a) Why database-per-service?\n  b) What does it cost you?\n  c) How do you query across services?",
    hints: [
      "It keeps services loosely coupled and independently deployable/scalable.",
      "No cross-service joins or distributed ACID transactions.",
      "API composition or a CQRS read model fed by events.",
    ],
    tags: ["microservices", "APIs", "distributed systems"],
  },


  {
    id: "trivia-281",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices & API Design: Saga",
    prompt: "Answer each of the following:\n\n  a) What is the saga pattern?\n  b) Choreography vs orchestration?\n  c) What is a compensating transaction?",
    hints: [
      "A distributed transaction as a sequence of local transactions with compensations.",
      "Choreography = services react to events; orchestration = a coordinator drives steps.",
      "A semantic undo (e.g., refund) for an already-committed step.",
    ],
    tags: ["microservices", "APIs", "distributed systems"],
  },


  {
    id: "trivia-282",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices & API Design: Resilience",
    prompt: "Answer each of the following:\n\n  a) Name four resilience patterns for remote calls.\n  b) What does a circuit breaker do?\n  c) Why backoff with jitter?",
    hints: [
      "Timeout, retry-with-backoff, circuit breaker, bulkhead.",
      "Stops calling a failing dependency, failing fast, then probes for recovery.",
      "To prevent a thundering herd of synchronized retries.",
    ],
    tags: ["microservices", "APIs", "distributed systems"],
  },


  {
    id: "trivia-283",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices & API Design: Observability",
    prompt: "Answer each of the following:\n\n  a) What are the three pillars of observability?\n  b) What does a trace id enable?\n  c) Liveness vs readiness probe?",
    hints: [
      "Logs, metrics, and traces.",
      "Correlating a single request across all services it touches.",
      "Liveness restarts a dead/hung process; readiness gates traffic until the service can serve.",
    ],
    tags: ["microservices", "APIs", "distributed systems"],
  },

  // ─── Microservices ────────────────────────────────────────────────────────────

  {
    id: "trivia-284",
    category: 'trivia',
    difficulty: "easy",
    title: "Microservices: Monolith vs Microservices Trade-offs",
    prompt: "Answer each of the following:\n\n  a) Name two advantages of a monolith over microservices.\n  b) Name two advantages of microservices over a monolith.\n  c) What is a 'distributed monolith' and why is it worse than either?",
    hints: [
      "Monolith wins on simplicity: one deploy, one process, ACID transactions, fast local calls.",
      "Microservices win on independent scaling, team autonomy, and failure isolation.",
      "A distributed monolith splits the code but keeps tight runtime coupling — you get network latency and deployment complexity with none of the independence.",
    ],
    followUps: [
      "When would you recommend starting with a monolith even for a greenfield project?",
      "What is a modular monolith and how does it differ from a distributed monolith?",
    ],
    tags: ["microservices", "architecture", "distributed systems"],
  },

  {
    id: "trivia-285",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices: Conway's Law",
    prompt: "Answer each of the following:\n\n  a) State Conway's Law in your own words.\n  b) What is the Inverse Conway Maneuver?\n  c) How does Conway's Law affect service boundary decisions?",
    hints: [
      "Conway's Law: your system architecture will mirror your org's communication structure.",
      "Inverse Conway Maneuver: deliberately shape the team structure to match the architecture you want.",
      "If a service spans two teams, expect misaligned interfaces and coupling. One team, one bounded context.",
    ],
    followUps: [
      "Give a concrete example of Conway's Law playing out in a real org structure.",
      "How would you use Conway's Law to argue for reorganizing a team?",
    ],
    tags: ["microservices", "architecture", "team structure"],
  },

  {
    id: "trivia-286",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices: Strangler Fig Pattern",
    prompt: "Answer each of the following:\n\n  a) What problem does the Strangler Fig pattern solve?\n  b) What is the role of the façade/router in this pattern?\n  c) What is the end state — what happens to the monolith?",
    hints: [
      "It solves the big-bang rewrite risk by migrating incrementally, one capability at a time.",
      "The façade sits in front of everything and routes specific paths to new services while routing the rest to the legacy monolith.",
      "Over time the monolith is 'strangled' as more routes point to new services until it can be decommissioned.",
    ],
    followUps: [
      "How would you decide which capability to migrate first?",
      "What risks remain even with the Strangler Fig approach?",
    ],
    tags: ["microservices", "architecture", "migration"],
  },

  {
    id: "trivia-287",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices: Saga Pattern",
    prompt: "Answer each of the following:\n\n  a) Why can't you use a standard ACID transaction across microservices?\n  b) What is a compensating transaction?\n  c) Choreography vs orchestration sagas — key difference and when you'd choose each?",
    hints: [
      "Each service has its own database; there's no shared transaction coordinator across service boundaries.",
      "A compensating transaction undoes the effect of a previous step — e.g., cancel a reservation if a later step fails.",
      "Choreography: services react to events, no coordinator — decoupled but hard to trace. Orchestration: a central saga manager directs steps — easier to monitor but adds a central point of complexity.",
    ],
    followUps: [
      "How do you ensure idempotency in saga steps?",
      "What happens if the saga orchestrator itself crashes mid-saga?",
    ],
    tags: ["microservices", "distributed transactions", "saga", "data management"],
  },

  {
    id: "trivia-288",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices: CQRS and Event Sourcing",
    prompt: "Answer each of the following:\n\n  a) What does CQRS stand for and what does it split?\n  b) What does event sourcing store instead of current state?\n  c) Why do CQRS and event sourcing pair naturally together?",
    hints: [
      "Command Query Responsibility Segregation — splits the write model (commands) from the read model (queries).",
      "Event sourcing stores the append-only log of domain events. Current state is derived by replaying the log.",
      "Events from the write side feed directly into the read projections (the query side), making the pairing natural.",
    ],
    followUps: [
      "What consistency guarantee do you get between the write and read sides in CQRS?",
      "When would you NOT use event sourcing despite its audit-log benefits?",
    ],
    tags: ["microservices", "CQRS", "event sourcing", "data management"],
  },

  {
    id: "trivia-289",
    category: 'trivia',
    difficulty: "medium",
    title: "Microservices: Circuit Breaker Pattern",
    prompt: "Answer each of the following:\n\n  a) What are the three states of a circuit breaker and what happens in each?\n  b) What problem does 'fail fast' solve compared to waiting for a timeout?\n  c) When does the breaker transition from OPEN to HALF-OPEN?",
    hints: [
      "CLOSED: requests pass, failures are counted. OPEN: requests fail immediately (fail fast). HALF-OPEN: one trial request is let through to test recovery.",
      "Fail fast avoids thread exhaustion — a hung call with no timeout ties up a thread, and many of those sink the service. Fast rejection preserves capacity.",
      "After a cooldown timeout period, the breaker moves to HALF-OPEN to test whether the downstream has recovered.",
    ],
    followUps: [
      "What metrics would you use to decide the trip threshold?",
      "How does the circuit breaker pattern complement retry-with-backoff?",
    ],
    tags: ["microservices", "resilience", "circuit breaker", "fault tolerance"],
  },

  {
    id: "trivia-290",
    category: 'trivia',
    difficulty: "easy",
    title: "Microservices: Resilience Pattern Vocabulary",
    prompt: "Match each pattern to its purpose:\n\n  a) Bulkhead\n  b) Timeout\n  c) Retry with exponential backoff + jitter\n  d) Rate limiting",
    hints: [
      "Bulkhead: isolate resource pools (separate thread/connection pool per dependency) so one failure can't sink the whole service.",
      "Timeout: bound the wait time on a remote call to prevent hung threads and resource exhaustion.",
      "Retry with backoff+jitter: retransmit on transient failure, but spread retries to avoid thundering herd.",
      "Rate limiting: cap requests per unit time to protect a service from overload and enforce quotas.",
    ],
    followUps: [
      "Why must you only retry idempotent operations?",
      "What is a thundering herd and why does jitter help?",
    ],
    tags: ["microservices", "resilience", "fault tolerance", "distributed systems"],
  },

  {
    id: "trivia-291",
    category: 'trivia',
    difficulty: "easy",
    title: "Microservices: SLO, SLI, SLA",
    prompt: "Answer each of the following:\n\n  a) Define SLI, SLO, and SLA.\n  b) Why should your SLA always be looser than your SLO?\n  c) What is an error budget and how is it used?",
    hints: [
      "SLI (Indicator): a measured metric. SLO (Objective): your internal target. SLA (Agreement): contractual promise with penalties.",
      "Your SLA is what you promise customers; you need headroom to detect and fix issues before you breach the contract.",
      "Error budget = 1 − SLO. It's the allowed failure budget — when it's exhausted, freeze risky changes until it refills.",
    ],
    followUps: [
      "Give an example SLI → SLO → SLA chain for an API service.",
      "How does the error budget concept change how you decide when to ship?",
    ],
    tags: ["microservices", "observability", "SLO", "reliability"],
  },

  // ─── API Design ───────────────────────────────────────────────────────────────

  {
    id: "trivia-292",
    category: 'trivia',
    difficulty: "easy",
    title: "API Design: REST Verbs and Status Codes",
    prompt: "Answer each of the following:\n\n  a) Which HTTP verbs are idempotent? Which are safe?\n  b) When do you return 201 vs 200 vs 204?\n  c) When do you return 401 vs 403?",
    hints: [
      "Idempotent: GET, PUT, DELETE. Safe (no side effects): GET only. POST is neither.",
      "201 Created: POST that creates a resource. 200 OK: general success with body. 204 No Content: success with no response body (common for DELETE).",
      "401 Unauthorized: not authenticated — the client needs to log in. 403 Forbidden: authenticated but not authorized — you know who they are, they just can't do this.",
    ],
    followUps: [
      "What status code should you return for a validation error (e.g., missing required field)?",
      "When would you use 409 Conflict?",
    ],
    tags: ["API design", "REST", "HTTP"],
  },

  {
    id: "trivia-293",
    category: 'trivia',
    difficulty: "easy",
    title: "API Design: Versioning Strategies",
    prompt: "Answer each of the following:\n\n  a) Name three strategies for versioning a REST API.\n  b) Which is most commonly used in practice and why?\n  c) What kind of change requires a new version vs what can be done without one?",
    hints: [
      "URI versioning (/v1/orders), header versioning (Accept: application/vnd.v2+json), query param (?version=2).",
      "URI versioning is most common — it's visible, easy to route, and simple to test.",
      "Breaking changes need a version bump: removing fields, renaming, changing types, altering semantics. Adding optional fields is additive and doesn't need a new version.",
    ],
    followUps: [
      "How long would you maintain a deprecated API version?",
      "What's the downside of too many active API versions?",
    ],
    tags: ["API design", "REST", "versioning"],
  },

  {
    id: "trivia-294",
    category: 'trivia',
    difficulty: "medium",
    title: "API Design: Idempotency Keys",
    prompt: "Answer each of the following:\n\n  a) What does it mean for an operation to be idempotent?\n  b) Why is POST for payments dangerous without an idempotency key?\n  c) How does an idempotency key work server-side?",
    hints: [
      "Idempotent: running the operation N times has the same effect as once.",
      "A client network timeout causes a retry — without a key, the payment is charged twice.",
      "The server stores (key → result) with a TTL. If the same key appears again, it returns the stored result instead of re-executing.",
    ],
    followUps: [
      "Who generates the idempotency key — client or server?",
      "What happens if two different users send the same idempotency key?",
    ],
    tags: ["API design", "idempotency", "REST", "payments"],
  },

  {
    id: "trivia-295",
    category: 'trivia',
    difficulty: "medium",
    title: "API Design: Pagination — Offset vs Cursor",
    prompt: "Answer each of the following:\n\n  a) How does offset/limit pagination work and what are its failure modes?\n  b) How does cursor/keyset pagination work and what does it trade off?\n  c) When would you choose cursor over offset?",
    hints: [
      "Offset/limit: skip N rows, take M. Fails at scale (full table scan to skip) and can miss/duplicate rows if data changes mid-scroll.",
      "Cursor: encode position as an opaque token (e.g., last seen ID + timestamp). Stable under inserts/deletes, efficient index seek. Can't jump to arbitrary page.",
      "Use cursor for large or infinite feeds (social timelines, logs, notifications). Use offset only for small bounded lists where jumping to a page matters.",
    ],
    followUps: [
      "What would you encode in a cursor for a feed sorted by timestamp DESC with ties possible?",
      "How would you expose cursor pagination in your API response shape?",
    ],
    tags: ["API design", "pagination", "REST", "databases"],
  },

  {
    id: "trivia-296",
    category: 'trivia',
    difficulty: "medium",
    title: "API Design: JWT Structure and Security",
    prompt: "Answer each of the following:\n\n  a) What are the three parts of a JWT and what does each contain?\n  b) Why can you verify a JWT without hitting a database?\n  c) Name two security caveats of JWTs in production.",
    hints: [
      "Header (algorithm), payload (claims: sub, exp, scopes), signature (HMAC or RSA over header+payload). Each base64url-encoded, joined by dots.",
      "The signature is cryptographically tied to the payload — verify the signature with the secret/public key and you know the token wasn't tampered with.",
      "Can't easily revoke before expiry (use short TTLs + refresh tokens or a denylist). Payload is encoded not encrypted — never put secrets in it. Also: validate alg field to prevent none-alg attacks.",
    ],
    followUps: [
      "What is the difference between a JWT access token and a refresh token?",
      "When would you prefer opaque tokens over JWTs?",
    ],
    tags: ["API design", "security", "JWT", "authentication"],
  },

  {
    id: "trivia-297",
    category: 'trivia',
    difficulty: "medium",
    title: "API Design: OAuth2 and OIDC",
    prompt: "Answer each of the following:\n\n  a) What problem does OAuth2 solve (in one sentence)?\n  b) Name the four roles in OAuth2.\n  c) What does PKCE add and why is it needed for mobile/SPA clients?",
    hints: [
      "OAuth2 lets an app act on a user's behalf without the user sharing their password.",
      "Resource Owner (user), Client (app), Authorization Server (issues tokens), Resource Server (the API).",
      "PKCE (Proof Key for Code Exchange) prevents authorization code interception. Public clients can't safely store a client secret, so PKCE uses a cryptographic challenge instead.",
    ],
    followUps: [
      "What is the difference between OAuth2 (authorization) and OIDC (authentication)?",
      "When would you use the Client Credentials flow instead of Authorization Code?",
    ],
    tags: ["API design", "security", "OAuth2", "OIDC", "authentication"],
  },

  {
    id: "trivia-298",
    category: 'trivia',
    difficulty: "medium",
    title: "API Design: mTLS and Zero-Trust",
    prompt: "Answer each of the following:\n\n  a) How does mTLS differ from standard TLS?\n  b) What problem does it solve for service-to-service communication?\n  c) State the core principle of zero-trust networking in one sentence.",
    hints: [
      "Standard TLS: only the server presents a cert. mTLS (mutual TLS): both sides present certs, so each end verifies the other's identity.",
      "It solves the 'assumed-trusted internal network' problem — even inside the data center, a compromised service can't impersonate another without a valid cert.",
      "Zero-trust: never trust, always verify — every request is authenticated, authorized, and encrypted regardless of where it originates.",
    ],
    followUps: [
      "How does a service mesh like Istio or Linkerd implement mTLS without code changes?",
      "What is the least-privilege principle and how does it apply in a zero-trust model?",
    ],
    tags: ["API design", "security", "mTLS", "zero-trust", "service mesh"],
  },

  // ─── AWS (expanded) ────────────────────────────────────────────────────────

  {
    id: 'trivia-299',
    category: 'trivia',
    difficulty: 'medium',
    title: 'AWS IAM: Roles, Policies, and Least Privilege',
    prompt: `Answer each of the following about AWS IAM:

  a) What is the difference between an IAM User and an IAM Role? Why should services use roles instead of users?
  b) A Lambda function needs to write to DynamoDB and read from S3. Write the minimum IAM policy for it (describe the structure — no need to write full JSON).
  c) What is an IAM resource-based policy? How does it differ from an identity-based policy?
  d) What is the IAM policy evaluation order? If a policy says Allow and another says Deny for the same action, what happens?
  e) What is the principle of least privilege and why does it matter in AWS?`,
    hints: [
      'User: long-lived credentials (access key + secret key). Role: assumed temporarily; generates short-lived credentials via STS. Services should use roles — no static keys to leak or rotate.',
      'Minimum policy: Allow dynamodb:PutItem + dynamodb:UpdateItem on the specific table ARN. Allow s3:GetObject on the specific bucket ARN. Not dynamodb:* or s3:*.',
      'Resource-based policy: attached to the resource (S3 bucket policy, Lambda resource policy). Controls who can access from outside the account. Identity-based: attached to who is making the call.',
      'Evaluation: explicit Deny always wins, regardless of any Allow. Default is Deny everything. Only Allow explicitly grants access.',
    ],
    followUps: [
      'What is STS (Security Token Service) and how do roles use it?',
      'What is an IAM permission boundary?',
      'How do you audit which IAM roles and users have been recently active?',
    ],
    tags: ['AWS', 'IAM', 'security', 'least privilege', 'roles'],
  },

  {
    id: 'trivia-300',
    category: 'trivia',
    difficulty: 'medium',
    title: 'AWS Security: KMS, Secrets Manager, and Encryption',
    prompt: `Answer each of the following about AWS security services:

  a) What is AWS KMS and what is the difference between AWS-managed keys and Customer-managed keys (CMKs)?
  b) What is envelope encryption? How does KMS use it when encrypting an S3 object?
  c) What is the difference between AWS Secrets Manager and SSM Parameter Store? When would you use each?
  d) How does Secrets Manager auto-rotate a database password? Walk through what happens step by step.
  e) Why should your application code fetch secrets at runtime rather than baking them into environment variables at deploy time?`,
    hints: [
      'AWS-managed keys: created/rotated automatically by AWS, no direct control or cost. CMKs: you create and control them, required for cross-account use, audit trails, or custom rotation.',
      'Envelope encryption: KMS generates a data key that actually encrypts the data. The data key itself is encrypted by the CMK and stored alongside the data. KMS never stores plaintext data keys.',
      'Secrets Manager: rotation built in, native RDS rotation support, costs ~$0.40/secret/month. Parameter Store: free tier, no built-in rotation. Use Secrets Manager for anything that needs to rotate.',
      'Runtime fetch: your code always gets the current (rotated) secret. If baked into env vars at deploy, the app still holds the old password after rotation until redeployed.',
    ],
    followUps: [
      'How do you grant a Lambda function access to a secret in Secrets Manager?',
      'What is the difference between encryption at rest and encryption in transit?',
      'How does Cognito User Pools integrate with API Gateway for authentication?',
    ],
    tags: ['AWS', 'KMS', 'Secrets Manager', 'security', 'encryption'],
  },

  {
    id: 'trivia-301',
    category: 'trivia',
    difficulty: 'medium',
    title: 'AWS VPC: Subnets, Security Groups, NACLs, and VPC Endpoints',
    prompt: `Answer each of the following about AWS networking:

  a) What is the difference between a public subnet and a private subnet in a VPC? What component makes a subnet "public"?
  b) Your EC2 instance in a private subnet needs to download a package from the internet. What component enables this, and where does it live?
  c) Compare Security Groups and Network ACLs. Which is stateful? What does that mean in practice?
  d) What is a VPC Endpoint? What problem does it solve, and what are the two types?
  e) You have an RDS database in a private subnet and a Lambda function that needs to connect to it. The Lambda is also in a VPC. What must you configure for this to work?`,
    hints: [
      'Public subnet: has a route to an Internet Gateway in its route table. Private subnet: no IGW route. Public does not mean resources have public IPs automatically — you must also assign a public IP or Elastic IP.',
      'NAT Gateway: lives in a public subnet, has a public IP. Private subnet routes 0.0.0.0/0 to the NAT GW. The NAT GW forwards to the IGW. Outbound only — the internet cannot initiate connections inward.',
      'Security Group: stateful — if you allow inbound port 443, the response is automatically allowed outbound. NACL: stateless — you must explicitly allow both directions. Security Groups are per-instance; NACLs are per-subnet.',
      'VPC Endpoint: keeps traffic on the AWS private network, no NAT Gateway needed. Gateway Endpoint (free, S3 + DynamoDB) adds a route to your route table. Interface Endpoint (PrivateLink, most services) creates an ENI in your subnet.',
    ],
    followUps: [
      'What is VPC peering and what are its limitations?',
      'What is AWS PrivateLink and when would you use it over VPC peering?',
      'What are VPC Flow Logs and what do they capture?',
    ],
    tags: ['AWS', 'VPC', 'networking', 'Security Groups', 'subnets'],
  },

  {
    id: 'trivia-302',
    category: 'trivia',
    difficulty: 'medium',
    title: 'AWS Lambda: Concurrency, Cold Starts, and Execution Model',
    prompt: `Answer each of the following about AWS Lambda's execution model:

  a) What is a Lambda cold start? What happens during one, and what factors make it worse?
  b) What is the difference between reserved concurrency and provisioned concurrency?
  c) A Lambda handles database writes. If 500 requests arrive simultaneously, what happens to database connections? What can you do about it?
  d) A user complains of ~2 second latency on their first request after several minutes of inactivity, then < 50ms on subsequent requests. What is the likely cause and fix?
  e) What is the Lambda execution context and what does it mean to reuse it across invocations?`,
    hints: [
      'Cold start: when no warm instance exists, AWS must download your package, start the runtime (JVM, Python interpreter), and run your initialization code. Large packages + heavy imports = longer cold starts. Java/C# runtimes are slower than Python/Node.',
      'Reserved concurrency: caps the maximum number of concurrent instances for this function. Prevents it from consuming the whole account limit. Provisioned concurrency: keeps N instances warm at all times — eliminates cold starts, costs money.',
      'DB connections: Lambda at 500 concurrent = 500 simultaneous connections. RDS can handle ~1,000 connections max. Use RDS Proxy to pool connections — Lambda instances share a smaller pool via the proxy.',
      'Execution context reuse: the Lambda container is reused across invocations if still warm. Connections, loaded modules, and temp files persist between invocations. Good: amortize setup cost. Bad: stale state if not handled carefully.',
    ],
    followUps: [
      'What is the maximum memory and timeout for a Lambda function?',
      'How does Lambda handle failures — what is the retry behavior for async vs sync invocations?',
      'What is Lambda@Edge and where does it run?',
    ],
    tags: ['AWS', 'Lambda', 'serverless', 'cold start', 'concurrency'],
  },

  {
    id: 'trivia-303',
    category: 'trivia',
    difficulty: 'medium',
    title: 'AWS Observability: CloudWatch, X-Ray, and CloudTrail',
    prompt: `Answer each of the following about AWS observability:

  a) What is the difference between CloudWatch Metrics, CloudWatch Logs, and CloudWatch Alarms? Give one concrete use for each.
  b) A Lambda function is slow on some requests but not others. Which AWS service do you use to diagnose this, and what does it show you?
  c) Your team needs to know who deleted an S3 bucket last Tuesday. Which service tells you this, and what information does it record?
  d) What is CloudWatch Log Insights and when is it more useful than searching raw logs?
  e) Describe the three pillars of observability (logs, metrics, traces) and which AWS service covers each.`,
    hints: [
      'Metrics: numeric time-series (Lambda invocation count, CPU %). Logs: text records of events (your print/logging calls). Alarms: trigger actions when a metric crosses a threshold (send SNS, scale out).',
      'X-Ray: distributed tracing. Shows the full request path across Lambda, API Gateway, DynamoDB, etc. with per-service latency breakdown. Identifies which downstream call is slow.',
      'CloudTrail: records every AWS API call — who (IAM identity), what (API action), when, from where. Answers "who changed what" questions. Different from CloudWatch which tracks resource performance metrics.',
      'Three pillars: Logs → CloudWatch Logs. Metrics → CloudWatch Metrics. Traces → X-Ray. Together they answer: what happened (logs), how the system is performing (metrics), where time is spent in a request (traces).',
    ],
    followUps: [
      'How do you emit a custom metric from your application code to CloudWatch?',
      'What is a CloudWatch Dashboard and how does it differ from CloudWatch Alarms?',
      'How does X-Ray propagate trace context through a Lambda → SQS → Lambda chain?',
    ],
    tags: ['AWS', 'CloudWatch', 'X-Ray', 'CloudTrail', 'observability'],
  },

  {
    id: 'trivia-304',
    category: 'trivia',
    difficulty: 'easy',
    title: 'AWS S3: Storage Classes, Pre-Signed URLs, and Event Notifications',
    prompt: `Answer each of the following about S3:

  a) Name four S3 storage classes and explain the key trade-off between Standard and Glacier.
  b) A user needs to download a private file from S3, but you don't want to proxy the download through your server. How do you handle this?
  c) When a file is uploaded to S3, you need to automatically resize it and store the result. How do you wire this up on AWS?
  d) What is S3 Versioning and what does it protect against?
  e) An S3 object is 20 GB. What upload mechanism should you use and why?`,
    hints: [
      'Standard vs Glacier: Standard = instant access, highest cost. Glacier = very low cost, but retrieval takes minutes to hours. Use S3 Lifecycle policies to automatically move objects between classes by age.',
      'Pre-signed URL: generate a time-limited signed URL in your backend. The client downloads directly from S3 — no data flows through your server. Works for both GET (download) and PUT (direct upload).',
      'S3 Event Notification → Lambda trigger: on PutObject, S3 invokes your Lambda with the event. Lambda processes the file (resize) and writes the result back to S3 (different key or bucket).',
      'Multipart upload: required above 5 GB, recommended above 100 MB. Splits the file into parts uploaded in parallel. If a part fails, only that part is retried. Dramatically faster than sequential upload.',
    ],
    followUps: [
      'What is S3 Object Lock and when would you use it?',
      'How does S3 Cross-Region Replication work and what does it require?',
      'What is a bucket policy vs an ACL?',
    ],
    tags: ['AWS', 'S3', 'storage', 'pre-signed URL', 'object storage'],
  },

  {
    id: 'trivia-305',
    category: 'trivia',
    difficulty: 'medium',
    title: 'AWS CDK vs CloudFormation — Infrastructure as Code',
    prompt: `Answer each of the following about AWS IaC:

  a) What is AWS CDK? How does it relate to CloudFormation?
  b) What is the difference between an L1, L2, and L3 CDK construct?
  c) What is "cdk synth" and what does it produce? What is "cdk deploy"?
  d) CloudFormation has drift detection. You made manual changes to a stack in the AWS console. What is drift, why is it a problem, and how do you fix it?
  e) When would you still choose plain CloudFormation over CDK?`,
    hints: [
      'CDK: write infra in TypeScript/Python/etc. CDK synthesizes it to CloudFormation YAML/JSON, then CloudFormation deploys it. CDK is a higher-level abstraction on top of CloudFormation — it still uses CF under the hood.',
      'L1: one-to-one mapping to a CloudFormation resource (CfnBucket). L2: higher-level construct with sensible defaults and helper methods (s3.Bucket with grantRead, addEventNotification). L3 (patterns): multi-resource compositions for common patterns (LambdaRestApi, ApplicationLoadBalancedFargateService).',
      'cdk synth: generates the CloudFormation template from your CDK code. Output is CloudFormation JSON/YAML. cdk deploy: synthesizes then calls CloudFormation to create/update the stack.',
      'Drift: the actual deployed resource differs from the CloudFormation template (manual console edit). Drift is a problem because your next CloudFormation deployment may overwrite the manual change or fail. Fix: import the resource back or redeploy the stack.',
    ],
    followUps: [
      'How do you share CDK constructs between projects?',
      'What is a CDK stack and how do you deploy multiple stacks to different environments?',
      'How does CDK handle existing resources (not created by CDK)?',
    ],
    tags: ['AWS', 'CDK', 'CloudFormation', 'IaC', 'infrastructure'],
  },

  {
    id: 'trivia-306',
    category: 'trivia',
    difficulty: 'medium',
    title: 'AWS High Availability: Multi-AZ, Auto Scaling, and Resilience',
    prompt: `Answer each of the following about AWS high availability:

  a) What is an Availability Zone (AZ)? Why should production services span multiple AZs?
  b) You have an RDS database. What does "Multi-AZ" mean for RDS? How does failover work?
  c) Your ECS service has 3 tasks. How do you ensure they don't all land on the same AZ?
  d) Describe how Application Auto Scaling works for an ECS service. What triggers a scale-out event?
  e) What is the difference between a "warm standby" and "active-active" DR strategy?`,
    hints: [
      'AZ: a physically separate data center within a region, with independent power and networking. If one AZ fails, others keep running. Span 2-3 AZs so a single failure does not take down your service.',
      'RDS Multi-AZ: AWS maintains a synchronous standby replica in a second AZ. On primary failure, AWS automatically promotes the standby. Failover takes ~60 seconds. The connection string (endpoint) stays the same — DNS is updated.',
      'ECS placement constraint: use the "spread" placement strategy with "attribute:ecs.availability-zone" to distribute tasks evenly across AZs. Prevents all tasks landing in the same AZ.',
      'Warm standby: a smaller version of the stack runs in the DR region, scales up on failover. Active-active: full-capacity stacks in multiple regions serve live traffic simultaneously. Active-active is more expensive but eliminates failover time.',
    ],
    followUps: [
      'What is an Auto Scaling Group (ASG) and how does it differ from ECS Auto Scaling?',
      'How does Route 53 health-check-based failover work?',
      'What is the difference between RTO (Recovery Time Objective) and RPO (Recovery Point Objective)?',
    ],
    tags: ['AWS', 'high availability', 'Multi-AZ', 'Auto Scaling', 'disaster recovery'],
  },

  {
    id: 'trivia-307',
    category: 'trivia',
    difficulty: 'easy',
    title: 'AWS Bedrock and GenAI Services',
    prompt: `Answer each of the following about GenAI on AWS:

  a) What is Amazon Bedrock? How does it differ from calling a model API directly (e.g. Anthropic's API)?
  b) What is Bedrock Knowledge Bases? What AWS services does it use under the hood?
  c) What is a Bedrock Agent? How does it differ from a simple model invocation?
  d) What are Bedrock Guardrails and what problems do they solve?
  e) When would you use Bedrock vs SageMaker for a GenAI workload?`,
    hints: [
      'Bedrock: managed API for foundation models from multiple providers (Claude, Llama, Titan, Mistral). No GPU management. Unified API across providers. Billed per token. SageMaker is for training and hosting custom/fine-tuned models on your own compute.',
      'Knowledge Bases: RAG pipeline managed by AWS. Upload documents to S3; Bedrock handles chunking, embedding (your choice of model), and vector storage (Amazon OpenSearch Serverless). Query it and get grounded responses.',
      'Bedrock Agent: orchestrates multi-step agentic workflows. The model decides which tools (Lambda functions you define) to call and in what order, across multiple turns. Goes beyond a single invoke_model call.',
      'Guardrails: content filtering, PII detection/redaction, topic restrictions, grounding checks. Applied consistently across any model in Bedrock without modifying application code.',
    ],
    followUps: [
      'How do you implement streaming responses from Bedrock in Python?',
      'What is prompt caching in Bedrock and when does it reduce cost?',
      'How does Bedrock handle data privacy — does your data train the foundation models?',
    ],
    tags: ['AWS', 'Bedrock', 'GenAI', 'RAG', 'LLM', 'AI'],
  },

  // ─── AWS Architecture ─────────────────────────────────────────────────────

  {
    id: 'arch-51',
    category: 'architecture',
    difficulty: 'medium',
    title: 'Design an Event-Driven Data Pipeline on AWS',
    prompt: `Design an AWS pipeline that:

  - Ingests CSV files uploaded to S3 (up to 10,000 files/day, each up to 500 MB)
  - Parses, validates, and transforms each file
  - Stores results in a queryable data store for a reporting dashboard
  - Sends an alert when a file fails validation
  - Handles retries automatically for transient failures

Address:
  1. The end-to-end AWS architecture (which services at each step and why)
  2. How you trigger processing when a file lands in S3
  3. How you handle files larger than Lambda's /tmp limit (512 MB default)
  4. Where you store the processed data and how the dashboard queries it
  5. How failed-file alerts work (what triggers them, what they contain)
  6. How you handle retries without reprocessing files that already succeeded`,
    hints: [
      'S3 Event Notification → SQS queue → Lambda consumer. SQS decouples the trigger from processing and provides built-in retry with DLQ.',
      'Large files: Lambda /tmp is 512 MB (expandable to 10 GB with ephemeral storage). Stream from S3 instead of loading fully into memory — use boto3 streaming responses. Or use ECS Fargate for very large files.',
      'Processed data: DynamoDB for fast key-value lookups, or Aurora for SQL queries. For analytics/reporting, consider S3 + Athena (query CSV/Parquet directly with SQL, no DB to manage).',
      'Failed-file alert: DLQ on the SQS queue after N retries → Lambda → SNS → email/Slack. Include the S3 key, error message, and timestamp in the notification.',
    ],
    followUps: [
      'How would you add idempotency so reprocessing a file does not duplicate records?',
      'How would you monitor pipeline health — what metrics and alarms?',
      'How would you handle schema changes in the incoming CSV files?',
    ],
    tags: ['AWS', 'S3', 'Lambda', 'SQS', 'event-driven', 'data pipeline', 'system design'],
  },

  {
    id: 'arch-52',
    category: 'architecture',
    difficulty: 'hard',
    title: 'Design a Multi-Region Active-Active API on AWS',
    prompt: `Design a globally distributed REST API that:

  - Serves users in the US, Europe, and Asia with < 100ms p99 latency
  - Writes are consistent across regions within 2 seconds
  - Reads can tolerate up to 1 second of staleness
  - A full AWS region outage should cause < 30 seconds of user impact
  - The system handles 50,000 requests/second globally

Address:
  1. How you route users to the nearest region (DNS + health checks)
  2. The compute and API layer in each region
  3. How data is replicated across regions and what consistency model you accept
  4. How you handle a write conflict when two regions accept writes to the same record simultaneously
  5. How you detect and fail over from a regional outage
  6. The tradeoffs of active-active vs active-passive for this use case`,
    hints: [
      'Route 53 latency-based routing: users DNS-resolve to the nearest region. Health checks on each region endpoint. Failover policy: if a region is unhealthy, Route 53 stops routing to it.',
      'Data replication: DynamoDB Global Tables provides multi-region active-active with < 1 second replication lag. Last-writer-wins conflict resolution. Aurora Global Database provides cross-region replication with a single writer.',
      'Write conflicts (DynamoDB Global Tables): uses last-writer-wins with a timestamp. If your business logic needs stronger conflict resolution, implement application-level versioning (optimistic locking with a version attribute).',
      'Active-active tradeoff: higher complexity (conflict resolution, replication lag), but zero-downtime regional failover and lower global latency. Active-passive is simpler but has failover delay and the standby region is idle cost.',
    ],
    followUps: [
      'How would you test regional failover without impacting production users?',
      'How does eventual consistency affect your API contract with clients?',
      'What is the cost structure of DynamoDB Global Tables vs Aurora Global Database?',
    ],
    tags: ['AWS', 'multi-region', 'Route 53', 'DynamoDB', 'high availability', 'system design'],
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
