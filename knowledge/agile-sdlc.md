# Agile & SDLC

## What Is Agile?

Agile is an iterative approach to software development that prioritizes delivering working software frequently, responding to change, and collaborating closely with stakeholders — over following a rigid upfront plan.

The **Agile Manifesto** (2001) values:
- **Individuals and interactions** over processes and tools
- **Working software** over comprehensive documentation
- **Customer collaboration** over contract negotiation
- **Responding to change** over following a plan

The right side still has value — the left side is valued more.

---

## Scrum

Scrum is the most widely used Agile framework. Work is organized into **sprints** (typically 2-week iterations), each of which produces a potentially shippable increment.

### Roles
- **Product Owner (PO)** — owns the backlog; prioritizes features based on business value; represents the customer
- **Scrum Master** — facilitates the process; removes blockers; coaches the team on Agile practices (not a project manager)
- **Development Team** — self-organizing, cross-functional; responsible for delivering the sprint goal

### Ceremonies

| Ceremony | Purpose | Typical Length |
|---|---|---|
| **Sprint Planning** | Team selects backlog items and plans how to accomplish the sprint goal | 2–4 hrs |
| **Daily Standup** | Brief daily sync: what did I do yesterday, what will I do today, any blockers? | 15 min |
| **Sprint Review** | Demo working software to stakeholders; gather feedback | 1–2 hrs |
| **Sprint Retrospective** | Team reflects: what went well, what didn't, what to improve? | 1 hr |
| **Backlog Refinement** | PO and team review and estimate upcoming backlog items | Ongoing |

### Artifacts
- **Product Backlog** — ordered list of all desired features and work; maintained by the PO
- **Sprint Backlog** — subset of backlog items the team commits to completing in the sprint
- **Increment** — the working, tested software produced at the end of a sprint

---

## Kanban

Kanban is a flow-based approach without fixed sprints. Work moves through columns (To Do → In Progress → Review → Done). The key constraint is **WIP limits** — capping how many items can be in each column at once, to prevent bottlenecks and multitasking.

**Scrum vs Kanban:**
- Scrum: fixed-length sprints, committed sprint goal, roles (PO, SM)
- Kanban: continuous flow, no sprints, no mandatory roles, work enters/exits anytime
- Many teams use **Scrumban** — sprints with Kanban-style WIP limits and continuous improvement

---

## User Stories

A user story is a short description of a feature from the user's perspective:

> **As a** [type of user], **I want** [goal] **so that** [benefit].

Example: *As a car buyer, I want to filter listings by price range so that I only see cars I can afford.*

### Acceptance Criteria
Each story has acceptance criteria — the specific conditions that must be true for the story to be "done." Written from the user's perspective, not the implementation. Tested against before closing the story.

### Story Points
Relative estimates of effort and complexity (not hours). Common scales: Fibonacci (1, 2, 3, 5, 8, 13...) or T-shirt sizes (S/M/L/XL). The team calibrates together — a 5-point story is roughly twice as complex as a 2-point story.

---

## Definition of Done (DoD)

A shared agreement on what "done" means for any piece of work. Not done until all criteria are met. Example DoD:

- Code reviewed and approved by at least one other engineer
- Unit and integration tests written and passing
- No new security vulnerabilities introduced
- Feature works in staging environment
- Acceptance criteria verified
- Documentation updated if applicable

Without a DoD, "done" means different things to different people, which causes hidden technical debt.

---

## SDLC (Software Development Life Cycle)

The SDLC describes the phases of software development. Agile is one approach to executing the SDLC iteratively.

```
Requirements → Design → Implementation → Testing → Deployment → Maintenance
     ↑_______________________________________________________|  (repeat)
```

In Agile, each sprint runs through a mini version of this cycle rather than doing each phase once for the whole project.

### Traditional (Waterfall) vs Agile

| Waterfall | Agile |
|---|---|
| All requirements upfront | Requirements evolve |
| Long phases (months) | Short iterations (weeks) |
| Testing after development | Testing throughout |
| Customer sees it at the end | Customer sees it every sprint |
| Change is expensive | Change is expected |

---

## Estimation and Velocity

**Velocity** is the average number of story points completed per sprint. Used to forecast how much work can fit in future sprints — not a measure of productivity or a target to maximize.

**Planning Poker:** team members simultaneously reveal their estimates, discuss differences, and converge. Prevents anchoring (one person's estimate influencing others before they've thought about it).

---

## Key Agile Concepts for Interviews

- **Technical debt** — shortcuts taken now that cost more later. Agile doesn't eliminate it; teams must budget time to address it (usually in the backlog).
- **Continuous integration (CI)** — developers integrate code frequently (at least daily), and automated tests run on every integration. Finds bugs early.
- **Continuous delivery (CD)** — every integration is automatically built, tested, and made deployable. Reduces release risk.
- **Sprint goal** — a short statement of what the team wants to achieve in a sprint, giving flexibility on which specific stories are done as long as the goal is met.
- **Impediment / blocker** — anything preventing the team from making progress. Scrum Master's job to remove.
- **Burndown chart** — shows remaining work over the sprint. Steep drop at the end (cramming) signals poor planning.
