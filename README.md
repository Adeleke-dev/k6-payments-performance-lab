# k6 Payments Performance Lab

A portfolio-grade performance testing project for a fintech-style payments API using **k6, JavaScript, Node.js, Docker, Docker Compose, and GitHub Actions**.

This project demonstrates how performance testing can be designed as a structured engineering workflow rather than a collection of standalone load scripts. It includes reusable test components, multiple workload models, scenario-specific thresholds, a controllable mock payment service, containerized execution, persisted test results, and an automated CI performance quality gate.

> **Scope note:** The system under test is a lightweight local mock payment API. The results in this repository demonstrate the behavior of the test framework and mock environment under the configured workloads. They should not be interpreted as production capacity benchmarks for a real payment platform.

---

## Project Objectives

The project evaluates a payment creation flow under four different workload conditions:

1. **Smoke Test** — Is the payment endpoint healthy under minimal traffic?
2. **Load Test** — Does the endpoint remain responsive and reliable under expected moderate traffic?
3. **Spike Test** — How does the endpoint behave when traffic increases suddenly?
4. **Stress Test** — How does the endpoint behave as traffic is pushed beyond normal workload levels?

The framework evaluates:

- response-time percentiles;
- HTTP failure rate;
- functional check success rate;
- request volume and throughput;
- behavior under changing concurrency;
- threshold-based pass/fail decisions.

---

## System Under Test

The primary operation tested is:

```http
POST /payments
```

A Node.js and Express mock service simulates payment processing behavior, including:

- payment creation;
- variable response latency;
- payment status responses;
- configurable server-side failure injection.

Docker Compose runs the baseline environment with:

```text
FAILURE_RATE=0
```

This keeps normal performance runs deterministic. Failure injection can be enabled deliberately when testing reliability behavior.

---

## Architecture

```text
┌─────────────────────────────┐
│       Test Scenarios        │
│                             │
│ Smoke | Load | Spike |      │
│ Stress                      │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│          k6 Runner          │
│                             │
│ • API Client                │
│ • Payload Factory           │
│ • Reusable Checks           │
│ • Scenario Configuration    │
│ • Threshold Configuration   │
└──────────────┬──────────────┘
               │
         Docker Network
               │
               ▼
┌─────────────────────────────┐
│      Mock Payment API       │
│      Node.js + Express      │
│                             │
│      POST /payments         │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Results & Quality Gates   │
│                             │
│ • JSON results              │
│ • k6 thresholds             │
│ • CI pass/fail              │
└─────────────────────────────┘
```

Docker Compose coordinates the payment API and k6 containers.

The k6 runner waits for the payment API health check to pass before execution, preventing performance tests from starting against a service that is not yet ready.

---

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── performance.yml
│
├── config/
│   ├── endpoints.js
│   ├── env.js
│   │
│   ├── scenarios/
│   │   ├── load.js
│   │   ├── smoke.js
│   │   ├── spike.js
│   │   └── stress.js
│   │
│   └── thresholds/
│       ├── load.thresholds.js
│       ├── payment.thresholds.js
│       ├── smoke.thresholds.js
│       ├── spike.thresholds.js
│       └── stress.thresholds.js
│
├── docs/
│   ├── findings-template.md
│   ├── payment-endpoint.md
│   ├── performance-risks.md
│   └── test-strategy.md
│
├── mock-services/
│   └── payment-api/
│       └── server.js
│
├── results/
│   ├── json/
│   └── summaries/
│
├── scripts/
│   ├── payment-load.js
│   ├── payment-smoke.js
│   ├── payment-spike.js
│   └── payment-stress.js
│
├── src/
│   ├── checks/
│   │   └── paymentChecks.js
│   │
│   ├── clients/
│   │   └── paymentApiClient.js
│   │
│   ├── constants/
│   │   └── metrics.js
│   │
│   ├── data/
│   │   ├── paymentPayloadFactory.js
│   │   └── testData.js
│   │
│   └── utils/
│       ├── helpers.js
│       ├── random.js
│       └── summary.js
│
├── Dockerfile
├── Dockerfile.k6
├── docker-compose.yml
├── package.json
└── README.md
```

The framework separates workload configuration, performance thresholds, API interaction, test data, functional checks, and execution scripts.

This reduces duplication and makes the test suite easier to maintain and extend.

---

# Performance Scenarios

## 1. Smoke Test

### Purpose

Verify that the payment creation endpoint is reachable, responsive, and functionally healthy before larger performance tests are executed.

### Workload

```text
Virtual Users: 1
Duration: 30 seconds
```

### Thresholds

```text
p95 response time < 800 ms
HTTP failure rate < 1%
Checks pass rate > 95%
```

---

## 2. Load Test

### Purpose

Evaluate payment creation behavior under moderate expected traffic.

### Workload

```text
Ramp to 5 VUs: 30 seconds
Hold at 5 VUs: 1 minute
Ramp to 0 VUs: 30 seconds
```

### Thresholds

```text
p95 response time < 900 ms
HTTP failure rate < 1%
Checks pass rate > 95%
```

---

## 3. Spike Test

### Purpose

Evaluate how the payment endpoint behaves when traffic increases rapidly and then returns toward normal levels.

### Workload

```text
Ramp to 2 VUs:   20 seconds
Spike to 20 VUs: 10 seconds
Hold at 20 VUs:  20 seconds
Return to 2 VUs: 10 seconds
Ramp to 0 VUs:   20 seconds
```

### Thresholds

```text
p95 response time < 1200 ms
HTTP failure rate < 3%
Checks pass rate > 95%
```

---

## 4. Stress Test

### Purpose

Observe how the payment endpoint behaves as traffic increases beyond the expected workload.

### Workload

```text
Ramp to 10 VUs: 30 seconds
Ramp to 25 VUs: 30 seconds
Ramp to 50 VUs: 30 seconds
Ramp to 0 VUs:  30 seconds
```

### Thresholds

```text
p95 response time < 1500 ms
HTTP failure rate < 5%
Checks pass rate > 90%
```

---

# Functional Validation

Performance testing should not evaluate latency alone.

Each payment response is also checked for expected functional behavior.

Current checks include:

- response status is `200` or `201`;
- response contains a `paymentId`;
- response contains a payment `status`;
- payment status is `AUTHORIZED` or `SUCCESS`;
- server-side errors remain visible when present.

This prevents a fast but functionally incorrect response from being treated as a successful performance result.

---

# Running the Project

## Prerequisites

For containerized execution:

- Docker
- Docker Compose

For direct local execution:

- Node.js
- k6

---

## Docker Compose Execution

Set your local user and group IDs:

```bash
export UID=$(id -u)
export GID=$(id -g)
```

The default Compose configuration runs the smoke test:

```bash
docker compose up \
  --build \
  --abort-on-container-exit \
  --exit-code-from k6
