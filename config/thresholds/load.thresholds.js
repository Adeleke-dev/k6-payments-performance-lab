export const loadThresholds = {
  http_req_duration: ['p(95)<900'],
  http_req_failed: ['rate<0.01'],
  checks: ['rate>0.95'],
};