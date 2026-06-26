# TypeScript: Senior Engineer Reference

## Why TypeScript Matters

In a GenAI + data platform shop, TypeScript shows up in:
- React/Next.js frontends with strict typing
- Node.js APIs with typed request/response schemas (Express, Fastify, tRPC)
- Shared type packages in monorepos (one source of truth for API contracts)
- Type-safe SDK wrappers around LLM APIs
- Zod schemas that validate at runtime and infer TypeScript types simultaneously

---

## The Type System Fundamentals

### Structural Typing
TypeScript uses **structural** (duck) typing, not nominal typing. If two types have the same shape, they're compatible — regardless of name.

```typescript
interface Point { x: number; y: number; }
interface Coordinate { x: number; y: number; }

const p: Point = { x: 1, y: 2 };
const c: Coordinate = p;  // ✅ — same shape
```

### `any` vs `unknown` vs `never`

| Type | Meaning | Safe? |
|------|---------|-------|
| `any` | Opt out of type checking entirely | ❌ |
| `unknown` | "some value, I don't know what type" — must narrow before use | ✅ |
| `never` | This code path cannot be reached | ✅ |

Prefer `unknown` over `any` for untyped external data (API responses, JSON parsing). Forces you to narrow before use.

```typescript
function parse(raw: unknown): string {
  if (typeof raw !== "string") throw new Error("expected string");
  return raw;  // narrowed to string
}
```

### `type` vs `interface`

Both define object shapes. Key differences:

| | `interface` | `type` |
|---|---|---|
| Extending | `extends` keyword | intersection `&` |
| Declaration merging | ✅ (can be added to later) | ❌ |
| Union types | ❌ | ✅ `type A = B \| C` |
| Computed properties | Limited | ✅ |

Prefer `interface` for object shapes you might extend. Use `type` for unions, intersections, and aliases.

---

## Type Narrowing

TypeScript performs **control flow analysis** — it tracks what a type can be at each point in your code.

### Built-in narrowing mechanisms

```typescript
// typeof
if (typeof val === "string") { /* val: string */ }

// instanceof
if (err instanceof TypeError) { /* err: TypeError */ }

// Truthiness
if (val) { /* val: not null | undefined | 0 | "" */ }

// in operator
if ("email" in obj) { /* obj has email property */ }

// Equality
if (val === null) { /* val: null */ }
if (val !== undefined) { /* val: not undefined */ }
```

### User-defined type guards

When built-in narrowing isn't enough, write a predicate function:

```typescript
interface User { id: number; name: string; email: string; }
interface ServiceAccount { id: number; serviceKey: string; }

function isUser(account: User | ServiceAccount): account is User {
  return "email" in account;
}

function greet(account: User | ServiceAccount) {
  if (isUser(account)) {
    console.log(account.email);  // TypeScript knows it's a User
  }
}
```

### Assertion functions

Throw on bad input and narrow the type for the rest of the scope:

```typescript
function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== "string") throw new Error(`Expected string, got ${typeof val}`);
}

assertIsString(input);
input.toUpperCase();  // TypeScript now knows: input is string
```

---

## Discriminated Unions

The most important pattern for modeling state machines and API responses. Every member has a shared **discriminant** — a literal-type field TypeScript can switch on.

```typescript
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error";   error: string };

function render<T>(state: RequestState<T>): string {
  switch (state.status) {
    case "idle":    return "Waiting...";
    case "loading": return "Loading...";
    case "success": return JSON.stringify(state.data);
    case "error":   return `Error: ${state.error}`;
    // No default needed — TypeScript knows all cases are covered
  }
}
```

### Exhaustiveness checking

Add a `never` assertion in the default branch. If you later add a new union member without updating the switch, TypeScript will error at compile time:

```typescript
default:
  const _exhaustive: never = state;
  throw new Error("unhandled state");
```

---

## Generics in Depth

### Basic generics

```typescript
function identity<T>(x: T): T { return x; }
function head<T>(arr: T[]): T | undefined { return arr[0]; }
```

### Generic constraints

```typescript
// T must have a .length property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

// K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### Generic interfaces and classes

```typescript
interface Repository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(filter?: Partial<T>): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
}

class ProductRepository implements Repository<Product> {
  async findById(id: string): Promise<Product | null> { /* ... */ }
  // ...
}
```

### The `infer` keyword

Extract a type from within a conditional type:

```typescript
// Get the resolved value type of a Promise
type Awaited<T> = T extends Promise<infer U> ? U : T;

type X = Awaited<Promise<string>>;  // string
type Y = Awaited<number>;           // number (not a Promise, returns as-is)

