# AWS: Senior Engineer Reference

A practical reference for the AWS services and patterns that appear most in
senior full-stack and cloud architecture interviews. Focused on trade-offs,
decision criteria, and the "why" behind each choice.

---

## 1. Core Mental Model — Layers of AWS

Every AWS service lives at one of a few layers. Knowing the layer tells you what
the service is responsible for and what it is NOT:

| Layer | Services | Responsibility |
|---|---|---|
| Compute | EC2, Lambda, ECS, EKS, Fargate | Run your code |
| Storage | S3, EBS, EFS, Glacier | Persist bytes |
| Database | RDS, Aurora, DynamoDB, ElastiCache | Persist structured data |
| Messaging | SQS, SNS, EventBridge, Kinesis | Move events between services |
| Networking | VPC, ALB/NLB, CloudFront, Route 53, API Gateway | Route traffic |
| Security | IAM, KMS, Secrets Manager, WAF, Cognito | Control access |
| Observability | CloudWatch, X-Ray, CloudTrail | See what is happening |
| IaC | CloudFormation, CDK | Define infra as code |
| AI / GenAI | Bedrock, SageMaker | Run ML workloads |

The key interview move: when asked to design a system, explicitly call out which
service sits at which layer and why. "I'll use DynamoDB at the database layer
because the access pattern is simple key lookups and I need horizontal scale."

---

## 2. Compute

### EC2 vs Lambda vs ECS/EKS — which to pick

| | EC2 | Lambda | ECS / EKS |
|---|---|---|---|
| Model | Full VM you manage | Function-as-a-service | Containerized services |
| Max runtime | Unlimited | 15 minutes | Unlimited |
| Scaling | Auto Scaling Group (you configure) | Automatic, up to 1,000 concurrent by default | Task / pod autoscaling |
| Cold start | None | Yes — mitigated by provisioned concurrency | Minimal (container already running) |
| You manage | OS, patches, runtime | Nothing | Container image; not the OS |
| Best for | Long-running, stateful, or GPU workloads | Event-driven short bursts | Microservices, steady-state APIs |

**Lambda** is the right default for event-driven work: API endpoints with spiky
traffic, S3-trigger processors, SQS consumers, scheduled jobs, and anything that
completes in under 15 minutes. Its biggest hidden cost is the **cold start** — the
first invocation after a period of inactivity must download your package, start the
runtime, and initialize your code. For a Python Lambda with a small package this is
~100 ms; with a large ML library it can be seconds. Mitigations:

- **Provisioned concurrency**: keep N instances warm at all times (costs money, eliminates cold starts).
- **Keep packages small**: use Lambda layers for shared dependencies; avoid bundling
  everything into one 50 MB zip.
- **Avoid Lambda when**: you need persistent in-memory state, WebSocket servers,
  long ML training jobs, or > 10 GB memory.

### Lambda concurrency model

Each Lambda invocation occupies one concurrent slot. If 100 requests arrive simultaneously,
AWS spins up 100 instances (each handling one request). This is very different from a
traditional server with a thread pool — Lambda scales out horizontally, not up per instance.

- **Reserved concurrency**: cap how many instances a function can run simultaneously.
  Protects downstream services (e.g., cap DB connections).
- **Account concurrency limit**: 1,000 concurrent Lambdas per region by default
  (can be raised). Burst limit applies on cold-start: new instances provisioned
  at 500/minute initially.

### ECS vs EKS

**ECS** is AWS's own container orchestrator. Simpler to operate, deep AWS integration,
less configuration overhead. Use **Fargate** mode to avoid managing the underlying EC2
instances entirely — you define CPU/memory per task and AWS handles the rest.

**EKS** is managed Kubernetes. More portable (K8s is the industry standard), richer
ecosystem (Helm charts, custom operators, service mesh options like Istio), and easier
to move workloads to other clouds. Higher operational complexity. Choose EKS when:

- Your team already knows Kubernetes.
- You need multi-cloud portability.
- You need Kubernetes-specific tooling (Argo CD, Flux, K8s CRDs).

---

## 3. Storage

### S3 — Object Storage

