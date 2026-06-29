# Microservices & API Design

A practical reference for designing distributed systems built from independently
deployable services, and for designing the APIs that connect them. Focused on the
trade-offs and patterns that come up in senior full-stack / platform interviews.

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

- **Message queue** (point-to-point, e.g., SQS, RabbitMQ work queue): one consumer
  processes each message. Good for task distribution.
- **Pub/sub / event streaming** (e.g., Kafka, SNS): one event, many independent
  consumers. Good for event-driven architectures and fan-out.

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

## 4. API Design

### REST best practices

- **Resources are nouns, not verbs**: `GET /orders/123`, not `GET /getOrder?id=123`.
- **Use HTTP verbs correctly**: GET (read, safe), POST (create), PUT (replace),
  PATCH (partial update), DELETE (remove).
- **Use correct status codes**: 200 OK, 201 Created, 204 No Content, 400 Bad Request,
  401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable,
  429 Too Many Requests, 500 Internal Error, 503 Unavailable.
- **Nest sub-resources sensibly**: `GET /users/42/orders`. Don't nest more than ~2 levels.
- **Filtering/sorting/searching via query params**: `GET /orders?status=open&sort=-createdAt`.
- **HATEOAS** (optional, the "maturity" peak of Richardson's model): responses include
  links to related actions; rarely fully adopted in practice.

### Versioning strategies

- **URI versioning**: `/v1/orders` — simplest, most visible, easy to route. Most common.
- **Header versioning**: `Accept: application/vnd.acme.v2+json` — clean URLs, less visible.
- **Query param**: `/orders?version=2` — easy but pollutes params.

Prefer additive, backward-compatible changes (add fields, never remove/rename) so you
rarely need a new major version. Version only on **breaking** changes.

### Idempotency

An operation is **idempotent** if running it N times has the same effect as running it
once. GET/PUT/DELETE are naturally idempotent; POST is not. For unsafe operations that
clients may retry (payments!), require an **idempotency key**:

```
POST /payments            Idempotency-Key: 7f3c-...    { amount: 100 }
  → server stores (key → result). A retry with the same key returns the
    stored result instead of charging twice.
```

### Pagination

- **Offset/limit**: `?offset=40&limit=20` — simple, allows jumping to a page; but slow
  on large offsets and can skip/duplicate rows if data changes mid-scroll.
- **Cursor/keyset**: `?after=<opaque_cursor>&limit=20` — stable under inserts/deletes,
  efficient at scale; can't jump to an arbitrary page. Preferred for large/infinite feeds.

---

## 5. Service Discovery, Load Balancing, API Gateway

### Service discovery

Services come and go (autoscaling, restarts), so callers can't hardcode addresses.

- **Client-side discovery**: client queries a registry (Consul, Eureka) and picks an
  instance itself.
- **Server-side discovery**: client hits a stable endpoint (load balancer / DNS) which
  resolves to a healthy instance. Kubernetes Services work this way.

### Load balancing

Distribute requests across healthy instances. Algorithms: round-robin, least-connections,
weighted, consistent hashing (sticky by key — useful for cache affinity). Health checks
remove unhealthy instances from rotation.

### API Gateway pattern

A single entry point in front of all services. Handles cross-cutting concerns so each
service doesn't reimplement them: authentication, rate limiting, request routing,
TLS termination, request/response transformation, aggregation, caching, logging.

```
                         ┌─────────────────────────┐
                         │      API GATEWAY         │
                         │  authn · rate-limit ·    │
  clients ──────────────▶│  routing · TLS · cache   │
  (web / mobile / 3rd)   └───────┬─────┬──────┬─────┘
                                 │     │      │
                       ┌─────────┘     │      └─────────┐
                       ▼               ▼                ▼
                ┌────────────┐  ┌────────────┐   ┌────────────┐
                │  Orders    │  │  Payments  │   │  Inventory │
                │  Service   │  │  Service   │   │  Service   │
                └────────────┘  └────────────┘   └────────────┘
```

**BFF (Backend-for-Frontend)**: a gateway variant — one gateway tailored per client
type (web BFF, mobile BFF) so each frontend gets exactly the aggregation/shape it needs.

---

## 6. Data Management in Microservices

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

## 7. Observability

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
- **Error budget** = 1 − SLO. If SLO is 99.9%, you have a 0.1% budget for failure; spend
  it on risk/velocity, and freeze risky changes when it's exhausted.

---

## 8. Resilience Patterns

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

## 9. Containerization & Orchestration

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

## 10. Security

### JWT (JSON Web Token)

A signed, self-contained token: `header.payload.signature`, base64url-encoded. The
payload holds **claims** (sub, exp, scopes/roles). Because it's signed (HMAC or RSA/ECDSA),
the server can verify it **without a database lookup** — stateless auth. Caveats: you
can't easily revoke a JWT before it expires (use short TTLs + refresh tokens, or a
denylist); never put secrets in the payload (it's only encoded, not encrypted).

### OAuth2

A **delegated authorization** framework — lets an app act on a user's behalf without
their password. Key roles: Resource Owner (user), Client (app), Authorization Server
(issues tokens), Resource Server (the API). The common flow is **Authorization Code +
PKCE** for web/mobile:

```
  user ──▶ Client ──▶ Auth Server  (user logs in, consents)
                          │
            authorization code (redirect back to client)
                          │
       Client ──code+PKCE verifier──▶ Auth Server ──▶ access token (+ refresh token)
                          │
       Client ──Bearer access token──▶ Resource Server (API) ──▶ protected resource
```

(**OIDC** adds an identity layer — the `id_token` — on top of OAuth2 for authentication.)

### mTLS (mutual TLS)

In normal TLS only the server presents a certificate; in **mutual TLS** both sides do, so
each end cryptographically proves its identity. Used for **service-to-service** auth inside
a mesh — every service verifies the caller's cert. A service mesh (Istio/Linkerd) can
automate cert issuance/rotation and enforce mTLS transparently via sidecars.

### Zero-trust

"Never trust, always verify." Don't assume that traffic inside the network perimeter is
safe. Every request is authenticated, authorized, and encrypted regardless of origin;
services authenticate each other (mTLS + service identity), apply least-privilege policy,
and the network is treated as hostile. The perimeter firewall is no longer the security
boundary — identity is.

---

## Quick interview checklist

When asked to design a distributed system, hit these:

1. **Boundaries** — what are the services and why (bounded contexts, not tiers)?
2. **Communication** — sync vs async per interaction; protocol choice + justification.
3. **Data** — database-per-service; how do you handle cross-service consistency (saga)?
4. **API** — REST conventions, versioning, idempotency, pagination.
5. **Entry** — API gateway responsibilities; auth (OAuth2/JWT), rate limiting.
6. **Resilience** — timeouts, retries+backoff, circuit breakers, bulkheads.
7. **Observability** — tracing, structured logs, metrics, health checks, SLOs.
8. **Deploy/scale** — containers, K8s, autoscaling, zero-downtime rollouts.
9. **Security** — mTLS between services, zero-trust, least privilege.