// Get the element type of an array
type ElementType<T> = T extends (infer E)[] ? E : never;
type N = ElementType<number[]>;  // number
```

---

## Advanced Types

### Utility types (built-in)

```typescript
interface Product {
  id: string;
  holderId: string;
  premium: number;
  status: "active" | "expired" | "cancelled";
  startDate: Date;
}

type PartialProduct    = Partial<Product>;         // all optional
type RequiredProduct   = Required<PartialProduct>; // all required
type ReadonlyProduct   = Readonly<Product>;        // all readonly
type ProductSummary    = Pick<Product, "id" | "status">;
type ProductWithoutId  = Omit<Product, "id">;
type ProductMap        = Record<string, Product>;  // { [id: string]: Product }
type ProductStatus     = Product["status"];        // "active" | "inactive" | "archived"
type ProductKeys       = keyof Product;            // "id" | "ownerId" | ...
```

### Mapped types

Transform all properties of a type:

```typescript
// Make all properties nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Make all properties async getters
type AsyncGetters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => Promise<T[K]>
};
```

### Conditional types

```typescript
type IsArray<T> = T extends any[] ? true : false;
type Flatten<T> = T extends (infer U)[] ? U : T;

// Distribute over unions:
type ToArray<T> = T extends any ? T[] : never;
type StrOrNumArr = ToArray<string | number>;  // string[] | number[]
```

### Template literal types

```typescript
type EventName = `on${Capitalize<string>}`;          // "onClick", "onChange", ...
type CSSProperty = `${string}-${string}`;
type TableName = `${string}_table`;

// Useful for typed event emitters:
type OrderEvents = "order:created" | "order:updated" | "order:closed";
type OrderHandler = `on${Capitalize<OrderEvents>}`;  // "onOrder:created" etc.
```

### Branded / Nominal types

Prevent accidentally passing a `UserId` where an `OrderId` is expected, even though both are strings:

```typescript
declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

type UserId  = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

function getOrder(id: OrderId) { /* ... */ }

const userId = "usr-123" as UserId;
getOrder(userId);  // ❌ Type error — can't pass UserId as OrderId
```

---

## Async TypeScript

### Typing Promises and async functions

```typescript
async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<User>;
}
```

### Error handling with discriminated unions (Result type)

Avoid throwing — return a typed result instead:

```typescript
type Result<T, E = Error> =
  | { ok: true;  value: T }
  | { ok: false; error: E };

async function safeParseProduct(raw: unknown): Promise<Result<Product>> {
  try {
    const product = ProductSchema.parse(raw);  // Zod schema
    return { ok: true, value: product };
  } catch (e) {
    return { ok: false, error: e as Error };
  }
}

const result = await safeParseProduct(data);
if (result.ok) {
  console.log(result.value.id);  // TypeScript knows: value is Product
} else {
  console.error(result.error.message);
}
```

### Async iterators

```typescript
async function* streamTokens(prompt: string): AsyncGenerator<string> {
  const stream = await anthropic.messages.stream({ /* ... */ });
  for await (const event of stream) {
    if (event.type === "content_block_delta") {
      yield event.delta.text;
    }
  }
}

for await (const token of streamTokens("Hello")) {
  process.stdout.write(token);
}
```

---

## React + TypeScript Patterns

### Typing components

```typescript
// Function component with props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary", disabled }) => (
  <button onClick={onClick} disabled={disabled} className={variant}>{label}</button>
);

// With children
interface CardProps {
  title: string;
  children: React.ReactNode;
}
```

### Typing hooks

```typescript
// useState — infer from initial value, or annotate explicitly
const [count, setCount] = useState(0);              // number inferred
const [user, setUser] = useState<User | null>(null); // explicit

// useRef — DOM element vs mutable value
const inputRef = useRef<HTMLInputElement>(null);
const timerRef = useRef<ReturnType<typeof setTimeout>>();

// Custom hook with typed return
function useProduct(id: string): { product: Product | null; loading: boolean; error: Error | null } {
  // ...
}
```

### Event handlers

```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // ...
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") submit();
};
```

---

## Runtime Validation with Zod

TypeScript types disappear at runtime. Use **Zod** to validate external data and auto-infer the TypeScript type:

```typescript
import { z } from "zod";

const PolicySchema = z.object({
  id:        z.string().uuid(),
  holderId:  z.string(),
  premium:   z.number().positive(),
  status:    z.enum(["active", "expired", "cancelled"]),
  startDate: z.string().datetime(),
});

// Infer the TypeScript type from the schema — single source of truth
type Product = z.infer<typeof ProductSchema>;

