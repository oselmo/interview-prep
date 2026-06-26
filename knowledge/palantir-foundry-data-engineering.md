# Data Engineering & Palantir Foundry: From the Ground Up

---

## Part 1: The Problem That Data Engineering Solves

### Why does data engineering exist?

A large enterprise has data scattered everywhere: orders in one database, accounts in another, customer records in a CRM, documents in file storage, billing data in a third-party system. The business wants answers like:

- "How many orders were placed last month, and what was the average value?"
- "Which customers are at highest risk of churning next quarter?"
- "Show me all documents submitted with order #O-12345"

The raw data exists. But it's in the wrong shape, in the wrong places, and at different quality levels. **Data engineering is the discipline of moving, cleaning, transforming, and organizing data so that analysts, data scientists, and applications can actually use it.**

### The core data problem at enterprises

Raw source data is almost always:
- **Messy**: missing values, inconsistent formats, duplicates
- **Scattered**: multiple systems, different schemas, different update frequencies
- **Untrusted**: no one knows where a number came from or whether it's accurate
- **Unstable**: source systems change their schemas without warning

Without data engineering, every analyst writes their own version of the same cleanup code, everyone gets slightly different numbers, and no one trusts the data. Data engineering creates a **single, reliable, auditable source of truth**.

---

## Part 2: Core Data Engineering Concepts

### What is a data pipeline?

A **data pipeline** is a sequence of steps that takes raw data from a source and produces clean, transformed data at a destination. Like a factory assembly line: raw material goes in one end, finished product comes out the other.

```
[Source DB] → [Extract] → [Transform] → [Load] → [Data Warehouse/Lake]
```

The steps:
- **Extract**: pull data from the source (database, API, file, event stream)
- **Transform**: clean it, join it with other data, reshape it
- **Load**: write it to the destination where analysts/models can use it

### ETL vs ELT

**ETL (Extract → Transform → Load)**: transform the data before loading it. Required when the destination can't handle raw data. Common in legacy systems.

**ELT (Extract → Load → Transform)**: load raw data first, then transform it inside the destination platform. Modern approach — cloud warehouses (Snowflake, BigQuery) and platforms like Foundry are powerful enough to do the transformation themselves. Keeps the raw data for debugging.

Palantir Foundry uses **ELT**: raw data lands in Bronze datasets, transforms produce Silver/Gold downstream.

### The Medallion Architecture (Bronze → Silver → Gold)

A standard pattern for organizing data in layers:

```
Bronze  = raw data, exact copy from the source, nothing changed
Silver  = cleaned, validated, deduplicated, schema-enforced
Gold    = business-ready: joined, aggregated, ready for reports and ML
```

Why layers?
- Raw data is always preserved (you can re-derive everything if a bug is found)
- Each layer has a clear contract — what schema and quality to expect
- Failures in a downstream transform don't corrupt upstream data
- Debugging is easy: check each layer to find where the bad data entered

---

## Part 3: What is Palantir Foundry?

### The core idea

Foundry is an enterprise data platform that unifies data ingestion, transformation, analysis, and applications into one environment. The key insight: **treat data like code**.

- Every dataset is **versioned** (like a git commit — you can go back to any point in time)
- Every transformation is **tracked** (who wrote it, when it ran, what inputs it read)
- Data lineage is **automatic** (Foundry knows exactly which outputs depend on which inputs)
- The platform handles the infrastructure (you write Python/SQL, Foundry runs the Spark cluster)

### Who uses Foundry?

Foundry is used at many large enterprises across finance, defense, pharma, and transportation. It's particularly common in regulated industries — sectors that need strong audit trails, compliance, and the ability to trust their numbers.

### The main components

**Datasets**
The fundamental unit in Foundry. Everything is a dataset — raw inputs, intermediate results, and final outputs. A dataset is a versioned, immutable table stored as Parquet files.

Think of it like this: if you run a transform today and it produces 10,000 rows, that version of the dataset is saved forever. If you run it again tomorrow with different source data, you get a new version. You can always go back.

**Transforms (Code Repositories)**
Python or Java code that reads one or more input datasets and writes an output dataset. Foundry executes transforms as Apache Spark jobs on a managed cluster — you write the logic, Foundry handles the infrastructure.