```

Docker Compose:

1. builds the payment API and k6 images;
2. starts the mock payment API;
3. waits for the API health check to pass;
4. starts the k6 runner;
5. executes the selected performance scenario;
6. persists JSON results to the host;
7. propagates the k6 exit code.

Using a health check prevents a startup race condition where k6 could send requests before the payment API is ready.

---

# Running Individual Scenarios

## Smoke

```bash
K6_SCRIPT=scripts/payment-smoke.js \
K6_RESULT=smoke \
docker compose up --abort-on-container-exit --exit-code-from k6
```

## Load

```bash
K6_SCRIPT=scripts/payment-load.js \
K6_RESULT=load \
docker compose up --abort-on-container-exit --exit-code-from k6
```

## Spike

```bash
K6_SCRIPT=scripts/payment-spike.js \
K6_RESULT=spike \
docker compose up --abort-on-container-exit --exit-code-from k6
```

## Stress

```bash
K6_SCRIPT=scripts/payment-stress.js \
K6_RESULT=stress \
docker compose up --abort-on-container-exit --exit-code-from k6
```

JSON output is persisted under:

```text
results/json/
```

---

# Verified Performance Results

The following results were produced against the local Dockerized mock payment environment.

| Scenario | Max VUs | Requests | Avg Response | p95 Response | Failed Requests | Checks |
|---|---:|---:|---:|---:|---:|---:|
| Smoke | 1 | 24 | 257.26 ms | 406.11 ms | 0.00% | 100% |
| Load | 5 | 371 | 260.74 ms | 432.61 ms | 0.00% | 100% |
| Spike | 20 | 546 | 244.44 ms | 433.12 ms | 0.00% | 100% |
| Stress | 50 | 2,043 | 253.92 ms | 434.08 ms | 0.00% | 100% |

All four verified scenarios passed their configured latency, reliability, and functional-check thresholds.

The smoke scenario is also used as the automated CI performance quality gate.

---

## Result Interpretation

Across the verified smoke, load, spike, and stress runs:

- no HTTP request failures were observed;
- all functional checks passed;
- p95 response time remained below 435 ms;
- all configured scenario thresholds passed;
- no iterations were interrupted.

The p95 results remained relatively stable as concurrency increased:

```text
Smoke:  406.11 ms
Load:   432.61 ms
Spike:  433.12 ms
Stress: 434.08 ms
```

The stress scenario reached **50 concurrent virtual users** and executed **2,043 requests**, while maintaining a p95 response time of **434.08 ms** and a **0% HTTP failure rate**.

These results indicate stable behavior for the mock service within the controlled Docker environment used for this project.

They do **not** establish the production capacity of a real payment platform.

The mock API does not include realistic production dependencies such as:

- databases;
- external payment gateways;
- queues;
- caches;
- distributed microservices;
- third-party network latency;
- infrastructure resource contention.

The primary value of the results is therefore demonstrating a repeatable approach to workload modelling, threshold enforcement, functional validation, result analysis, and automated performance-test execution.

---

# CI/CD Performance Quality Gate

GitHub Actions automatically runs the smoke performance test on:

```text
push → main
pull request → main
```

The CI workflow:

1. checks out the repository;
2. builds the Docker images;
3. prepares the results directories;
4. executes the Dockerized k6 smoke test;
5. uses the k6 exit code as a performance quality gate;
6. uploads the smoke JSON result as an artifact.

If a configured k6 threshold fails, k6 returns an unsuccessful exit code and the CI workflow fails.

This turns performance expectations into executable release checks rather than leaving them only as documentation.

---

## CI Result Artifact

The workflow preserves:

```text
results/json/smoke.json
```

as the GitHub Actions artifact:

```text
k6-smoke-results
```

for **14 days**.

The artifact step uses:

```yaml
if: always()
```

so diagnostic test evidence remains available even when a performance threshold causes the test to fail.

---

# Key Engineering Decisions

## Scenario-Specific Thresholds

Smoke, load, spike, and stress tests represent different operating conditions.

Each scenario therefore uses its own:

- response-time threshold;
- acceptable failure rate;
- functional check threshold.

This allows the performance expectations to reflect the purpose of each workload.

---

## Reusable Test Architecture

API interaction, payload generation, functional checks, configuration, thresholds, and workload definitions are separated rather than duplicated across test scripts.

This improves:

- maintainability;
- readability;
- reuse;
- consistency;
- future extensibility.

---

## Deterministic Baseline Testing

The mock API supports configurable failure injection.

Baseline Docker execution uses:

```text
FAILURE_RATE=0
```

This prevents random server failures from making normal smoke and CI runs nondeterministic.

Failure injection can instead be enabled deliberately when testing reliability and error behavior.

---

## Service Readiness

Docker Compose waits for the payment API health check before starting k6.

This prevents infrastructure startup timing from being incorrectly recorded as payment API performance failure.

---

## Exit-Code Propagation

Compose execution uses:

```text
--exit-code-from k6
```

This allows k6 threshold failures to propagate to Docker Compose and GitHub Actions.

Performance thresholds therefore function as automated quality gates.

---

## Persisted Test Evidence

The k6 container writes JSON output through a bind mount:

```text
./results:/app/results
```

This allows test evidence to survive container termination and remain available for later analysis.

---

# Payment Performance Risks Considered

The project considers payment-specific performance risks including:

- degraded latency during transaction surges;
- elevated payment failure rates under load;
- timeout behavior;
- unreliable responses during sudden traffic spikes;
- functionally incorrect payment responses;
- degradation beyond expected operating conditions;
- nondeterministic testing caused by uncontrolled failure injection.

Additional analysis is documented in:

```text
docs/performance-risks.md
```

---

# Current Limitations

This project intentionally uses a mock API and does not reproduce the complete architecture of a production payment platform.

Current limitations include:

- no real payment gateway;
- no persistent database;
- no queue or asynchronous transaction processing;
- no cache layer;
- no distributed microservices;
- no realistic external network latency;
- no production observability stack;
- no infrastructure saturation monitoring.

These limitations must be considered when interpreting the performance results.

---

# What This Project Demonstrates

From a QA/SDET perspective, this project demonstrates practical experience with:

- performance test strategy;
- workload modelling;
- k6;
- JavaScript performance scripting;
- API performance testing;
- reusable test architecture;
- functional validation during performance tests;
- scenario-specific performance thresholds;
- performance result interpretation;
- deterministic test design;
- Docker;
- Docker Compose;
- container networking;
- service health checks;
- environment configuration;
- persisted test evidence;
- CI/CD performance testing;
- GitHub Actions;
- automated performance quality gates;
- CI artifact retention;
- fintech and payment-system quality risks.

---

# Documentation

Additional project documentation is available under `docs/`:

- `test-strategy.md` — performance testing strategy;
- `performance-risks.md` — payment-specific performance risks;
- `payment-endpoint.md` — endpoint behavior and expectations;
- `findings-template.md` — template for documenting performance findings.

Scenario summaries are stored under:

```text
results/summaries/
```

---

# Future Enhancements

Possible future extensions include:

- automated human-readable result summaries;
- custom k6 metrics;
- Grafana dashboards;
- Prometheus-compatible metrics storage;
- controlled failure-injection experiments;
- database and state validation;
- asynchronous payment workflow simulation;
- performance trend comparison across builds;
- additional CI performance scenarios.

These are optional extensions rather than requirements for the current project scope.

---

# Author

**Toyosi Daniel Mathew**

QA Engineer transitioning toward Automation QA / SDET, with a focus on API quality, fintech systems, test automation, performance engineering, and system-level quality.