// Validate at runtime
const result = PolicySchema.safeParse(apiResponse);
if (result.success) {
  const product: Product = result.data;  // type-safe
} else {
  console.error(result.error.issues);  // detailed validation errors
}
```

---

## tsconfig Options That Matter

```json
{
  "compilerOptions": {
    "strict": true,             // Enables all strict checks (strongly recommended)
    "noUncheckedIndexedAccess": true,  // arr[0] is T | undefined, not T
    "exactOptionalPropertyTypes": true, // { x?: string } ≠ { x: string | undefined }
    "noImplicitReturns": true,  // Every code path must return
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,    // Allows default imports from CJS modules
    "moduleResolution": "bundler",  // Modern: works with Vite, esbuild
    "target": "ES2022",
    "lib": ["ES2022", "DOM"]
  }
}
```

`"strict": true` bundles: `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `alwaysStrict`.

---

## Common Interview Questions on TypeScript

**"What's the difference between `interface` and `type`?"**
Shape definition is mostly interchangeable. `interface` supports declaration merging; `type` supports unions, intersections, and mapped/conditional types.

**"When would you use `unknown` instead of `any`?"**
When you don't know the type but want the compiler to force you to narrow before use. `any` silences all type checking; `unknown` just defers it.

**"Explain conditional types with an example."**
`T extends U ? X : Y` — evaluates to X if T is assignable to U, else Y. With `infer`, you can extract types from within other types.

**"How do you type a generic function that returns the same type as its input?"**
`function identity<T>(x: T): T` — T is inferred from the argument.

**"What is a discriminated union and why is it useful?"**
A union of object types, each with a unique literal-type field. Lets TypeScript narrow to the exact type inside each branch, eliminating the need for casts.

---

## JavaScript Patterns: Closures, HOFs, and Functional Utilities

### Closures

A closure is a function that **remembers the variables from its enclosing scope** even after that scope has finished executing. Every function in JS is a closure — it closes over the variables where it was defined.

```javascript
function makeCounter() {
  let count = 0;           // this variable is "captured" by the returned function
  return function() {
    count++;
    return count;
  };
}
const counter = makeCounter();
counter(); // 1
counter(); // 2  — count persists between calls
```

**Why closures matter:** They're the mechanism behind memoization, currying, module patterns, and any time you need private state without a class.

### Higher-Order Functions (HOFs)

A higher-order function either **takes a function as an argument** or **returns a function**. `map`, `filter`, `reduce` are the canonical examples.

```javascript
// Takes a function as argument
const doubled = [1, 2, 3].map(x => x * 2);      // [2, 4, 6]
const evens   = [1, 2, 3].filter(x => x % 2 === 0); // [2]
const sum     = [1, 2, 3].reduce((acc, x) => acc + x, 0); // 6

// Returns a function
function multiply(factor) {
  return (x) => x * factor;    // closure over `factor`
}
const triple = multiply(3);
triple(5);  // 15
```

### Memoize

Memoize wraps a function so that **repeated calls with the same arguments return the cached result** instead of recomputing. The cache is stored in a closure.

```javascript
function memoize(fn) {
  const cache = new Map();    // closed over — persists across calls
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowSquare = (n) => { /* expensive */ return n * n; };
const fastSquare = memoize(slowSquare);
fastSquare(10); // computed
fastSquare(10); // cached — fn never called again
```

**Key details:**
- `JSON.stringify(args)` serializes the arguments array as the cache key. Works for primitives; fails for functions or circular objects as arguments.
- `fn.apply(this, args)` preserves the calling context in case the memoized function uses `this`.
- The cache has no eviction — it grows forever. Production implementations add LRU or TTL.

### Currying

Currying transforms a function that takes multiple arguments into a **chain of single-argument functions**. Each call returns a new function waiting for the next argument.

```javascript
// Non-curried
const add = (a, b) => a + b;
add(2, 3);  // 5

// Curried
const curriedAdd = (a) => (b) => a + b;
curriedAdd(2)(3);  // 5

const add2 = curriedAdd(2);   // partial application — a is fixed
add2(10);  // 12
add2(20);  // 22

// Generic curry function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}
```

**Use case:** Partial application — fix some arguments now, supply the rest later. Common in functional pipelines and React event handlers.

### Once / Run-once Wrapper

```javascript
function once(fn) {
  let called = false;
  let result;
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

const init = once(() => console.log('initialized'));
init(); // 'initialized'
init(); // nothing — fn never runs again
```

### Throttle and Debounce (concepts)

**Debounce:** delay execution until the function stops being called for X ms. Use case: search-as-you-type — don't fire until the user pauses.

**Throttle:** execute at most once per X ms regardless of call frequency. Use case: scroll/resize handlers — cap the rate.

```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}
```