```python
from transforms.api import transform_df, Input, Output
from pyspark.sql import functions as F

@transform_df(
    Output("/enterprise/silver/records_clean"),
    raw=Input("/enterprise/bronze/records_raw"),
)
def compute(raw):
    return (
        raw
        .filter(F.col("record_id").isNotNull())
        .filter(F.col("amount") >= 0)
        .withColumn("filed_year", F.year(F.col("filed_date")))
        .dropDuplicates(["record_id"])
    )
```

**Ontology**
The semantic layer above raw data. Instead of tables and columns, you work with business objects:
- A row in the records table becomes a `Record` object
- A row in the accounts table becomes an `Account` object
- Objects have typed properties and relationships (`Order` belongs to an `Account`)

The Ontology lets non-technical users and AI systems reason about business concepts rather than database schemas. When an analyst asks "show me all open orders for accounts in the Midwest," Foundry knows what "open orders" and "accounts in the Midwest" mean.

**Pipeline Builder**
A visual drag-and-drop interface for connecting datasets and transforms. Good for analysts who don't write code. Engineers typically use Code Repositories directly.

**Code Workbooks**
Jupyter-like notebooks inside Foundry. Write Python/R/SQL interactively against live Foundry datasets. Good for exploration before productionizing as a Transform.

**Workshop**
A no-code application builder. Analysts create internal dashboards and workflow tools that read from and write to Ontology objects. A business analyst might use a Workshop app to review flagged records.

**AIP (Artificial Intelligence Platform)**
Foundry's GenAI layer. Lets you build LLM-powered workflows grounded in your Ontology data:
- **AIP Logic**: agentic workflows where an LLM can read Ontology objects, call tools, and take actions
- **AIP Assist**: a ChatGPT-like interface over your company's data
- **AIP Studio**: build and deploy AI applications on top of your data

For a GenAI + data engineering role, AIP is the intersection — it's where your pipeline work becomes AI-powered.

---

## Part 4: Writing Foundry Transforms

### The basic transform

```python
from transforms.api import transform_df, Input, Output
from pyspark.sql import functions as F

@transform_df(
    Output("/project/silver/accounts"),
    raw=Input("/project/bronze/policies_raw"),
    reference=Input("/project/reference/states"),  # can have multiple inputs
)
def compute(raw, reference):
    # Join accounts with region reference data
    return (
        raw
        .join(reference, raw.state_code == reference.code, "left")
        .filter(F.col("status") != "cancelled")
        .select("account_id", "holder_id", "premium", "state_code", "state_name", "start_date")
    )
```

### Incremental transforms

Running the full pipeline every time is expensive for large datasets. Foundry supports incremental computation — only process rows that changed since the last run.

```python
from transforms.api import transform_df, incremental, Input, Output

@incremental()
@transform_df(
    Output("/silver/records"),
    raw=Input("/bronze/records_raw"),
)
def compute(raw, ctx):
    if ctx.is_incremental:
        # Only process new/changed rows since last run
        raw = ctx.get_input("raw").since_last_stored_snapshot()
    
    return (
        raw
        .filter(F.col("record_id").isNotNull())
        .withColumn("processed_at", F.current_timestamp())
    )
```

### Common transform patterns

**Deduplication**: keep one row per unique key
```python
df = df.dropDuplicates(["account_id"])
# Or keep the most recent:
window = Window.partitionBy("account_id").orderBy(F.col("updated_at").desc())
df = df.withColumn("rn", F.row_number().over(window)).filter(F.col("rn") == 1).drop("rn")
```

**Null handling**: decide what to do with missing values
```python
df = df.fillna({"amount": 0.0, "status": "unknown"})
df = df.filter(F.col("account_id").isNotNull())  # drop rows with null key
```

**Type casting**: standardize types from messy source data
```python
df = df.withColumn("amount", F.col("amount").cast("double"))
df = df.withColumn("filed_date", F.to_date(F.col("filed_date_str"), "yyyy-MM-dd"))
```

