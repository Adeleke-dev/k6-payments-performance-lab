# Performance Risks

## Slow payment creation
Slow payment creation can increase checkout wait time, trigger user retries, and create duplicate submission risk.

## Rising failure rate under load
As traffic increases, rising failure rates can directly impact payment success and revenue.

## High p95/p99 latency
Average latency alone is not enough. Tail latency matters because some users and clients will experience severe slowness.

## Timeout behavior
Slowdowns can trigger client timeouts and retry amplification, making system pressure worse.

## Rate limiting under bursts
Traffic spikes may cause throttling or unstable behavior if the system does not degrade gracefully.

## Stress breaking point
The project should identify where performance becomes unacceptable and how the system fails under pressure.

## Refund performance degradation
Refund endpoints may become slower due to extra validation and transaction-state checks.

## Payment status lookup degradation
Read endpoints may also degrade under concurrency, especially if clients poll transaction state frequently.