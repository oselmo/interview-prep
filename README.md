# Interview Prep CLI

A terminal-based AI-powered interview practice tool for senior full stack and GenAI engineering roles. Practice DSA, system design, behavioral, TypeScript, Python, and Java questions with hidden test cases, AI feedback, and a step-by-step tutor.

## Quick Start

```bash
npm install
npm start
```

Requires an Anthropic API key:

```bash
# PowerShell
$env:ANTHROPIC_API_KEY="sk-ant-..."

# bash / zsh
export ANTHROPIC_API_KEY=sk-ant-...
```

## Features

- **416 questions** across coding, architecture, trivia, and behavioral categories
- **Hidden test cases** — edge-case inputs injected at run time, never visible in your solution file (same as a real interview)
- **Per-problem language selection** — choose JS, TypeScript, Python, or Java after selecting the problem; language badge `[JS TS PY JV]` shown in the question list
- **Java support** — compile-and-run via `javac`/`java`; hidden tests run automatically for standard function problems; all test calls pre-built in `main()` for every problem type
- **Teacher mode** — walks you through starter problems one step at a time; explains concepts without giving the answer away
- **Tutor mode** — Socratic guidance for harder problems; names the pattern and explains why it applies, but never writes your code
- **Interviewer chat** — live back-and-forth with a simulated technical interviewer mid-problem
- **Follow-up questions** — after submitting, the AI asks complexity and pattern questions in interviewer style
- **AI feedback** — scored 1–10 with verdict (Strong Pass → Strong Fail), strengths, improvements, and key concepts missed
- **Knowledge review** — teacher walks you through each article concept by concept, quizzes you, then asks for confidence confirmation before marking complete
- **Direct category menu** — main menu has per-category options (Coding Practice, Architecture Practice, Trivia, Behavioral) with no separate category selection step
- **Resume interview persistence** — conversation history saved between sessions; resume where you left off or start over; steer mid-interview ("ask more architecture questions", "focus on my X project")
- **Session persistence** — progress and scores saved across sessions; completed questions show a ✓ badge
- **Score-based question selection** — practice sessions prioritize unseen questions, then fall back to lowest-scored completed ones

## Question Breakdown

| Category | Count |
|---|---|
| Starter (guided, teacher mode) | 24 |
| Easy coding | ~10 |
| Medium coding | ~40 |
| Hard coding | ~10 |
| Architecture / System Design | 50 |
| Trivia / Concepts | 283 |
| Behavioral | 5 |
| **Total** | **416** |

## Supported Languages

JavaScript · TypeScript · Python · Java — selected per problem from a list of languages relevant to that question. Solution files are preserved per language when you switch.

Java notes:
- Compiles with `javac` and runs with `java -cp . Solution`
- Standard function problems run hidden tests via a generated `_HiddenTestRunner` class
- All problems (including classTest, treeTest, LCA, linked list) have pre-built test calls in `main()` — no setup needed
- Class/tree/LCA problems use `main()` for testing since test injection isn't supported for compiled languages

## DSA Patterns Covered

| Pattern | Knowledge File |
|---|---|
| Sliding Window & Two Pointers | `sliding-window-two-pointers.md` |
| Fast / Slow Pointers | `fast-slow-pointers.md` |
| Merge Intervals | `merge-intervals.md` |
| Cyclic Sort | `cyclic-sort.md` |
| Linked Lists & Heaps / Stacks & Queues | `linked-lists-and-heaps.md` |
| Tree BFS / DFS | `trees-bst.md` |
| Graphs BFS / DFS (with cycle detection, topo sort) | `graphs-bfs-dfs.md` |
| Subsets & Backtracking | `subsets-backtracking.md` |
| Modified Binary Search | `modified-binary-search.md` |
| Bitwise XOR | `bitwise-xor.md` |
| K-way Merge | `k-way-merge.md` |
| Dynamic Programming | `dynamic-programming.md` |
| Topological Sort | `topological-sort.md` |
| Trie | `trie.md` |
| Union Find | `union-find.md` |
| Monotonic Stack | `monotonic-stack.md` |
| Matrix Traversal | `matrix-traversal.md` |
| Greedy Algorithms | `greedy-algorithms.md` |
| Hash Maps | `hash-maps.md` |
| OOP Design | (embedded in coding questions) |
| Scalable Microservices & APIs | `microservices-and-apis.md` |
| TypeScript Patterns | `typescript.md` |
| Python Data Engineering | `palantir-foundry-data-engineering.md` |
| RAG & GenAI | `rag-genai.md` |
| AWS (Lambda, DynamoDB, SQS/SNS, IAM, VPC) | `aws.md` |
| System Design | `system-design.md` |
| Behavioral (STAR) | `behavioral-star.md` |

## How the Hidden Tests Work

When you run or submit a solution, the app generates a temp file combining your code with a hidden test runner, executes it, then deletes the temp file. You never see the edge-case inputs in your solution file.

**JS / TypeScript / Python** — test runner appended as text to a temp file and executed.

**Java** — for standard function problems, a `_HiddenTestRunner` class is appended to a temp `.java` file alongside your `Solution` class, both compiled with `javac`, then `_HiddenTestRunner.main()` runs. For class/tree/linked-list problems, your `main()` is used instead.

Supported test runner types:

| Type | Used for |
|---|---|
| Standard function | Pure functions with JSON-serializable args |
| Class runner | LRU Cache, MinStack, ParkingLot, MyStack — sequences of method calls |
| Linked list round-trip | Reverse LL — uses `fromArray` / `toArray` helpers |
| Cycle detection | Fast/slow pointer — builds lists with cycles |
| BST / LCA | Builds tree from insertion order, finds nodes by value |
| Debounce | Async runner with real short-delay timers |
| Event Emitter | Captures side effects via closure counters |
| Typed Pipeline | Inline function chains |
| Generator / ETL | Python `io.StringIO` as file-like input |
| Retry | Flaky async function that fails N times before succeeding |
| Multi-function | Runs same test cases against multiple named functions |

## AI Modes

| Mode | When it activates | Behavior |
|---|---|---|
| **Teacher** | Starter problems | Step-by-step walkthrough; explains concepts using different examples, guides you to the answer |
| **Tutor** | Medium / hard coding | Names the pattern, explains why it fits, never writes your code |
| **Interviewer** | Any problem | Live back-and-forth; asks follow-ups, pushes back on reasoning errors |
| **Knowledge Review** | Knowledge Review menu | Teaches concept → quizzes → feedback → next concept; asks for confidence before marking complete |
| **Resume Interviewer** | Resume Interview menu | Behavioral mock grounded in your actual resume; STAR follow-ups, pushes for specifics; conversation persists across sessions; supports mid-interview steering |
| **Feedback** | After submit | Scores 1–10, verdict, strengths, improvements, key concepts missed |
| **Hint** | On request | Single Socratic nudge, 2–4 sentences |

## Project Structure

```
src/
  index.js       — CLI loop, session management, per-problem language selection, submit/feedback flow
  questions.js   — All 416 questions with test cases and follow-up questions
  workspace.js   — File creation, hidden test runner, Java compile/run, Java template generation
  feedback.js    — Claude API calls (tutor, teacher, interviewer, knowledge review, feedback)
  display.js     — Chalk-based UI helpers
knowledge/       — 27 pattern guides with templates, ASCII visuals, complexity tables
workspace/       — Your solution files (git-ignored)
```
