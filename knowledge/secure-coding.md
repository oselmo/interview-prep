# Secure Coding (OWASP)

## Why This Matters

Secure software engineering means thinking about how an attacker could abuse your code at every step — not just at the end. The industry reference is the **OWASP Top 10**: the ten most critical web application security risks, updated regularly based on real-world breach data.

---

## OWASP Top 10 (Current — 2021)

### 1. Broken Access Control
Users can act outside their intended permissions — e.g., accessing another user's data by changing an ID in the URL.

- **Fix:** Enforce authorization server-side on every request. Never trust client-supplied IDs without checking ownership. Use deny-by-default.
- **Example bug:** `GET /api/orders/1234` returns an order — but the server never checks if the logged-in user owns order 1234.

### 2. Cryptographic Failures (formerly "Sensitive Data Exposure")
Sensitive data (passwords, PII, financial data) is transmitted or stored without adequate encryption.

- **Fix:** Use HTTPS everywhere. Store passwords with bcrypt/argon2 (not MD5/SHA1). Never log sensitive fields. Encrypt PII at rest.
- **Example bug:** Storing passwords in plaintext or with a reversible hash.

### 3. Injection
Untrusted data is sent to an interpreter as part of a command or query — SQL injection, command injection, LDAP injection.

```python
# VULNERABLE: user input concatenated directly into SQL
query = f"SELECT * FROM users WHERE name = '{user_input}'"

# SAFE: parameterized query — the DB treats input as data, not SQL
cursor.execute("SELECT * FROM users WHERE name = %s", (user_input,))
```

- **Fix:** Always use parameterized queries / prepared statements. Use an ORM. Validate and sanitize all input. Never pass user input to `eval()`, `exec()`, shell commands, or raw SQL.

### 4. Insecure Design
Flaws baked into the architecture — no amount of correct implementation fixes a bad design.

- **Fix:** Threat model during design. Ask "what's the worst a malicious user could do with this feature?" before building it. Apply the principle of least privilege at the design level.

### 5. Security Misconfiguration
Default credentials, unnecessary features enabled, overly permissive CORS, verbose error messages leaking stack traces.

- **Fix:** Harden all environments. Disable unused services. Return generic error messages to users (log details server-side). Review IAM policies — no wildcard `*` permissions.

### 6. Vulnerable and Outdated Components
Using libraries/frameworks with known CVEs.

- **Fix:** Keep dependencies up to date. Use `npm audit`, `pip-audit`, Dependabot, Snyk. Pin versions in production but update regularly.

### 7. Identification and Authentication Failures
Weak passwords, credential stuffing, missing MFA, session tokens that don't expire.

- **Fix:** Enforce strong password policies. Implement account lockout after N failed attempts. Use short-lived JWTs. Invalidate sessions on logout. Use MFA for sensitive operations.

### 8. Software and Data Integrity Failures
Untrusted code or data loaded into the pipeline — e.g., malicious npm packages, unsigned updates.

- **Fix:** Verify checksums/signatures of dependencies. Use CI/CD pipeline integrity checks. Don't deserialize untrusted data without validation.

### 9. Security Logging and Monitoring Failures
Attacks succeed because no one noticed — no logs, no alerts.

- **Fix:** Log authentication events, access control failures, input validation errors. Set up alerts for anomalous patterns. Ensure logs are tamper-evident and retained long enough.

### 10. Server-Side Request Forgery (SSRF)
The server fetches a URL supplied by the user, potentially reaching internal services.

- **Example bug:** `POST /fetch?url=http://169.254.169.254/latest/meta-data/` — attacker reads AWS metadata.
- **Fix:** Validate and allowlist URLs server-side. Block private IP ranges. Use a dedicated egress proxy.

---

## Cross-Cutting Principles

### Input Validation
Validate all input at the boundary — length, type, format, range. Reject anything that doesn't match. Never assume client-side validation ran or was honest.

### Principle of Least Privilege
Every component (user, service, IAM role, DB user) should have only the minimum permissions it needs. A Lambda that only reads from one DynamoDB table should have an IAM policy scoped to exactly that.

### Defense in Depth
Don't rely on a single security control. Layer: network-level (VPC, security groups), application-level (auth, validation), data-level (encryption, access control). If one layer fails, others remain.

### Secure Defaults
Ship in the most restrictive configuration. Users can opt in to permissiveness; they shouldn't have to opt in to security.

### XSS (Cross-Site Scripting)
Injecting malicious scripts into a page viewed by other users. Prevent by escaping all user-supplied content before rendering it in HTML. Modern frameworks (React, Angular) escape by default — don't use `dangerouslySetInnerHTML` with untrusted input.

### CSRF (Cross-Site Request Forgery)
Tricking a user's browser into making an authenticated request to your app from another site. Prevent with CSRF tokens (anti-forgery tokens) or `SameSite=Strict` cookies.

---

## Secure Coding Checklist (Interview-Ready)

- Parameterized queries everywhere — no string concatenation into SQL
- All secrets in environment variables or a secrets manager — never in source code
- HTTPS enforced — no HTTP fallback in production
- Auth checked server-side on every request — not just at login
- Errors logged with detail; users see only generic messages
- Dependencies audited regularly for CVEs
- Least-privilege IAM — no `*` on resources or actions
- Input validated at the entry point — type, length, format
- Sensitive fields (passwords, tokens, SSNs) never logged
