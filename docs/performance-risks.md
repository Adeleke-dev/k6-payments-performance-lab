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

## Example observed behavior under baseline load
With a simulated 5% internal server failure condition, the payment API remained within latency expectations but breached reliability thresholds. This shows that acceptable response times do not guarantee acceptable service quality for payment processing. Error-rate thresholds must be treated as first-class quality gates.

## Baseline load reliability finding

During repeated baseline load runs, the payment API maintained stable latency with p95 response times around 428-431 ms. However, failed request rates remained between 5.34% and 6.14%, breaching the configured reliability threshold of less than 1%.

This indicates that the service can remain responsive while still failing too many payment requests. For a payments API, reliability thresholds are as important as latency thresholds because failed payment creation directly affects transaction success, user trust, and revenue.

## Spike traffic reliability finding

During the spike test, traffic increased up to 20 virtual users. The payment API maintained stable response times, with p95 latency at 437.01 ms, which stayed within the configured latency threshold.

However, the failed request rate reached 6.23%, breaching the reliability threshold of less than 1%. This shows that the service remained responsive during sudden traffic increases, but payment creation reliability was still unacceptable for a payment workflow.