S3 stores **objects** identified by a key (a string like `"uploads/user-42/photo.jpg"`),
not a hierarchical filesystem. The key insight: S3 scales to unlimited storage with
no capacity planning. You pay for what you store and transfer.

**Storage classes** are how you trade cost for access speed:

| Class | Access latency | Cost | Use for |
|---|---|---|---|
| Standard | Milliseconds | Highest | Frequently accessed data |
| Standard-IA | Milliseconds | Lower storage, per-retrieval fee | Infrequent but fast access needed |
| One Zone-IA | Milliseconds | Cheaper, single AZ | Reproducible infrequent data |
| Glacier Instant | Milliseconds | Very low | Archives accessed occasionally |
| Glacier Flexible | Minutes–hours | Lowest | Cold archives |

Use **S3 Lifecycle policies** to automatically transition objects between classes (e.g.,
move to Standard-IA after 30 days, Glacier after 90 days).

**Key features for interviews:**
- **Versioning**: keeps every version of an object. Required before enabling MFA Delete.
- **Pre-signed URLs**: grant a time-limited URL to a private object without exposing
  credentials — clients upload/download directly to S3 without going through your server.
- **Event notifications**: S3 can trigger Lambda, SQS, or SNS on `PutObject`,
  `DeleteObject`, etc. Use for processing pipelines (image resize on upload).
- **Multipart upload**: required for objects > 5 GB; recommended above 100 MB.
  Enables parallel uploads and resumable transfers.

```python
# Pre-signed URL — client downloads directly from S3, no server proxy needed
url = s3.generate_presigned_url(
    'get_object',
    Params={'Bucket': 'my-bucket', 'Key': 'reports/q4.pdf'},
    ExpiresIn=3600  # 1 hour
)
```

### EBS vs EFS vs S3

| | EBS | EFS | S3 |
|---|---|---|---|
| Type | Block storage (like an attached hard drive) | Network filesystem (NFS) | Object storage |
| Attach to | One EC2 at a time (except Multi-Attach for io2) | Many EC2s simultaneously | Any client via HTTP |
| Throughput | Very high (local-like) | High (network) | High (HTTP, parallel) |
| Use for | EC2 OS volume, relational databases | Shared filesystem, content management | Files, backups, static assets, data lakes |

The decision is usually simple: databases → EBS; shared file access across instances → EFS;
everything else (static content, backups, analytics data) → S3.

---

## 4. Databases

### RDS / Aurora vs DynamoDB vs ElastiCache

| | RDS / Aurora | DynamoDB | ElastiCache |
|---|---|---|---|
| Type | Relational (SQL) | NoSQL key-value / document | In-memory cache |
| Schema | Fixed, enforced | Flexible (only PK required) | None |
| Scaling | Vertical + read replicas | Horizontal, automatic | Horizontal |
| Transactions | Full ACID | Limited (within-item or TransactWrite) | None |
| Best for | Complex queries, joins, reporting | High-throughput simple lookups | Sub-millisecond reads, session cache |

**Aurora** is AWS's MySQL/Postgres-compatible engine, rebuilt for the cloud. It's
not just "managed RDS" — it decouples compute from storage, auto-replicates across
3 AZs with 6 copies of data, and can serve read replicas with < 10 ms replica lag.
Up to 5× faster than standard MySQL on the same hardware. For any serious production
relational workload, Aurora is the right default over plain RDS.

### DynamoDB — Data Modeling and Access Patterns

DynamoDB is fast (single-digit millisecond P99) and scales horizontally without
any configuration, but it forces you to think about access patterns upfront — you
cannot do arbitrary queries later without an index.

**Key concepts:**
- **Partition key**: determines which partition stores the item. Choose a key with
  high cardinality (many distinct values) and even distribution to avoid **hot partitions**
  — if 80% of your traffic hits one partition key value, that shard becomes a bottleneck.
- **Sort key**: secondary ordering within a partition. Combined with the partition key
  it forms the composite primary key. Enables range queries within a partition
  (`begins_with`, `between`).
- **GSI (Global Secondary Index)**: define an alternate partition+sort key to support
  queries the main key cannot. Has its own read/write capacity units. Use it to
  query by attributes other than the primary key (e.g., "all orders for a user" when
  the primary key is order ID).
