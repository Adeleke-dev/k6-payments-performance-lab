# Test Strategy

## Primary endpoint
POST /payments

## Secondary endpoints
GET /payments/{id}
POST /refunds

## Test types
- smoke
- load
- spike
- stress

## Smoke test goal
Confirm that the payment creation endpoint is reachable, functionally valid, and responsive under low traffic.

## Initial smoke thresholds
- p95 response time < 800 ms
- failed request rate < 1%
- checks pass rate > 95%