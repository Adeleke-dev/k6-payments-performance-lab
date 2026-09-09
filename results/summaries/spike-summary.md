# Spike Test Summary

## Test Goal

Evaluate how the payment creation endpoint behaves when traffic increases suddenly and whether it remains responsive, reliable, and functionally valid during and after the traffic spike.

## Traffic Profile

- Endpoint: `POST /payments`
- Ramp to 2 virtual users: 20 seconds
- Spike to 20 virtual users: 10 seconds
- Hold at 20 virtual users: 20 seconds
- Return to 2 virtual users: 10 seconds
- Ramp down to 0 virtual users: 20 seconds
- Maximum virtual users: 20
- Total requests: 546

## Performance Thresholds

- p95 response time: `< 1200 ms`
- HTTP failure rate: `< 3%`
- Checks pass rate: `> 95%`

## Actual Results

| Metric | Result | Threshold | Status |
|---|---:|---:|---|
| Average response time | 244.44 ms | — | Observed |
| p90 response time | 408.50 ms | — | Observed |
| p95 response time | 433.12 ms | < 1200 ms | PASS |
| Maximum response time | 453.69 ms | — | Observed |
| HTTP failure rate | 0.00% | < 3% | PASS |
| Checks pass rate | 100.00% | > 95% | PASS |
| Total requests | 546 | — | Observed |

## Key Findings

The spike test passed all configured performance and functional quality thresholds.

During the rapid increase to **20 virtual users**, the endpoint maintained a p95 response time of **433.12 ms**, remaining well below the configured **1200 ms** threshold.

All functional checks passed, and no HTTP request failures were observed across the **546 requests** executed during the scenario.

The mock service also completed the traffic reduction stages without interrupted iterations.

## Business Interpretation

Payment traffic can increase suddenly during events such as promotions, checkout surges, salary periods, or other periods of increased transaction activity.

A payment service should handle these bursts without unacceptable latency or a significant increase in failed transactions.

Within this controlled mock environment, the payment endpoint remained responsive and reliable throughout the configured traffic spike.

These results demonstrate the behavior of the test environment under this workload and should not be interpreted as proof of production-scale payment capacity.

## Overall Result

**PASS**