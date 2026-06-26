# System Design: Senior Engineer Reference

## The Interview Framework

System design interviews test whether you can go from vague requirements to a concrete, scalable architecture. Interviewers intentionally leave requirements underspecified — your first job is to establish them.

**Structure every answer this way:**

1. **Clarify requirements** (5 min)
   - Functional: what does it do?
   - Non-functional: scale, latency SLA, consistency requirements, availability target
   - Scope: what are you NOT building today?

2. **Capacity estimation** (3 min)
   - Write numbers down. Talk through them out loud.
   - DAU, QPS for reads/writes, storage per year

3. **High-level design** (10 min)
   - Draw the major components: clients, load balancers, app servers, databases, caches, queues
   - Show data flow for the main use case

4. **Deep dive on hard components** (15 min)
   - The interviewer will guide this, or you should pick the hardest part yourself

5. **Bottlenecks and trade-offs** (5 min)
   - What breaks at 10× scale? What would you change?
   - Acknowledge the trade-offs you made

**Never skip step 1.** Jumping to architecture without clarifying scale is the #1 mistake.

---

## Capacity Estimation

Know these numbers cold:

| Metric | Value |
|---|---|
| 1 day | ~86,400 sec ≈ 10^5 sec |
| 1M users × 1 req/day | ~12 QPS |
| 100M users × 10 req/day | ~12,000 QPS |
| 1 byte plain text | 1 byte |
| Average tweet/message | ~200 bytes |
| Profile photo | ~100 KB |
| 1 min HD video | ~100 MB |
| SSD random read | ~100 µs |
| Memory random read | ~100 ns |
| Network round trip (same DC) | ~500 µs |
| Network round trip (cross-region) | ~100 ms |

**Storage estimation example:**
- 10M users upload 1 photo/day (100KB each)
- Daily: 10M × 100KB = 1TB/day
- Yearly: ~365TB ≈ 400TB

---

## Scaling Fundamentals

### Stateless Services (the key to horizontal scaling)

Application servers should hold **no session state** in memory. Store all state in a shared external store (Redis, DB). This lets any server handle any request and allows adding servers freely.

```
[Client] → [Load Balancer] → [App Server 1]  ↘
                           → [App Server 2]  → [Redis] → [Database]
                           → [App Server 3]  ↗
```

### Load Balancers

Distribute traffic across servers. Strategies:
- **Round-robin**: simple, works well when servers are equivalent
- **Least connections**: route to the server with fewest active connections
- **Consistent hashing**: route the same client/key to the same server (for sticky sessions, cache locality)
- **Health checks**: LBs automatically remove unhealthy servers

### CDN (Content Delivery Network)

Cache static assets (images, JS, CSS, videos) at edge nodes geographically close to users. Reduces latency and origin server load dramatically.

- **Push CDN**: you upload assets to the CDN manually
- **Pull CDN**: CDN fetches from origin on first request, then caches

Use CDNs for: static assets, public API responses that don't change per user, video/image content.

---

## Caching

The single highest-leverage optimization. Cache = store expensive results in a faster layer.

### Cache tiers

```
[Browser cache] → [CDN] → [API Gateway cache] → [Application cache (Redis)] → [DB]
```

### Redis as a cache

Redis keeps data in memory (< 1ms reads). Use for:
- Session data
- Rate limiting counters
- Computed aggregates (user follower count, trending scores)
- Pub/sub for real-time features
- Distributed locks

### Cache invalidation strategies

**Cache-aside (lazy loading)**: read from cache; on miss, load from DB and populate cache.
- ✅ Simple, only caches what's actually used
- ❌ First read is slow (cache miss); risk of stale data

**Write-through**: update cache AND DB on every write.
- ✅ Cache always fresh
- ❌ Write latency increases; cache fills with data that may never be read

**Write-behind (write-back)**: write to cache only; DB is updated asynchronously.
- ✅ Very fast writes
- ❌ Risk of data loss if cache dies before DB sync

**TTL (time-to-live)**: every cached entry expires after N seconds.
- Simple consistency model — eventual staleness is bounded

### Cache stampede (thundering herd)

When a popular cache entry expires, thousands of requests simultaneously hit the DB. Solutions:
- **Probabilistic early expiry**: randomly expire slightly before TTL to pre-warm
- **Lock / mutex**: one request rebuilds the cache; others wait
- **Background refresh**: a cron refreshes the cache before it expires

---

## Databases

### SQL vs NoSQL Decision Framework

**Use SQL (PostgreSQL, MySQL) when:**
- Data has rich relationships (foreign keys, joins)
- You need ACID transactions (financial data, orders, regulated records)
- Schema is well-defined and relatively stable
- You need complex queries

