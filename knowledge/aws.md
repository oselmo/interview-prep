# AWS: Senior Engineer Reference

## Core Mental Model

AWS services fall into a few clear categories. Know which layer each lives on:

| Layer | Services |
|---|---|
| Compute | EC2, Lambda, ECS, EKS, Fargate |
| Storage | S3, EBS, EFS, Glacier |
| Database | RDS, DynamoDB, ElastiCache, Aurora |
| Messaging | SQS, SNS, EventBridge, Kinesis |
| Networking | VPC, ALB/NLB, CloudFront, Route 53, API Gateway |
| Security | IAM, KMS, Secrets Manager, WAF, Cognito |
| Observability | CloudWatch, X-Ray, CloudTrail |
| Infrastructure as Code | CloudFormation, CDK |
| AI / GenAI | Bedrock, SageMaker |

---

## Compute

### EC2 vs Lambda vs ECS/EKS

| | EC2 | Lambda | ECS / EKS |
|---|---|---|---|
| Model | Full VM you manage | Function-as-a-service | Containerized services |
| Max runtime | Unlimited | 15 min | Unlimited |
| Scaling | Manual or Auto Scaling Group | Automatic (to 1000 concurrent) | Task/pod scaling |
| Cold start | None | Yes (mitigated by provisioned concurrency) | Minimal |
| Best for | Long-running stateful workloads | Event-driven, short bursts | Microservices, ML inference |
| You manage | OS, runtime, patches | Nothing | Container image, not OS |

**When to use Lambda:** API endpoints with unpredictable traffic, event processors (S3 trigger, SQS consumer, scheduled jobs), anything that runs in < 15 min and doesn't need persistent state.

**When NOT to use Lambda:** Long ML training, WebSocket-heavy servers, anything that needs > 10 GB memory or warm persistent connections.

### ECS vs EKS

- **ECS**: AWS-native container orchestrator. Simpler, less overhead. Use Fargate to avoid managing EC2 instances entirely.
- **EKS**: Managed Kubernetes. More portable (K8s is standard), more complex. Use when you need K8s ecosystem (Helm, custom operators) or multi-cloud portability.

---

## Storage

### S3

Object storage. Not a filesystem — objects are identified by key (path-like strings), not directory trees.

Key concepts:
- **Buckets**: globally unique namespace
- **Storage classes**: Standard → Standard-IA (infrequent access) → Glacier (archival). Lifecycle policies auto-transition objects.
- **Versioning**: keeps all versions of an object. Required for MFA Delete.
- **Event notifications**: S3 can trigger Lambda, SQS, or SNS on `PutObject`, `DeleteObject`, etc.
- **Pre-signed URLs**: grant temporary access to a private object without exposing credentials.
- **Multipart upload**: required for objects > 5 GB, recommended > 100 MB.

```python
# Generate a pre-signed URL (valid for 1 hour)
url = s3.generate_presigned_url(
    'get_object',
    Params={'Bucket': 'my-bucket', 'Key': 'file.pdf'},
    ExpiresIn=3600
)
```

### EBS vs EFS vs S3

| | EBS | EFS | S3 |
|---|---|---|---|
| Type | Block storage (like a hard drive) | Network filesystem (NFS) | Object storage |
| Attach to | One EC2 at a time | Multiple EC2s simultaneously | Any client (HTTP) |
| Persistence | Persists independently of EC2 | Yes | Yes |
| Use for | EC2 OS volume, databases | Shared filesystem across instances | Files, backups, static assets |

---

## Databases

### RDS vs DynamoDB vs ElastiCache

| | RDS / Aurora | DynamoDB | ElastiCache |
|---|---|---|---|
| Type | Relational (SQL) | NoSQL key-value / document | In-memory cache |
| Schema | Fixed schema | Flexible (just need PK) | No schema |
| Scaling | Vertical + read replicas | Horizontal (automatic) | Horizontal |
| Consistency | Strong (ACID) | Eventually consistent (or strong with extra cost) | Eventual |
| Best for | Complex queries, joins, transactions | High-throughput simple lookups, session storage | Sub-millisecond reads, session cache, rate limiting |

**Aurora** is AWS's MySQL/Postgres-compatible database. Up to 5x faster than standard MySQL. Auto-replicates across 3 AZs. Use it instead of RDS MySQL/Postgres for production.

### DynamoDB Key Concepts

