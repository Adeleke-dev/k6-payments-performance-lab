import http from 'k6/http';
import { env } from '../../config/env.js';
import { endpoints } from '../../config/endpoints.js';

export function createPayment(payload) {
  const url = `${env.BASE_URL}${endpoints.payments}`;

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(env.API_TOKEN && { Authorization: `Bearer ${env.API_TOKEN}` }),
    },
  };

  return http.post(url, JSON.stringify(payload), params);
}