- **DynamoDB Streams**: captures item-level changes as an ordered log. Attach a Lambda
  to process changes in real time (CDC, cache invalidation, event sourcing).

**Capacity modes:**
- **On-demand**: auto-scales with no configuration, pay per request. Higher per-unit cost
  but no capacity planning. Use for unpredictable traffic.
- **Provisioned**: declare RCUs (read capacity units) and WCUs (write capacity units).
  Cheaper at predictable load. Auto Scaling can adjust the numbers, but has a delay.

### ElastiCache

In-memory cache (Redis or Memcached). Sub-millisecond reads. Use it to:
- Cache expensive DB query results (read-through / cache-aside pattern).
- Store session data (fast expiry, no DB needed).
- Implement rate limiting with atomic increment + TTL.
- Leaderboards with Redis Sorted Sets.

**Redis vs Memcached**: Redis supports richer data structures (sorted sets, pub/sub,
streams), persistence, replication, and clustering. Prefer Redis unless you only need
simple key-value caching.

---

## 5. Messaging

The fundamental question is: should the producer wait for the result, or fire and forget?
Synchronous calls couple availability — if the downstream is slow, the upstream is slow.
Messaging decouples them.

### SQS — Work Queues

SQS is a pull-based queue. One consumer processes each message. The consumer pulls
messages, processes them, and deletes them on success. If processing fails (crash,
exception), the message becomes visible again after the **visibility timeout** and
another consumer can retry it.

- **Standard**: at-least-once delivery, best-effort ordering. Very high throughput.
- **FIFO**: exactly-once delivery, strict ordering within a message group. Up to
  3,000 messages/sec with batching. Use when order and deduplication matter
  (financial transactions, sequential task pipelines).

**Dead Letter Queue (DLQ)**: after N failed processing attempts, the message is moved
to a DLQ. Essential for production — without a DLQ, a "poison pill" message that always
fails processing loops forever and blocks your queue. The DLQ lets you inspect, replay,
or discard broken messages.

### SNS — Fan-Out

SNS is a push-based pub/sub topic. When you publish one message to a topic, SNS
pushes it to all subscribers (SQS queues, Lambda functions, HTTP endpoints, email).
Every subscriber gets its own copy. Use for one-event-many-consumers patterns.

**Fan-out pattern** — the standard way to decouple event producers from multiple consumers:

```
Producer ──▶ SNS Topic ──▶ SQS Queue A ──▶ Service A (emails)
                        ──▶ SQS Queue B ──▶ Service B (analytics)
                        ──▶ Lambda C        (real-time notification)
```

Each downstream service has its own SQS queue so it processes at its own pace and
failures in one don't affect the others.

### EventBridge — Event Bus with Routing Rules

EventBridge is an event bus with content-based routing. You publish events; EventBridge
matches them against rules and routes to targets. Rules filter by source, detail-type,
or fields in the event body. Use it when you need:
- Complex routing logic across many services.
- Integration with AWS-native events (EC2 state changes, RDS snapshots, etc.).
- Scheduled events (cron-style triggers, replaces CloudWatch Events).
- Cross-account / cross-region event routing.

### Kinesis — Ordered Event Streaming

Kinesis is AWS's managed equivalent of Apache Kafka. Messages (records) are ordered,
retained for up to 365 days (7 by default), and multiple consumers can read the same
stream independently. Use it for:
- Real-time analytics and clickstream processing.
- Log and telemetry aggregation.
- Event sourcing with replay capability.
- Any scenario where you need ordered, replayable events and multiple independent consumers.

**SQS vs Kinesis decision:**

| Use SQS when... | Use Kinesis when... |
|---|---|
| Each message processed by exactly one consumer | Multiple consumers read the same event |
| Order doesn't matter (standard queue) | Order within a shard matters |
| Simple work queue (task distribution) | Real-time streaming analytics |
| Long message retention not needed | You need replay (up to 365 days) |

---

## 6. API Gateway

API Gateway is a managed HTTP(S) front door that handles routing, auth, throttling,
and request/response transformation before traffic reaches your backend.

**Two types:**
- **REST API**: full feature set — request validation, WAF integration, usage plans,
  API keys, custom domain, request/response transformation. More configuration, more cost.