- **Partition key**: determines which partition (shard) stores the item. Choose a key with high cardinality to avoid hot partitions.
- **Sort key**: secondary ordering within a partition. Together with partition key forms the composite primary key.
- **GSI (Global Secondary Index)**: lets you query on non-key attributes. Has its own partition key + sort key.
- **Streams**: captures item-level changes. Use to trigger Lambda on writes (event sourcing, CDC).
- **Capacity modes**: On-demand (pay per request, auto-scales) vs Provisioned (set RCUs/WCUs, cheaper at predictable load).

---

## Messaging

### SQS vs SNS vs EventBridge

| | SQS | SNS | EventBridge |
|---|---|---|---|
| Pattern | Queue (pull) | Topic (push/fan-out) | Event bus (pub/sub with rules) |
| Consumers | One consumer per message | Multiple subscribers | Multiple targets via rules |
| Delivery | At-least-once | At-least-once | At-least-once |
| Retention | Up to 14 days | No retention | No retention |
| Best for | Work queues, rate limiting downstream, decouple producers/consumers | Notify multiple services of same event | Complex event routing, cross-service integration |

**SQS types:**
- **Standard**: at-least-once delivery, out-of-order possible. Higher throughput.
- **FIFO**: exactly-once, in-order. Up to 3,000 msg/sec with batching.

**Dead Letter Queue (DLQ)**: after N failed processing attempts, message moves to DLQ. Essential for debugging and preventing poison-pill messages from blocking your queue.

**Common pattern — Fan-out:**
```
Producer → SNS topic → SQS queue A (service A)
                     → SQS queue B (service B)
                     → Lambda C
```
Each subscriber gets its own copy and processes independently.

### Kinesis vs SQS

Use **Kinesis** when you need ordered, replayable event streaming (like Kafka). Messages retained up to 7 days (365 with extended). Multiple consumers can read the same stream independently. Use for real-time analytics, log aggregation, clickstream.

Use **SQS** when each message should be processed by exactly one consumer and ordering doesn't matter (work queue pattern).

---

## API Gateway

Managed HTTP API frontend. Two types:
- **REST API**: full features (request validation, WAF integration, usage plans/API keys)
- **HTTP API**: cheaper, lower latency, simpler. Missing some REST API features but fine for most use cases.

Common architecture:
```
Client → API Gateway → Lambda (or ALB → ECS)
                    → DynamoDB (via direct integration)
```

Lambda proxy integration: API Gateway passes the full HTTP request as a JSON event to Lambda. Lambda returns a JSON response with `statusCode`, `headers`, `body`.

```python
def handler(event, context):
    path = event['path']
    method = event['httpMethod']
    body = json.loads(event.get('body') or '{}')
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'message': 'ok'})
    }
```

---

## IAM

**Principle of least privilege**: grant only the permissions needed. Never use root credentials. Prefer roles over long-lived access keys.

Key concepts:
- **User**: a person or application with long-lived credentials. Avoid for services — use roles.
- **Role**: assumed by services (EC2, Lambda, ECS task) or other AWS accounts. Temporary credentials.
- **Policy**: JSON document attached to a user/role/group defining allowed or denied actions on resources.
- **Resource-based policy**: attached to the resource itself (S3 bucket policy, KMS key policy). Controls who can access this resource from outside the account.

```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::my-bucket/*"
}
```

**Common gotcha**: IAM is eventually consistent. New permissions may take a few seconds to propagate.

---

## Networking

### VPC

A private virtual network in AWS. Resources inside a VPC can communicate privately. Resources in public subnets have internet access via an Internet Gateway. Private subnets route outbound traffic through a NAT Gateway (but are not directly reachable from the internet).

```
Internet
   │
Internet Gateway
   │
Public Subnet  ─── ALB, Bastion host, NAT Gateway
   │
Private Subnet ─── EC2, ECS, RDS (not internet-accessible)
```

**Security Groups**: stateful firewall attached to instances. You define inbound and outbound rules. Stateful = if you allow inbound, the response is automatically allowed outbound.

**NACLs (Network ACLs)**: stateless firewall at the subnet level. Both inbound and outbound rules must be explicitly set.

### CloudFront

CDN (Content Delivery Network). Caches content at 400+ edge locations worldwide. Use for:
- Static assets (JS, CSS, images from S3)
- API acceleration (cache GET responses at edge)
- SSL termination
- WAF integration (block bad requests before they reach your origin)

**Cache behavior**: you configure which paths use which cache settings (TTL, allowed headers, cookies).

---

## Observability

### CloudWatch

