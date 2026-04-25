export const stressThresholds = {
  http_req_duration: ['p(95)<1500'],
  http_req_failed: ['rate<0.05'],
  checks: ['rate>0.90'],
};