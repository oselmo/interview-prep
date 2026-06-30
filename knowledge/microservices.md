# Microservices Architecture

A practical reference for designing and operating distributed systems built from
independently deployable services. Focused on the trade-offs and patterns that
come up in senior full-stack and platform interviews.

---

## 1. Microservices vs Monolith

A **monolith** is a single deployable unit: one codebase, one process, one database.
**Microservices** split the system into small, independently deployable services, each
owning a bounded slice of the domain and (ideally) its own data store.

### Trade-offs

| Dimension            | Monolith                          | Microservices                          |
|----------------------|-----------------------------------|----------------------------------------|
| Deployment           | One artifact, simple              | Many pipelines, independent deploys    |
| Scaling              | Scale the whole app               | Scale hot services only                |
| Dev velocity (small) | Fast — no network, one repo       | Slower — coordination overhead         |
| Dev velocity (large) | Slows as team/codebase grows      | Teams ship independently               |
| Failure isolation    | One bug can take down everything  | Blast radius contained per service     |
| Data consistency     | ACID transactions, easy           | Distributed — eventual consistency     |
| Operational cost     | Low                               | High (observability, infra, on-call)   |
| Debugging            | Single stack trace                | Distributed tracing required           |

### When to split

Start with a **well-structured monolith** (a "modular monolith") unless you already
have clear reasons not to. Split when:

- A module has a **distinct scaling profile** (e.g., image processing vs. CRUD).
- A module changes at a **different rate** or is owned by a different team.
- You need **independent deployability** to reduce release coupling.
- A module has **different reliability or compliance** requirements (e.g., payments).

Do NOT split just because microservices are fashionable. Premature decomposition
gives you a "distributed monolith" — all the network pain, none of the independence.

### Conway's Law

> Organizations design systems that mirror their own communication structure.

If you have three teams, you will tend to produce three services. The corollary
(the **Inverse Conway Maneuver**) is to deliberately structure teams around the
service boundaries you want — give each team ownership of one bounded context so the
architecture and org chart reinforce each other.

---

## 2. Service Decomposition Patterns

### Domain-Driven Design (DDD)

Decompose along **bounded contexts** — explicit boundaries within which a domain model
and its language are consistent. "Customer" in the Sales context is not the same as
"Customer" in the Support context; each context owns its own model.

- **Aggregate**: a cluster of domain objects treated as a single unit for data changes
  (e.g., an `Order` with its `OrderLines`). The aggregate root is the only entry point.
- **Ubiquitous language**: shared vocabulary between engineers and domain experts.
- Service boundaries should follow bounded contexts, not technical layers.

Decompose by **business capability** (Orders, Payments, Inventory, Shipping), not by
technical tier (UI service, business-logic service, data service) — technical-tier
splits create chatty, tightly-coupled services.

### Strangler Fig Pattern

Incrementally migrate a monolith to services without a big-bang rewrite. Put a façade
(usually a router/proxy) in front of the monolith; route specific calls to new services
one capability at a time; the new services "strangle" the old code until it can be
removed.

```
            ┌──────────────┐
  client ──▶│   Façade /   │──▶ /orders   ──▶ New Orders Service
            │   Router     │
            │              │──▶ /payments ──▶ New Payments Service
            │              │
            │              │──▶ everything ──▶ Legacy Monolith
            └──────────────┘    else
```

Over time, more routes point to new services until the monolith is gone.

---

## 3. Service Communication

### Synchronous (request/response)

The caller blocks until the callee responds. Couples availability: if the callee is
down, the caller fails (unless it degrades gracefully).

- **REST/HTTP** — ubiquitous, human-readable, cacheable, great for public APIs.
- **gRPC** — binary (Protobuf) over HTTP/2; fast, strongly typed, supports streaming
  and bidirectional RPC. Great for internal service-to-service. Not browser-native
  (needs grpc-web proxy).
- **GraphQL** — client specifies exactly the fields it wants in one round trip; great
  for aggregating data for varied frontends; adds server complexity (resolvers, N+1
  query risk, caching is harder).

### Asynchronous (messaging / events)

The caller publishes a message and moves on; the consumer processes it later. Decouples
availability and smooths load spikes (the queue absorbs bursts).

- **Message queue** (point-to-point, e.g., SQS, RabbitMQ): one consumer processes each
  message. Good for task distribution.
- **Pub/sub / event streaming** (e.g., Kafka, SNS): one event, many independent
  consumers. Good for fan-out and event-driven architectures.