- **Metrics**: time-series data (CPU usage, Lambda invocations, custom metrics via `put_metric_data`)
- **Logs**: centralized log aggregation. Lambda, ECS, API Gateway all auto-ship logs to CloudWatch Log Groups.
- **Alarms**: threshold-based alerts on metrics. Can trigger SNS, Auto Scaling, or Lambda.
- **Dashboards**: custom metric views.
- **Log Insights**: SQL-like query language for searching logs.

### X-Ray

Distributed tracing. Traces a request as it moves across Lambda, API Gateway, DynamoDB, etc. Shows latency breakdown by service. Essential for debugging performance in microservices.

### CloudTrail

Records every AWS API call made in your account (who called what, when, from where). Required for compliance/audit. Different from CloudWatch — CloudTrail is about API activity, CloudWatch is about resource metrics.

---

## Infrastructure as Code

### CloudFormation vs CDK

| | CloudFormation | CDK |
|---|---|---|
| Language | YAML / JSON templates | TypeScript, Python, Java, etc. |
| Abstraction | Raw AWS resources | High-level constructs (L1, L2, L3) |
| Learning curve | Verbose, but direct | More intuitive for developers |
| Output | CloudFormation stacks | Synthesizes to CloudFormation |

CDK is generally preferred for new projects — write real code, use loops and conditionals, share constructs as npm packages.

```typescript
// CDK example
const bucket = new s3.Bucket(this, 'MyBucket', {
  versioned: true,
  encryption: s3.BucketEncryption.S3_MANAGED,
  removalPolicy: RemovalPolicy.DESTROY,
});

const fn = new lambda.Function(this, 'Handler', {
  runtime: lambda.Runtime.NODEJS_20_X,
  handler: 'index.handler',
  code: lambda.Code.fromAsset('lambda'),
  environment: { BUCKET: bucket.bucketName },
});

bucket.grantReadWrite(fn);
```

---

## GenAI on AWS

### Bedrock

Fully managed LLM API. Access Claude, Llama, Titan, Mistral, and others without managing infrastructure. No GPUs needed.

Key features:
- **Model invocation**: REST API or SDK, same interface across providers
- **Knowledge Bases**: managed RAG — upload documents to S3, Bedrock handles chunking, embedding, and vector storage (uses OpenSearch Serverless under the hood)
- **Agents**: multi-step agentic workflows with tool use
- **Guardrails**: content filtering, PII detection, topic restrictions

```python
import boto3, json

bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

response = bedrock.invoke_model(
    modelId='anthropic.claude-sonnet-4-6',
    body=json.dumps({
        'anthropic_version': 'bedrock-2023-05-31',
        'max_tokens': 1024,
        'messages': [{'role': 'user', 'content': 'Explain DynamoDB partition keys'}]
    })
)

result = json.loads(response['body'].read())
print(result['content'][0]['text'])
```

---

## Common Serverless Architecture Pattern

```
User → CloudFront → API Gateway → Lambda → DynamoDB
                              ↘ SQS → Lambda (async worker)
                                        ↓
                                       S3 (results)
```

- CloudFront handles caching and SSL
- API Gateway handles auth (Cognito JWT), request validation, rate limiting
- Lambda handles business logic (stateless)
- DynamoDB for fast reads/writes (no connection pool overhead unlike RDS)
- SQS decouples heavy async work
- S3 for large outputs

**Key tradeoffs vs traditional server:**
- ✓ No server management, auto-scales to zero
- ✓ Pay per invocation (cheap at low traffic)
- ✗ Cold starts add latency (use provisioned concurrency for latency-sensitive paths)
- ✗ 15-min max runtime, 10 GB max memory
- ✗ Harder to test locally, more moving parts

---

## Quick Reference — What to Use When

| Need | Use |
|---|---|
| Short event-driven function | Lambda |
| Long-running service / ML inference | ECS Fargate |
| Object storage / static files | S3 |
| Fast key-value reads | DynamoDB |
| Relational data with complex queries | Aurora (RDS) |
| Sub-millisecond cache / session storage | ElastiCache (Redis) |
| Work queue (one consumer per message) | SQS |
| Fan-out / notify multiple services | SNS → SQS |
| Complex event routing with filters | EventBridge |
| Real-time ordered event stream | Kinesis |
| Managed LLM API | Bedrock |
| Managed RAG | Bedrock Knowledge Bases |
| Infra as code (developer-friendly) | CDK |
| Distributed tracing | X-Ray |
| Audit log of API calls | CloudTrail |