- **HTTP API**: cheaper (~70%), lower latency, simpler. Missing some REST API features
  (no request validation, no usage plans). Fine for most use cases.

**Lambda proxy integration** — the most common pattern: API Gateway converts the HTTP
request into a JSON event and passes it to Lambda. Lambda returns a JSON response:

```python
def handler(event, context):
    method = event['httpMethod']           # GET, POST, etc.
    path   = event['path']                 # /users/42
    body   = json.loads(event.get('body') or '{}')
    params = event.get('queryStringParameters') or {}

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True})
    }
```

**Authorization options:**
- **Cognito User Pools authorizer**: validates JWT tokens issued by Cognito — no Lambda needed.
- **Lambda authorizer**: a Lambda you write that validates any token format and returns
  an IAM policy. Most flexible; adds latency (~100 ms, cacheable).
- **API keys**: simple, not security — use for rate limiting known clients, not auth.

---

## 7. Security and IAM

### IAM — Identity and Access Management

IAM answers "who can do what to which resource." Every action in AWS goes through
IAM. Getting IAM wrong is the #1 source of security incidents in AWS.

**Core concepts:**

- **User**: a human or application identity with long-lived credentials (access key + secret).
  Avoid for services — use roles instead. Long-lived keys are a security liability.
- **Role**: an identity assumed temporarily by a service (Lambda, EC2, ECS task) or a human
  via STS. Generates short-lived credentials that rotate automatically. Roles are the correct
  pattern for any AWS service that calls another AWS service.
- **Policy**: a JSON document that defines `Allow` or `Deny` for specific actions on specific
  resources. Attached to users, groups, or roles.