**Conditional logic**: replace if/else chains
```python
df = df.withColumn("risk_tier",
    F.when(F.col("premium") > 5000, "high")
    .when(F.col("premium") > 1000, "medium")
    .otherwise("low")
)
```

---

## Part 5: Apache Spark — The Engine Inside Foundry

Foundry runs transforms using **Apache Spark**, a distributed computing framework. Understanding Spark helps you write efficient transforms.

### How Spark works (the mental model)

Spark splits your data into **partitions** — chunks processed in parallel across many machines (a cluster). Each machine processes its partitions independently. When you join or group data, Spark may need to move data between machines (called a **shuffle**).

```
Your data (100M rows)
    ↓ split into partitions
[Part 1] [Part 2] [Part 3] ... [Part N]
    ↓ each partition processed on a separate machine
[Worker 1] [Worker 2] [Worker 3] ... [Worker N]
    ↓ results combined
Output dataset
```

### Lazy evaluation

Spark is **lazy**: when you write `df.filter(...)`, Spark does NOT run immediately. It builds a plan (a DAG of operations). The plan only executes when you call an **action**:
- `df.write.save(...)` — write to storage
- `df.collect()` — bring all data to the driver (dangerous on large data!)
- `df.count()` — count rows
- `df.show()` — print first N rows

The benefit: Spark's **Catalyst optimizer** can look at your entire plan and optimize it — pushing filters down to run before joins, eliminating columns you don't use, reordering operations.

### The most expensive operation: shuffles

A **shuffle** happens when Spark needs to redistribute data across partitions — usually for joins (`df.join()`) and aggregations (`df.groupBy()`). Data moves over the network. Shuffles are the #1 cause of slow Spark jobs.

**Minimize shuffles by:**
- Filtering and selecting columns BEFORE joining (less data to shuffle)
- Using broadcast joins when one table is small

```python
# BAD: join first, filter later (shuffles all the data)
result = big_table.join(small_ref, "state_code").filter(F.col("status") == "active")

# GOOD: filter first, then join (shuffles less data)
filtered = big_table.filter(F.col("status") == "active")
result = filtered.join(F.broadcast(small_ref), "state_code")
```

**Broadcast join**: if one table is small (< ~200MB), tell Spark to copy it to every machine instead of shuffling the big table. No network shuffle needed.

```python
from pyspark.sql import functions as F
result = big_df.join(F.broadcast(small_lookup), "key")
```

### Window functions

Window functions compute values over a "window" of rows related to the current row — without collapsing the dataset like groupBy does.

```python
from pyspark.sql import Window

# Rank orders within each account by amount (largest first)
window = Window.partitionBy("account_id").orderBy(F.col("amount").desc())
df = df.withColumn("rank", F.row_number().over(window))

# Running total of premium per holder over time
window2 = Window.partitionBy("holder_id").orderBy("date").rowsBetween(Window.unboundedPreceding, 0)
df = df.withColumn("cumulative_premium", F.sum("premium").over(window2))
```

### Performance checklist

| Problem | Fix |
|---|---|
| Slow aggregation | Filter before groupBy, repartition on the group key |
| Slow join | Broadcast the small table; filter both sides first |
| Out of memory | Reduce partition size; use `persist()` instead of `cache()` with DISK_AND_MEMORY |
| Too many small files | `df.coalesce(N)` before write to merge into N output files |
| Skewed data | One partition has 90% of rows (e.g., "unknown" state) — salt the key |

---

## Part 6: Incremental Processing — Only Handle What Changed

Re-running the full pipeline on every schedule is expensive. If you have 500M rows and only 10K changed, you don't want to reprocess all 500M.

### Watermark approach

Store the timestamp of the last successful run. Only query new rows:

```python
from datetime import datetime
import json

def get_watermark(name: str) -> datetime:
    with open(f"/state/{name}.json") as f:
        return datetime.fromisoformat(json.load(f)["last_run"])

def save_watermark(name: str, ts: datetime):
    with open(f"/state/{name}.json", "w") as f:
        json.dump({"last_run": ts.isoformat()}, f)

watermark = get_watermark("records_pipeline")
new_rows = spark.read.jdbc(url, "records", properties=props).filter(
    F.col("updated_at") > watermark
)
```

