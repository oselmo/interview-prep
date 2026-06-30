# API Design

A practical reference for designing robust, versioned, and secure APIs — covering
REST conventions, gateway patterns, and auth. Focused on what comes up in senior
full-stack and platform interviews.

---

## 1. REST Best Practices

REST (Representational State Transfer) is a set of architectural constraints, not a
formal spec. In practice, "RESTful" means HTTP verbs + resource-oriented URLs + standard
status codes.

### Resource and verb conventions

- **Resources are nouns, not verbs**: `GET /orders/123`, not `GET /getOrder?id=123`.
- **Use HTTP verbs correctly**:

| Verb   | Meaning                    | Idempotent? | Safe? |
|--------|----------------------------|-------------|-------|
| GET    | Read                       | Yes         | Yes   |
| POST   | Create (or non-idempotent) | No          | No    |
| PUT    | Replace (full update)      | Yes         | No    |
| PATCH  | Partial update             | Usually     | No    |
| DELETE | Remove                     | Yes         | No    |

- **Nest sub-resources sensibly**: `GET /users/42/orders`. Don't nest more than ~2 levels.
- **Filtering/sorting/searching via query params**: `GET /orders?status=open&sort=-createdAt`.

### Status codes to know

| Code | Meaning              | Notes                                   |
|------|----------------------|-----------------------------------------|
| 200  | OK                   | Standard success                        |
| 201  | Created              | POST that creates a resource            |
| 204  | No Content           | Success with no body (DELETE)           |
| 400  | Bad Request          | Malformed input                         |
| 401  | Unauthorized         | Not authenticated                       |
| 403  | Forbidden            | Authenticated but not authorized        |
| 404  | Not Found            | Resource doesn't exist                  |
| 409  | Conflict             | State conflict (duplicate, version)     |
| 422  | Unprocessable        | Validation failed                       |
| 429  | Too Many Requests    | Rate limit hit; include Retry-After     |
| 500  | Internal Server Error| Generic server fault                    |
| 503  | Service Unavailable  | Down for maintenance or overloaded      |

### HATEOAS

The "maturity peak" of Richardson's model: responses include links to related actions
(`"_links": { "cancel": "/orders/123/cancel" }`). Rarely fully adopted in practice.

---

## 2. API Versioning

How you evolve a public API without breaking existing consumers.

### Strategies

- **URI versioning**: `/v1/orders` — simplest, most visible, easy to route. Most common.
- **Header versioning**: `Accept: application/vnd.acme.v2+json` — cleaner URLs, less discoverable.
- **Query param**: `/orders?version=2` — easy but pollutes query strings.

### Backward compatibility

Prefer **additive, backward-compatible** changes (add optional fields, never remove or
rename existing ones) so you rarely need a new major version. Only version on **breaking
changes**: removing fields, changing types, altering semantics of existing endpoints.

---

## 3. Idempotency

An operation is **idempotent** if running it N times has the same effect as running it
once.

- GET, PUT, DELETE are naturally idempotent.
- POST is not — submitting a payment form twice charges twice.

For unsafe operations that clients may retry (e.g., payments, order submission), require
an **idempotency key**:

```
POST /payments
Idempotency-Key: 7f3c-a91b-...
{ "amount": 100, "currency": "USD" }

→ Server stores (key → result). A retry with the same key returns the
  stored result instead of executing again (e.g., charging twice).
```

The server stores the key + response; TTL is typically 24 hours. Key should be
client-generated (UUID), scoped to the user or request type.

---

## 4. Pagination

### Offset / limit

`GET /orders?offset=40&limit=20`

Simple, allows jumping to an arbitrary page. Problem: slow on large offsets (DB must
scan and skip), and can **skip or duplicate rows** if data changes mid-scroll (a new
insert shifts everything).

### Cursor / keyset

`GET /orders?after=<opaque_cursor>&limit=20`

The cursor encodes the position in the dataset (e.g., a timestamp + ID). Stable under
inserts and deletes, efficient at scale (no table scan). Cannot jump to an arbitrary
page. **Preferred for large or infinite feeds** (social timelines, activity logs).

```
Response:
{
  "data": [...],
  "nextCursor": "eyJpZCI6MTIzfQ==",   // base64 of {id: 123, ts: "..."}
  "hasMore": true
}
```

---

## 5. Service Discovery, Load Balancing & API Gateway

### Service discovery

Services come and go (autoscaling, restarts), so callers can't hardcode addresses.

