# Smoke Test Summary

## Test Goal

Confirm that the payment creation endpoint is reachable, responsive, and functionally valid under minimal traffic before executing larger performance scenarios.

## Traffic Profile

- Endpoint: `POST /payments`
- Virtual users: 1
- Duration: 30 seconds
- Total requests: 24

## Performance Thresholds

- p95 response time: `< 800 ms`
- HTTP failure rate: `< 1%`
- Checks pass rate: `> 95%`

## Actual Results

| Metric | Result | Threshold | Status |
|---|---:|---:|---|
| Average response time | 257.26 ms | — | Observed |
| p90 response time | 386.31 ms | — | Observed |
| p95 response time | 406.11 ms | < 800 ms | PASS |
| Maximum response time | 419.81 ms | — | Observed |
| HTTP failure rate | 0.00% | < 1% | PASS |
| Checks pass rate | 100.00% | > 95% | PASS |
| Total requests | 24 | — | Observed |

## Key Findings

The smoke test passed all configured quality thresholds.

The payment endpoint maintained a p95 response time of **406.11 ms**, comfortably below the configured **800 ms** threshold.

All functional checks passed and no HTTP request failures were recorded during the run.

This provides a healthy baseline before executing higher-concurrency load, spike, and stress scenarios.

## Business Interpretation

For a payment workflow, basic availability alone is not sufficient. The endpoint must also return functionally valid responses within an acceptable response time.

Under the minimal traffic used in this test, the mock payment service remained responsive and reliable.

These results apply only to the controlled local mock environment and should not be interpreted as production payment-system capacity.

## Overall Result

**PASS**