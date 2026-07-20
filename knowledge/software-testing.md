# Software Testing

## The Testing Pyramid

The testing pyramid describes the ideal distribution of tests: many fast unit tests at the base, fewer integration tests in the middle, and a small number of end-to-end tests at the top. The higher you go, the slower, more expensive, and more brittle the tests become.

```
        ┌─────────────────┐
        │   E2E / UI      │  ← few, slow, expensive, catch real flows
        ├─────────────────┤
        │  Integration    │  ← test components working together
        ├─────────────────┤
        │   Unit Tests    │  ← many, fast, isolated, cheap to write
        └─────────────────┘
```

---

## Unit Testing

A unit test tests a **single function or class in isolation**, with all dependencies replaced by fakes (mocks/stubs). The goal is to verify that one unit of logic behaves correctly given specific inputs.

**Properties of a good unit test:**
- **Fast** — runs in milliseconds, no I/O
- **Isolated** — doesn't depend on external state, DB, network
- **Repeatable** — same result every time, any machine
- **Self-describing** — the test name explains what it checks

```python
# Good unit test — pure logic, no dependencies
def test_calculate_discount_returns_20_percent_for_vip():
    result = calculate_discount(price=100, user_tier='vip')
    assert result == 80

# Common AAA pattern: Arrange → Act → Assert
def test_filter_active_users():
    users = [User(active=True), User(active=False), User(active=True)]  # Arrange
    result = filter_active(users)                                         # Act
    assert len(result) == 2                                              # Assert
```

---

## Mocking and Stubbing

When the unit under test has dependencies (a database, an API, a clock), replace them with controlled fakes.

- **Mock** — a fake object that you can verify was called with specific arguments
- **Stub** — a fake that returns a predefined value, used to control the test scenario
- **Spy** — wraps the real implementation and records how it was called

```python
from unittest.mock import MagicMock, patch

def test_send_notification_calls_email_service():
    email_service = MagicMock()
    notifier = Notifier(email_service=email_service)

    notifier.notify(user='alice@example.com', message='Hello')

    email_service.send.assert_called_once_with(to='alice@example.com', body='Hello')
```

**When to mock:** mock at the boundary of your system — external APIs, databases, file system, clocks. Don't mock your own internals; if you're mocking everything, the test proves nothing.

---

## Integration Testing

Integration tests verify that **multiple components work correctly together** — your service + its database, your API handler + the business logic layer, two microservices communicating.

- Slower than unit tests — may require a real DB, test containers, or a running service
- More confidence than unit tests — catches wiring errors, SQL bugs, serialization issues
- Still scoped — don't test the entire system at once

**Example:** spin up a test database (or use an in-memory SQLite), insert rows, call the repository layer, assert the query returns the right results. This catches bugs that mocking the DB would miss.

---

## End-to-End (E2E) Testing

E2E tests run the full application stack — browser, API, DB — and simulate real user flows. They give the most confidence but are the slowest and most brittle (a UI change can break many E2E tests).

Use sparingly: cover the most critical happy paths (login, checkout, core workflow). Don't write E2E tests for every edge case.

---

## Test-Driven Development (TDD)

TDD is a development practice: **write the test first**, watch it fail, then write the minimum code to make it pass, then refactor.

**Red → Green → Refactor:**
1. **Red** — write a failing test for the behavior you want
2. **Green** — write the simplest code that makes it pass
3. **Refactor** — clean up without breaking the test

**Benefits:** forces you to think about the interface before the implementation, produces naturally testable code, gives you a regression safety net as you refactor. **Tradeoff:** requires discipline; slows initial development; overkill for exploratory or UI-heavy work.

---

## Code Coverage

Coverage measures what percentage of your code is executed by tests. 100% coverage does not mean the code is correct — it means every line was touched, not that every case was tested correctly.

- **Line coverage** — was this line executed?
- **Branch coverage** — was every if/else branch taken?
- **Aim for meaningful coverage**, not 100%. 80% line coverage with good assertions beats 100% with assertions that don't check anything.

Use coverage as a signal to find **untested areas**, not as a target to game.

---

## Test Design Principles

### Arrange-Act-Assert (AAA)
Structure every test in three sections: set up the state, invoke the behavior, check the result. Makes tests easy to read.

### One Assertion per Test (roughly)
Tests that assert 10 different things are hard to debug. Prefer focused tests where a failure immediately tells you exactly what broke. One logical behavior per test.

### Test the contract, not the implementation
Test what a function returns (its public behavior), not how it internally does the work. If you test implementation details, tests break when you refactor without changing behavior.

### Edge cases to always consider
- Empty input / null / zero
- Single element vs. multiple elements
- Boundary values (max, min, off-by-one)
- Duplicate values
- Already-sorted or reverse-sorted input (for sort algorithms)

---

## Testing in CI/CD

Tests should run automatically on every pull request. A broken test blocks the merge — this is the enforcement mechanism. Fast unit tests run on every commit; slower integration/E2E tests may run on merge to main or on a schedule.

Good CI test hygiene:
- Tests must be deterministic — no flaky tests that sometimes pass/fail
- Tests must be fast enough to give quick feedback (unit suite under 60s)
- Failing tests block deployment — they're not optional
- Test environments should mirror production as closely as possible