**Pitfall — late-arriving data**: an event from 3 days ago might arrive in the source system today (delayed by a third-party system, network issue, or backfill). Always use a **lookback window**: reprocess the last 2-3 days to catch late arrivals.

### Change Data Capture (CDC)

Instead of querying the full table and filtering, **read the database's change log**:
- PostgreSQL writes every insert/update/delete to the **WAL** (Write-Ahead Log)
- MySQL writes to the **binlog**
- CDC tools read these logs and produce a stream of changes

Tools: **Debezium** (open source, connects to Kafka), **AWS DMS**, **Airbyte**

CDC gives you:
- Every row change with before/after values
- Deletes (watermark approach misses deletes)
- Near-real-time updates (seconds, not hours)
- Far lower load on the source database

---

## Part 7: Data Lineage

### What is data lineage and why does it matter?

**Data lineage** is the record of: where did this data come from, what transformations were applied to it, and what other datasets or reports depend on it?

Think of it like git blame for data. If a number looks wrong in a report, you can trace it backwards through every transformation until you find the source of the error.

**Why it's critical in production pipelines:**
- **Debugging**: the quarterly revenue number looks wrong — which transform introduced the error?
- **Regulatory compliance**: auditors want to see exactly how a number was computed, from raw source to final report
- **GDPR / CCPA**: "delete all data for this customer" — lineage tells you every table and dataset they appear in
- **Impact analysis**: "I need to change the accounts table schema — what will break?" — lineage shows you every downstream dataset

### How Foundry handles lineage

Foundry tracks lineage **automatically**. Every time a transform runs, Foundry records:
- Which input datasets were read (and at which version)
- Which output dataset was written
- The transform code that connected them

You can click any dataset in Foundry's UI and see the complete upstream DAG (what contributed to this data) and downstream DAG (what depends on this data).

### Column-level lineage

Dataset-level lineage tells you "dataset A fed into dataset B." Column-level lineage goes further: "the `annual_premium` column in the Gold dataset comes from `monthly_premium` × 12 in the Silver dataset, which came from `premium_amount` in the Bronze table."

Column-level lineage is harder to implement but critical for compliance — when a regulator asks "where does this specific number come from?", you need the answer.

### Lineage outside Foundry

If you're building pipelines outside Foundry:
- **OpenLineage**: open standard for emitting lineage events. Works with Airflow, Spark, dbt. Store in Marquez or Atlan.
- **dbt**: tracks lineage via `ref()` macros. `{{ ref('bronze_records') }}` explicitly declares the dependency.
- **Apache Atlas**: enterprise lineage store, often used with Hadoop/HBase ecosystems.

---

## Part 8: Data Quality

### Why data quality is not optional in production pipelines

In enterprise systems, **data quality directly affects business outcomes**:
- Wrong calculations → financial statements are wrong
- Incorrect aggregations → bad reporting decisions
- Missing records → incorrect modeling → bad predictions

Bad data that makes it to a model or report silently corrupts downstream decisions. The later you catch it, the more expensive it is to fix.

### The four levels of data quality checks

**1. Schema checks** — the data has the right shape
- Expected columns exist with the right types
- No unexpected nullable fields
- No extra columns that indicate a source schema change

**2. Completeness checks** — no surprising nulls
- `record_id` should never be null
- `amount` null rate should be < 0.1%
- Every record should reference a valid account

