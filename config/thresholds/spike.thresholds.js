export const spikeThresholds = {
  http_req_duration: ['p(95)<1200'],
  http_req_failed: ['rate<0.03'],
  checks: ['rate>0.95'],
};