**Use NoSQL when:**
- Data is document-shaped or hierarchical (user profiles, activity feeds)
- You need to scale writes horizontally across many nodes
- Schema flexibility is required (different records have different fields)
- Very high write throughput (> 100K writes/sec)

### SQL Scaling

**Read replicas**: primary handles writes; replicas serve reads. Great for read-heavy workloads (most web apps).

**Sharding (horizontal partitioning)**: split data across multiple DB servers by a **shard key** (e.g., `user_id % N`).
- ✅ Scales writes
- ❌ Cross-shard joins are expensive; schema migrations are painful; shard key choice is critical

**Connection pooling**: databases handle a limited number of connections. PgBouncer (PostgreSQL) multiplexes thousands of application connections into tens of DB connections.

### Indexing

- **B-tree index**: default. Great for equality (`=`) and range queries (`<`, `>`, `BETWEEN`)
- **Composite index**: covers multiple columns. The **leftmost prefix rule** — index on `(a, b, c)` helps `WHERE a=?`, `WHERE a=? AND b=?`, but NOT `WHERE b=?` alone
- **Covering index**: index includes all columns needed by a query — no need to hit the actual row
- **EXPLAIN / ANALYZE**: always verify your indexes are being used

### Database Patterns

**CQRS (Command Query Responsibility Segregation)**: separate models for reads and writes. Write model enforces business rules; read model is optimized for query patterns. Enables independent scaling.

**Event Sourcing**: store every state change as an immutable event. Current state is reconstructed by replaying events. Gives full audit trail (critical for regulated industries). Works naturally with CQRS.

---

## Message Queues & Event-Driven Architecture

### Why queues?

- **Decoupling**: producers don't need to know about consumers
- **Buffering**: absorb traffic spikes without overwhelming downstream services
- **Async processing**: don't make users wait for slow operations (email, PDF generation, ML inference)
- **Reliability**: if a consumer crashes, messages aren't lost (they redeliver)

### Core concepts

- **Producer**: writes messages to the queue/topic
- **Consumer / Subscriber**: reads and processes messages
- **At-least-once delivery**: messages may be delivered more than once — consumers **must be idempotent**
- **Exactly-once**: very hard to guarantee; requires coordination at both producer and consumer
- **Dead Letter Queue (DLQ)**: messages that fail repeatedly are routed here for manual inspection

### Tools comparison

| Tool | Best for | Ordering | Replay | Notes |
|---|---|---|---|---|
| **Kafka** | High throughput, event streaming | Per-partition | ✅ | Consumer groups, long retention |
| **RabbitMQ** | Task queues, routing | Per-queue | ❌ | More routing options (fanout, topic, direct) |
| **AWS SQS** | Managed, simple queues | FIFO option | ❌ | At-least-once by default; FIFO is extra |
| **AWS SNS** | Fan-out to many subscribers | ❌ | ❌ | Pairs with SQS for fan-out |
| **Redis Streams** | Lightweight streaming | Per-stream | ✅ | Good for simpler use cases |

### Idempotency is non-negotiable

Because of at-least-once delivery, consumers will occasionally process the same message twice. Design every consumer to handle this gracefully:
- Use a deduplication ID (message ID) stored in a processed-set
- Make operations naturally idempotent (e.g., `INSERT ... ON CONFLICT DO NOTHING`)

---

## Distributed Systems Fundamentals

### CAP Theorem

A distributed system can guarantee **at most 2 of 3**:

- **Consistency (C)**: every read returns the most recent write
- **Availability (A)**: every request gets a response (not necessarily the latest data)
- **Partition Tolerance (P)**: system keeps working when some nodes can't talk to others

Network partitions are unavoidable in any real distributed system. The practical choice is **CP vs AP**:

| System | Choice | Implication |
|---|---|---|
| HBase, Zookeeper | CP | May reject requests during partition to stay consistent |
| Cassandra, DynamoDB | AP | Always responds; may return stale data |
| PostgreSQL (single node) | CA | No partition tolerance — not distributed |

**Eventual consistency**: all nodes will *eventually* converge to the same state, but reads may return stale data in the interim. Acceptable for many use cases (social feeds, non-critical caches).

### Consistency Models (strongest → weakest)

1. **Linearizability**: reads always see the latest write. Expensive.
2. **Sequential consistency**: all operations appear in some sequential order.
3. **Read-your-writes**: you always see your own writes. (Practical baseline for most user-facing apps.)
4. **Eventual consistency**: converges over time. May see stale data.

### Consistent Hashing

Used to distribute keys across nodes with minimal redistribution when nodes are added/removed.

Each node occupies a position on a virtual "ring." Keys are mapped to the nearest node clockwise. Adding/removing a node only remaps ~1/N of keys.

**Virtual nodes**: each physical node is assigned multiple positions on the ring for better balance.

---

## Reliability & Resilience Patterns