**3. Business rule checks** — values make logical sense
- `premium >= 0` (negative premiums don't make sense)
- `end_date >= start_date`
- `event_date >= account_start_date`

**4. Statistical / drift checks** — distributions match expectations
- Row count is within ±20% of yesterday's count
- Average transaction amount hasn't changed by more than 3 standard deviations
- The distribution of record statuses matches historical patterns

### Tools

**Great Expectations (Python)**
Define "expectations" as code, run them against DataFrames or database tables, generate HTML reports.

```python
import great_expectations as ge

df = ge.from_pandas(records_df)
df.expect_column_to_exist("record_id")
df.expect_column_values_to_not_be_null("record_id")
df.expect_column_values_to_be_between("amount", min_value=0, max_value=1_000_000)
results = df.validate()
```

**dbt tests**
Write SQL-based tests that run as part of your dbt build:
```yaml
# models/schema.yml
models:
  - name: silver_records
    columns:
      - name: record_id
        tests:
          - not_null
          - unique
      - name: account_id
        tests:
          - not_null
          - relationships:
              to: ref('silver_accounts')
              field: account_id
```

**Foundry dataset checks**
Built-in health monitors in Foundry's UI — configure row count expectations, null rate thresholds, and get alerts when checks fail.

### Testing your transforms

```python
# test_clean_records.py
import pytest
from pyspark.sql import SparkSession
from your_project.transforms.clean_records import compute

@pytest.fixture(scope="module")
def spark():
    return SparkSession.builder.master("local[2]").appName("test").getOrCreate()

def test_removes_null_record_ids(spark):
    raw = spark.createDataFrame([
        {"record_id": "R001", "amount": 100.0, "account_id": "A1"},
        {"record_id": None,   "amount": 50.0,  "account_id": "A2"},  # should be removed
    ])
    result = compute(raw)
    assert result.count() == 1
    assert result.filter("record_id IS NULL").count() == 0

def test_negative_amounts_removed(spark):
    raw = spark.createDataFrame([
        {"record_id": "R001", "amount":  100.0, "account_id": "A1"},
        {"record_id": "R002", "amount": -50.0,  "account_id": "A2"},  # invalid
    ])
    result = compute(raw)
    assert result.filter("amount < 0").count() == 0

def test_output_schema(spark):
    raw = spark.createDataFrame([{"record_id": "R001", "amount": 100.0, "account_id": "A1"}])
    result = compute(raw)
    expected_cols = {"record_id", "amount", "account_id", "processed_at"}
    assert set(result.columns) == expected_cols
```

---

## Part 9: Python Patterns for Data Engineering

### Type hints — always annotate pipeline code

Type hints catch bugs at development time and make code self-documenting:

```python
from dataclasses import dataclass
from datetime import date
from typing import Generator, Optional

@dataclass
class Record:
    record_id: str
    account_id: str
    amount: float
    filed_date: date
    status: str
    adjuster_id: Optional[str] = None

def parse_records(filepath: str) -> Generator[Record, None, None]:
    """Lazily yield Records from a CSV file."""
    ...
```

### Generators — process large files without loading into memory

A generator `yield`s values one at a time. The file is never fully loaded into memory — critical when processing 10GB+ files.

```python
import csv
from typing import Generator

def stream_records(filepath: str) -> Generator[dict, None, None]:
    with open(filepath, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Optionally filter here
            if row["status"] in ("open", "pending"):
                yield row

# Process 50GB file without memory issues
for record in stream_records("/data/records_2024.csv"):
    load_to_database(record)
```

### Context managers — guaranteed cleanup

Use context managers for any resource that needs cleanup (database connections, file handles, locks):

```python
from contextlib import contextmanager
import psycopg2

@contextmanager
def get_db_connection(dsn: str):
    conn = psycopg2.connect(dsn)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

with get_db_connection(DATABASE_URL) as conn:
    with conn.cursor() as cur:
        cur.execute("UPDATE records SET status = 'closed' WHERE id = %s", (record_id,))
# Connection is always closed, even if an exception occurred
```

### async/await — concurrent I/O without threads

When a pipeline needs to call many APIs or databases, `asyncio` runs them concurrently in a single thread:

```python
import asyncio
import aiohttp
from typing import list

async def fetch_account(session: aiohttp.ClientSession, account_id: str) -> dict:
    async with session.get(f"https://api.internal/accounts/{account_id}") as resp:
        resp.raise_for_status()
        return await resp.json()

async def enrich_records(record_ids: list[str]) -> list[dict]:
    async with aiohttp.ClientSession() as session:
        # All requests run concurrently — not sequentially
        tasks = [fetch_account(session, rid) for rid in record_ids]
        return await asyncio.gather(*tasks, return_exceptions=True)

# 1000 API calls in ~1 second instead of ~100 seconds
results = asyncio.run(enrich_records(my_record_ids))
```

### Pydantic — runtime validation with type inference

Pydantic validates data at runtime and raises clear errors on schema violations:

```python
from pydantic import BaseModel, validator
from datetime import date

class RecordInput(BaseModel):
    record_id: str
    account_id: str
    amount: float
    filed_date: date
    status: str

    @validator("amount")
    def amount_must_be_positive(cls, v):
        if v < 0:
            raise ValueError("amount must be non-negative")
        return v

    @validator("status")
    def status_must_be_valid(cls, v):
        valid = {"open", "pending", "closed", "denied"}
        if v not in valid:
            raise ValueError(f"status must be one of {valid}")
        return v

# Validates and raises clear errors on bad data
try:
    record = RecordInput(**raw_dict)
except ValidationError as e:
    log.error(f"Invalid record data: {e}")
```

---

## Part 10: Pipeline Orchestration

A pipeline isn't just one transform — it's a DAG of many transforms that must run in the right order, with retry logic and monitoring.

### Orchestration tools comparison

| Tool | Model | Best for | Foundry equivalent |
|---|---|---|---|
| **Apache Airflow** | Python DAGs, cron-style | Complex, dependency-heavy ETL | Foundry Scheduler |
| **Prefect** | Python-first, easier than Airflow | Teams wanting simpler workflow code | — |
| **Dagster** | Asset-centric (like Foundry) | Modern data pipelines, strong typing | Most similar to Foundry |
| **Foundry Scheduler** | Built-in, tied to transforms | Everything inside Foundry | Native |

### Key orchestration concepts

**DAG (Directed Acyclic Graph)**: a graph of tasks where edges represent dependencies. Task B runs after Task A. No cycles (A can't depend on B if B depends on A).

**Idempotency**: a task is idempotent if running it twice produces the same result as running it once. Critical for retries — if a task fails halfway and retries, you don't want duplicate data.

```python
# Non-idempotent (BAD — creates duplicates on retry):
def run():
    data = fetch_new_records()
    db.execute("INSERT INTO records VALUES (...)", data)

# Idempotent (GOOD — safe to retry):
def run():
    data = fetch_new_records()
    db.execute("INSERT INTO records VALUES (...) ON CONFLICT (record_id) DO UPDATE SET ...", data)
```

**Backfill**: reprocessing historical data. When you deploy a new or fixed transform, you need to run it on past data to produce correct historical outputs.

---

## Part 11: Data Modeling Basics

### Star schema

The standard pattern for analytical data warehouses:
- A central **fact table** (orders, transactions, events) with foreign keys
- Surrounding **dimension tables** (product, customer, region, date) with descriptive attributes

```
                    dim_date
                       |
dim_customer  ——  fact_orders  ——  dim_product
                       |
                  dim_customer
```

Benefits: simple to query, fast for aggregations, easy to understand. Most BI tools expect a star schema.

### Common data types in enterprise pipelines

| Concept | Example table | Key considerations |
|---|---|---|
| Account | accounts | Effective dates, versioning (account can be updated) |
| Order | orders | Many orders per account, complex status machine |
| Customer | customers | PII — encryption, access control, right to erasure |
| Payment | payments | Idempotency critical — can't double-charge |
| Document | documents | Store in object storage (S3), metadata in DB |

---

## Key Vocabulary

| Term | Plain English |
|---|---|
| **Foundry** | Palantir's data + AI platform. Data in → clean data/ontology/AI features out. |
| **Dataset** | A versioned, immutable table in Foundry. Like a git commit for data. |
| **Transform** | Python/Spark code that reads input datasets → writes an output dataset. |
| **Ontology** | The semantic layer: raw tables become typed business objects (Order, Account). |
| **AIP** | Foundry's GenAI layer. LLMs grounded in Ontology data and capable of taking actions. |
| **Medallion** | Bronze (raw) → Silver (clean) → Gold (enriched) data layering pattern. |
| **Lineage** | The record of where data came from and what depends on it. |
| **CDC** | Change Data Capture — read the DB change log instead of scanning the full table. |
| **Watermark** | The timestamp of the last successful pipeline run — used to find new rows. |
| **Shuffle** | Spark moving data between machines for joins/groupBy. Expensive — minimize it. |
| **Broadcast join** | Copy a small table to every Spark worker instead of shuffling the big table. |
| **Idempotent** | Safe to run twice — produces the same output as running once. Critical for retries. |
| **Schema evolution** | Changing a table's columns without breaking downstream consumers. |
| **Partitioning** | Splitting data by a key (date, state) so only relevant partitions are scanned. |

---

## Python Data Patterns

These are the core Python patterns that show up constantly in data engineering work — transforming, grouping, filtering, and reshaping records.

### Grouping Records by a Field

```python
from collections import defaultdict

def group_by(records, field):
    groups = defaultdict(list)
    for record in records:
        groups[record[field]].append(record)
    return dict(groups)

# Example:
records = [
    {'name': 'Alice', 'dept': 'eng'},
    {'name': 'Bob',   'dept': 'sales'},
    {'name': 'Carol', 'dept': 'eng'},
]
group_by(records, 'dept')
# {'eng': [{'name': 'Alice', ...}, {'name': 'Carol', ...}], 'sales': [...]}
```

### Flattening Nested Lists

```python
# One level deep
nested = [[1, 2], [3, 4], [5]]
flat = [x for sublist in nested for x in sublist]   # [1, 2, 3, 4, 5]

# Arbitrary depth (recursive)
def flatten(lst):
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result
```

### Transforming / Projecting Records

```python
# Keep only certain fields from each record
def project(records, fields):
    return [{f: r[f] for f in fields if f in r} for r in records]

# Apply a function to a field across all records
def transform_field(records, field, fn):
    return [{**r, field: fn(r[field])} for r in records]

# Example: normalize all amounts to cents
records = [{'id': 1, 'amount': 9.99}, {'id': 2, 'amount': 14.50}]
transform_field(records, 'amount', lambda x: int(x * 100))
# [{'id': 1, 'amount': 999}, {'id': 2, 'amount': 1450}]
```

### Aggregating (sum, count, average per group)

```python
def aggregate(records, group_field, agg_field):
    groups = group_by(records, group_field)
    return {
        key: {
            'count': len(items),
            'sum':   sum(r[agg_field] for r in items),
            'avg':   sum(r[agg_field] for r in items) / len(items),
        }
        for key, items in groups.items()
    }
```

### Deduplicating Records

```python
# By a key field — keep last seen
def dedupe(records, key_field):
    seen = {}
    for r in records:
        seen[r[key_field]] = r   # later record overwrites earlier
    return list(seen.values())

# Keep first seen
def dedupe_keep_first(records, key_field):
    seen = {}
    for r in records:
        k = r[key_field]
        if k not in seen:
            seen[k] = r
    return list(seen.values())
```

### Sorting

```python
records = [{'name': 'Bob', 'score': 90}, {'name': 'Alice', 'score': 95}]

# Sort by single field
sorted(records, key=lambda r: r['score'])

# Sort by multiple fields (primary: dept asc, secondary: score desc)
sorted(records, key=lambda r: (r['dept'], -r['score']))
```

### `itertools` and `functools` for Data Work

```python
from itertools import groupby, chain, islice
from functools import reduce

# itertools.groupby — groups CONSECUTIVE equal keys (sort first!)
data = sorted(records, key=lambda r: r['dept'])
for dept, group in groupby(data, key=lambda r: r['dept']):
    print(dept, list(group))

# chain — flatten one level of iterables
from itertools import chain
flat = list(chain.from_iterable([[1,2], [3,4]]))  # [1, 2, 3, 4]

# reduce — fold a list into a single value
from functools import reduce
total = reduce(lambda acc, r: acc + r['amount'], records, 0)
```

### Common Gotchas

- **`defaultdict` vs `dict.setdefault`**: both work for grouping, but `defaultdict(list)` is cleaner.
- **`itertools.groupby` requires sorted input**: it only groups *consecutive* equal keys. Always sort by the group key first.
- **Mutating records in a list**: use `{**record, 'field': new_value}` to create a new dict instead of modifying in-place.
- **Missing keys**: use `record.get('field', default)` instead of `record['field']` when the field might not exist in every record.