**Event-driven architecture**: services emit domain events ("OrderPlaced") that other
services react to, without the publisher knowing who is listening. Maximizes decoupling
but makes the overall flow harder to trace.

### Sync vs Async decision

| Use synchronous when…                     | Use asynchronous when…                          |
|-------------------------------------------|-------------------------------------------------|
| Caller needs the result to proceed        | Fire-and-forget / eventual processing is fine   |
| Simple request/response semantics         | You need to decouple availability               |
| Strong, immediate consistency needed      | You need to buffer load spikes / level traffic  |
| Low latency, point-to-point               | Fan-out to many consumers                       |

---

## 4. Data Management in Microservices

### Database-per-service

Each service owns its data and is the **only** thing that touches its database. Others
must go through its API. This preserves loose coupling and lets each service pick the
right store (relational, document, key-value). The cost: no cross-service JOINs and no
distributed ACID transactions — you trade strong consistency for autonomy.

```
  ┌──────────┐      ┌──────────┐      ┌──────────┐
  │ Orders   │      │ Payments │      │ Inventory│
  │ Service  │      │ Service  │      │ Service  │
  └────┬─────┘      └────┬─────┘      └────┬─────┘
       │                 │                 │
   ┌───▼───┐         ┌───▼───┐         ┌───▼───┐
   │Orders │         │ Pay   │         │ Inv   │
   │  DB   │         │  DB   │         │  DB   │
   └───────┘         └───────┘         └───────┘
   (no service reaches into another service's DB)
```

### Saga pattern (distributed transactions)

Since you can't use a 2-phase-commit ACID transaction across services, model a business
transaction as a sequence of **local transactions**, each emitting an event that triggers
the next. If a step fails, run **compensating transactions** to undo prior steps.

**Choreography** — no central coordinator; each service listens for events and reacts:

```
  Order Svc ──OrderCreated──▶ Payment Svc ──PaymentDone──▶ Inventory Svc
      ▲                                                          │
      └───────────────── InventoryReserved ─────────────────────┘
  (on failure, each service emits a "...Failed" compensating event)
```

Simple, decoupled; but the end-to-end flow is implicit and hard to follow as it grows.

**Orchestration** — a central orchestrator tells each service what to do and handles
compensation:

```
                ┌──────────────────┐
                │   Saga           │
                │   Orchestrator   │
                └──┬────┬────┬──────┘
            (1)    │    │(2) │ (3)
        create     ▼    ▼    ▼
        ┌────────┐ ┌────────┐ ┌──────────┐
        │ Order  │ │Payment │ │Inventory │
        └────────┘ └────────┘ └──────────┘
   On failure the orchestrator issues compensations in reverse order.
```

Explicit, easier to monitor/debug; the orchestrator is a central point that can become
complex (and a single point of logic to maintain).

### CQRS (Command Query Responsibility Segregation)

Split the **write** model (commands that change state) from the **read** model (queries).
The two can use different schemas/stores optimized for their job; a denormalized read
model is updated (often asynchronously) from writes. Adds complexity and eventual
consistency between write and read sides — use only when read and write needs diverge
significantly.

### Event sourcing

Instead of storing current state, store the **append-only log of events** that produced
it. Current state is derived by replaying events. Gives a full audit trail, time-travel,
and easy rebuild of derived views; costs: querying current state requires projections,
schema evolution of events is tricky, and the log grows (snapshots help). Pairs naturally
with CQRS (events feed the read projections).

---

## 5. Observability

You can't debug a distributed system from one log file. Observability rests on three
pillars: **logs, metrics, traces.**

- **Distributed tracing**: propagate a **trace ID** (and span IDs) through every hop so
  you can reconstruct the full request path and see where latency is spent. Standard:
  OpenTelemetry; backends: Jaeger, Zipkin, Tempo.
- **Structured logging**: emit logs as JSON with consistent fields (timestamp, level,
  service, trace_id, user_id). Machine-parseable, searchable, correlatable across services.
- **Metrics**: numeric time series (request rate, error rate, latency percentiles,
  saturation). The **RED** method (Rate, Errors, Duration) for services; **USE**
  (Utilization, Saturation, Errors) for resources.
- **Health checks**: `/healthz` (liveness — is the process alive? restart if not) vs
  `/readyz` (readiness — can it serve traffic? remove from LB if not). Distinguish the two.

### SLO / SLI / SLA