- **Resource-based policy**: attached to the resource itself (S3 bucket policy, KMS key policy,
  Lambda resource policy). Controls cross-account access to that resource.

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::my-bucket/*"
  }]
}
```

**Principle of least privilege**: grant only the permissions needed for the task.
A Lambda that only reads from DynamoDB should have only `dynamodb:GetItem` and
`dynamodb:Query` — not `dynamodb:*`. Overly permissive policies are the attack
surface for credential theft.

**Evaluation order**: explicit `Deny` always wins. If any policy denies an action,
it is denied regardless of any allow elsewhere. By default, everything is denied.

### KMS — Key Management Service

KMS manages encryption keys. Two key types:
- **AWS managed keys**: created and rotated automatically by AWS for each service
  (e.g., `aws/s3`, `aws/dynamodb`). No cost. You cannot control rotation schedule.
- **Customer managed keys (CMK)**: you create and control. Required for fine-grained
  audit trails (who used which key when), cross-account use, or custom rotation.

Most services (S3, DynamoDB, EBS, RDS, Secrets Manager) support **encryption at rest**
via KMS with a single checkbox — enable it. KMS handles the envelope encryption:
a data key encrypts your data; the data key is itself encrypted by the CMK.

### Secrets Manager vs Parameter Store

- **Secrets Manager**: stores and auto-rotates secrets (DB passwords, API keys).
  Native rotation for RDS/Aurora — it rotates the DB password and updates the
  secret automatically. Costs ~$0.40/secret/month.
- **Systems Manager Parameter Store**: stores configuration and secrets. Free tier
  for standard parameters; $0.05/10,000 API calls for advanced. No built-in rotation.
  Use for non-secret config values; use Secrets Manager for anything that needs rotation.

In code, fetch secrets at runtime (not at deploy time) so you get the rotated value:

```python
import boto3, json

secrets = boto3.client('secretsmanager')
secret  = json.loads(secrets.get_secret_value(SecretId='prod/db/password')['SecretString'])
conn    = psycopg2.connect(host=secret['host'], password=secret['password'], ...)
```

### Cognito — User Authentication

Cognito handles user sign-up, sign-in, MFA, and token issuance so you don't build it yourself.

- **User Pool**: the user directory. Issues JWT tokens (ID token, access token, refresh token)
  after authentication. Integrates with API Gateway as a native authorizer.
- **Identity Pool (Federated Identities)**: exchanges a User Pool token (or a Google/Facebook
  token) for temporary AWS credentials. Use when you need users to directly call AWS services
  (e.g., upload directly to S3).

---

## 8. Networking

### VPC — Virtual Private Cloud

A VPC is a private, isolated virtual network within AWS. By default, nothing in your VPC
can talk to the internet, and the internet cannot reach anything in your VPC. You control
what can flow in and out.

**Subnet types:**
- **Public subnet**: has a route to an Internet Gateway (IGW). Resources can have public IPs.
  Put your load balancers, NAT Gateways, and bastion hosts here.
- **Private subnet**: no route to the IGW. Resources are not reachable from the internet.
  Put your EC2 instances, ECS tasks, RDS databases here. Outbound internet access (for
  downloading packages, calling external APIs) goes through a **NAT Gateway** in the public subnet.

```
Internet
   │
Internet Gateway
   │
Public Subnet  ──  ALB, NAT Gateway, Bastion
   │               (has public IPs)
Private Subnet ──  EC2, ECS, RDS
                   (no public IPs; egress via NAT Gateway)
```

**Security Groups vs NACLs:**

| | Security Group | Network ACL (NACL) |
|---|---|---|
| Applied to | Instance / ENI | Subnet |
| Stateful? | Yes — response traffic auto-allowed | No — both directions must be explicitly allowed |
| Rules | Allow only (implicit deny) | Allow and Deny |
| Evaluation | All rules evaluated | Rules evaluated in order, first match wins |

Security Groups are the primary network control in AWS. NACLs are a secondary, subnet-level
backstop. In practice you configure Security Groups and leave NACLs at defaults unless you
need subnet-wide IP blocking.

**VPC Endpoints**: let resources in your VPC talk to AWS services (S3, DynamoDB) over the
private AWS network instead of the internet — no NAT Gateway needed, no data transfer cost,
no exposure to the public internet. Two types:
- **Gateway endpoint**: for S3 and DynamoDB. Free. You add a route to your route table.
- **Interface endpoint (PrivateLink)**: for other services (SQS, SNS, Secrets Manager, etc.).
  Creates an ENI in your subnet. Has an hourly cost.

### CloudFront — CDN and Edge Acceleration

CloudFront is AWS's CDN. It caches your content at 400+ edge locations (Points of Presence)
worldwide so users fetch content from the nearest edge, not from your origin.

**What it caches and why it matters:**
- Static assets (JS, CSS, images from S3): near-zero latency for users globally.
- API responses (GET requests with short TTLs): reduces origin load, lowers global latency.

**Beyond caching:**
- **SSL/TLS termination** at the edge — your origin can serve plain HTTP internally.
- **WAF integration** — block bad requests at the edge before they hit your servers.
- **Lambda@Edge / CloudFront Functions** — run code at edge locations (auth, URL rewrites,
  header manipulation) with near-zero latency.
- **Origin failover** — configure two origins; CloudFront fails over automatically.

**Cache behavior**: you define which URL patterns use which cache settings (TTL, allowed
query strings, cookies). Cache is keyed on URL + whichever query/header/cookie params
you configure — be deliberate about what varies your cache key.

### ALB vs NLB

| | Application Load Balancer (ALB) | Network Load Balancer (NLB) |
|---|---|---|
| Layer | Layer 7 (HTTP/HTTPS) | Layer 4 (TCP/UDP) |
| Routing | Host/path-based rules | IP + port |
| Use for | HTTP microservices, WebSockets, gRPC | Extreme performance, static IP, non-HTTP protocols |
| TLS termination | Yes | Yes (pass-through also supported) |

ALB is the standard choice for HTTP services. Use NLB when you need a static IP address
(for whitelisting), ultra-low latency (~100 μs vs ~1 ms for ALB), or non-HTTP protocols.

---

## 9. Observability

A distributed system on AWS has many moving parts. You cannot debug it from
print statements. AWS gives you three complementary tools.

### CloudWatch — Metrics and Logs

CloudWatch is the central observability hub. Everything in AWS publishes metrics here.

- **Metrics**: time-series numeric data. Every AWS service emits them automatically
  (Lambda invocations, SQS depth, DynamoDB consumed capacity, RDS CPU). You can
  emit **custom metrics** with `put_metric_data` from your application code.
- **Alarms**: trigger when a metric crosses a threshold. Actions: send SNS notification,
  trigger Auto Scaling, invoke Lambda. This is how you implement auto-scaling and paging.
- **Logs**: Lambda, ECS, API Gateway, VPC Flow Logs, and others ship logs to CloudWatch
  **Log Groups**. Each service/function gets its own Log Group; logs are retained
  per a configurable retention period.
- **Log Insights**: SQL-like query language to search and aggregate log data. Use
  it to find error rates, latency distributions, or specific error messages across
  millions of log lines in seconds.
- **Dashboards**: build custom views combining metrics from multiple services.

### X-Ray — Distributed Tracing

When a request touches API Gateway → Lambda → DynamoDB → S3, you need to see the
full journey and where time is spent. X-Ray propagates a **trace ID** through each
hop and records **segments** (one per service) and **subsegments** (individual operations).
The service map shows you the dependency graph; the trace view shows per-hop latency.

Enable X-Ray with one line of config in Lambda and one SDK call in your code — it
instruments AWS SDK calls automatically.

### CloudTrail — API Audit Log

CloudTrail records every AWS API call: who called what action, on which resource, at
what time, from which IP. This is different from CloudWatch — CloudTrail is about
**control plane activity** (IAM changes, security group modifications, S3 bucket
policy updates), not resource metrics.

Enable CloudTrail in every account and send logs to a separate, protected S3 bucket
in a security account. Required for compliance (SOC 2, HIPAA, PCI). Use it to answer
"who deleted that S3 bucket?" or "which role modified this IAM policy?"

---

## 10. Infrastructure as Code

### CloudFormation vs CDK

| | CloudFormation | CDK |
|---|---|---|
| Language | YAML / JSON | TypeScript, Python, Java, Go, .NET |
| Abstraction | Raw AWS resources (L1) | High-level constructs (L2/L3) that bundle multiple resources |
| Loops, conditionals | Limited (Fn::If, conditions) | Full programming language |
| Testing | Limited | Unit tests with `assertions` library |
| Output | YAML/JSON stacks | Synthesizes to CloudFormation |
| Sharing/reuse | Nested stacks, StackSets | npm/PyPI packages, Construct Hub |

CDK is the preferred approach for new projects — you write real code, get IDE
autocompletion, and can unit-test your infrastructure. An L2 construct like
`s3.Bucket` handles versioning, encryption defaults, and logging configuration
in a few lines; the equivalent CloudFormation YAML is 30+ lines.

```typescript
// CDK: one function with S3 access, properly configured
const bucket = new s3.Bucket(this, 'ProcessingBucket', {
  versioned: true,
  encryption: s3.BucketEncryption.S3_MANAGED,
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  lifecycleRules: [{ expiration: Duration.days(90) }],
});

const fn = new lambda.Function(this, 'Processor', {
  runtime: lambda.Runtime.PYTHON_3_12,
  handler: 'index.handler',
  code: lambda.Code.fromAsset('src/processor'),
  environment: { BUCKET: bucket.bucketName },
  timeout: Duration.minutes(5),
  reservedConcurrentExecutions: 100,
});

bucket.grantReadWrite(fn);  // generates the exact IAM policy needed
```

**Stacks and environments**: a CDK app can contain multiple stacks (e.g., one per
environment: `dev`, `staging`, `prod`). Use CDK context variables or environment
lookups to parameterize per-environment differences.

---

## 11. High Availability and Multi-Region

### Availability Zones

Each AWS region has multiple **AZs** (physically separate data centers with
independent power and networking). Deploying across AZs makes your application
resilient to a single data center failure:

- **RDS Multi-AZ**: synchronous standby in a second AZ; automatic failover in ~60 seconds.
- **ALB**: distribute traffic across instances/tasks in multiple AZs automatically.
- **ECS/EKS**: spread task/pod replicas across AZs with placement constraints.

**Rule**: any production service should span at least 2 AZs. Most should span 3.

### Multi-Region

Multi-region is significantly more complex and is only needed for:
- **Active-active** globally: serve users from the nearest region to reduce latency.
- **Disaster recovery (DR)**: if a full AWS region fails (rare), fail over to another.

Key challenges: **data replication lag** (DynamoDB Global Tables, Aurora Global Database
provide cross-region replication; reads from the nearest region, writes go to the primary),
**DNS failover** (Route 53 health checks + latency/failover routing policies), and
**consistency** (cross-region replication is always eventually consistent).

### Auto Scaling

- **Lambda**: scales automatically, no configuration needed. Set reserved concurrency to cap.
- **ECS/EKS**: Application Auto Scaling adjusts task/pod count based on CPU, memory, or
  custom metrics (SQS queue depth is common — scale workers based on queue depth).
- **EC2 Auto Scaling Group**: scale based on CloudWatch alarms. Pair with ALB for
  automatic de-registration of terminated instances.

---

## 12. GenAI on AWS

### Bedrock

Bedrock is a fully managed API for foundation models — Claude, Llama, Titan, Mistral,
and others. No GPUs to manage, no model hosting. You call an API and pay per token.

**Key features:**

- **Model invocation**: unified API across all model providers.
- **Knowledge Bases**: managed RAG pipeline — upload documents to S3; Bedrock handles
  chunking, embedding (your choice of embedding model), and vector storage
  (Amazon OpenSearch Serverless under the hood). Query it and get grounded answers.
- **Agents**: orchestrate multi-step workflows with tool use (function calling).
  The agent decides which tools to call and in what order.
- **Guardrails**: content filtering, PII redaction, topic restrictions — apply
  consistently across any model without modifying your application code.

```python
import boto3, json

bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

response = bedrock.invoke_model(
    modelId='anthropic.claude-sonnet-4-6',
    body=json.dumps({
        'anthropic_version': 'bedrock-2023-05-31',
        'max_tokens': 1024,
        'messages': [{'role': 'user', 'content': 'Summarize this report.'}]
    })
)

text = json.loads(response['body'].read())['content'][0]['text']
```

---

## 13. Common Architecture Patterns

### Serverless API

```
Browser / Mobile
      │
  CloudFront  ──  WAF (block bad IPs, rate limit)
      │
  API Gateway  ──  Cognito authorizer (JWT validation)
      │
  Lambda  ──  DynamoDB (primary data)
          ──  ElastiCache (cache hot reads)
          ──  SQS (offload heavy async work)
                │
             Lambda worker ── S3 (store outputs)
```

This pattern gives you: no server management, scales to zero, pay per invocation,
and global distribution via CloudFront. Tradeoffs: cold starts on Lambda, 15-min
execution limit, harder local testing.

### Container-Based Microservices

```
Browser / Mobile
      │
  CloudFront
      │
  ALB  ──  ECS Fargate (Service A: Orders)
        ──  ECS Fargate (Service B: Payments)
        ──  ECS Fargate (Service C: Inventory)

Each service:
  ├─ Aurora RDS (relational data) or DynamoDB (key-value)
  ├─ ElastiCache (Redis cache)
  └─ Publishes to EventBridge for cross-service events
```

Better for: long-running processes, services needing > 15 min execution, teams
that need full control over the runtime.

---

## Quick Interview Checklist

When designing an AWS architecture or answering an AWS trade-off question:

1. **Compute** — Lambda (event-driven) vs Fargate (container) vs EC2 (stateful/GPU)?
2. **Data store** — Aurora (relational/complex queries) vs DynamoDB (high-throughput key-value) vs ElastiCache (sub-ms cache)?
3. **Async** — SQS (one consumer, work queue) vs SNS fan-out vs Kinesis (ordered stream, multiple consumers)?
4. **Security** — least-privilege IAM roles on every service; no long-lived keys; secrets in Secrets Manager; encryption at rest via KMS.
5. **Network** — resources in private subnets behind ALB; public subnets only for ALB and NAT Gateway; VPC Endpoints for AWS services.
6. **Observability** — CloudWatch metrics + alarms; X-Ray tracing; CloudTrail API audit log; structured logs with Log Insights.
7. **HA** — span at least 2–3 AZs; Multi-AZ RDS; ALB spreading traffic; Auto Scaling on ECS/Lambda reserved concurrency.
8. **IaC** — CDK for new infra; CloudFormation if CDK not available; never click-ops in production.