- **Client-side discovery**: client queries a registry (Consul, Eureka) and picks an
  instance itself.
- **Server-side discovery**: client hits a stable endpoint (load balancer / DNS) which
  resolves to a healthy instance. Kubernetes Services work this way.

### Load balancing algorithms

Distribute requests across healthy instances:
- **Round-robin**: rotate through instances in order. Simple, equal distribution.
- **Least connections**: route to the instance with fewest active requests. Better for
  variable-length requests.
- **Consistent hashing**: hash a key (user ID, session ID) to a stable instance. Useful
  for cache affinity.

Health checks remove unhealthy instances from rotation.

### API Gateway

A single entry point in front of all services. Centralizes cross-cutting concerns so
each service doesn't reimplement them:

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

Gateway responsibilities: authentication, rate limiting, routing, TLS termination,
request/response transformation, aggregation, caching, logging.

**BFF (Backend-for-Frontend)**: a gateway variant — one gateway tailored per client
type (web BFF, mobile BFF) so each frontend gets exactly the data shape it needs.

---

## 6. Security

### JWT (JSON Web Token)

Structure: `header.payload.signature`, each part base64url-encoded.

- The **payload** holds claims: `sub` (subject), `exp` (expiry), scopes/roles.
- The **signature** is HMAC-SHA256 or RSA/ECDSA over header+payload.
- The server verifies the signature **without a database lookup** — stateless auth.

```
eyJhbGciOiJIUzI1NiJ9   (header: {"alg":"HS256"})
.eyJzdWIiOiJ1c2VyMTIzIiwiZXhwIjoxNzAwMDAwfQ==  (payload)
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c   (signature)
```

**Caveats**:
- You can't easily revoke a JWT before expiry. Use short TTLs (15 min) + refresh tokens,
  or maintain a denylist.
- The payload is only encoded, not encrypted. Never put secrets in it.
- Validate `alg`, `exp`, and `iss` — don't trust the `alg` field blindly (none-alg attack).

### OAuth2

A **delegated authorization** framework — lets an app act on a user's behalf without
their password. Key roles: Resource Owner (user), Client (app), Authorization Server
(issues tokens), Resource Server (the API).

The standard web/mobile flow is **Authorization Code + PKCE**:

```
  user ──▶ Client ──▶ Auth Server  (user logs in, consents)
                          │
            authorization code (redirect back to client)
                          │
       Client ──code + PKCE verifier──▶ Auth Server ──▶ access token (+ refresh token)
                          │
       Client ──Bearer access token──▶ Resource Server (API) ──▶ protected resource
```

**PKCE** (Proof Key for Code Exchange) prevents authorization code interception in
public clients (mobile apps, SPAs) that can't safely store a client secret.

**OIDC** (OpenID Connect) adds an identity layer — the `id_token` (a JWT) — on top of
OAuth2 for authentication (not just authorization).

### mTLS (mutual TLS)

In normal TLS only the server presents a certificate; in **mutual TLS** both sides do,
so each end cryptographically proves its identity. Used for **service-to-service** auth
inside a mesh — every service verifies the caller's certificate.

A service mesh (Istio, Linkerd) can automate certificate issuance/rotation and enforce
mTLS transparently via sidecars, with no code changes required.

### Zero-trust

"Never trust, always verify." Don't assume traffic inside the network perimeter is safe.

Every request is:
- **Authenticated** — who are you? (identity verification)
- **Authorized** — are you allowed to do this? (least-privilege policy)
- **Encrypted** — mTLS or TLS, even within the data center

The perimeter firewall is no longer the security boundary — **identity is**.

---

## Quick Interview Checklist

When asked to design or review an API:

1. **Resources** — nouns, not verbs; sensible nesting ≤ 2 levels.
2. **Verbs** — correct HTTP semantics; GET safe/idempotent, POST creates.
3. **Status codes** — 2xx/4xx/5xx; don't return 200 for errors.
4. **Versioning** — URI versioning for breaking changes; additive otherwise.
5. **Idempotency** — idempotency keys for POST payments/mutations clients may retry.
6. **Pagination** — cursor/keyset for large sets; offset only for small bounded lists.
7. **Auth** — OAuth2 + PKCE for delegated auth; JWT for stateless session tokens.
8. **Gateway** — centralize authn, rate limiting, routing, TLS termination.
9. **Rate limiting** — 429 + Retry-After; token bucket is the standard algorithm.
10. **Security** — mTLS between services; zero-trust; validate JWT claims.
