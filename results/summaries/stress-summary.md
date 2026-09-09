# Stress Test Summary

## Test Goal

Evaluate how the payment creation endpoint behaves as traffic increases beyond the expected workload and observe whether response time, reliability, and functional correctness degrade under higher concurrency.

## Traffic Profile

- Endpoint: `POST /payments`
- Ramp to 10 virtual users: 30 seconds
- Ramp to 25 virtual users: 30 seconds
- Ramp to 50 virtual users: 30 seconds
- Ramp down to 0 virtual users: 30 seconds
- Maximum virtual users: 50
- Total requests: 2,043

## Performance Thresholds

- p95 response time: `< 1500 ms`
- HTTP failure rate: `< 5%`
- Checks pass rate: `> 90%`

## Actual Results

| Metric | Result | Threshold | Status |
|---|---:|---:|---|
| Average response time | 253.92 ms | — | Observed |
| p90 response time | 414.64 ms | — | Observed |
| p95 response time | 434.08 ms | < 1500 ms | PASS |
| Maximum response time | 454.26 ms | — | Observed |
| HTTP failure rate | 0.00% | < 5% | PASS |
| Checks pass rate | 100.00% | > 90% | PASS |
| Total requests | 2,043 | — | Observed |

## Key Findings

The stress test passed all configured performance and functional quality thresholds.

The workload increased progressively to a maximum of **50 virtual users** and executed **2,043 requests**.

The endpoint maintained a p95 response time of **434.08 ms**, remaining well below the configured **1500 ms** threshold.

All functional checks passed, no HTTP request failures were observed, and no iterations were interrupted during the scenario.

The results did not reveal significant latency degradation within the workload limits used in this test.

## Business Interpretation

Performance degradation in a payment system can affect transaction completion, customer confidence, downstream processing, and overall service reliability.

Stress testing helps identify how a system behaves as demand moves beyond its expected operating workload and whether degradation occurs gradually or through sudden failures.

Within this controlled mock environment, the payment endpoint remained responsive and functionally valid up to the maximum configured workload of **50 virtual users**.

This does not establish the production capacity or breaking point of a real payment platform. The mock service does not reproduce production dependencies such as databases, external payment providers, queues, distributed services, network variability, or infrastructure resource constraints.

## Overall Result

**PASS**