- **SLI** (Indicator): a measured metric, e.g., "99.95% of requests < 200ms."
- **SLO** (Objective): the internal target, e.g., "99.9% availability over 30 days."
- **SLA** (Agreement): the contractual promise to customers, with penalties; always set
  looser than your SLO (SLA 99.5% < SLO 99.9%).
- **Error budget** = 1 − SLO. If SLO is 99.9%, you have 0.1% of the period to spend on
  risk/velocity; freeze risky changes when it's exhausted.

---

## 6. Resilience Patterns

Distributed calls fail. Design every remote call to fail gracefully.

### Circuit breaker

Stop hammering a failing dependency. The breaker wraps a call and tracks failures:

```
                 failures exceed threshold
        ┌────────┐ ─────────────────────────▶ ┌────────┐
        │ CLOSED │                             │  OPEN  │
        │ (calls │ ◀───────────────────────── │ (calls │
        │  pass) │     trial succeeds          │  fail  │
        └────────┘                             │  fast) │
             ▲                                 └───┬────┘
             │  trial fails                        │ after cooldown timeout
             │                                      ▼
             │                              ┌──────────────┐
             └──────────────────────────── │  HALF-OPEN   │
                                            │ (let 1 call  │
                                            │  through to  │
                                            │  test)       │
                                            └──────────────┘
```

- **CLOSED**: requests flow; count failures.
- **OPEN**: trip after the failure threshold; reject immediately ("fail fast") for a
  cooldown period, sparing the downstream and the caller's threads.
- **HALF-OPEN**: after cooldown, allow a trial request. Success → CLOSED; failure → OPEN.

### Retry with backoff

Retry transient failures, but with **exponential backoff + jitter** to avoid a
thundering herd (all clients retrying in lockstep). `delay = base * 2^attempt + random`.
Only retry **idempotent** operations, and cap the number of attempts.

### Bulkhead

Isolate resource pools so one failing dependency can't exhaust all threads/connections
and sink the whole service — like watertight compartments in a ship's hull. E.g., a
separate connection pool per downstream dependency.

### Timeout

Always set a timeout on remote calls. A call with no timeout can hang forever and tie up
a thread; cascading hung calls cause **resource exhaustion** and outages. Timeouts should
be tighter the deeper you go in the call chain.

### Rate limiting

Protect a service from being overwhelmed (and enforce fairness/quotas). Common algorithms:

- **Token bucket**: tokens refill at a fixed rate up to a capacity; each request consumes
  one; empty bucket → reject. Allows controlled bursts. Most common.
- **Leaky bucket**: requests queue and drain at a constant rate; smooths bursts.
- **Fixed/sliding window counters**: count requests per time window.

Return **429 Too Many Requests** with a `Retry-After` header when throttling.

---

## 7. Containerization & Orchestration

### Docker

Package an app + its dependencies into an **image** (an immutable, layered filesystem)
that runs as a **container** (an isolated process). Solves "works on my machine":
the image is identical across dev, CI, and prod. Keep images small (multi-stage builds,
slim base images) and run one concern per container.

### Kubernetes (basics)

Declarative orchestration: you describe desired state; K8s reconciles reality to match.

- **Pod**: smallest deployable unit — one or more tightly-coupled containers sharing
  network/storage. Usually one app container per pod.
- **Deployment**: manages a **ReplicaSet** to keep N pod replicas running; handles rolling
  updates and rollbacks.
- **Service**: a stable virtual IP / DNS name + load balancing across a set of pods
  (server-side service discovery).
- **Ingress**: HTTP(S) routing from outside the cluster to Services (host/path rules, TLS).
- **ConfigMap / Secret**: inject configuration and credentials into pods.
- **HPA (Horizontal Pod Autoscaler)**: scales replica count based on CPU/memory/custom
  metrics.
- **Liveness/readiness/startup probes**: K8s uses your health endpoints to restart hung
  pods and to gate traffic.

---

## Quick Interview Checklist

When asked to design a distributed system, hit these:

1. **Boundaries** — what are the services and why (bounded contexts, not technical tiers)?
2. **Communication** — sync vs async per interaction; protocol choice + justification.
3. **Data** — database-per-service; how do you handle cross-service consistency (saga)?
4. **Resilience** — timeouts, retries+backoff, circuit breakers, bulkheads.
5. **Observability** — tracing, structured logs, metrics, health checks, SLOs.
6. **Deploy/scale** — containers, K8s, autoscaling, zero-downtime rollouts.
7. **Team alignment** — Conway's Law; bounded context per team.
