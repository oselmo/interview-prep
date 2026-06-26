# Interview Prep CLI

A terminal-based AI-powered interview practice tool for senior full stack and GenAI engineering roles. Practice DSA, system design, behavioral, TypeScript, and Python questions with hidden test cases, AI feedback, and a step-by-step tutor.

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

- **79 questions** across coding, architecture, trivia, and behavioral categories
- **Hidden test cases** — edge-case inputs injected at run time, never visible in your solution file (same as a real interview)
- **Teacher mode** — walks you through starter problems one step at a time; explains concepts without giving the answer away
- **Tutor mode** — Socratic guidance for harder problems; names the pattern and explains why it applies, but never writes your code
- **Interviewer chat** — live back-and-forth with a simulated technical interviewer mid-problem
- **Follow-up questions** — after submitting, the AI asks complexity and pattern questions in interviewer style
- **AI feedback** — scored 1–10 with verdict (Strong Pass → Strong Fail), strengths, improvements, and key concepts missed
- **Session persistence** — progress and scores saved across sessions; completed questions show a ✓ badge
- **Score-based question selection** — practice sessions prioritize unseen questions, then fall back to lowest-scored completed ones

## Question Breakdown

| Category | Count |
|---|---|
| Starter (guided, teacher mode) | 22 |
| Easy coding | 3 |
| Medium coding | 19 |
| Hard coding | 4 |
| Architecture / System Design | 8 |
| Trivia / Concepts | 18 |
| Behavioral | 5 |
| **Total** | **79** |

## Supported Languages

JavaScript · TypeScript · Python — switch any time from the main menu. Solution files are preserved per language when you switch back.

## DSA Patterns Covered

| Pattern | Knowledge File |
|---|---|
| Sliding Window & Two Pointers | `sliding-window-two-pointers.md` |
| Fast / Slow Pointers | `fast-slow-pointers.md` |
| Merge Intervals | `merge-intervals.md` |
| Cyclic Sort | `cyclic-sort.md` |
| Linked Lists & Heaps / Stacks & Queues | `linked-lists-and-heaps.md` |
| Tree BFS / DFS | `trees-bst.md` |
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
| Graphs BFS / DFS | `graphs-bfs-dfs.md` |
| Greedy Algorithms | `greedy-algorithms.md` |
| Hash Maps | `hash-maps.md` |
| TypeScript Patterns | `typescript.md` |
| Python Data Engineering | `palantir-foundry-data-engineering.md` |
| RAG & GenAI | `rag-genai.md` |
| System Design | `system-design.md` |
| Behavioral (STAR) | `behavioral-star.md` |

## How the Hidden Tests Work

When you run or submit a solution, the app generates a temp file combining your code with a hidden test runner, executes it, then deletes the temp file. You never see the edge-case inputs in your solution file.

Supported test runner types:

| Type | Used for |
|---|---|
| Standard function | Pure functions with JSON-serializable args |
| Class runner | LRU Cache, Stack — sequences of method calls |
| Linked list round-trip | Reverse LL — uses `fromArray` / `toArray` helpers |
| Cycle detection | Fast/slow pointer — builds lists with cycles from `{vals, cycleIdx}` |
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
| **Feedback** | After submit | Scores 1–10, verdict, strengths, improvements, key concepts missed |
| **Hint** | On request | Single Socratic nudge, 2–4 sentences |

## Project Structure

```
src/
  index.js       — CLI loop, session management, submit/feedback flow
  questions.js   — All 79 questions with test cases and follow-up questions
  workspace.js   — File creation, hidden test runner, editor integration
  feedback.js    — Claude API calls (tutor, teacher, interviewer, feedback)
  display.js     — Chalk-based UI helpers
knowledge/       — 24 pattern guides with templates, ASCII visuals, complexity tables
workspace/       — Your solution files (git-ignored)
```