### Retry with exponential backoff + jitter

```python
def retry(fn, max_attempts=3, base_delay=0.5):
    for attempt in range(max_attempts):
        try:
            return fn()
        except TransientError:
            if attempt == max_attempts - 1:
                raise
            sleep(base_delay * (2 ** attempt) + random() * 0.1)  # jitter prevents herd
```

### Circuit Breaker

After N consecutive failures, "open" the circuit: reject all requests immediately without trying. After a timeout, enter "half-open" — try one request. If it succeeds, close the circuit.

States: `CLOSED` (normal) → `OPEN` (failing fast) → `HALF_OPEN` (testing recovery)

Prevents cascading failures: if one service is overwhelmed, the circuit breaker stops sending it traffic, giving it time to recover.

### Bulkhead

Isolate resources by concern. A failure in one part doesn't exhaust resources needed by others.

Example: separate thread pools for "critical payments" vs "analytics queries." If analytics goes haywire, it can't starve the payment processing threads.

### Idempotency Keys

For any operation that must not run twice (payment processing, form submission), accept an **idempotency key** from the client. On duplicate requests with the same key, return the cached original response.

---

## API Design Patterns

### REST

```
GET    /orders/{id}            — fetch a specific order
GET    /orders?status=active   — list with filter
POST   /orders                 — create
PUT    /orders/{id}            — full replace
PATCH  /orders/{id}            — partial update
DELETE /orders/{id}            — delete
POST   /orders/{id}/cancel     — action (verb as sub-resource)
```

Best practices:
- Return consistent error shapes: `{ error: { code, message, details } }`
- Version in the URL: `/v1/orders` or via header `Accept: application/vnd.api+json; version=1`
- Pagination: cursor-based for large/frequently-changing datasets (not offset, which drifts)
- Use `429 Too Many Requests` with `Retry-After` header for rate limiting

### GraphQL

Client specifies exactly the fields it needs — eliminates over-fetching and under-fetching. Good for complex, nested data with many different access patterns (e.g., mobile vs web needing different fields).

Tradeoffs vs REST:
- Harder to cache (POST requests, dynamic query structure)
- N+1 problem (solved with DataLoader batching)
- Learning curve for teams used to REST
- Better for complex graphs of related data; overkill for simple CRUD

### gRPC

Binary protocol (Protocol Buffers). Strongly typed, fast, streaming support built-in. Ideal for internal microservice communication. Uses HTTP/2.

Use REST for public APIs and external consumers. Use gRPC for internal service-to-service communication where performance matters.

---

## Observability

You can't fix what you can't see. Three pillars:

**Logs**: record discrete events. Use structured logging (JSON, not plain text). Include correlation IDs to trace requests across services.

**Metrics**: numeric measurements over time. Key metrics to track: request rate, error rate, latency (p50, p95, p99), saturation (CPU, memory, queue depth).

**Traces**: record the path of a request through multiple services. Distributed tracing (Jaeger, Zipkin, AWS X-Ray) shows exactly where time is spent.

**The Four Golden Signals** (Google SRE):
1. Latency
2. Traffic (request rate)
3. Errors (error rate)
4. Saturation (how close to capacity)

---

## Common Design Deep Dives

### Rate Limiter

Algorithms:
- **Fixed window**: count requests per window. Simple but has boundary spikes (burst at window reset).
- **Sliding window log**: track exact timestamps. Accurate but memory-intensive.
- **Token bucket**: bucket fills at a steady rate; each request costs one token. Allows bursts up to bucket size.
- **Leaky bucket**: requests queue up; processed at fixed rate. Smooths traffic but adds latency.

Distributed rate limiter: store counters in Redis using atomic `INCR` + `EXPIRE`. Use Lua scripts for atomic check-and-increment.

### URL Shortener

Key generation strategies:
- **Hash + collision handling**: MD5/SHA hash the URL, take first 7 chars. On collision, try next 7 chars.
- **Counter-based**: auto-increment ID, encode in Base62. No collisions, predictable. Requires distributed counter (Snowflake ID).
- **Pre-generated keys**: generate keys in advance, store in a "key DB," hand them out at request time. Avoids collision logic.

Write path: store `{short_key: long_url}` in a fast database.
Read path: look up short key, redirect (301 permanent vs 302 temporary). **Cache heavily in Redis** — redirects are pure reads.

### Distributed Job Scheduler

Components:
- **Job store**: DB of jobs with `next_run_time`, `status`, `last_run`
- **Scheduler**: polls for due jobs, acquires them (optimistic locking), enqueues
- **Workers**: pull from queue, execute, update status
- **Leader election**: only one scheduler instance should run at a time (use Redis lock or Zookeeper)

Idempotency: jobs should be safe to run twice (idempotent) in case of worker crash mid-execution.
