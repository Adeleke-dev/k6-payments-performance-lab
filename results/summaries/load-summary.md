# Load Test Summary

## Test Goal

Evaluate whether the payment creation endpoint remains responsive, reliable, and functionally valid under moderate expected traffic.

## Traffic Profile

- Endpoint: `POST /payments`
- Ramp to 5 virtual users: 30 seconds
- Hold at 5 virtual users: 1 minute
- Ramp down to 0 virtual users: 30 seconds
- Maximum virtual users: 5
- Total requests: 371

## Performance Thresholds

- p95 response time: `< 900 ms`
- HTTP failure rate: `< 1%`
- Checks pass rate: `> 95%`

## Actual Results

| Metric | Result | Threshold | Status |
|---|---:|---:|---|
| Average response time | 260.74 ms | — | Observed |
| p90 response time | 417.52 ms | — | Observed |
| p95 response time | 432.61 ms | < 900 ms | PASS |
| Maximum response time | 451.65 ms | — | Observed |
| HTTP failure rate | 0.00% | < 1% | PASS |
| Checks pass rate | 100.00% | > 95% | PASS |
| Total requests | 371 | — | Observed |

## Key Findings

The load test passed all configured performance and functional quality thresholds.

The endpoint recorded a p95 response time of **432.61 ms**, remaining comfortably below the configured **900 ms** threshold.

All functional checks passed, and no HTTP request failures were recorded across the **371 requests** executed during the test.

The results show that the mock payment service maintained stable behavior throughout the configured moderate workload.

## Business Interpretation

Payment systems must remain responsive and reliable during normal transaction traffic because increased latency or failed payment requests can directly affect customer experience and transaction completion.

Within this controlled test environment, the payment creation endpoint maintained acceptable response times and produced no observed HTTP failures under the configured load.

These results represent the behavior of the local mock service and should not be interpreted as production capacity measurements for a real payment platform.

## Overall Result

**PASS**